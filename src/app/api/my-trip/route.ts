import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = rateLimit({
    key: `mytrip:${clientIp(req)}`,
    limit: 8,
    windowMs: 15 * 60 * 1000
  });
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many lookups" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const id = String(body?.id ?? "").trim();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!id || !email) {
    return NextResponse.json(
      { error: "Booking ID and email are required" },
      { status: 400 }
    );
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      customerEmail: { equals: email }
    }
  });

  if (!booking) {
    return NextResponse.json(
      { error: "We couldn't find a booking with those details." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    booking: {
      id: booking.id,
      tourTitle: booking.tourTitle,
      tourSlug: booking.tourSlug,
      travelers: booking.travelers,
      depositUSD: booking.depositUSD,
      totalUSD: booking.totalUSD,
      currency: booking.currency,
      status: booking.status,
      createdAt: booking.createdAt
    }
  });
}
