import { listSubscribers } from "@/lib/subscribers";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subs = await listSubscribers();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Subscribers</h1>
          <p className="text-sm text-slate-500">
            {subs.length} active · newsletter signups
          </p>
        </div>
        <a
          href="/api/admin/export?type=subscribers"
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Export CSV ↓
        </a>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Locale</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subs.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3 text-slate-600">{s.locale ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{s.source ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(s.createdAt).toLocaleString("en-GB")}
                </td>
              </tr>
            ))}
            {subs.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
