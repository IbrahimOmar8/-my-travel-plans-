import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0f2039",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5d889",
          fontSize: 110,
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
