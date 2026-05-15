export type Destination = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  heroImage: string;
  highlights: string[];
  bestSeason: string;
};

export type TourCategory =
  | "Cultural"
  | "Adventure"
  | "Beach"
  | "Cruise"
  | "Luxury"
  | "Family";

export type Tour = {
  slug: string;
  title: string;
  destinationSlug: string;
  category: TourCategory;
  durationDays: number;
  groupSize: string;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  summary: string;
  image: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; details: string }[];
};

export type Testimonial = {
  name: string;
  country: string;
  tourSlug: string;
  rating: number;
  quote: string;
  avatar: string;
};
