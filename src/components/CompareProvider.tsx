"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "nh:compare";
const MAX = 3;

type Ctx = {
  ids: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
  count: number;
  full: boolean;
};

const CompareContext = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);

  function persist(next: string[]) {
    setIds(next);
    try {
      sessionStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function toggle(slug: string) {
    if (ids.includes(slug)) {
      persist(ids.filter((s) => s !== slug));
    } else if (ids.length < MAX) {
      persist([...ids, slug]);
    }
  }

  return (
    <CompareContext.Provider
      value={{
        ids,
        has: (slug) => ids.includes(slug),
        toggle,
        clear: () => persist([]),
        count: ids.length,
        full: ids.length >= MAX
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
