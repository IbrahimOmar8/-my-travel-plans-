import Link from "next/link";
import { useTranslations } from "next-intl";
import type { PostListItem } from "@/lib/blog";

type Props = {
  posts: PostListItem[];
  locale: string;
};

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(iso));
}

export function JournalStrip({ posts, locale }: Props) {
  const t = useTranslations("blog");
  if (posts.length === 0) return null;

  return (
    <section className="bg-sand-100 py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-nile-900">
              {t("listTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden text-sm font-semibold text-nile-600 hover:text-nile-700 sm:block"
          >
            {t("listTitle")} →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.cover}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                  {formatDate(post.date, locale)}
                  {post.readMinutes ? ` · ${post.readMinutes} ${t("min")}` : ""}
                </p>
                <p className="font-display text-lg font-semibold leading-snug text-nile-900 group-hover:text-nile-600">
                  {post.title}
                </p>
                <p className="text-sm text-nile-800/80 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
