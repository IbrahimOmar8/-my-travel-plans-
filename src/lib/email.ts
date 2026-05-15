import { Resend } from "resend";
import type { Inquiry, Booking } from "./storage";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "Nile Horizons <hello@nilehorizons.example>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "ops@nilehorizons.example";

function isConfigured() {
  return resend !== null;
}

async function send(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  if (!resend) {
    console.log(`[email-stub] → ${opts.to} :: ${opts.subject}`);
    return;
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html
    });
  } catch (err) {
    console.error("[email] send failed", err);
  }
}

export async function sendInquiryEmails(inquiry: Inquiry) {
  const ref = inquiry.tourTitle ? ` — ${inquiry.tourTitle}` : "";

  const adminBody = [
    `New inquiry from ${inquiry.name} <${inquiry.email}>`,
    inquiry.country ? `Country: ${inquiry.country}` : null,
    inquiry.travelers ? `Travellers: ${inquiry.travelers}` : null,
    inquiry.date ? `Preferred date: ${inquiry.date}` : null,
    inquiry.tourTitle ? `Tour: ${inquiry.tourTitle}` : null,
    inquiry.notes ? `\nNotes:\n${inquiry.notes}` : null,
    `\nReply: mailto:${inquiry.email}`
  ]
    .filter(Boolean)
    .join("\n");

  await send({
    to: ADMIN_EMAIL,
    subject: `New inquiry from ${inquiry.name}${ref}`,
    text: adminBody
  });

  const autoReply = [
    `Hi ${inquiry.name},`,
    "",
    "Thanks for reaching out to Nile Horizons. We've got your inquiry and a trip designer will be in touch within 24 hours with a tailored quote.",
    "",
    inquiry.tourTitle
      ? `You asked about: ${inquiry.tourTitle}.`
      : "If you can share rough dates and travel style, we'll move faster.",
    "",
    "If it's urgent, WhatsApp us any time on +20 100 000 0000.",
    "",
    "Warmly,",
    "The Nile Horizons team"
  ].join("\n");

  await send({
    to: inquiry.email,
    subject: "We've got your inquiry — Nile Horizons",
    text: autoReply
  });
}

export async function sendBookingConfirmation(booking: Booking) {
  if (booking.customerEmail) {
    const body = [
      `Hi ${booking.customerName ?? "there"},`,
      "",
      `Your 20% deposit for "${booking.tourTitle}" is confirmed.`,
      `Booking reference: ${booking.id}`,
      `Travellers: ${booking.travelers}`,
      `Deposit paid: $${booking.depositUSD.toLocaleString()} (${booking.currency.toUpperCase()})`,
      `Trip total: $${booking.totalUSD.toLocaleString()}`,
      "",
      "A trip designer will reach out within 24 hours to confirm dates and start arrangements.",
      "",
      "Nile Horizons"
    ].join("\n");

    await send({
      to: booking.customerEmail,
      subject: `Deposit confirmed — ${booking.tourTitle}`,
      text: body
    });
  }

  await send({
    to: ADMIN_EMAIL,
    subject: `Deposit paid: ${booking.tourTitle} (${booking.id})`,
    text: [
      `Tour: ${booking.tourTitle}`,
      `Customer: ${booking.customerName ?? "—"} <${booking.customerEmail ?? "—"}>`,
      `Travellers: ${booking.travelers}`,
      `Deposit: $${booking.depositUSD.toLocaleString()}`,
      `Total: $${booking.totalUSD.toLocaleString()}`,
      `Booking ID: ${booking.id}`,
      `Stripe session: ${booking.stripeSessionId}`
    ].join("\n")
  });
}

export const emailStatus = {
  configured: isConfigured()
};
