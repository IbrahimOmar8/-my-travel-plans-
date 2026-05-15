import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { DestinationCard } from "@/components/DestinationCard";
import { TourCard } from "@/components/TourCard";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";

export default function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");
  const featuredDestinations = destinations.slice(0, 4);
  const featuredTours = tours.slice(0, 3);

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("destinationsEyebrow")}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
              {t("destinationsTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/destinations`}
            className="hidden text-sm font-semibold text-nile-600 hover:text-nile-700 sm:block"
          >
            {t("destinationsLink")}
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </section>

      <section className="bg-sand-100 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("toursEyebrow")}</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
                {t("toursTitle")}
              </h2>
            </div>
            <Link
              href={`/${locale}/tours`}
              className="hidden text-sm font-semibold text-nile-600 hover:text-nile-700 sm:block"
            >
              {t("toursLink")}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />

      <section className="container-page py-20">
        <div className="overflow-hidden rounded-3xl bg-nile-800 p-10 text-white shadow-lg md:p-16">
          <p className="eyebrow text-sand-200">{t("customEyebrow")}</p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl font-semibold md:text-5xl">
            {t("customTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-sand-100">{t("customBody")}</p>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary mt-8 bg-sand-300 text-nile-900 hover:bg-sand-200"
          >
            {t("customCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
