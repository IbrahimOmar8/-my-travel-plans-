import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact — Nile Horizons",
  description:
    "Get in touch with the Nile Horizons team. Email, WhatsApp 24/7, or send a quote request."
};

export default function ContactPage() {
  return (
    <section className="container-page py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        Talk to a trip designer.
      </h1>
      <p className="mt-4 max-w-2xl text-nile-800/80">
        Tell us a little about the trip you're dreaming of and we'll reply with
        a tailored quote within 24 hours.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <InquiryForm />

        <aside className="space-y-6">
          <Card title="Cairo office">
            5 Talaat Harb St., Downtown Cairo, Egypt
            <br />
            Sunday – Thursday, 9:00 – 18:00 EET
          </Card>
          <Card title="WhatsApp (24/7)">
            <a
              className="font-semibold text-nile-600"
              href="https://wa.me/201000000000"
            >
              +20 100 000 0000
            </a>
          </Card>
          <Card title="Email">
            <a
              className="font-semibold text-nile-600"
              href="mailto:hello@nilehorizons.example"
            >
              hello@nilehorizons.example
            </a>
          </Card>
          <Card title="Trade & B2B">
            For travel agents and tour operators wanting to resell our trips:
            <br />
            <a
              className="font-semibold text-nile-600"
              href="mailto:trade@nilehorizons.example"
            >
              trade@nilehorizons.example
            </a>
          </Card>
        </aside>
      </div>
    </section>
  );
}

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
        {title}
      </p>
      <div className="mt-2 text-sm text-nile-800">{children}</div>
    </div>
  );
}
