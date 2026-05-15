import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tours, getTour } from "@/data/tours";
import { getDestination } from "@/data/destinations";
import { InquiryForm } from "@/components/InquiryForm";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const t = getTour(params.slug);
  if (!t) return { title: "Tour not found" };
  return {
    title: `${t.title} — ${t.durationDays} days — Nile Horizons`,
    description: t.summary
  };
}

export default function TourPage({ params }: Params) {
  const tour = getTour(params.slug);
  if (!tour) notFound();

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
              href={`/destinations/${destination.slug}`}
              className="text-xs uppercase tracking-wider text-sand-200 hover:text-white"
            >
              {destination.name} · {destination.country}
            </Link>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <Badge>{tour.durationDays} days</Badge>
            <Badge>{tour.category}</Badge>
            <Badge>{tour.groupSize}</Badge>
            <span>
              ★ {tour.rating.toFixed(1)} ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-nile-900">
                Trip overview
              </h2>
              <p className="mt-3 text-nile-800/90">{tour.summary}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-nile-900">
                Highlights
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {tour.highlights.map((h) => (
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
                Day-by-day itinerary
              </h2>
              <ol className="mt-6 space-y-4">
                {tour.itinerary.map((item) => (
                  <li
                    key={item.day}
                    className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                      Day {item.day}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-nile-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-nile-800/80">
                      {item.details}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-nile-900">
                  Included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-nile-800">
                  {tour.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-nile-500">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-nile-900">
                  Not included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-nile-800">
                  {tour.excludes.map((i) => (
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
                From
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-nile-800">
                ${tour.priceUSD.toLocaleString()}
              </p>
              <p className="text-sm text-nile-700/70">per person, twin share</p>
              <ul className="mt-5 space-y-2 text-sm text-nile-800">
                <li>✓ Free cancellation up to 30 days</li>
                <li>✓ Reserve with 20% deposit</li>
                <li>✓ Pay balance 30 days before departure</li>
              </ul>
              <a
                href="#inquiry"
                className="btn-primary mt-6 w-full"
              >
                Request a quote
              </a>
              <a
                href="https://wa.me/201000000000"
                className="btn-secondary mt-3 w-full"
              >
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>

        <div id="inquiry" className="mt-20 max-w-3xl">
          <InquiryForm tourTitle={tour.title} tourSlug={tour.slug} />
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
