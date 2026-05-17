import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Tour } from "@/lib/types";
import { categoryLabel } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { Price } from "./Price";
import { WishlistButton } from "./WishlistButton";
import { CompareToggle } from "./CompareToggle";

export function TourCard({ tour }: { tour: Tour }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("tour");

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <WishlistButton tourSlug={tour.slug} variant="card" />
      <Link
        href={`/${locale}/tours/${tour.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-nile-800">
          {categoryLabel[tour.category][locale]}
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-nile-900/80 px-3 py-1 text-xs font-semibold text-white">
          {tour.durationDays} {t("day").toLowerCase()}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/${locale}/tours/${tour.slug}`}>
          <h3 className="font-display text-xl font-semibold text-nile-900 hover:text-nile-600">
            {tour.title[locale]}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-nile-800/80 line-clamp-2">
          {tour.summary[locale]}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-nile-700">
          <span aria-hidden>★</span>
          <span className="font-semibold">{tour.rating.toFixed(1)}</span>
          <span className="text-nile-600/70">
            ({tour.reviewCount} {t("reviews")})
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-sand-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-sand-600">
              {t("from")}
            </p>
            <Price
              usd={tour.priceUSD}
              className="font-display text-2xl font-semibold text-nile-800"
            />
          </div>
          <Link
            href={`/${locale}/tours/${tour.slug}`}
            className="text-sm font-semibold text-nile-600 hover:text-nile-700"
          >
            →
          </Link>
        </div>
        <div className="mt-3">
          <CompareToggle tourSlug={tour.slug} />
        </div>
      </div>
    </article>
  );
}
