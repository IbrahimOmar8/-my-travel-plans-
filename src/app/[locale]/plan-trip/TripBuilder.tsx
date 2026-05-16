"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

const KEY = "nh:trip-draft";

type Draft = {
  destinations: string[];
  month: string;
  duration: string;
  style: string;
  travelers: number;
  kids: number;
  budget: string;
  name: string;
  email: string;
  notes: string;
};

const empty: Draft = {
  destinations: [],
  month: "",
  duration: "",
  style: "",
  travelers: 2,
  kids: 0,
  budget: "",
  name: "",
  email: "",
  notes: ""
};

export function TripBuilder() {
  const t = useTranslations("planTrip");
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDraft({ ...empty, ...JSON.parse(raw) });
    } catch {}
  }, []);

  function save(patch: Partial<Draft>) {
    const next = { ...draft, ...patch };
    setDraft(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  const destinations = ["Cairo", "Luxor", "Aswan", "Red Sea", "Jordan / Petra"];
  const months = [
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun"
  ];
  const durations = ["3-5 days", "6-8 days", "9-12 days", "13+ days"];
  const styles = ["cultural", "luxury", "family", "honeymoon", "adventure"];
  const budgets = ["<$1500/pp", "$1500-3000/pp", "$3000-5000/pp", "$5000+/pp"];

  const steps = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];

  async function submit() {
    setStatus("sending");
    track("Inquiry Submitted", { tour: "custom", source: "plan-trip" });
    const notesBlob = [
      `Trip designer brief:`,
      `Destinations: ${draft.destinations.join(", ") || "—"}`,
      `Month: ${draft.month}`,
      `Duration: ${draft.duration}`,
      `Style: ${draft.style}`,
      `Travelers: ${draft.travelers} adults, ${draft.kids} kids`,
      `Budget: ${draft.budget}`,
      "",
      draft.notes || "(no additional notes)"
    ].join("\n");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          email: draft.email,
          travelers: String(draft.travelers + draft.kids),
          notes: notesBlob,
          tourSlug: "custom",
          tourTitle: "Custom trip"
        })
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      try {
        localStorage.removeItem(KEY);
      } catch {}
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-sand-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-nile-100 text-3xl text-nile-700">
          ✓
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold text-nile-900">
          {t("doneTitle")}
        </h2>
        <p className="mt-3 text-nile-700">{t("doneBody")}</p>
        <a href={`/${locale}/tours`} className="btn-primary mt-6 inline-flex">
          {t("doneCta")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-lg text-nile-800/80">{t("subtitle")}</p>

      <ol className="mt-8 flex flex-wrap gap-2 text-xs">
        {steps.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-2 rounded-full px-3 py-1 ${
              i === step
                ? "bg-nile-600 text-white"
                : i < step
                  ? "bg-nile-100 text-nile-700"
                  : "bg-sand-100 text-nile-600"
            }`}
          >
            <span className="font-semibold">{i + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-3xl border border-sand-200 bg-white p-6 shadow-sm md:p-8">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-nile-900">
              {t("step1Title")}
            </legend>
            <p className="mt-1 text-sm text-nile-700">{t("step1Hint")}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {destinations.map((d) => (
                <label
                  key={d}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm ${
                    draft.destinations.includes(d)
                      ? "border-nile-600 bg-nile-50 font-semibold text-nile-900"
                      : "border-sand-200 hover:bg-sand-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={draft.destinations.includes(d)}
                    onChange={() =>
                      save({
                        destinations: draft.destinations.includes(d)
                          ? draft.destinations.filter((x) => x !== d)
                          : [...draft.destinations, d]
                      })
                    }
                  />
                  {d}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-nile-900">
              {t("step2Title")}
            </legend>
            <p className="mt-1 text-sm text-nile-700">{t("step2Hint")}</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                  {t("month")}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {months.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => save({ month: m })}
                      className={`rounded-full border px-4 py-1.5 text-sm ${
                        draft.month === m
                          ? "border-nile-600 bg-nile-600 text-white"
                          : "border-sand-200 hover:bg-sand-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                  {t("duration")}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => save({ duration: d })}
                      className={`rounded-full border px-4 py-1.5 text-sm ${
                        draft.duration === d
                          ? "border-nile-600 bg-nile-600 text-white"
                          : "border-sand-200 hover:bg-sand-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-nile-900">
              {t("step3Title")}
            </legend>
            <p className="mt-1 text-sm text-nile-700">{t("step3Hint")}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {styles.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => save({ style: s })}
                  className={`rounded-xl border px-4 py-3 text-left text-sm ${
                    draft.style === s
                      ? "border-nile-600 bg-nile-50 font-semibold text-nile-900"
                      : "border-sand-200 hover:bg-sand-50"
                  }`}
                >
                  {t(`style_${s}`)}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-nile-900">
              {t("step4Title")}
            </legend>
            <p className="mt-1 text-sm text-nile-700">{t("step4Hint")}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-nile-800">{t("adults")}</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={draft.travelers}
                  onChange={(e) =>
                    save({ travelers: Math.max(1, Number(e.target.value)) })
                  }
                  className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-nile-800">{t("kids")}</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={draft.kids}
                  onChange={(e) =>
                    save({ kids: Math.max(0, Number(e.target.value)) })
                  }
                  className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
                />
              </label>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                {t("budget")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => save({ budget: b })}
                    className={`rounded-full border px-4 py-1.5 text-sm ${
                      draft.budget === b
                        ? "border-nile-600 bg-nile-600 text-white"
                        : "border-sand-200 hover:bg-sand-50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-nile-900">
              {t("step5Title")}
            </legend>
            <p className="mt-1 text-sm text-nile-700">{t("step5Hint")}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-nile-800">{t("name")}</span>
                <input
                  required
                  value={draft.name}
                  onChange={(e) => save({ name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-nile-800">{t("email")}</span>
                <input
                  required
                  type="email"
                  value={draft.email}
                  onChange={(e) => save({ email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-nile-800">{t("anythingElse")}</span>
                <textarea
                  rows={4}
                  value={draft.notes}
                  onChange={(e) => save({ notes: e.target.value })}
                  placeholder={t("notesPlaceholder")}
                  className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
                />
              </label>
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-sand-200 pt-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm font-semibold text-nile-700 disabled:opacity-40"
          >
            ← {t("back")}
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary"
            >
              {t("next")}
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending" || !draft.name || !draft.email}
              className="btn-primary disabled:opacity-60"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          )}
        </div>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{t("error")}</p>
        )}
      </div>
    </div>
  );
}
