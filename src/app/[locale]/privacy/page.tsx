import { unstable_setRequestLocale, getTranslations } from "next-intl/server";

type Params = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Params) {
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrivacyPage({ params: { locale } }: Params) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <h1 className="font-display text-4xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 text-nile-800/90">{t("intro")}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-nile-900">
        {t("collectTitle")}
      </h2>
      <p className="mt-3 text-nile-800/90">{t("collectBody")}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-nile-900">
        {t("analyticsTitle")}
      </h2>
      <p className="mt-3 text-nile-800/90">{t("analyticsBody")}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-nile-900">
        {t("storageTitle")}
      </h2>
      <p className="mt-3 text-nile-800/90">{t("storageBody")}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-nile-900">
        {t("contactTitle")}
      </h2>
      <p className="mt-3 text-nile-800/90">{t("contactBody")}</p>
    </article>
  );
}
