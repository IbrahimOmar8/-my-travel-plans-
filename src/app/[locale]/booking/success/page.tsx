import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function SuccessPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("booking");

  return (
    <section className="container-page py-24 text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-nile-100 text-3xl text-nile-700">
        ✓
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-nile-900">
        {t("successTitle")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-nile-800/80">
        {t("successBody")}
      </p>
      <Link href={`/${locale}/tours`} className="btn-primary mt-8">
        {t("successCta")}
      </Link>
    </section>
  );
}
