"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source })
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className="text-sm text-sand-200">{t("thanks")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        className="min-w-0 flex-1 rounded-full border border-sand-200/30 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-sand-200/70 focus:border-sand-300 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-sand-300 px-4 py-2 text-sm font-semibold text-nile-900 transition hover:bg-sand-200 disabled:opacity-60"
      >
        {status === "sending" ? "…" : t("submit")}
      </button>
      {status === "error" && (
        <span className="text-xs text-red-200">{t("error")}</span>
      )}
    </form>
  );
}
