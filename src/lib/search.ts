import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { listPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/config";

export type SearchHit = {
  kind: "tour" | "destination" | "post";
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  score: number;
};

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function scoreText(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = normalize(haystack);
  const n = normalize(needle);
  if (h === n) return 100;
  if (h.startsWith(n)) return 50;
  if (h.includes(n)) return 25;
  const tokens = n.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const t of tokens) {
    if (h.includes(t)) s += 8;
  }
  return s;
}

export async function search(
  query: string,
  locale: Locale,
  limit = 20
): Promise<SearchHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const hits: SearchHit[] = [];

  for (const t of tours) {
    const title = t.title[locale];
    const summary = t.summary[locale];
    const score =
      scoreText(title, q) * 2 +
      scoreText(summary, q) +
      scoreText(t.highlights[locale].join(" "), q) * 0.5;
    if (score > 0) {
      hits.push({
        kind: "tour",
        slug: t.slug,
        title,
        excerpt: summary,
        image: t.image,
        href: `/${locale}/tours/${t.slug}`,
        score
      });
    }
  }

  for (const d of destinations) {
    const name = d.name[locale];
    const tagline = d.tagline[locale];
    const score =
      scoreText(name, q) * 2.5 +
      scoreText(tagline, q) +
      scoreText(d.description[locale], q) * 0.5 +
      scoreText(d.country[locale], q) * 1.5;
    if (score > 0) {
      hits.push({
        kind: "destination",
        slug: d.slug,
        title: name,
        excerpt: tagline,
        image: d.heroImage,
        href: `/${locale}/destinations/${d.slug}`,
        score
      });
    }
  }

  for (const p of listPosts(locale)) {
    const score = scoreText(p.title, q) * 2 + scoreText(p.excerpt, q);
    if (score > 0) {
      hits.push({
        kind: "post",
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        image: p.cover,
        href: `/${locale}/blog/${p.slug}`,
        score
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
