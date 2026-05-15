# Nile Horizons

Production-style booking site for a curated Egypt / Middle East tour
operator. Built with **Next.js 14 (App Router)**, **TypeScript** and
**Tailwind CSS**.

## Features

- **Marketing site** — Home, Destinations (list + detail), Tours (list +
  detail with itinerary, includes/excludes, pricing), About, Contact.
- **i18n** — English, **Русский**, **Türkçe** with localised URLs
  (`/en/...`, `/ru/...`, `/tr/...`) and a language switcher.
- **Stripe Checkout** — 20% deposit flow with a `/api/checkout` endpoint
  and a `/api/webhook` listener that marks bookings paid.
- **Admin dashboard** — `/admin` protected by HTTP Basic Auth, with
  panels for inquiries, bookings, tours, and revenue stats.
- **Inquiry form** — captures leads to `.data/inquiries.json` (replace
  with your DB / CRM).

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Open <http://localhost:3000>. It will redirect to `/en`.

Admin is at <http://localhost:3000/admin> — default credentials
`admin` / `nile-horizons-demo` unless you set `ADMIN_USER` /
`ADMIN_PASSWORD` in `.env`.

## Stripe setup

1. Sign up for [Stripe](https://dashboard.stripe.com/register) and copy your
   test secret key (`sk_test_...`).
2. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
3. Run the Stripe CLI to forward webhooks locally:
   ```
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. Click "Book now — pay 20% deposit" on any tour page. Use card
   `4242 4242 4242 4242`.

If `STRIPE_SECRET_KEY` is missing, the app falls back to a stub mode that
records a pending booking without taking payment — useful for design
review.

## Project layout

```
src/
  app/
    [locale]/           Public localised routes (en, ru, tr)
      destinations/     /[locale]/destinations + /[slug]
      tours/            /[locale]/tours + /[slug]
      booking/          /booking/success and /booking/cancel
      about/  contact/
    admin/              HTTP-Basic-protected dashboard
      inquiries/  bookings/  tours/
    api/                inquiry, checkout, webhook
  components/           Header, Footer, Hero, BookButton, etc.
  data/                 destinations.ts, tours.ts, testimonials.ts
  i18n/                 next-intl config
  lib/                  stripe, storage, types
  messages/             en.json, ru.json, tr.json
middleware.ts           Locale routing + admin auth
```

## Productionising the storage layer

`.data/*.json` works for a single VPS or local dev. For real production:

- Swap `src/lib/storage.ts` for Postgres + Prisma (schema mirrors the
  `Inquiry` and `Booking` types already defined there).
- Or use Supabase / Neon for managed Postgres.

## Next steps that turn this into a real business

1. Email autoresponders via **Resend** or **Postmark** on inquiry +
   payment.
2. Stripe **destination charges** to settle to hotel / cruise partners.
3. A blog under `[locale]/blog/[slug]` for SEO — tourism is a search-led
   channel.
4. Adding French and German once Russian & Turkish are validated.
