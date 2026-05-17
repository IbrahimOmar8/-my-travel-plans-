import { listPosts } from "@/lib/blog";
import { siteUrl, siteName } from "@/lib/site";
import { locales } from "@/i18n/config";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items: string[] = [];

  for (const locale of locales) {
    for (const post of listPosts(locale)) {
      const url = `${siteUrl}/${locale}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      items.push(`
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <dc:language>${locale}</dc:language>
      ${post.cover ? `<enclosure url="${escapeXml(post.cover)}" type="image/jpeg" />` : ""}
    </item>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName} Journal</title>
    <link>${siteUrl}</link>
    <description>Field notes, planning guides and stories from the Nile Horizons trip designers.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items.join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
