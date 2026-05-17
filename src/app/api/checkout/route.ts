import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { getTour } from "@/data/tours";
import { addBooking } from "@/lib/storage";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import {
  convertFromUSD,
  currencyInfo,
  isCurrency,
  type Currency
} from "@/lib/currency";

const DEPOSIT_FRACTION = 0.2;

function stripeUnitAmount(amount: number, currency: Currency) {
  const noDecimal = currency === "RUB" ? false : true;
  return Math.round(amount * (noDecimal ? 100 : 100));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.tourSlug) {
    return NextResponse.json({ error: "Missing tourSlug" }, { status: 400 });
  }

  const tour = getTour(String(body.tourSlug));
  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const travelers = Math.max(1, Math.min(20, Number(body.travelers) || 2));
  const locale: Locale = locales.includes(body.locale)
    ? body.locale
    : defaultLocale;
  const currency: Currency = isCurrency(body.currency) ? body.currency : "USD";

  const totalUSD = tour.priceUSD * travelers;
  const depositUSD = Math.round(totalUSD * DEPOSIT_FRACTION);
  const depositInCurrency = Math.round(convertFromUSD(depositUSD, currency));
  const totalInCurrency = Math.round(convertFromUSD(totalUSD, currency));

  const origin =
    req.headers.get("origin") ||
    process.env.PUBLIC_BASE_URL ||
    "http://localhost:3000";

  if (!isStripeConfigured() || !stripe) {
    await addBooking({
      stripeSessionId: `stub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      status: "pending",
      tourSlug: tour.slug,
      tourTitle: tour.title[locale],
      travelers,
      depositUSD,
      totalUSD,
      currency: currency.toLowerCase()
    });
    return NextResponse.json({
      url: `${origin}/${locale}/booking/success?demo=1`,
      demo: true
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: stripeUnitAmount(depositInCurrency, currency),
            product_data: {
              name: `Deposit (20%) — ${tour.title[locale]}`,
              description: `Reservation deposit for ${travelers} traveller(s). Total trip cost: ${currencyInfo[currency].symbol}${totalInCurrency.toLocaleString()}.`,
              images: [tour.image]
            }
          },
          quantity: 1
        }
      ],
      success_url: `${origin}/${locale}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/booking/cancel`,
      metadata: {
        tourSlug: tour.slug,
        tourTitle: tour.title[locale],
        travelers: String(travelers),
        totalUSD: String(totalUSD),
        currency
      }
    });

    await addBooking({
      stripeSessionId: session.id,
      status: "pending",
      tourSlug: tour.slug,
      tourTitle: tour.title[locale],
      travelers,
      depositUSD,
      totalUSD,
      currency: currency.toLowerCase()
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] stripe error", err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
