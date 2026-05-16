import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { HeaderSearch } from "./HeaderSearch";
import { WishlistHeaderLink } from "./WishlistHeaderLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const nav = [
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/blog`, label: t("journal") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand-100 bg-sand-50/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-nile-800 sm:text-2xl">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderSearch />
          <WishlistHeaderLink />
          <div className="hidden sm:block">
            <CurrencySwitcher />
          </div>
          <LocaleSwitcher />
          <Link
            href={`/${locale}/tours`}
            className="btn-primary hidden md:inline-flex"
          >
            {t("browseTours")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
