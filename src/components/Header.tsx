import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const nav = [
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand-100 bg-sand-50/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-nile-800">
            Nile<span className="text-sand-500">·</span>Horizons
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-nile-800 transition hover:text-nile-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href={`/${locale}/tours`}
            className="btn-primary hidden md:inline-flex"
          >
            {t("browseTours")}
          </Link>
        </div>
      </div>
    </header>
  );
}
