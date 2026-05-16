import { useTranslations } from "next-intl";

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201000000000";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const message = encodeURIComponent(t("prefill"));
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("aria")}
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 sm:bottom-7 sm:right-7"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M16.001 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.55-1.71A12.78 12.78 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2zm6.7 18.13c-.28.78-1.62 1.5-2.25 1.58-.6.08-1.36.11-2.2-.14-.5-.15-1.16-.36-2-.71-3.5-1.5-5.78-5-5.96-5.23-.18-.23-1.42-1.88-1.42-3.59 0-1.7.89-2.54 1.21-2.89.32-.35.7-.44.93-.44.23 0 .47 0 .67.01.21.01.5-.08.78.6.28.7.95 2.4 1.03 2.57.08.18.14.39.03.62-.11.23-.16.36-.32.56-.16.2-.34.45-.49.6-.16.16-.33.34-.14.66.18.32.83 1.36 1.78 2.21 1.23 1.1 2.27 1.44 2.59 1.6.32.16.51.14.7-.08.18-.22.81-.94 1.03-1.27.21-.32.43-.27.71-.16.28.11 1.78.84 2.08.99.3.15.5.23.57.36.07.13.07.76-.21 1.54z" />
      </svg>
      <span className="hidden sm:inline">{t("label")}</span>
    </a>
  );
}
