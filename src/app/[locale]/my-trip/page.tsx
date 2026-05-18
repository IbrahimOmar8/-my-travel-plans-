import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { MyTripForm } from "./MyTripForm";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "myTrip" });
  return { title: t("title"), robots: { index: false } };
}

export default async function MyTripPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "myTrip" });

  return (
    <div className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-nile-900 md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-nile-800/80">{t("subtitle")}</p>
        <MyTripForm />
      </div>
    </div>
  );
}
