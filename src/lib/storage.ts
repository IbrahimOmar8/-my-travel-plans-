import { prisma } from "./db";
import type { Inquiry as PrismaInquiry, Booking as PrismaBooking } from "@prisma/client";

export type Inquiry = PrismaInquiry;
export type Booking = PrismaBooking;

export type NewInquiry = {
  name: string;
  email: string;
  country?: string;
  travelers?: string;
  date?: string;
  notes?: string;
  tourSlug?: string;
  tourTitle?: string;
};

export type NewBooking = {
  stripeSessionId: string;
  status?: string;
  tourSlug: string;
  tourTitle: string;
  travelers: number;
  depositUSD: number;
  totalUSD: number;
  currency?: string;
};

export async function listInquiries(): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function addInquiry(data: NewInquiry): Promise<Inquiry> {
  return prisma.inquiry.create({ data });
}

export async function listBookings(): Promise<Booking[]> {
  return prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
}

export async function addBooking(data: NewBooking): Promise<Booking> {
  return prisma.booking.create({
    data: {
      stripeSessionId: data.stripeSessionId,
      status: data.status ?? "pending",
      tourSlug: data.tourSlug,
      tourTitle: data.tourTitle,
      travelers: data.travelers,
      depositUSD: data.depositUSD,
      totalUSD: data.totalUSD,
      currency: data.currency ?? "usd"
    }
  });
}

export async function updateBookingByStripeSession(
  stripeSessionId: string,
  patch: Partial<Pick<Booking, "status" | "customerEmail" | "customerName">>
) {
  return prisma.booking.update({
    where: { stripeSessionId },
    data: patch
  }).catch(() => null);
}

export async function findBookingByStripeSession(stripeSessionId: string) {
  return prisma.booking.findUnique({ where: { stripeSessionId } });
}
