"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { destinations } from "@/data/destinations";
import type { Locale } from "@/i18n/config";

export function SearchBar() {
  const t = useTranslations("search");
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (travelers) params.set("travelers", travelers);
    router.push(`/${locale}/tours?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_auto] lg:items-end"
    >
      <label className="block text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-nile-700">
          {t("destination")}
        </span>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-nile-900 focus:border-nile-500 focus:outline-none"
        >
          <option value="">{t("anywhere")}</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name[locale]} — {d.country[locale]}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-nile-700">
          {t("date")}
        </span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-nile-900 focus:border-nile-500 focus:outline-none"
        />
      </label>

      <label className="block text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-nile-700">
          {t("travelers")}
        </span>
        <input
          type="number"
          min={1}
          max={20}
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-nile-900 focus:border-nile-500 focus:outline-none"
        />
      </label>

      <button type="submit" className="btn-primary h-[42px]">
        {t("submit")}
      </button>
    </form>
  );
}
