import { NextResponse } from "next/server";
import { addInquiry, newId, type Inquiry } from "@/lib/storage";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.name) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }

  const inquiry: Inquiry = {
    id: newId("inq"),
    createdAt: new Date().toISOString(),
    name: String(body.name),
    email: String(body.email),
    country: body.country ? String(body.country) : undefined,
    travelers: body.travelers ? String(body.travelers) : undefined,
    date: body.date ? String(body.date) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
    tourSlug: body.tourSlug ? String(body.tourSlug) : undefined,
    tourTitle: body.tourTitle ? String(body.tourTitle) : undefined
  };

  await addInquiry(inquiry);
  console.log("[inquiry] saved", inquiry.id);
  return NextResponse.json({ ok: true, id: inquiry.id });
}
