import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations
} from "next-intl/server";
import { getPost, listAllSlugs, listPosts } from "@/lib/blog";
import { locales, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

type Params = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const combos: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of listAllSlugs()) combos.push({ locale, slug });
  }
  return combos;
}

export async function generateMetadata({
  params
}: Params): Promise<Metadata> {
  const post = await getPost(params.slug, params.locale as Locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/${params.locale}/blog/${post.slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/blog/${post.slug}`])
      )
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      type: "article",
      publishedTime: post.date,
      authors: [post.author]
    }
  };
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(iso));
}

export default async function BlogPost({ params }: Params) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations({
    locale: params.locale,
    namespace: "blog"
  });

  const post = await getPost(params.slug, params.locale as Locale);
  if (!post) notFound();

  const related = listPosts(params.locale as Locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="bg-sand-50">
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img
          src={post.cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      <div className="container-page -mt-24 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-sand-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-600">
            {formatDate(post.date, params.locale)}
            {post.readMinutes
              ? ` · ${post.readMinutes} ${t("min")}`
              : ""}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-nile-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-nile-700">
            {post.author}
            {post.authorRole && (
              <span className="text-nile-500"> · {post.authorRole}</span>
            )}
          </p>

          <div
            className="prose prose-nile mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-nile-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-nile-800">
              {t("relatedTitle")}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${params.locale}/blog/${r.slug}`}
                  className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                    {formatDate(r.date, params.locale)}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-nile-900">
                    {r.title}
                  </p>
                  <p className="mt-1 text-sm text-nile-800/80 line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
