import { notFound } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { tours, getTour } from "@/data/tours";
import { getDestination } from "@/data/destinations";
import { InquiryForm } from "@/components/InquiryForm";
import { BookButton } from "@/components/BookButton";
import { categoryLabel } from "@/lib/types";
import { locales, type Locale } from "@/i18n/config";

type Params = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const combos: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const tour of tours) combos.push({ locale, slug: tour.slug });
  }
  return combos;
}

export default function TourPage({ params }: Params) {
  unstable_setRequestLocale(params.locale);
  const tour = getTour(params.slug);
  if (!tour) notFound();
  const locale = params.locale as Locale;
  const t = useTranslations("tour");
  const destination = getDestination(tour.destinationSlug);

  return (
    <article>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nile-900/65 to-nile-900/75" />
        <div className="container-page py-20 text-white md:py-28">
          {destination && (
            <Link
              href={`/${locale}/destinations/${destination.slug}`}
              className="text-xs uppercase tracking-wider text-sand-200 hover:text-white"
            >
              {destination.name[locale]} · {destination.country[locale]}
            </Link>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-5xl">
            {tour.title[locale]}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <Badge>
              {tour.durationDays} {t("day").toLowerCase()}
            </Badge>
            <Badge>{categoryLabel[tour.category][locale]}</Badge>
            <Badge>{tour.groupSize[locale]}</Badge>
            <span>
              ★ {tour.rating.toFixed(1)} ({tour.reviewCount} {t("reviews")})
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-nile-900">
                {t("overview")}
              </h2>
              <p className="mt-3 text-nile-800/90">{tour.summary[locale]}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-nile-900">
                {t("highlights")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {tour.highlights[locale].map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-nile-800"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sand-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-nile-900">
                {t("itinerary")}
              </h2>
              <ol className="mt-6 space-y-4">
                {tour.itinerary.map((item) => (
                  <li
                    key={item.day}
                    className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                      {t("day")} {item.day}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-nile-900">
                      {item.title[locale]}
                    </p>
                    <p className="mt-1 text-sm text-nile-800/80">
                      {item.details[locale]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-nile-900">
                  {t("included")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-nile-800">
                  {tour.includes[locale].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-nile-500">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-nile-900">
                  {t("notIncluded")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-nile-800">
                  {tour.excludes[locale].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-sand-600">×</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-sand-600">
                {t("from")}
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-nile-800">
                ${tour.priceUSD.toLocaleString()}
              </p>
              <p className="text-sm text-nile-700/70">{t("perPerson")}</p>
              <ul className="mt-5 space-y-2 text-sm text-nile-800">
                <li>{t("freeCancel")}</li>
                <li>{t("deposit")}</li>
                <li>{t("balance")}</li>
              </ul>
              <BookButton tourSlug={tour.slug} />
              <a href="#inquiry" className="btn-secondary mt-3 w-full">
                {t("requestQuote")}
              </a>
              <a
                href="https://wa.me/201000000000"
                className="mt-3 block text-center text-sm font-semibold text-nile-600 hover:text-nile-700"
              >
                {t("chatWhatsapp")}
              </a>
            </div>
          </aside>
        </div>

        <div id="inquiry" className="mt-20 max-w-3xl">
          <InquiryForm tourTitle={tour.title[locale]} tourSlug={tour.slug} />
        </div>
      </section>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
      {children}
    </span>
  );
}
