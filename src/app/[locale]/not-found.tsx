"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl" aria-hidden>
        🐪
      </p>
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-nile-800/80">{t("body")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/${locale}`} className="btn-primary">
          {t("cta")}
        </Link>
        <Link href={`/${locale}/tours`} className="btn-secondary">
          {t("ctaTours")}
        </Link>
        <Link
          href={`/${locale}/search`}
          className="rounded-full px-5 py-3 text-sm font-semibold text-nile-700 hover:bg-sand-100"
        >
          {t("ctaSearch")}
        </Link>
      </div>
    </section>
  );
}
