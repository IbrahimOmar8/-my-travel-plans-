const features = [
  {
    title: "Licensed Egyptologists",
    body: "Every guide is degree-trained and tourism-board licensed — no hop-on commentary, real scholarship."
  },
  {
    title: "Vetted 4★ / 5★ hotels",
    body: "We've stayed in every hotel we book. Sea-view, garden-view, family room — we know the difference."
  },
  {
    title: "Small groups, private options",
    body: "Capped at 12 guests, or fully private with your own guide and vehicle. No coach-tour crush."
  },
  {
    title: "On-call 24/7 in country",
    body: "WhatsApp your local trip manager any time. Lost luggage, sandstorm, missed flight — we fix it."
  },
  {
    title: "Transparent pricing",
    body: "What you pay covers entries, transfers, internal flights, and tips. No surprise add-ons mid-trip."
  },
  {
    title: "Flexible cancellation",
    body: "Cancel up to 30 days before for a full refund minus deposit. Re-book free up to 7 days out."
  }
];

export function WhyUs() {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Why Nile Horizons</p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
          Six reasons our guests come back.
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold text-nile-800">
              {f.title}
            </h3>
            <p className="mt-2 text-sm text-nile-800/80">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
