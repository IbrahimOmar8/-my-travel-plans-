import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { team } from "@/data/team";
import { type Locale } from "@/i18n/config";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "team" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TeamPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "team" });
  const lc = locale as Locale;

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold text-nile-900 md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-nile-800/80">
        {t("subtitle")}
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {team.map((member) => (
          <article
            key={member.slug}
            className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-white p-6 shadow-sm sm:flex-row"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="h-32 w-32 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-36"
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-semibold text-nile-900">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-nile-700">
                {member.role[lc]}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {member.languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full bg-sand-100 px-2 py-0.5 text-xs font-semibold text-nile-700"
                  >
                    {l}
                  </span>
                ))}
                <span className="rounded-full bg-nile-50 px-2 py-0.5 text-xs font-semibold text-nile-700">
                  {member.yearsOnTeam} {t("years")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-nile-800">
                {member.bio[lc]}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
