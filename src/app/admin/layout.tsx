import Link from "next/link";
import "../globals.css";

export const metadata = {
  title: "Admin — Nile Horizons"
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/inquiries", label: "Inquiries" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/reviews", label: "Reviews" },
    { href: "/admin/subscribers", label: "Subscribers" },
    { href: "/admin/tours", label: "Tours" }
  ];

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
            <div className="border-b border-slate-200 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Nile Horizons
              </p>
              <h1 className="mt-1 text-lg font-semibold">Admin</h1>
            </div>
            <nav className="flex-1 p-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-200 p-3 text-xs text-slate-500">
              <Link href="/en" className="hover:text-slate-700">
                ← Back to site
              </Link>
            </div>
          </aside>

          <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
