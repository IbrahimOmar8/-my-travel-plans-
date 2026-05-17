import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { listAllSlugs } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

const staticPaths = [
  "",
  "/destinations",
  "/tours",
  "/blog",
  "/about",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${path}`])
          )
        }
      });
    }

    for (const d of destinations) {
      entries.push({
        url: `${siteUrl}/${locale}/destinations/${d.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}/destinations/${d.slug}`])
          )
        }
      });
    }

    for (const t of tours) {
      entries.push({
        url: `${siteUrl}/${locale}/tours/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}/tours/${t.slug}`])
          )
        }
      });
    }

    for (const slug of listAllSlugs()) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`])
          )
        }
      });
    }
  }

  return entries;
}
