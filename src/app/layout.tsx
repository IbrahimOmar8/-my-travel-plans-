import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nile Horizons — Curated Tours of Egypt & the Middle East",
  description:
    "Hand-crafted small-group and private tours of Egypt, Jordan and the Red Sea. Licensed Egyptologist guides, 5★ Nile cruises, and 24/7 on-the-ground support.",
  metadataBase: new URL("https://nilehorizons.example"),
  openGraph: {
    title: "Nile Horizons",
    description:
      "Curated tours of Egypt and the Middle East with licensed guides and 24/7 support.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
