"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

export function HeaderSearch() {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const query = q.trim();
    if (query.length < 2) return;
    router.push(`/${locale}/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
    setQ("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openSearch")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 bg-white text-nile-800 hover:bg-sand-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6Z"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-white p-2 shadow-xl"
          >
            <div className="flex items-center gap-2 px-3 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 text-nile-600"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6Z"
                />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={q.trim().length < 2}
                className="rounded-full bg-nile-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-nile-700 disabled:opacity-50"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
