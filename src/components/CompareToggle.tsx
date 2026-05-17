"use client";

import { useTranslations } from "next-intl";
import { useCompare } from "./CompareProvider";

export function CompareToggle({ tourSlug }: { tourSlug: string }) {
  const t = useTranslations("compare");
  const { has, toggle, full } = useCompare();
  const active = has(tourSlug);
  const disabled = !active && full;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) toggle(tourSlug);
      }}
      disabled={disabled}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
        active
          ? "border-nile-600 bg-nile-600 text-white"
          : "border-sand-200 text-nile-700 hover:bg-sand-50"
      }`}
    >
      <span>⇄</span>
      {active ? t("added") : disabled ? t("max") : t("add")}
    </button>
  );
}
