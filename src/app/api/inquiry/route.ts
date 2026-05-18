import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/storage";
import { sendInquiryEmails } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = rateLimit({
    key: `inquiry:${clientIp(req)}`,
    limit: 5,
    windowMs: 60 * 60 * 1000
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many inquiries. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limit.resetMs / 1000)) }
      }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.name) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }

  // Honeypot — bots love filling every field. Real users skip it.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, id: "spam" });
  }

  const inquiry = await addInquiry({
    name: String(body.name).slice(0, 120),
    email: String(body.email).slice(0, 200),
    country: body.country ? String(body.country).slice(0, 80) : undefined,
    travelers: body.travelers ? String(body.travelers).slice(0, 20) : undefined,
    date: body.date ? String(body.date).slice(0, 30) : undefined,
    notes: body.notes ? String(body.notes).slice(0, 4000) : undefined,
    tourSlug: body.tourSlug ? String(body.tourSlug).slice(0, 80) : undefined,
    tourTitle: body.tourTitle ? String(body.tourTitle).slice(0, 200) : undefined
  });

  await sendInquiryEmails(inquiry).catch((err) =>
    console.error("[email] inquiry send failed", err)
  );

  return NextResponse.json({ ok: true, id: inquiry.id });
}
