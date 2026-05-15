"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <section className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 text-nile-800/80">{t("body")}</p>
      <Link href={`/${locale}`} className="btn-primary mt-8">
        {t("cta")}
      </Link>
    </section>
  );
}
