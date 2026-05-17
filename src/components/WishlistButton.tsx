"use client";

import { useTranslations } from "next-intl";
import { useWishlist } from "./WishlistProvider";

export function WishlistButton({
  tourSlug,
  variant = "ghost"
}: {
  tourSlug: string;
  variant?: "ghost" | "card";
}) {
  const t = useTranslations("wishlist");
  const { has, toggle } = useWishlist();
  const saved = has(tourSlug);

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(tourSlug);
        }}
        aria-label={saved ? t("remove") : t("add")}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow backdrop-blur transition hover:bg-white"
      >
        <span className={saved ? "text-red-500" : "text-nile-700"}>
          {saved ? "♥" : "♡"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(tourSlug)}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 px-4 py-2 text-sm font-semibold text-nile-700 hover:bg-sand-50"
    >
      <span className={saved ? "text-red-500" : ""}>{saved ? "♥" : "♡"}</span>
      {saved ? t("saved") : t("add")}
    </button>
  );
}
