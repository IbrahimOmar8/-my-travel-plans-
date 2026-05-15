"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();

  function switchTo(next: string) {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || "/");
    router.refresh();
  }

  return (
    <select
      value={current}
      onChange={(e) => switchTo(e.target.value)}
      aria-label="Language"
      className="rounded-full border border-sand-200 bg-white px-3 py-1.5 text-sm font-medium text-nile-800 shadow-sm focus:border-nile-500 focus:outline-none"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
