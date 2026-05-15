# Nile Horizons

A production-style marketing & booking-inquiry site for a curated Egypt /
Middle East tour operator. Built with **Next.js 14 (App Router)**,
**TypeScript** and **Tailwind CSS**.

## What's in the box

- Public marketing pages: Home, Destinations (list + detail), Tours (list +
  detail with itinerary, includes/excludes, pricing), About, Contact.
- Search bar that filters tours by destination, date and travellers.
- Inquiry form posting to `/api/inquiry` (server logs the lead — plug in
  your CRM / email provider here).
- Statically generated destination & tour pages from typed data files in
  `src/data/`.
- Mobile-first responsive UI with a sand + Nile-blue palette.

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project layout

```
src/
  app/                Next.js routes (App Router)
    api/inquiry/      POST endpoint for the quote form
    destinations/     /destinations + /destinations/[slug]
    tours/            /tours + /tours/[slug]
    about/  contact/
  components/         Header, Footer, Hero, SearchBar, cards, forms
  data/               destinations.ts, tours.ts, testimonials.ts
  lib/types.ts        TypeScript models
```

## How this becomes a real business

1. **Replace the mock data** in `src/data/` with rows from your CMS or DB.
   Sanity, Strapi, or a Postgres + Prisma layer all fit cleanly.
2. **Wire up the inquiry endpoint** to your CRM (HubSpot, Pipedrive) and
   send an autoresponder email via Resend / Postmark.
3. **Add payments** for deposits — Stripe Checkout takes ~half a day to
   integrate against `/api/checkout`.
4. **Add a CMS-driven blog** for SEO; tourism is search-heavy.
5. **Translate** the site to French, German, Spanish — your foreign-tourist
   market is multilingual.
