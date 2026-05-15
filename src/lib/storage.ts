import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), ".data");

async function ensure() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJSON<T>(file: string, fallback: T): Promise<T> {
  await ensure();
  try {
    const content = await fs.readFile(path.join(dataDir, file), "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

async function writeJSON(file: string, data: unknown) {
  await ensure();
  await fs.writeFile(
    path.join(dataDir, file),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  country?: string;
  travelers?: string;
  date?: string;
  notes?: string;
  tourSlug?: string;
  tourTitle?: string;
};

export type Booking = {
  id: string;
  stripeSessionId: string;
  createdAt: string;
  status: "pending" | "paid" | "cancelled";
  tourSlug: string;
  tourTitle: string;
  travelers: number;
  depositUSD: number;
  totalUSD: number;
  customerEmail?: string;
  customerName?: string;
};

const INQUIRIES = "inquiries.json";
const BOOKINGS = "bookings.json";

export async function listInquiries(): Promise<Inquiry[]> {
  return readJSON<Inquiry[]>(INQUIRIES, []);
}

export async function addInquiry(inquiry: Inquiry) {
  const all = await listInquiries();
  all.unshift(inquiry);
  await writeJSON(INQUIRIES, all);
}

export async function listBookings(): Promise<Booking[]> {
  return readJSON<Booking[]>(BOOKINGS, []);
}

export async function addBooking(booking: Booking) {
  const all = await listBookings();
  all.unshift(booking);
  await writeJSON(BOOKINGS, all);
}

export async function updateBookingByStripeSession(
  stripeSessionId: string,
  patch: Partial<Booking>
) {
  const all = await listBookings();
  const idx = all.findIndex((b) => b.stripeSessionId === stripeSessionId);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...patch };
    await writeJSON(BOOKINGS, all);
  }
}

export function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
