import Link from "next/link";
import { tours } from "@/data/tours";
import { getDestination } from "@/data/destinations";

export default function ToursAdminPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Tour catalogue</h1>
        <p className="text-sm text-slate-500">
          {tours.length} tours · edit in{" "}
          <code className="rounded bg-slate-200 px-1">src/data/tours.ts</code>
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price (USD)</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Preview</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tours.map((t) => {
              const dest = getDestination(t.destinationSlug);
              return (
                <tr key={t.slug} className="hover:bg-slate-50">
                  <td className="px-4 py-3 align-top font-medium">
                    {t.title.en}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {dest?.name.en ?? "—"}
                  </td>
                  <td className="px-4 py-3 align-top">{t.category}</td>
                  <td className="px-4 py-3 align-top">{t.durationDays} days</td>
                  <td className="px-4 py-3 align-top">
                    ${t.priceUSD.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 align-top">
                    ★ {t.rating.toFixed(1)} ({t.reviewCount})
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={`/en/tours/${t.slug}`}
                      target="_blank"
                      className="text-slate-600 hover:underline"
                    >
                      Open ↗
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
