import { useTranslations } from "next-intl";
import { jsonLd } from "@/lib/structured-data";

export type FAQItem = { q: string; a: string };

export function FAQ({
  items,
  titleKey = "faqTitle"
}: {
  items: FAQItem[];
  titleKey?: string;
}) {
  const t = useTranslations("tour");
  return (
    <section className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm md:p-10">
      <h2 className="font-display text-2xl font-semibold text-nile-900">
        {t(titleKey)}
      </h2>
      <div className="mt-6 divide-y divide-sand-200">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-nile-900 hover:text-nile-600">
              <span>{item.q}</span>
              <span className="text-sand-500 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-nile-800/90">
              {item.a}
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a }
            }))
          })
        }}
      />
    </section>
  );
}
