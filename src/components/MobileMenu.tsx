"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function MobileMenu() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") }
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 bg-white text-nile-800 md:hidden"
      >
        <span className="flex flex-col gap-1">
          <span className={`block h-0.5 w-4 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-4 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-x-0 top-16 z-40 border-b border-sand-200 bg-sand-50 shadow-lg md:hidden"
          onClick={() => setOpen(false)}
        >
          <nav className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-sand-100 py-3 text-base font-medium text-nile-800 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/tours`}
              className="btn-primary mt-4"
            >
              {t("browseTours")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
