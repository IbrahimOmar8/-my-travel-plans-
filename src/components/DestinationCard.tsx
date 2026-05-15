import Link from "next/link";
import type { Destination } from "@/lib/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${destination.heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nile-900/85 via-nile-900/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-sand-200">
          {destination.country}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold">
          {destination.name}
        </h3>
        <p className="mt-1 text-sm text-sand-100 line-clamp-2">
          {destination.tagline}
        </p>
      </div>
    </Link>
  );
}
