import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type DayCount = { day: string; count: number };

async function dailyCounts(
  model: "inquiry" | "booking" | "review" | "subscriber",
  days = 30
) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const fetcher =
    model === "inquiry"
      ? prisma.inquiry.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } })
      : model === "booking"
        ? prisma.booking.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } })
        : model === "review"
          ? prisma.review.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } })
          : prisma.subscriber.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } });
  const rows = await fetcher;

  const map = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    map.set(d, 0);
  }
  for (const r of rows) {
    const d = r.createdAt.toISOString().slice(0, 10);
    map.set(d, (map.get(d) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([day, count]) => ({ day, count }));
}

async function topTours(
  model: "inquiry" | "booking",
  limit = 5
): Promise<Array<{ slug: string; title: string; count: number }>> {
  const rows =
    model === "inquiry"
      ? await prisma.inquiry.findMany({
          where: { tourSlug: { not: null } },
          select: { tourSlug: true, tourTitle: true }
        })
      : await prisma.booking.findMany({
          select: { tourSlug: true, tourTitle: true }
        });

  const map = new Map<string, { title: string; count: number }>();
  for (const r of rows) {
    if (!r.tourSlug) continue;
    const existing = map.get(r.tourSlug);
    if (existing) existing.count += 1;
    else
      map.set(r.tourSlug, { title: r.tourTitle ?? r.tourSlug, count: 1 });
  }
  return [...map.entries()]
    .map(([slug, { title, count }]) => ({ slug, title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function Sparkline({
  data,
  color = "#0c63a7"
}: {
  data: DayCount[];
  color?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex h-24 items-end gap-[2px]">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition hover:opacity-80"
          title={`${d.day}: ${d.count}`}
          style={{
            height: `${(d.count / max) * 100}%`,
            minHeight: d.count > 0 ? 4 : 1,
            background: d.count > 0 ? color : "#e7dec5"
          }}
        />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  data,
  color
}: {
  label: string;
  value: number;
  data: DayCount[];
  color: string;
}) {
  const total = data.reduce((acc, d) => acc + d.count, 0);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-slate-900">
        {value.toLocaleString()}
      </p>
      <p className="text-xs text-slate-500">
        {total} in last 30 days
      </p>
      <div className="mt-3">
        <Sparkline data={data} color={color} />
      </div>
    </div>
  );
}

function Bar({
  label,
  count,
  max
}: {
  label: string;
  count: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="truncate text-slate-700">{label}</span>
        <span className="ml-2 font-semibold text-slate-900">{count}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-700"
          style={{ width: `${(count / Math.max(1, max)) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const [
    inquiries,
    bookings,
    reviews,
    subscribers,
    paidCount,
    pendingCount,
    inquiryDaily,
    bookingDaily,
    reviewDaily,
    subscriberDaily,
    topInquiryTours,
    topBookingTours
  ] = await Promise.all([
    prisma.inquiry.count(),
    prisma.booking.count(),
    prisma.review.count(),
    prisma.subscriber.count(),
    prisma.booking.count({ where: { status: "paid" } }),
    prisma.booking.count({ where: { status: "pending" } }),
    dailyCounts("inquiry"),
    dailyCounts("booking"),
    dailyCounts("review"),
    dailyCounts("subscriber"),
    topTours("inquiry"),
    topTours("booking")
  ]);

  const conversion =
    inquiries > 0 ? Math.round((bookings / inquiries) * 100) : 0;
  const paidConversion =
    inquiries > 0 ? Math.round((paidCount / inquiries) * 100) : 0;

  const maxInq = Math.max(1, ...topInquiryTours.map((t) => t.count));
  const maxBook = Math.max(1, ...topBookingTours.map((t) => t.count));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-slate-500">
          Last 30 days · DB-backed (Plausible covers traffic)
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Inquiries (all-time)"
          value={inquiries}
          data={inquiryDaily}
          color="#0c63a7"
        />
        <StatCard
          label="Bookings (all-time)"
          value={bookings}
          data={bookingDaily}
          color="#0ea5e9"
        />
        <StatCard
          label="Reviews (all-time)"
          value={reviews}
          data={reviewDaily}
          color="#f59e0b"
        />
        <StatCard
          label="Subscribers"
          value={subscribers}
          data={subscriberDaily}
          color="#10b981"
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Inquiry → Booking
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900">
            {conversion}%
          </p>
          <p className="text-xs text-slate-500">
            {bookings} bookings from {inquiries} inquiries
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Paid rate
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900">
            {paidConversion}%
          </p>
          <p className="text-xs text-slate-500">
            {paidCount} paid · {pendingCount} pending
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Avg booking value
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-slate-900">
            ${bookings > 0 ? "—" : "—"}
          </p>
          <p className="text-xs text-slate-500">
            See bookings tab for breakdown
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Top tours by inquiry
          </h2>
          <div className="mt-4 space-y-3">
            {topInquiryTours.length === 0 ? (
              <p className="text-sm text-slate-500">No inquiries yet.</p>
            ) : (
              topInquiryTours.map((t) => (
                <Bar
                  key={t.slug}
                  label={t.title}
                  count={t.count}
                  max={maxInq}
                />
              ))
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Top tours by booking
          </h2>
          <div className="mt-4 space-y-3">
            {topBookingTours.length === 0 ? (
              <p className="text-sm text-slate-500">No bookings yet.</p>
            ) : (
              topBookingTours.map((t) => (
                <Bar
                  key={t.slug}
                  label={t.title}
                  count={t.count}
                  max={maxBook}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
