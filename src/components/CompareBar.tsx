"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCompare } from "./CompareProvider";
import { tours } from "@/data/tours";
import type { Locale } from "@/i18n/config";

export function CompareBar() {
  const t = useTranslations("compare");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { ids, toggle, clear, count } = useCompare();

  if (count === 0) return null;

  const selected = ids
    .map((slug) => tours.find((x) => x.slug === slug))
    .filter(Boolean) as typeof tours;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white/95 px-4 py-3 backdrop-blur sm:left-auto sm:right-5 sm:bottom-24 sm:w-[420px] sm:rounded-2xl sm:border sm:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
          {t("barTitle", { count })}
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-medium text-nile-600 hover:text-nile-700"
        >
          {t("clear")}
        </button>
      </div>
      <ul className="mt-2 grid gap-2">
        {selected.map((tour) => (
          <li
            key={tour.slug}
            className="flex items-center gap-3 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2"
          >
            <img
              src={tour.image}
              alt=""
              className="h-10 w-10 shrink-0 rounded-md object-cover"
            />
            <p className="flex-1 truncate text-sm font-medium text-nile-900">
              {tour.title[locale]}
            </p>
            <button
              type="button"
              onClick={() => toggle(tour.slug)}
              aria-label={t("removeAria")}
              className="text-nile-500 hover:text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={count < 2}
        onClick={() =>
          router.push(`/${locale}/compare?tours=${ids.join(",")}`)
        }
        className="btn-primary mt-3 w-full disabled:opacity-50"
      >
        {count < 2 ? t("addAnother") : t("compareNow", { count })}
      </button>
    </div>
  );
}
