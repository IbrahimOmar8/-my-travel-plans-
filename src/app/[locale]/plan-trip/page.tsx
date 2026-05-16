import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { TripBuilder } from "./TripBuilder";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "planTrip" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PlanTripPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (
    <div className="bg-sand-50">
      <section className="container-page py-14 md:py-20">
        <TripBuilder />
      </section>
    </div>
  );
}
