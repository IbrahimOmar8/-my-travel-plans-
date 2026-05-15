import type { Metadata } from "next";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations — Nile Horizons",
  description:
    "Egypt, Jordan and the Red Sea: every destination we cover, with the best season to visit and what makes each unmissable."
};

export default function DestinationsPage() {
  return (
    <section className="container-page py-16">
      <p className="eyebrow">Destinations</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        Where will you go?
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">
        We cover every corner of Egypt plus our favourite add-ons across the
        Middle East. Pick a destination to see the tours that include it.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <DestinationCard key={d.slug} destination={d} />
        ))}
      </div>
    </section>
  );
}
