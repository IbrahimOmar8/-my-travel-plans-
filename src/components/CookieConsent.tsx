"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const KEY = "nh:cookie-consent";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const id = window.setTimeout(() => setOpen(true), 800);
        return () => window.clearTimeout(id);
      }
    } catch {
      // ignore
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:bottom-5">
      <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-sand-200 bg-white p-4 shadow-xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-nile-800">
          {t("body")}{" "}
          <a
            href="/en/privacy"
            className="font-semibold text-nile-600 hover:text-nile-700"
          >
            {t("learnMore")}
          </a>
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-primary shrink-0"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
