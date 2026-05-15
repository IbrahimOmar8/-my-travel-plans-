import Link from "next/link";
import type { Tour } from "@/lib/types";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-nile-800">
          {tour.category}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-nile-900/80 px-3 py-1 text-xs font-semibold text-white">
          {tour.durationDays} days
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-display text-xl font-semibold text-nile-900 hover:text-nile-600">
            {tour.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-nile-800/80 line-clamp-2">
          {tour.summary}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-nile-700">
          <span aria-hidden>★</span>
          <span className="font-semibold">{tour.rating.toFixed(1)}</span>
          <span className="text-nile-600/70">({tour.reviewCount} reviews)</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-sand-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-sand-600">
              From
            </p>
            <p className="font-display text-2xl font-semibold text-nile-800">
              ${tour.priceUSD.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-nile-600/70">
                / person
              </span>
            </p>
          </div>
          <Link
            href={`/tours/${tour.slug}`}
            className="text-sm font-semibold text-nile-600 hover:text-nile-700"
          >
            View tour →
          </Link>
        </div>
      </div>
    </article>
  );
}
