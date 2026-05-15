import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Nile Horizons",
  description:
    "Nile Horizons is a Cairo-based, family-run tour operator. Meet the team and learn how we build trips."
};

export default function AboutPage() {
  return (
    <>
      <section className="container-page py-16">
        <p className="eyebrow">About</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl font-semibold text-nile-900">
          Cairo-based. Family-run. Built around the people who travel with us.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-nile-800/85">
          We started in 2014 with three guides and a single Nile cruiser. Today
          we run small-group and private trips across Egypt, Jordan and the Red
          Sea — but we still answer every email ourselves. We're licensed by
          the Egyptian Tourism Authority and accredited by IATA.
        </p>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <Stat label="Tours run" value="2,800+" />
          <Stat label="Repeat & referral bookings" value="62 %" />
          <Stat label="Average response time" value="< 4 h" />
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-3xl font-semibold text-nile-900">
          How we build a trip
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <Step
            n={1}
            title="Tell us your story"
            body="Honeymoon, family with kids, photography focus, return visit — every itinerary starts with a 30-minute call."
          />
          <Step
            n={2}
            title="We design three options"
            body="Within 48 hours you get three draft itineraries at different price points, with hotel options for each leg."
          />
          <Step
            n={3}
            title="You travel, we stay on call"
            body="Your trip designer is your single contact from quote to flight home. WhatsApp 24/7, in-country team in every city."
          />
        </ol>

        <div className="mt-16 rounded-3xl bg-nile-800 p-10 text-white">
          <h3 className="font-display text-3xl font-semibold">
            Ready to start planning?
          </h3>
          <p className="mt-2 max-w-2xl text-sand-100">
            Send us a few details and we'll get back to you within a day.
          </p>
          <Link href="/contact" className="btn-primary mt-6 bg-sand-300 text-nile-900 hover:bg-sand-200">
            Plan my trip
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-5xl font-semibold text-nile-800">
        {value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wider text-sand-600">
        {label}
      </p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
      <span className="font-display text-4xl font-semibold text-sand-400">
        0{n}
      </span>
      <h3 className="mt-2 font-display text-xl font-semibold text-nile-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-nile-800/80">{body}</p>
    </li>
  );
}
