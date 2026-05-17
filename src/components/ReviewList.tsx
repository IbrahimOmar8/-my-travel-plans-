import { StarRating } from "./StarRating";
import type { Review } from "@/lib/reviews";

function formatDate(d: Date, locale: string) {
  return new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-GB",
    { year: "numeric", month: "long" }
  ).format(d);
}

export function ReviewList({
  reviews,
  locale
}: {
  reviews: Review[];
  locale: string;
}) {
  if (reviews.length === 0) return null;
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <article
          key={r.id}
          className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg font-semibold text-nile-900">
                {r.title || r.name}
              </p>
              <p className="text-xs text-nile-700">
                {r.name}
                {r.country ? ` · ${r.country}` : ""} ·{" "}
                {formatDate(r.createdAt, locale)}
              </p>
            </div>
            <StarRating value={r.rating} size="md" />
          </div>
          {r.title && (
            <p className="mt-3 text-sm leading-relaxed text-nile-800">
              {r.body}
            </p>
          )}
          {!r.title && (
            <p className="mt-2 text-sm leading-relaxed text-nile-800">
              {r.body}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
