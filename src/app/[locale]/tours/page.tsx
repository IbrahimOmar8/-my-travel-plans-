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

  const filtered = tours.filter((tour) => {
    if (searchParams.destination && tour.destinationSlug !== searchParams.destination)
      return false;
    if (searchParams.category && tour.category !== searchParams.category)
      return false;
    return true;
  });

  const categories = Array.from(new Set(tours.map((tour) => tour.category)));

  return (
    <section className="container-page py-16">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">
        {t("matchCount", { count: filtered.length })}{" "}
        {t("missing")}{" "}
        <Link
          href={`/${locale}/contact`}
          className="font-semibold text-nile-600"
        >
          {t("tellUs")}
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip
          label={t("allDestinations")}
          href={`/${locale}/tours`}
          active={!searchParams.destination && !searchParams.category}
        />
        {destinations.map((d) => (
          <FilterChip
            key={d.slug}
            label={d.name[lc]}
            href={`/${locale}/tours?destination=${d.slug}`}
            active={searchParams.destination === d.slug}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={categoryLabel[c][lc]}
            href={`/${locale}/tours?category=${c}`}
            active={searchParams.category === c}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-nile-800/80">{t("noResults")}</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
