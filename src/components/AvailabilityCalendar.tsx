"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Avail = { date: string; seatsLeft: number };

export function AvailabilityCalendar({ departures }: { departures: Avail[] }) {
  const t = useTranslations("availability");
  const locale = useLocale();

  const months = useMemo(() => {
    const set = new Map<string, Avail[]>();
    for (const d of departures) {
      const key = d.date.slice(0, 7);
      if (!set.has(key)) set.set(key, []);
      set.get(key)!.push(d);
    }
    return [...set.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  }, [departures]);

  const [monthIndex, setMonthIndex] = useState(0);

  if (months.length === 0) {
    return (
      <p className="rounded-2xl border border-sand-200 bg-white p-5 text-sm text-nile-700 shadow-sm">
        {t("empty")}
      </p>
    );
  }

  const [monthKey, list] = months[monthIndex];
  const [year, month] = monthKey.split("-").map(Number);
  const monthDate = new Date(year, month - 1, 1);
  const monthLabel = new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-GB",
    { month: "long", year: "numeric" }
  ).format(monthDate);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const cells: Array<{ day: number | null; avail?: Avail }> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ day: null });
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const avail = list.find((x) => x.date === iso);
    cells.push({ day, avail });
  }

  const weekdays =
    locale === "ru"
      ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
      : locale === "tr"
        ? ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
          disabled={monthIndex === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 text-nile-700 disabled:opacity-40"
          aria-label={t("prev")}
        >
          ‹
        </button>
        <p className="font-display text-lg font-semibold text-nile-900">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
          disabled={monthIndex === months.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 text-nile-700 disabled:opacity-40"
          aria-label={t("next")}
        >
          ›
        </button>
      </header>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-nile-700">
        {weekdays.map((w) => (
          <div key={w} className="py-1 font-medium">
            {w}
          </div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg p-1 text-sm ${
              !c.day
                ? ""
                : c.avail
                  ? "bg-nile-50 font-semibold text-nile-800 ring-1 ring-nile-200"
                  : "text-nile-400"
            }`}
          >
            {c.day ?? ""}
            {c.avail && (
              <div className="mt-0.5 text-[10px] font-normal text-nile-600">
                {c.avail.seatsLeft} {t("seats")}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-nile-600">
        <span className="inline-block h-3 w-3 rounded bg-nile-50 ring-1 ring-nile-200" />
        {t("legend")}
      </p>
    </section>
  );
}
