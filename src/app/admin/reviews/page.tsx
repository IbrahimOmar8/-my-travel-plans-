import { listAllReviews } from "@/lib/reviews";
import { ReviewActions } from "./ReviewActions";

export const dynamic = "force-dynamic";

const statusStyle: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  rejected: "bg-slate-200 text-slate-700"
};

export default async function ReviewsAdminPage() {
  const reviews = await listAllReviews();
  const pending = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="text-sm text-slate-500">
          {reviews.length} total · {pending} pending moderation
        </p>
      </header>

      <div className="space-y-3">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {r.title || `${r.name}'s review`}
                </p>
                <p className="text-xs text-slate-500">
                  {r.name}
                  {r.country ? ` · ${r.country}` : ""} ·{" "}
                  {new Date(r.createdAt).toLocaleString("en-GB")} ·{" "}
                  {"★".repeat(r.rating)}
                  <span className="text-slate-300">
                    {"★".repeat(5 - r.rating)}
                  </span>{" "}
                  · {r.tourSlug}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  statusStyle[r.status] ?? "bg-slate-100"
                }`}
              >
                {r.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-700">{r.body}</p>
            {r.email && (
              <p className="mt-2 text-xs text-slate-500">
                Contact: {r.email}
              </p>
            )}
            <ReviewActions id={r.id} status={r.status} />
          </article>
        ))}
        {reviews.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}
