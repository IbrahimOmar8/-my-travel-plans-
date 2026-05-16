import { NextResponse } from "next/server";
import { setReviewStatus } from "@/lib/reviews";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => null);
  const action = body?.action;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json(
      { error: "action must be 'approve' or 'reject'" },
      { status: 400 }
    );
  }
  const result = await setReviewStatus(
    params.id,
    action === "approve" ? "approved" : "rejected"
  );
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
