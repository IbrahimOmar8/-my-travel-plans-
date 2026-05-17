import Link from "next/link";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { BookingCancelledTracker } from "@/components/BookingCancelledTracker";

export default function CancelPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("booking");

  return (
    <section className="container-page py-24 text-center">
      <BookingCancelledTracker />
      <h1 className="font-display text-4xl font-semibold text-nile-900">
        {t("cancelTitle")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-nile-800/80">{t("cancelBody")}</p>
      <Link href={`/${locale}/contact`} className="btn-primary mt-8">
        {t("cancelCta")}
      </Link>
    </section>
  );
}
