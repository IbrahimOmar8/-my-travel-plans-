import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { search } from "@/lib/search";
import { type Locale } from "@/i18n/config";

type Params = {
  params: { locale: string };
  searchParams: { q?: string };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams
}: Params): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "search"
  });
  return {
    title: searchParams.q ? `${t("title")}: ${searchParams.q}` : t("title"),
    description: t("subtitle"),
    robots: { index: false }
  };
}

const kindLabel = {
  tour: { en: "Tour", ru: "Тур", tr: "Tur" },
  destination: { en: "Destination", ru: "Направление", tr: "Destinasyon" },
  post: { en: "Journal", ru: "Журнал", tr: "Günlük" }
} as const;

export default async function SearchPage({
  params,
  searchParams
}: Params) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "search" });
  const q = searchParams.q?.trim() ?? "";
  const results = q.length >= 2 ? await search(q, locale, 30) : [];

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {q ? `${t("resultsFor")} "${q}"` : t("title")}
      </h1>

      <form method="GET" className="mt-6 flex max-w-2xl gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 rounded-full border border-sand-200 bg-white px-5 py-3 text-sm focus:border-nile-500 focus:outline-none"
        />
        <button type="submit" className="btn-primary">
          {t("submit")}
        </button>
      </form>

      <div className="mt-10">
        {q.length < 2 && (
          <p className="text-sm text-nile-700">{t("typeAtLeast")}</p>
        )}

        {q.length >= 2 && results.length === 0 && (
          <p className="text-sm text-nile-700">{t("noResults")}</p>
        )}

        {results.length > 0 && (
          <p className="mb-4 text-sm text-nile-700">
            {t("matchCount", { count: results.length })}
          </p>
        )}

        <ul className="space-y-3">
          {results.map((hit) => (
            <li key={`${hit.kind}-${hit.slug}`}>
              <Link
                href={hit.href}
                className="flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={hit.image}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                    {kindLabel[hit.kind][locale]}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-nile-900">
                    {hit.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-nile-800/80">
                    {hit.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
