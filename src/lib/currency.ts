export type Currency = "USD" | "EUR" | "RUB" | "TRY";

export const currencies: Currency[] = ["USD", "EUR", "RUB", "TRY"];

/**
 * Approximate FX rates from USD (May 2026 ballpark).
 * Replace with a live FX provider call in production.
 */
export const currencyInfo: Record<
  Currency,
  { symbol: string; rate: number; locale: string; minorUnit: number }
> = {
  USD: { symbol: "$", rate: 1, locale: "en-US", minorUnit: 1 },
  EUR: { symbol: "€", rate: 0.92, locale: "de-DE", minorUnit: 1 },
  RUB: { symbol: "₽", rate: 90, locale: "ru-RU", minorUnit: 100 },
  TRY: { symbol: "₺", rate: 35, locale: "tr-TR", minorUnit: 50 }
};

export function convertFromUSD(usd: number, target: Currency): number {
  return usd * currencyInfo[target].rate;
}

export function formatPrice(usd: number, target: Currency): string {
  const value = convertFromUSD(usd, target);
  const info = currencyInfo[target];
  const rounded = Math.round(value / info.minorUnit) * info.minorUnit;
  return new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: target,
    maximumFractionDigits: 0
  }).format(rounded);
}

export function defaultCurrencyForLocale(locale: string): Currency {
  if (locale === "ru") return "RUB";
  if (locale === "tr") return "TRY";
  return "USD";
}

export function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === "string" &&
    (currencies as readonly string[]).includes(value)
  );
}
