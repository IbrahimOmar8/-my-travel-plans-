import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sand-200 bg-nile-900 text-sand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-semibold">
            Nile<span className="text-sand-300">·</span>Horizons
          </h3>
          <p className="mt-3 text-sm text-sand-200">
            Curated tours of Egypt, Jordan and the Red Sea. IATA-licensed
            operator. Cairo office, ground teams in every city we visit.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/destinations">Destinations</Link>
            </li>
            <li>
              <Link href="/tours">All tours</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Cairo office: +20 2 1234 5678</li>
            <li>WhatsApp 24/7: +20 100 000 0000</li>
            <li>hello@nilehorizons.example</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            Trust
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>IATA accredited #00-0 0000 0</li>
            <li>Egyptian Tourism Authority licensed</li>
            <li>Secure SSL payments</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-nile-800 py-5 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} Nile Horizons. All rights reserved.
      </div>
    </footer>
  );
}
