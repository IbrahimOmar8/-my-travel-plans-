"use client";

import { currencies } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as typeof currency)}
      aria-label="Currency"
      className="rounded-full border border-sand-200 bg-white px-3 py-1.5 text-sm font-medium text-nile-800 shadow-sm focus:border-nile-500 focus:outline-none"
    >
      {currencies.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
