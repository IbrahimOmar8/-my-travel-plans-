import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { DestinationCard } from "@/components/DestinationCard";
import { TourCard } from "@/components/TourCard";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import Link from "next/link";

export default function HomePage() {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredTours = tours.slice(0, 3);

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Destinations</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
              Where will your story begin?
            </h2>
          </div>
          <Link
            href="/destinations"
            className="hidden text-sm font-semibold text-nile-600 hover:text-nile-700 sm:block"
          >
            All destinations →
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
              <p className="eyebrow">Featured tours</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
                Trips our travellers love most.
              </h2>
            </div>
            <Link
              href="/tours"
              className="hidden text-sm font-semibold text-nile-600 hover:text-nile-700 sm:block"
            >
              Browse all tours →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />

      <section className="container-page py-20">
        <div className="overflow-hidden rounded-3xl bg-nile-800 p-10 text-white shadow-lg md:p-16">
          <p className="eyebrow text-sand-200">Custom journeys</p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl font-semibold md:text-5xl">
            Want something built around you?
          </h2>
          <p className="mt-4 max-w-2xl text-sand-100">
            Tell us about your dates, your travel style, and the people coming
            with you. A trip designer will reply within 24 hours with a quote
            and three itinerary options.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-sand-300 text-nile-900 hover:bg-sand-200">
            Plan a custom trip
          </Link>
        </div>
      </section>
    </>
  );
}
