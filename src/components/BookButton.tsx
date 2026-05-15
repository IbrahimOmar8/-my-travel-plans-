"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency } from "./CurrencyProvider";

type Props = {
  tourSlug: string;
  travelers?: number;
};

export function BookButton({ tourSlug, travelers = 2 }: Props) {
  const t = useTranslations("tour");
  const locale = useLocale();
  const { currency } = useCurrency();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourSlug, travelers, locale, currency })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed");
        setLoading(false);
      }
    } catch {
      alert("Network error");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="btn-primary mt-3 w-full disabled:opacity-60"
    >
      {loading ? "..." : t("bookNow")}
    </button>
  );
}
