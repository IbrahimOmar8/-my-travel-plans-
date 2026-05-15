import { useTranslations } from "next-intl";

export function WhyUs() {
  const t = useTranslations("whyUs");
  const features = [
    { title: t("guides"), body: t("guidesBody") },
    { title: t("hotels"), body: t("hotelsBody") },
    { title: t("groups"), body: t("groupsBody") },
    { title: t("support"), body: t("supportBody") },
    { title: t("pricing"), body: t("pricingBody") },
    { title: t("flexible"), body: t("flexibleBody") }
  ];

  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold text-nile-800">
              {f.title}
            </h3>
            <p className="mt-2 text-sm text-nile-800/80">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
