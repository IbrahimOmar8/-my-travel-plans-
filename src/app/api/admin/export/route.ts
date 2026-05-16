import { NextResponse } from "next/server";
import { listInquiries, listBookings } from "@/lib/storage";
import { listAllReviews } from "@/lib/reviews";
import { listSubscribers } from "@/lib/subscribers";

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

  if (type === "reviews") {
    const rows = await listAllReviews();
    const csv = toCsv(
      ["id", "createdAt", "status", "tourSlug", "rating", "name", "country", "title", "body", "email", "locale"],
      rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
    );
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="reviews-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  if (type === "subscribers") {
    const rows = await listSubscribers();
    const csv = toCsv(
      ["email", "createdAt", "locale", "source"],
      rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
    );
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  return NextResponse.json(
    { error: "type must be one of: inquiries, bookings, reviews, subscribers" },
    { status: 400 }
  );
}
