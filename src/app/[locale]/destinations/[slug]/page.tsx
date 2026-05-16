import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { destinations, getDestination } from "@/data/destinations";
import { getToursByDestination } from "@/data/tours";
import { TourCard } from "@/components/TourCard";
import { locales, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { destinationLd, breadcrumbLd, jsonLd } from "@/lib/structured-data";

type Params = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const combos: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const d of destinations) combos.push({ locale, slug: d.slug });
  }
  return combos;
}

export function generateMetadata({ params }: Params): Metadata {
  const destination = getDestination(params.slug);
  if (!destination) return {};
  const locale = params.locale as Locale;
  return {
    title: `${destination.name[locale]}, ${destination.country[locale]}`,
    description: destination.description[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/destinations/${destination.slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          `${siteUrl}/${l}/destinations/${destination.slug}`
        ])
      )
    },
    openGraph: {
      title: destination.name[locale],
      description: destination.tagline[locale],
      images: [destination.heroImage]
    }
  };
}

export default function DestinationPage({ params }: Params) {
  unstable_setRequestLocale(params.locale);
  const destination = getDestination(params.slug);
  if (!destination) notFound();
  const locale = params.locale as Locale;
  const t = useTranslations("destination");
  const tours = getToursByDestination(destination.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(destinationLd(destination, locale))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd([
              { name: "Home", url: `${siteUrl}/${locale}` },
              { name: "Destinations", url: `${siteUrl}/${locale}/destinations` },
              {
                name: destination.name[locale],
                url: `${siteUrl}/${locale}/destinations/${destination.slug}`
              }
            ])
          )
        }}
      />
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nile-900/70 to-nile-900/60" />
        <div className="container-page py-24 text-white md:py-32">
          <p className="eyebrow text-sand-200">{destination.country[locale]}</p>
          <h1 className="mt-2 font-display text-5xl font-semibold md:text-6xl">
            {destination.name[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-100">
            {destination.tagline[locale]}
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-nile-900">
              {t("about")} {destination.name[locale]}
            </h2>
            <p className="mt-4 text-nile-800/90">
              {destination.description[locale]}
            </p>
          </div>
          <aside className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-nile-900">
              {t("quickFacts")}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-sand-600 uppercase tracking-wider text-xs">
                  {t("bestSeason")}
                </dt>
                <dd className="text-nile-800">
                  {destination.bestSeason[locale]}
                </dd>
              </div>
              <div>
                <dt className="text-sand-600 uppercase tracking-wider text-xs">
                  {t("highlights")}
                </dt>
                <dd>
                  <ul className="mt-1 list-disc pl-5 text-nile-800">
                    {destination.highlights[locale].map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold text-nile-900">
            {t("toursIn")} {destination.name[locale]}
          </h2>
          {tours.length === 0 ? (
            <p className="mt-6 text-nile-800/80">
              {t("noTours")}{" "}
              <Link
                href={`/${locale}/contact`}
                className="font-semibold text-nile-600"
              >
                {t("askCustom")}
              </Link>
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
