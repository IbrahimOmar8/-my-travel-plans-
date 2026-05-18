import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { categoryLabel } from "@/lib/types";
import type { Locale } from "@/i18n/config";

type SearchParams = {
  destination?: string;
  category?: string;
  duration?: string;
  maxPrice?: string;
  sort?: string;
};

const durationBuckets: Record<string, [number, number]> = {
  short: [1, 5],
  medium: [6, 9],
  long: [10, 99]
};

export default function ToursPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("toursPage");
  const lc = locale as Locale;

  const maxPrice = searchParams.maxPrice
    ? Number(searchParams.maxPrice)
    : undefined;
  const durationRange = searchParams.duration
    ? durationBuckets[searchParams.duration]
    : undefined;

  let filtered = tours.filter((tour) => {
    if (searchParams.destination && tour.destinationSlug !== searchParams.destination)
      return false;
    if (searchParams.category && tour.category !== searchParams.category)
      return false;
    if (durationRange) {
      if (
        tour.durationDays < durationRange[0] ||
        tour.durationDays > durationRange[1]
      )
        return false;
    }
    if (maxPrice && tour.priceUSD > maxPrice) return false;
    return true;
  });

  const sort = searchParams.sort ?? "popular";
  filtered = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.priceUSD - b.priceUSD;
    if (sort === "price-desc") return b.priceUSD - a.priceUSD;
    if (sort === "duration-asc") return a.durationDays - b.durationDays;
    if (sort === "duration-desc") return b.durationDays - a.durationDays;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  const categories = Array.from(new Set(tours.map((tour) => tour.category)));

  function urlWith(overrides: Partial<SearchParams>) {
    const next: Record<string, string> = { ...searchParams } as Record<
      string,
      string
    >;
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined || v === "") delete next[k];
      else next[k] = v;
    }
    const qs = new URLSearchParams(next).toString();
    return `/${locale}/tours${qs ? `?${qs}` : ""}`;
  }

  const activeFilterCount =
    (searchParams.destination ? 1 : 0) +
    (searchParams.category ? 1 : 0) +
    (searchParams.duration ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <section className="container-page py-16">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">
        {t("matchCount", { count: filtered.length })} {t("missing")}{" "}
        <Link
          href={`/${locale}/contact`}
          className="font-semibold text-nile-600"
        >
          {t("tellUs")}
        </Link>
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
            {t("destinationFilter")}
          </span>
          <FilterChip
            label={t("allDestinations")}
            href={urlWith({ destination: undefined })}
            active={!searchParams.destination}
          />
          {destinations.map((d) => (
            <FilterChip
              key={d.slug}
              label={d.name[lc]}
              href={urlWith({ destination: d.slug })}
              active={searchParams.destination === d.slug}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
            {t("styleFilter")}
          </span>
          <FilterChip
            label={t("anyStyle")}
            href={urlWith({ category: undefined })}
            active={!searchParams.category}
          />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={categoryLabel[c][lc]}
              href={urlWith({ category: c })}
              active={searchParams.category === c}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
            {t("durationFilter")}
          </span>
          <FilterChip
            label={t("anyDuration")}
            href={urlWith({ duration: undefined })}
            active={!searchParams.duration}
          />
          <FilterChip
            label={t("short")}
            href={urlWith({ duration: "short" })}
            active={searchParams.duration === "short"}
          />
          <FilterChip
            label={t("medium")}
            href={urlWith({ duration: "medium" })}
            active={searchParams.duration === "medium"}
          />
          <FilterChip
            label={t("long")}
            href={urlWith({ duration: "long" })}
            active={searchParams.duration === "long"}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
            {t("priceFilter")}
          </span>
          <FilterChip
            label={t("anyPrice")}
            href={urlWith({ maxPrice: undefined })}
            active={!maxPrice}
          />
          {[1500, 2500, 4000].map((p) => (
            <FilterChip
              key={p}
              label={`< $${p.toLocaleString()}`}
              href={urlWith({ maxPrice: String(p) })}
              active={maxPrice === p}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand-200 pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sand-600">
              {t("sortBy")}
            </span>
            <SortChip
              label={t("popular")}
              href={urlWith({ sort: "popular" })}
              active={sort === "popular"}
            />
            <SortChip
              label={t("rating")}
              href={urlWith({ sort: "rating" })}
              active={sort === "rating"}
            />
            <SortChip
              label={t("priceAsc")}
              href={urlWith({ sort: "price-asc" })}
              active={sort === "price-asc"}
            />
            <SortChip
              label={t("priceDesc")}
              href={urlWith({ sort: "price-desc" })}
              active={sort === "price-desc"}
            />
          </div>
          {activeFilterCount > 0 && (
            <Link
              href={`/${locale}/tours`}
              className="text-xs font-semibold text-nile-600 hover:text-nile-700"
            >
              {t("clearAll", { count: activeFilterCount })}
            </Link>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-nile-800/80">{t("noResults")}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
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
      className={`rounded-full px-3 py-1 text-sm font-medium transition ${
        active
          ? "bg-nile-700 text-white"
          : "bg-white text-nile-800 ring-1 ring-sand-200 hover:bg-sand-100"
      }`}
    >
      {label}
    </Link>
  );
}

function SortChip({
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
      className={`text-xs font-semibold transition ${
        active ? "text-nile-700 underline" : "text-nile-600 hover:text-nile-700"
      }`}
    >
      {label}
    </Link>
  );
}
