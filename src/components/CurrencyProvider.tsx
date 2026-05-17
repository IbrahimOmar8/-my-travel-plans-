"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  type Currency,
  defaultCurrencyForLocale,
  isCurrency
} from "@/lib/currency";

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({
  locale,
  children
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>(
    defaultCurrencyForLocale(locale)
  );

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)currency=([^;]+)/);
    if (match && isCurrency(match[1])) {
      setCurrencyState(match[1]);
    }
  }, []);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    document.cookie = `currency=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return ctx;
}
