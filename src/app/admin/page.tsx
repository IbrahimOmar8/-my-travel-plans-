import Link from "next/link";
import { listInquiries, listBookings } from "@/lib/storage";
import { isStripeConfigured } from "@/lib/stripe";
import { tours } from "@/data/tours";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [inquiries, bookings] = await Promise.all([
    listInquiries(),
    listBookings()
  ]);

  const paid = bookings.filter((b) => b.status === "paid");
  const pending = bookings.filter((b) => b.status === "pending");
  const revenue = paid.reduce((sum, b) => sum + b.depositUSD, 0);
  const pipeline = paid.reduce((sum, b) => sum + b.totalUSD, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-slate-500">
          Last updated {new Date().toLocaleString("en-GB")}
        </p>
      </header>

      {!isStripeConfigured() && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Stripe not configured.</strong> Set{" "}
          <code className="rounded bg-amber-100 px-1">STRIPE_SECRET_KEY</code>{" "}
          and{" "}
          <code className="rounded bg-amber-100 px-1">
            STRIPE_WEBHOOK_SECRET
          </code>{" "}
          in your environment. Bookings still record but no payment is taken.
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open inquiries" value={inquiries.length} />
        <Stat label="Paid deposits" value={paid.length} />
        <Stat label="Pending checkouts" value={pending.length} />
        <Stat label="Active tour products" value={tours.length} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Stat
          label="Deposits collected (USD)"
          value={`$${revenue.toLocaleString()}`}
        />
        <Stat
          label="Confirmed trip value (USD)"
          value={`$${pipeline.toLocaleString()}`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recent inquiries"
          href="/admin/inquiries"
          empty="No inquiries yet."
          rows={inquiries.slice(0, 5).map((i) => ({
            primary: i.name,
            secondary: i.email,
            extra: i.tourTitle ?? "General inquiry",
            time: new Date(i.createdAt).toLocaleString("en-GB")
          }))}
        />
        <Panel
          title="Recent bookings"
          href="/admin/bookings"
          empty="No bookings yet."
          rows={bookings.slice(0, 5).map((b) => ({
            primary: b.tourTitle,
            secondary: `${b.travelers} travellers · $${b.depositUSD} deposit`,
            extra: b.status,
            time: new Date(b.createdAt).toLocaleString("en-GB")
          }))}
        />
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

type Row = {
  primary: string;
  secondary: string;
  extra: string;
  time: string;
};

function Panel({
  title,
  href,
  rows,
  empty
}: {
  title: string;
  href: string;
  rows: Row[];
  empty: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <h2 className="font-semibold">{title}</h2>
        <Link href={href} className="text-sm text-slate-600 hover:underline">
          View all →
        </Link>
      </div>
      <div>
        {rows.length === 0 ? (
          <p className="p-4 text-sm text-slate-500">{empty}</p>
        ) : (
          rows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-slate-100 p-4 last:border-0"
            >
              <div>
                <p className="font-medium">{row.primary}</p>
                <p className="text-xs text-slate-500">{row.secondary}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>{row.extra}</p>
                <p className="mt-1">{row.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
