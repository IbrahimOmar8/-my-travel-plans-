import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SearchBar } from "./SearchBar";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nile-900/70 via-nile-900/40 to-sand-50" />

      <div className="container-page py-24 md:py-32 lg:py-40">
        <p className="eyebrow text-sand-200">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold text-white md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-sand-100">{t("subtitle")}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={`/${locale}/tours`} className="btn-primary">
            {t("ctaTours")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-nile-800"
          >
            {t("ctaContact")}
          </Link>
        </div>

        <div className="mt-16">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
