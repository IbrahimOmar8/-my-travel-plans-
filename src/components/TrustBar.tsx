import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trustBar");

  const items = [
    { stat: "12,400+", label: t("happy") },
    { stat: "4.9 / 5", label: t("rating") },
    { stat: "24 / 7", label: t("support") },
    { stat: "100 %", label: t("guides") }
  ];

  return (
    <section className="bg-nile-800 py-10 text-white">
      <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-3xl font-semibold">{item.stat}</p>
            <p className="mt-1 text-sm text-sand-200">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
