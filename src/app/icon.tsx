import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#0f2039",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5d889",
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "system-ui"
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
