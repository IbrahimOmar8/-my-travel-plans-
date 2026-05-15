import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: "4rem", textAlign: "center" }}>
        <h1>404 — Not found</h1>
        <p>
          <Link href="/en">Back to home</Link>
        </p>
      </body>
    </html>
  );
}
