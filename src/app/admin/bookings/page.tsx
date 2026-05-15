import { listBookings } from "@/lib/storage";

export const dynamic = "force-dynamic";

const statusStyle = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-slate-200 text-slate-700"
};

export default async function BookingsPage() {
  const bookings = await listBookings();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-slate-500">
          {bookings.length} total · webhook-driven status updates
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Travelers</th>
              <th className="px-4 py-3">Deposit</th>
              <th className="px-4 py-3">Trip total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Stripe session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={8}>
                  No bookings yet. They'll appear here once a checkout starts.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 align-top text-slate-500">
                  {new Date(b.createdAt).toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-3 align-top font-medium">
                  {b.tourTitle}
                </td>
                <td className="px-4 py-3 align-top">
                  {b.customerName || b.customerEmail ? (
                    <>
                      <div>{b.customerName ?? "—"}</div>
                      <div className="text-xs text-slate-500">
                        {b.customerEmail ?? ""}
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">{b.travelers}</td>
                <td className="px-4 py-3 align-top font-medium">
                  ${b.depositUSD.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-top text-slate-600">
                  ${b.totalUSD.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-top">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      statusStyle[b.status]
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 align-top">
                  <code className="text-xs text-slate-500">
                    {b.stripeSessionId.slice(0, 16)}…
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
