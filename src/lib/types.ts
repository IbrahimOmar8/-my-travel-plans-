import type { Locale } from "@/i18n/config";

export type LocalizedString = Record<Locale, string>;
export type LocalizedArray = Record<Locale, string[]>;

export type Destination = {
  slug: string;
  country: LocalizedString;
  bestSeason: LocalizedString;
  heroImage: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedArray;
};

export type TourCategory =
  | "Cultural"
  | "Adventure"
  | "Beach"
  | "Cruise"
  | "Luxury"
  | "Family";

export type ItineraryDay = {
  day: number;
  title: LocalizedString;
  details: LocalizedString;
};

export type Tour = {
  slug: string;
  destinationSlug: string;
  category: TourCategory;
  durationDays: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  image: string;
  groupSize: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  highlights: LocalizedArray;
  includes: LocalizedArray;
  excludes: LocalizedArray;
  itinerary: ItineraryDay[];
};

export type Testimonial = {
  name: string;
  country: LocalizedString;
  tourSlug: string;
  rating: number;
  quote: LocalizedString;
  avatar: string;
};

export const categoryLabel: Record<TourCategory, LocalizedString> = {
  Cultural: { en: "Cultural", ru: "Культурный", tr: "Kültürel" },
  Adventure: { en: "Adventure", ru: "Приключение", tr: "Macera" },
  Beach: { en: "Beach", ru: "Пляжный", tr: "Plaj" },
  Cruise: { en: "Cruise", ru: "Круиз", tr: "Yelken" },
  Luxury: { en: "Luxury", ru: "Люкс", tr: "Lüks" },
  Family: { en: "Family", ru: "Семейный", tr: "Aile" }
};
