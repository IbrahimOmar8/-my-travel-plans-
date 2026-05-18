"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Booking = {
  id: string;
  tourTitle: string;
  tourSlug: string;
  travelers: number;
  depositUSD: number;
  totalUSD: number;
  currency: string;
  status: string;
  createdAt: string;
};

export function MyTripForm() {
  const t = useTranslations("myTrip");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/my-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? t("error"));
        setStatus("error");
        return;
      }
      setBooking(body.booking);
      setStatus("ok");
    } catch {
      setError(t("error"));
      setStatus("error");
    }
  }

  if (status === "ok" && booking) {
    const statusBadge =
      booking.status === "paid"
        ? "bg-emerald-100 text-emerald-800"
        : booking.status === "pending"
          ? "bg-amber-100 text-amber-800"
          : "bg-slate-200 text-slate-700";

    return (
      <div className="mt-8 rounded-3xl border border-sand-200 bg-white p-6 shadow-sm md:p-8">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
              {t("bookingRef")}
            </p>
            <p className="mt-1 font-mono text-sm text-nile-700">{booking.id}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge}`}
          >
            {t(`status_${booking.status}`)}
          </span>
        </header>

        <h2 className="mt-4 font-display text-2xl font-semibold text-nile-900">
          {booking.tourTitle}
        </h2>

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-nile-600">{t("travelers")}</dt>
            <dd className="font-semibold text-nile-900">{booking.travelers}</dd>
          </div>
          <div>
            <dt className="text-nile-600">{t("booked")}</dt>
            <dd className="font-semibold text-nile-900">
              {new Date(booking.createdAt).toLocaleDateString("en-GB")}
            </dd>
          </div>
          <div>
            <dt className="text-nile-600">{t("deposit")}</dt>
            <dd className="font-semibold text-nile-900">
              ${booking.depositUSD.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-nile-600">{t("total")}</dt>
            <dd className="font-semibold text-nile-900">
              ${booking.totalUSD.toLocaleString()}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setBooking(null);
              setStatus("idle");
            }}
            className="text-sm font-semibold text-nile-700 hover:text-nile-800"
          >
            ← {t("lookupAnother")}
          </button>
          <a
            href={`mailto:hello@nilehorizons.example?subject=Booking ${booking.id}`}
            className="text-sm font-semibold text-nile-700 hover:text-nile-800"
          >
            {t("contactUs")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-3xl border border-sand-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="text-nile-800">{t("bookingId")}</span>
          <input
            required
            name="id"
            placeholder="cmp7…"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 font-mono text-sm focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-nile-800">{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {status === "loading" ? t("lookingUp") : t("lookUp")}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
      <p className="mt-3 text-xs text-nile-600">{t("hint")}</p>
    </form>
  );
}
