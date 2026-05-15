import { listInquiries } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await listInquiries();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Inquiries</h1>
        <p className="text-sm text-slate-500">
          {inquiries.length} total · most recent first
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Travelers</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inquiries.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={8}>
                  No inquiries yet. New form submissions will appear here.
                </td>
              </tr>
            )}
            {inquiries.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 align-top text-slate-500">
                  {new Date(i.createdAt).toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-3 align-top font-medium">{i.name}</td>
                <td className="px-4 py-3 align-top">
                  <a
                    href={`mailto:${i.email}`}
                    className="text-slate-700 hover:underline"
                  >
                    {i.email}
                  </a>
                </td>
                <td className="px-4 py-3 align-top">
                  {i.tourTitle ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3 align-top">
                  {i.travelers ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3 align-top">
                  {i.date ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3 align-top">
                  {i.country ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="max-w-xs px-4 py-3 align-top text-slate-600">
                  {i.notes ?? <span className="text-slate-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
