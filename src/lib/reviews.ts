import { prisma } from "./db";
import type { Review as PrismaReview } from "@prisma/client";

export type Review = PrismaReview;

export type NewReview = {
  tourSlug: string;
  name: string;
  country?: string;
  rating: number;
  title?: string;
  body: string;
  email?: string;
  locale?: string;
};

export type ReviewAggregate = { count: number; average: number };

export async function listApprovedReviews(tourSlug: string): Promise<Review[]> {
  return prisma.review.findMany({
    where: { tourSlug, status: "approved" },
    orderBy: { createdAt: "desc" }
  });
}

export async function aggregateForTour(
  tourSlug: string
): Promise<ReviewAggregate> {
  const rows = await prisma.review.findMany({
    where: { tourSlug, status: "approved" },
    select: { rating: true }
  });
  if (rows.length === 0) return { count: 0, average: 0 };
  const sum = rows.reduce((acc, r) => acc + r.rating, 0);
  return {
    count: rows.length,
    average: Math.round((sum / rows.length) * 10) / 10
  };
}

export async function addReview(data: NewReview): Promise<Review> {
  const rating = Math.max(1, Math.min(5, Math.round(data.rating)));
  return prisma.review.create({
    data: { ...data, rating, status: "pending" }
  });
}

export async function listPendingReviews(): Promise<Review[]> {
  return prisma.review.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "desc" }
  });
}

export async function listAllReviews(): Promise<Review[]> {
  return prisma.review.findMany({ orderBy: { createdAt: "desc" } });
}

export async function setReviewStatus(id: string, status: "approved" | "rejected") {
  return prisma.review
    .update({ where: { id }, data: { status } })
    .catch(() => null);
}
