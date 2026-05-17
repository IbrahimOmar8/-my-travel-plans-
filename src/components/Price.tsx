"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";

export function Price({ usd, className }: { usd: number; className?: string }) {
  const { currency } = useCurrency();
  return <span className={className}>{formatPrice(usd, currency)}</span>;
}
