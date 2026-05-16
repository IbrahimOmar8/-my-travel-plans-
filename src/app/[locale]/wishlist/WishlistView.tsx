"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useWishlist } from "@/components/WishlistProvider";
import { TourCard } from "@/components/TourCard";
import type { Tour } from "@/lib/types";

export function WishlistView({
  locale,
  tours
}: {
  locale: string;
  tours: Tour[];
}) {
  const t = useTranslations("wishlist");
  const { ids } = useWishlist();
  const saved = tours.filter((tour) => ids.includes(tour.slug));

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-nile-800/80">{t("subtitle")}</p>

      <div className="mt-10">
        {saved.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-sand-300 bg-white p-12 text-center">
            <p className="font-display text-2xl text-nile-900">{t("empty")}</p>
            <p className="mt-2 text-nile-700">{t("emptyBody")}</p>
            <Link href={`/${locale}/tours`} className="btn-primary mt-6">
              {t("browseTours")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
