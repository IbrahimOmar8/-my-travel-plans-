import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";
import type { Locale } from "@/i18n/config";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as Locale;

  return (
    <section className="bg-sand-100 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((te) => (
            <figure
              key={te.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${te.avatar})` }}
                />
                <div>
                  <p className="font-semibold text-nile-900">{te.name}</p>
                  <p className="text-xs text-nile-700/70">
                    {te.country[locale]}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-sand-500" aria-label={`${te.rating} stars`}>
                {"★".repeat(te.rating)}
                <span className="text-sand-200">{"★".repeat(5 - te.rating)}</span>
              </div>

              <blockquote className="mt-3 flex-1 text-sm text-nile-800/90">
                “{te.quote[locale]}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
