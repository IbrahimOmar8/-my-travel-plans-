import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations, getDestination } from "@/data/destinations";
import { getToursByDestination } from "@/data/tours";
import { TourCard } from "@/components/TourCard";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const d = getDestination(params.slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: `${d.name}, ${d.country} — Nile Horizons`,
    description: d.tagline
  };
}

export default function DestinationPage({ params }: Params) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  const tours = getToursByDestination(destination.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nile-900/70 to-nile-900/60" />
        <div className="container-page py-24 text-white md:py-32">
          <p className="eyebrow text-sand-200">{destination.country}</p>
          <h1 className="mt-2 font-display text-5xl font-semibold md:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-100">
            {destination.tagline}
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-nile-900">
              About {destination.name}
            </h2>
            <p className="mt-4 text-nile-800/90">{destination.description}</p>
          </div>
          <aside className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-nile-900">
              Quick facts
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-sand-600 uppercase tracking-wider text-xs">
                  Best season
                </dt>
                <dd className="text-nile-800">{destination.bestSeason}</dd>
              </div>
              <div>
                <dt className="text-sand-600 uppercase tracking-wider text-xs">
                  Highlights
                </dt>
                <dd>
                  <ul className="mt-1 list-disc pl-5 text-nile-800">
                    {destination.highlights.map((h) => (
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
            Tours in {destination.name}
          </h2>
          {tours.length === 0 ? (
            <p className="mt-6 text-nile-800/80">
              No tours currently scheduled.{" "}
              <Link href="/contact" className="font-semibold text-nile-600">
                Ask us about a custom trip →
              </Link>
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
