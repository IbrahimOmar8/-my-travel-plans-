import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  unstable_setRequestLocale,
  getMessages,
  getTranslations
} from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { CompareProvider } from "@/components/CompareProvider";
import { Analytics } from "@/components/Analytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CompareBar } from "@/components/CompareBar";
import { CookieConsent } from "@/components/CookieConsent";
import { organizationLd, jsonLd } from "@/lib/structured-data";
import { locales, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Nile Horizons",
      template: "%s · Nile Horizons"
    },
    description: t("subtitle"),
    applicationName: "Nile Horizons",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Nile Horizons"
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`]))
    },
    openGraph: {
      type: "website",
      title: "Nile Horizons",
      description: t("subtitle"),
      url: `${siteUrl}/${locale}`,
      siteName: "Nile Horizons",
      locale: locale === "en" ? "en_US" : locale === "ru" ? "ru_RU" : "tr_TR"
    }
  };
}

export const viewport: Viewport = {
  themeColor: "#0f2039",
  width: "device-width",
  initialScale: 1
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd()) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CurrencyProvider locale={locale}>
            <WishlistProvider>
              <CompareProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CompareBar />
                <WhatsAppButton />
                <CookieConsent />
              </CompareProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
