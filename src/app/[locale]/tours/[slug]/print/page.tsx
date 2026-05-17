import { notFound } from "next/navigation";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { tours, getTour } from "@/data/tours";
import { categoryLabel } from "@/lib/types";
import { locales, type Locale } from "@/i18n/config";
import { PrintTrigger } from "./PrintTrigger";

type Params = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const combos: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const tour of tours) combos.push({ locale, slug: tour.slug });
  }
  return combos;
}

export const metadata = { robots: { index: false } };

export default async function PrintPage({ params }: Params) {
  unstable_setRequestLocale(params.locale);
  const tour = getTour(params.slug);
  if (!tour) notFound();
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "tour" });

  return (
    <article className="mx-auto max-w-3xl bg-white p-10 text-nile-900 print:p-0">
      <PrintTrigger />
      <header className="border-b border-sand-300 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-600">
          Nile · Horizons
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold">
          {tour.title[locale]}
        </h1>
        <p className="mt-2 text-sm text-nile-700">
          {tour.durationDays} {t("day").toLowerCase()} ·{" "}
          {categoryLabel[tour.category][locale]} · {tour.groupSize[locale]} ·
          USD {tour.priceUSD.toLocaleString()} {t("perPerson")}
        </p>
      </header>

      <section className="mt-6">
        <p className="text-sm leading-relaxed">{tour.summary[locale]}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-xl font-semibold">{t("highlights")}</h2>
        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          {tour.highlights[locale].map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="text-sand-500">•</span> {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-xl font-semibold">{t("itinerary")}</h2>
        <ol className="mt-3 space-y-3">
          {tour.itinerary.map((d) => (
            <li key={d.day} className="break-inside-avoid">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                {t("day")} {d.day}
              </p>
              <p className="font-display text-lg font-semibold">
                {d.title[locale]}
              </p>
              <p className="mt-1 text-sm text-nile-800/90">
                {d.details[locale]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 grid gap-6 break-inside-avoid sm:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-semibold">{t("included")}</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {tour.includes[locale].map((i) => (
              <li key={i}>✓ {i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">
            {t("notIncluded")}
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            {tour.excludes[locale].map((i) => (
              <li key={i}>× {i}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-10 border-t border-sand-300 pt-4 text-xs text-nile-600">
        Nile Horizons · hello@nilehorizons.example · WhatsApp +20 100 000 0000
      </footer>
    </article>
  );
}
