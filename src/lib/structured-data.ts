import type { Tour, Destination } from "./types";
import type { Locale } from "@/i18n/config";
import type { ReviewAggregate, Review } from "./reviews";
import { siteUrl, siteName } from "./site";

export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description:
      "Curated small-group and private tours of Egypt, Jordan and the Red Sea.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 Talaat Harb St., Downtown",
      addressLocality: "Cairo",
      addressCountry: "EG"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+20 100 000 0000",
      availableLanguage: ["en", "ru", "tr", "ar"]
    },
    sameAs: []
  };
}

export function breadcrumbLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  };
}

export function tourLd(
  tour: Tour,
  locale: Locale,
  aggregate: ReviewAggregate,
  reviews: Review[]
) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title[locale],
    description: tour.summary[locale],
    url: `${siteUrl}/${locale}/tours/${tour.slug}`,
    image: tour.image,
    touristType: tour.category,
    offers: {
      "@type": "Offer",
      price: tour.priceUSD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/${locale}/tours/${tour.slug}`
    },
    provider: { "@type": "TravelAgency", name: siteName, url: siteUrl }
  };

  if (aggregate.count > 0) {
    base.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregate.average,
      reviewCount: aggregate.count,
      bestRating: 5,
      worstRating: 1
    };
  }

  if (reviews.length > 0) {
    base.review = reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5
      },
      author: { "@type": "Person", name: r.name },
      datePublished: r.createdAt.toISOString().slice(0, 10),
      reviewBody: r.body,
      name: r.title || undefined
    }));
  }

  return base;
}

export function blogPostingLd(post: {
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  author: string;
  slug: string;
  locale: Locale;
}) {
  const url = `${siteUrl}/${post.locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` }
    },
    mainEntityOfPage: url
  };
}

export function destinationLd(d: Destination, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name[locale],
    description: d.description[locale],
    image: d.heroImage,
    address: {
      "@type": "PostalAddress",
      addressCountry: d.country[locale]
    },
    url: `${siteUrl}/${locale}/destinations/${d.slug}`
  };
}
