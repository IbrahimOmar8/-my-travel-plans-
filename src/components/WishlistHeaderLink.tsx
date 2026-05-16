"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useWishlist } from "./WishlistProvider";

export function WishlistHeaderLink() {
  const locale = useLocale();
  const { count } = useWishlist();

  return (
    <Link
      href={`/${locale}/wishlist`}
      aria-label="Wishlist"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 bg-white text-nile-800 hover:bg-sand-100"
    >
      <span className="text-base">♡</span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-nile-600 px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
