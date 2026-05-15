import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-nile-900">
        That page wandered off into the desert.
      </h1>
      <p className="mt-4 text-nile-800/80">
        Let's get you back on the map.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
