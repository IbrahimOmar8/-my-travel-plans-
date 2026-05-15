import Link from "next/link";

const nav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-100 bg-sand-50/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-nile-800">
            Nile<span className="text-sand-500">·</span>Horizons
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-nile-800 transition hover:text-nile-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/tours" className="btn-primary hidden md:inline-flex">
          Browse tours
        </Link>
      </div>
    </header>
  );
}
