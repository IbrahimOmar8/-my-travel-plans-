"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

type Props = {
  tourTitle?: string;
  tourSlug?: string;
};

export function InquiryForm({ tourTitle, tourSlug }: Props) {
  const t = useTranslations("form");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, tourSlug, tourTitle })
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      track("Inquiry Submitted", {
        tour: tourSlug ?? "general",
        source: tourTitle ? "tour-page" : "contact-page"
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
    >
      <h3 className="font-display text-2xl font-semibold text-nile-900">
        {t("title")}
      </h3>
      {tourTitle && (
        <p className="mt-1 text-sm text-nile-700/80">
          {t("for")} {tourTitle}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-nile-800">{t("name")}</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-nile-800">{t("email")}</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-nile-800">{t("country")}</span>
          <input
            name="country"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-nile-800">{t("travelers")}</span>
          <input
            type="number"
            name="travelers"
            min={1}
            defaultValue={2}
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-nile-800">{t("date")}</span>
          <input
            type="date"
            name="date"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-nile-800">{t("notes")}</span>
          <textarea
            name="notes"
            rows={4}
            className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 focus:border-nile-500 focus:outline-none"
            placeholder={t("notesPlaceholder")}
          />
        </label>
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
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "ok" && (
        <p className="mt-3 text-sm text-nile-700">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{t("error")}</p>
      )}
    </form>
  );
}
