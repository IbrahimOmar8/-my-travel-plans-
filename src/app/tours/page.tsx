import type { Metadata } from "next";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Tours — Nile Horizons",
  description:
    "Browse every Nile Horizons tour: cultural Egypt itineraries, Nile cruises, Red Sea beach escapes, family trips and Egypt + Jordan combinations."
};

type SearchParams = {
  destination?: string;
  category?: string;
};

export default function ToursPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const filtered = tours.filter((t) => {
    if (searchParams.destination && t.destinationSlug !== searchParams.destination)
      return false;
    if (searchParams.category && t.category !== searchParams.category)
      return false;
    return true;
  });

  const categories = Array.from(new Set(tours.map((t) => t.category)));

  return (
    <section className="container-page py-16">
      <p className="eyebrow">All tours</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        Find your trip.
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">
        {filtered.length} tour{filtered.length === 1 ? "" : "s"} match your
        filters. Anything missing?{" "}
        <Link href="/contact" className="font-semibold text-nile-600">
          Tell us what you're looking for →
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip
          label="All destinations"
          href="/tours"
          active={!searchParams.destination && !searchParams.category}
        />
        {destinations.map((d) => (
          <FilterChip
            key={d.slug}
            label={d.name}
            href={`/tours?destination=${d.slug}`}
            active={searchParams.destination === d.slug}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={c}
            href={`/tours?category=${c}`}
            active={searchParams.category === c}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-nile-800/80">
          No tours match those filters yet.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      )}
    </section>
  );
}

function FilterChip({
  label,
  href,
  active
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-nile-700 text-white"
          : "bg-white text-nile-800 ring-1 ring-sand-200 hover:bg-sand-100"
      }`}
    >
      {label}
    </Link>
  );
}
