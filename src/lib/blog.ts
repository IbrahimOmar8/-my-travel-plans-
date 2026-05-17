import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { locales, type Locale } from "@/i18n/config";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  author: string;
  authorRole?: string;
  readMinutes?: number;
  tags?: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  locale: Locale;
  html: string;
};

export type PostListItem = PostFrontmatter & {
  slug: string;
  locale: Locale;
};

function readPostFile(slug: string, locale: Locale): string | null {
  const file = path.join(CONTENT_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}

function listSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function parse(raw: string): { data: PostFrontmatter; body: string } {
  const { data, content } = matter(raw);
  return { data: data as PostFrontmatter, body: content };
}

export function listPosts(locale: Locale): PostListItem[] {
  const slugs = listSlugs();
  const items: PostListItem[] = [];
  for (const slug of slugs) {
    const raw =
      readPostFile(slug, locale) ?? readPostFile(slug, "en" as Locale);
    if (!raw) continue;
    const { data } = parse(raw);
    items.push({ slug, locale, ...data });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function listAllSlugs(): string[] {
  return listSlugs();
}

export async function getPost(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const raw =
    readPostFile(slug, locale) ?? readPostFile(slug, "en" as Locale);
  if (!raw) return null;
  const { data, body } = parse(raw);
  const html = (await remark().use(remarkHtml).process(body)).toString();
  return { slug, locale, html, ...data };
}

export function getAvailableLocales(slug: string): Locale[] {
  return locales.filter(
    (l) => readPostFile(slug, l as Locale) !== null
  ) as Locale[];
}
