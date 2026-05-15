import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-sand-100 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Guest stories</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
            Read what real travellers say.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div>
                  <p className="font-semibold text-nile-900">{t.name}</p>
                  <p className="text-xs text-nile-700/70">{t.country}</p>
                </div>
              </div>

              <div className="mt-3 text-sand-500" aria-label={`${t.rating} stars`}>
                {"★".repeat(t.rating)}
                <span className="text-sand-200">{"★".repeat(5 - t.rating)}</span>
              </div>

              <blockquote className="mt-3 flex-1 text-sm text-nile-800/90">
                “{t.quote}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
