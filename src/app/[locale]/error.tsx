"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const locale = useLocale();

  useEffect(() => {
    console.error("[route-error]", error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl" aria-hidden>
        ⚠️
      </p>
      <h1 className="mt-6 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-xl text-nile-800/80">{t("body")}</p>
      {error.digest && (
        <p className="mt-2 text-xs text-nile-500">ref: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => reset()} className="btn-primary">
          {t("retry")}
        </button>
        <Link href={`/${locale}`} className="btn-secondary">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
