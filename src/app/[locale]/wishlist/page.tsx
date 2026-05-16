import { unstable_setRequestLocale } from "next-intl/server";
import { tours } from "@/data/tours";
import { WishlistView } from "./WishlistView";

export const metadata = { title: "Wishlist" };

export default function WishlistPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <WishlistView
      locale={locale}
      tours={tours.map((t) => ({
        slug: t.slug,
        title: t.title,
        summary: t.summary,
        image: t.image,
        priceUSD: t.priceUSD,
        durationDays: t.durationDays,
        destinationSlug: t.destinationSlug,
        category: t.category,
        rating: t.rating,
        reviewCount: t.reviewCount,
        groupSize: t.groupSize,
        highlights: t.highlights,
        includes: t.includes,
        excludes: t.excludes,
        itinerary: t.itinerary
      }))}
    />
  );
}
