import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/storage";
import { sendInquiryEmails } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.name) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }

  const inquiry = await addInquiry({
    name: String(body.name),
    email: String(body.email),
    country: body.country ? String(body.country) : undefined,
    travelers: body.travelers ? String(body.travelers) : undefined,
    date: body.date ? String(body.date) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
    tourSlug: body.tourSlug ? String(body.tourSlug) : undefined,
    tourTitle: body.tourTitle ? String(body.tourTitle) : undefined
  });

  await sendInquiryEmails(inquiry).catch((err) =>
    console.error("[email] inquiry send failed", err)
  );

  return NextResponse.json({ ok: true, id: inquiry.id });
}
