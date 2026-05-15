import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.name) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }

  console.log("[inquiry]", body);

  return NextResponse.json({ ok: true });
}
