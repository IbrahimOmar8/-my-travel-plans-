import Link from "next/link";
import { notFound } from "next/navigation";
import {
  unstable_setRequestLocale,
  getTranslations
} from "next-intl/server";
import { tours, getTour } from "@/data/tours";
import { categoryLabel } from "@/lib/types";
import { aggregateForTour } from "@/lib/reviews";
import { Price } from "@/components/Price";
import type { Locale } from "@/i18n/config";

type Props = {
  params: { locale: string };
  searchParams: { tours?: string };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "compare" });
  return { title: t("pageTitle"), robots: { index: false } };
}

export default async function ComparePage({ params, searchParams }: Props) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "compare" });
  const tTour = await getTranslations({ locale, namespace: "tour" });

  const slugs = (searchParams.tours ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const selected = slugs.map((s) => getTour(s)).filter(Boolean) as typeof tours;
  const aggregates = await Promise.all(
    selected.map(async (t) => ({
      slug: t.slug,
      data: await aggregateForTour(t.slug)
    }))
  );

  if (selected.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-nile-900">
          {t("pageTitle")}
        </h1>
        <p className="mt-3 text-nile-700">{t("emptyBody")}</p>
        <Link href={`/${locale}/tours`} className="btn-primary mt-6">
          {t("browseTours")}
        </Link>
      </div>
    );
  }

  function getAgg(slug: string) {
    return aggregates.find((a) => a.slug === slug)?.data;
  }

  const rows: Array<{
    label: string;
    render: (tour: (typeof tours)[number]) => React.ReactNode;
  }> = [
    {
      label: t("rowDuration"),
      render: (tour) => (
        <span>
          {tour.durationDays} {tTour("day").toLowerCase()}
        </span>
      )
    },
    {
      label: t("rowCategory"),
      render: (tour) => categoryLabel[tour.category][locale]
    },
    {
      label: t("rowGroupSize"),
      render: (tour) => tour.groupSize[locale]
    },
    {
      label: t("rowPrice"),
      render: (tour) => <Price usd={tour.priceUSD} />
    },
    {
      label: t("rowRating"),
      render: (tour) => {
        const a = getAgg(tour.slug);
        if (a && a.count > 0) {
          return `★ ${a.average.toFixed(1)} (${a.count})`;
        }
        return `★ ${tour.rating.toFixed(1)} (${tour.reviewCount})`;
      }
    },
    {
      label: t("rowHighlights"),
      render: (tour) => (
        <ul className="space-y-1 text-sm">
          {tour.highlights[locale].slice(0, 4).map((h) => (
            <li key={h} className="flex items-start gap-1">
              <span className="text-sand-500">•</span> {h}
            </li>
          ))}
        </ul>
      )
    },
    {
      label: t("rowIncludes"),
      render: (tour) => (
        <ul className="space-y-1 text-sm">
          {tour.includes[locale].slice(0, 4).map((i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-nile-500">✓</span> {i}
            </li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div className="container-page py-12 md:py-16">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-nile-900 md:text-4xl">
        {t("pageTitle")}
      </h1>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 rounded-2xl bg-white shadow-sm ring-1 ring-sand-200">
          <thead>
            <tr>
              <th className="w-32 border-b border-sand-200 bg-sand-50 p-4 text-left text-xs font-semibold uppercase tracking-wider text-sand-600"></th>
              {selected.map((tour) => (
                <th
                  key={tour.slug}
                  className="border-b border-sand-200 bg-sand-50 p-4 text-left align-top"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-lg">
                    <img
                      src={tour.image}
                      alt={tour.title[locale]}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Link
                    href={`/${locale}/tours/${tour.slug}`}
                    className="mt-3 block font-display text-lg font-semibold text-nile-900 hover:text-nile-600"
                  >
                    {tour.title[locale]}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label}>
                <th
                  className={`p-4 text-left align-top text-xs font-semibold uppercase tracking-wider text-sand-600 ${
                    i < rows.length - 1 ? "border-b border-sand-100" : ""
                  }`}
                >
                  {row.label}
                </th>
                {selected.map((tour) => (
                  <td
                    key={tour.slug}
                    className={`p-4 align-top text-sm text-nile-800 ${
                      i < rows.length - 1 ? "border-b border-sand-100" : ""
                    }`}
                  >
                    {row.render(tour)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th></th>
              {selected.map((tour) => (
                <td key={tour.slug} className="p-4 align-top">
                  <Link
                    href={`/${locale}/tours/${tour.slug}`}
                    className="btn-primary inline-flex w-full justify-center"
                  >
                    {t("viewTour")}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
