import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { InquiryForm } from "@/components/InquiryForm";

export default function ContactPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("contact");

  return (
    <section className="container-page py-16">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">{t("subtitle")}</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <InquiryForm />

        <aside className="space-y-6">
          <Card title={t("office")}>
            {t("officeAddress")}
            <br />
            {t("officeHours")}
          </Card>
          <Card title={t("whatsapp")}>
            <a
              className="font-semibold text-nile-600"
              href="https://wa.me/201000000000"
            >
              +20 100 000 0000
            </a>
          </Card>
          <Card title={t("email")}>
            <a
              className="font-semibold text-nile-600"
              href="mailto:hello@nilehorizons.example"
            >
              hello@nilehorizons.example
            </a>
          </Card>
          <Card title={t("trade")}>
            {t("tradeBody")}
            <br />
            <a
              className="font-semibold text-nile-600"
              href="mailto:trade@nilehorizons.example"
            >
              trade@nilehorizons.example
            </a>
          </Card>
        </aside>
      </div>
    </section>
  );
}

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
        {title}
      </p>
      <div className="mt-2 text-sm text-nile-800">{children}</div>
    </div>
  );
}
