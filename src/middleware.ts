import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const intlMiddleware = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always"
});

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' }
  });
}

function isAdminAuthed(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD ?? "nile-horizons-demo";
  const expectedUser = process.env.ADMIN_USER ?? "admin";

  const header = req.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return false;

  const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
  const [user, ...passParts] = decoded.split(":");
  const pass = passParts.join(":");

  return user === expectedUser && pass === expected;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!isAdminAuthed(req)) return unauthorized();
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"]
};
