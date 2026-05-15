import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function AboutPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("about");

  return (
    <>
      <section className="container-page py-16">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl font-semibold text-nile-900">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-nile-800/85">{t("intro")}</p>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <Stat label={t("statTours")} value="2,800+" />
          <Stat label={t("statRepeat")} value="62 %" />
          <Stat label={t("statResponse")} value="< 4 h" />
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-3xl font-semibold text-nile-900">
          {t("howTitle")}
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <Step n={1} title={t("step1")} body={t("step1Body")} />
          <Step n={2} title={t("step2")} body={t("step2Body")} />
          <Step n={3} title={t("step3")} body={t("step3Body")} />
        </ol>

        <div className="mt-16 rounded-3xl bg-nile-800 p-10 text-white">
          <h3 className="font-display text-3xl font-semibold">
            {t("ctaTitle")}
          </h3>
          <p className="mt-2 max-w-2xl text-sand-100">{t("ctaBody")}</p>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary mt-6 bg-sand-300 text-nile-900 hover:bg-sand-200"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-5xl font-semibold text-nile-800">
        {value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wider text-sand-600">
        {label}
      </p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
      <span className="font-display text-4xl font-semibold text-sand-400">
        0{n}
      </span>
      <h3 className="mt-2 font-display text-xl font-semibold text-nile-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-nile-800/80">{body}</p>
    </li>
  );
}
