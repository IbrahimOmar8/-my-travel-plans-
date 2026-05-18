"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function ReviewForm({ tourSlug }: { tourSlug: string }) {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tourSlug, rating, locale })
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setRating(5);
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-sand-200 bg-white p-6 text-center shadow-sm">
        <p className="font-display text-lg text-nile-900">{t("thanks")}</p>
        <p className="mt-1 text-sm text-nile-700">{t("thanksBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
    >
      <p className="font-display text-lg font-semibold text-nile-900">
        {t("writeTitle")}
      </p>

      <div className="mt-4 flex items-center gap-1 text-2xl">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            type="button"
            key={i}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className={`transition ${
              i <= (hover || rating)
                ? "text-amber-500"
                : "text-sand-300"
            }`}
            aria-label={`${i} stars`}
          >
            ★
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder={t("namePlaceholder")}
          className="rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm focus:border-nile-500 focus:outline-none"
        />
        <input
          name="country"
          placeholder={t("countryPlaceholder")}
          className="rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm focus:border-nile-500 focus:outline-none"
        />
        <input
          name="title"
          placeholder={t("titlePlaceholder")}
          className="rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm focus:border-nile-500 focus:outline-none sm:col-span-2"
        />
        <textarea
          required
          name="body"
          rows={4}
          placeholder={t("bodyPlaceholder")}
          className="rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm focus:border-nile-500 focus:outline-none sm:col-span-2"
        />
        <input
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          className="rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm focus:border-nile-500 focus:outline-none sm:col-span-2"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[10000px] h-0 w-0"
          aria-hidden="true"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-4 w-full disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      <p className="mt-2 text-xs text-nile-600">{t("moderation")}</p>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{t("error")}</p>
      )}
    </form>
  );
}
