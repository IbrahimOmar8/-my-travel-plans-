# Nile Horizons

Production-style booking site for a curated Egypt / Middle East tour
operator. Built with **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS**, **Prisma + SQLite**, **Stripe** and **Resend**.

## Features

- **Marketing site** — Home, Destinations (list + detail), Tours
  (list + detail with itinerary, includes / excludes, pricing), About,
  Contact, with fully responsive layout including a mobile menu.
- **i18n** — English, **Русский**, **Türkçe** with localised URLs
  (`/en/...`, `/ru/...`, `/tr/...`), language switcher, ICU plurals,
  and per-page metadata in each language.
- **Multi-currency** — USD / EUR / RUB / TRY display via a currency
  switcher. Stripe Checkout charges in the selected currency.
- **Stripe Checkout** — 20% deposit flow at `/api/checkout` plus a
  signed `/api/webhook` listener that flips bookings to `paid` and
  fires the confirmation email.
- **Email notifications** via Resend — admin notification + customer
  auto-reply on every inquiry; customer confirmation + admin alert on
  every paid deposit. Falls back to console logs if `RESEND_API_KEY`
  is unset.
- **Admin dashboard** at `/admin` — HTTP Basic Auth, overview KPIs,
  inquiries and bookings tables, and CSV export per table.
- **SEO** — auto-generated `sitemap.xml` (all locales × all pages),
  `robots.txt`, `hreflang` link tags, `canonical` per page, and Open
  Graph + Twitter cards.
- **Database** — Prisma + SQLite for inquiries and bookings. Swap the
  datasource to Postgres for production with a one-line change.

## Quick start

```bash
cp .env.example .env
npm install
npm run db:push     # create the SQLite schema
npm run dev
```

- Site: <http://localhost:3000>
- Admin: <http://localhost:3000/admin> — default `admin` /
  `nile-horizons-demo` (override via `.env`).

## Stripe setup

1. Sign up for [Stripe](https://dashboard.stripe.com/register), copy your
   test secret key.
2. Set in `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Forward webhooks locally:
   ```
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. Click "Book now — pay 20% deposit" on any tour. Test card
   `4242 4242 4242 4242`.

If Stripe keys are unset, the app runs in stub mode — bookings are
created in the database but no card is charged.

## Email setup (Resend)

1. Get a key from <https://resend.com>.
2. Set in `.env`:
   ```
   RESEND_API_KEY=re_...
   EMAIL_FROM="Nile Horizons <hello@yourdomain.com>"
   ADMIN_EMAIL=ops@yourdomain.com
   ```

Without a key, emails are logged to stdout — useful for local dev.

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
    api/
      inquiry/          POST — save lead + email
      checkout/         POST — create Stripe session (currency-aware)
      webhook/          POST — Stripe webhook handler
      admin/export/     GET  — CSV export (inquiries | bookings)
    sitemap.ts          /sitemap.xml
    robots.ts           /robots.txt
  components/           Header, Footer, Hero, BookButton, Price, etc.
  data/                 destinations.ts, tours.ts, testimonials.ts
  i18n/                 next-intl config
  lib/                  db, storage, stripe, currency, email, site, types
  messages/             en.json, ru.json, tr.json
prisma/
  schema.prisma         Inquiry + Booking models
middleware.ts           Locale routing + admin/api Basic Auth
```

## Going to production

- **Postgres** — change `provider = "sqlite"` to `"postgresql"` in
  `prisma/schema.prisma`, set `DATABASE_URL` to a Postgres URL, run
  `npx prisma migrate deploy`.
- **Real FX rates** — replace the hard-coded rates in
  `src/lib/currency.ts` with a daily call to an FX API.
- **Translate the blog** — add `[locale]/blog/[slug]` with a CMS for
  SEO content.
- **Add monitoring** — Sentry for errors, Plausible / GA for analytics.
