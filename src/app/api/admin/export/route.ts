import { NextResponse } from "next/server";
import { listInquiries, listBookings } from "@/lib/storage";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(headers: string[], rows: Array<Record<string, unknown>>) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  return lines.join("\n");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  if (type === "inquiries") {
    const rows = await listInquiries();
    const csv = toCsv(
      ["id", "createdAt", "name", "email", "country", "travelers", "date", "tourSlug", "tourTitle", "notes"],
      rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
    );
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inquiries-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  if (type === "bookings") {
    const rows = await listBookings();
    const csv = toCsv(
      ["id", "createdAt", "status", "tourSlug", "tourTitle", "travelers", "depositUSD", "totalUSD", "currency", "customerName", "customerEmail", "stripeSessionId"],
      rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
    );
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  return NextResponse.json({ error: "type must be 'inquiries' or 'bookings'" }, { status: 400 });
}
