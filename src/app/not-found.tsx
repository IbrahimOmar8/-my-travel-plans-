import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#fbf6ed",
          color: "#0f2039",
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: 72 }}>🐪</div>
          <h1 style={{ fontSize: 36, margin: "1rem 0 0.5rem" }}>
            404 — Lost in the desert
          </h1>
          <p style={{ fontSize: 16, opacity: 0.8, margin: "0 0 1.5rem" }}>
            That page wandered off. Pick a language to get back on the map.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Link
              href="/en"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: 999,
                background: "#0c63a7",
                color: "white",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              English
            </Link>
            <Link
              href="/ru"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: 999,
                background: "white",
                color: "#0f2039",
                textDecoration: "none",
                border: "1px solid #e7dec5",
                fontWeight: 600
              }}
            >
              Русский
            </Link>
            <Link
              href="/tr"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: 999,
                background: "white",
                color: "#0f2039",
                textDecoration: "none",
                border: "1px solid #e7dec5",
                fontWeight: 600
              }}
            >
              Türkçe
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
