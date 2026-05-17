"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "nh:wishlist";

type Ctx = {
  ids: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  count: number;
};

const WishlistContext = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function persist(next: string[]) {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function toggle(slug: string) {
    if (ids.includes(slug)) {
      persist(ids.filter((s) => s !== slug));
    } else {
      persist([slug, ...ids]);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        ids,
        has: (slug) => ids.includes(slug),
        toggle,
        count: ids.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
