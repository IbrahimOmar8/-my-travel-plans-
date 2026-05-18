import { NextResponse } from "next/server";
import { addReview } from "@/lib/reviews";
import { getTour } from "@/data/tours";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = rateLimit({
    key: `review:${clientIp(req)}`,
    limit: 3,
    windowMs: 60 * 60 * 1000
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many reviews. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  // Honeypot
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, id: "spam" });
  }

  const { tourSlug, name, body: reviewBody, rating } = body;
  if (!tourSlug || !name || !reviewBody || !rating) {
    return NextResponse.json(
      { error: "Missing tourSlug, name, body or rating" },
      { status: 400 }
    );
  }
  if (!getTour(String(tourSlug))) {
    return NextResponse.json({ error: "Unknown tour" }, { status: 404 });
  }

  const review = await addReview({
    tourSlug: String(tourSlug),
    name: String(name).slice(0, 80),
    country: body.country ? String(body.country).slice(0, 60) : undefined,
    rating: Number(rating),
    title: body.title ? String(body.title).slice(0, 120) : undefined,
    body: String(reviewBody).slice(0, 4000),
    email: body.email ? String(body.email) : undefined,
    locale: body.locale ? String(body.locale) : undefined
  });

  return NextResponse.json({ ok: true, id: review.id });
}
