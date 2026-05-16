import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
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
