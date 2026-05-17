import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { listPosts } from "@/lib/blog";
import { locales, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("listTitle"),
    description: t("listSubtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}/blog`])
      )
    }
  };
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(iso));
}

export default async function BlogIndex({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = listPosts(locale as Locale);

  return (
    <div className="bg-sand-50">
      <section className="container-page py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-600">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-nile-800 sm:text-5xl">
          {t("listTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nile-800/80">
          {t("listSubtitle")}
        </p>
        <a
          href="/feed.xml"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nile-600 hover:text-nile-700"
        >
          <span>RSS</span>
          <span aria-hidden>→</span>
        </a>
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="block aspect-[16/10] overflow-hidden"
              >
                <img
                  src={post.cover}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                  {formatDate(post.date, locale)}
                  {post.readMinutes ? ` · ${post.readMinutes} ${t("min")}` : ""}
                </p>
                <h2 className="font-display text-xl font-semibold leading-snug text-nile-900">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="hover:text-nile-600"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-nile-800/80 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-nile-700">
                  <span className="font-medium">{post.author}</span>
                  {post.authorRole && (
                    <span className="text-nile-500">· {post.authorRole}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-nile-700">{t("empty")}</p>
        )}
      </section>
    </div>
  );
}
