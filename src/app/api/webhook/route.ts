import { NextResponse } from "next/server";
import type Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import {
  findBookingByStripeSession,
  updateBookingByStripeSession
} from "@/lib/storage";
import { sendBookingConfirmation } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[webhook] invalid signature", err);
    Sentry.captureException(err, { tags: { area: "stripe-webhook", stage: "signature" } });
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await updateBookingByStripeSession(session.id, {
      status: "paid",
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null
    });
    const booking = await findBookingByStripeSession(session.id);
    if (booking) {
      await sendBookingConfirmation(booking).catch((err) => {
        console.error("[email] booking confirmation failed", err);
        Sentry.captureException(err, {
          tags: { area: "email", stage: "booking-confirmation" },
          extra: { bookingId: booking.id }
        });
      });
    } else {
      Sentry.captureMessage("Webhook fired for unknown booking", {
        level: "warning",
        extra: { stripeSessionId: session.id }
      });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    await updateBookingByStripeSession(session.id, { status: "cancelled" });
  }

  return NextResponse.json({ received: true });
}
