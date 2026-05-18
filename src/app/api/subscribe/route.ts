import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const limit = rateLimit({
    key: `subscribe:${clientIp(req)}`,
    limit: 10,
    windowMs: 60 * 60 * 1000
  });
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (typeof body?.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  await addSubscriber(
    email,
    body?.locale ? String(body.locale) : undefined,
    body?.source ? String(body.source).slice(0, 40) : undefined
  );
  return NextResponse.json({ ok: true });
}
