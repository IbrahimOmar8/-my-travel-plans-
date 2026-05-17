import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";
import { type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const alt = "Nile Horizons journal";
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
  const post = await getPost(params.slug, params.locale as Locale);
  const title = post?.title ?? "Nile Horizons Journal";
  const excerpt = truncate(post?.excerpt ?? "", 140);
  const cover = post?.cover ?? "";

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
          // eslint-disable-next-line jsx-a11y/alt-text
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
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f5d889",
              marginBottom: 12
            }}
          >
            Journal · Nile Horizons
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 1000
            }}
          >
            {title}
          </div>
          {excerpt ? (
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 26,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.88)",
                maxWidth: 1000
              }}
            >
              {excerpt}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
