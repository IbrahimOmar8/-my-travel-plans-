import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

export default function DestinationsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("destinationsPage");

  return (
    <section className="container-page py-16">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">{t("subtitle")}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <DestinationCard key={d.slug} destination={d} />
        ))}
      </div>
    </section>
  );
}
