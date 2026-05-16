import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tNews = useTranslations("newsletter");
  const locale = useLocale();

  return (
    <footer className="mt-24 border-t border-sand-200 bg-nile-900 text-sand-100">
      <div className="container-page border-b border-nile-800 py-10">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">
              {tNews("title")}
            </h3>
            <p className="mt-1 text-sm text-sand-200">{tNews("subtitle")}</p>
          </div>
          <NewsletterForm source="footer" />
        </div>
      </div>
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-semibold">
            Nile<span className="text-sand-300">·</span>Horizons
          </h3>
          <p className="mt-3 text-sm text-sand-200">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            {t("explore")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/destinations`}>{tNav("destinations")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/tours`}>{tNav("tours")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`}>{tNav("journal")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/about`}>{tNav("about")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`}>{tNav("contact")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            {t("contact")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Cairo: +20 2 1234 5678</li>
            <li>WhatsApp 24/7: +20 100 000 0000</li>
            <li>hello@nilehorizons.example</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            {t("trust")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>IATA accredited #00-0 0000 0</li>
            <li>Egyptian Tourism Authority licensed</li>
            <li>Secure SSL payments</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-nile-800 py-5 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} Nile Horizons. {t("rights")}
      </div>
    </footer>
  );
}
