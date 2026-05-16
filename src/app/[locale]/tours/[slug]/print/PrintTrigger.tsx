"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export function PrintTrigger() {
  const t = useTranslations("tour");

  useEffect(() => {
    const id = window.setTimeout(() => window.print(), 600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="mb-6 flex items-center justify-between print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-nile-700 hover:bg-sand-50"
      >
        🖨 {t("printIt")}
      </button>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-nile-600 hover:text-nile-700"
      >
        ← {t("backToTour")}
      </button>
    </div>
  );
}
