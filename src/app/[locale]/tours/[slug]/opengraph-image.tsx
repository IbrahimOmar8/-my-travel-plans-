import { ImageResponse } from "next/og";
import { getTour } from "@/data/tours";
import { type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const alt = "Nile Horizons tour";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default async function Image({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const tour = getTour(params.slug);
  const locale = (params.locale as Locale) ?? "en";
  const title = tour?.title[locale] ?? "Nile Horizons";
  const summary = truncate(tour?.summary[locale] ?? "", 140);
  const cover = tour?.image ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          background: "#0f2039"
        }}
      >
        {cover ? (
          <img
            src={cover}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              objectFit: "cover",
              width: "100%",
              height: "100%"
            }}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,32,57,0.4) 0%, rgba(15,32,57,0.9) 100%)"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 64,
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f5d889",
              marginBottom: 12
            }}
          >
            Nile · Horizons
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 1000
            }}
          >
            {title}
          </div>
          {summary ? (
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 28,
                lineHeight: 1.3,
                color: "rgba(255,255,255,0.88)",
                maxWidth: 1000
              }}
            >
              {summary}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
