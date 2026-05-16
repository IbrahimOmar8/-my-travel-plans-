import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nile Horizons",
    short_name: "Nile Horizons",
    description:
      "Curated tours of Egypt, Jordan and the Red Sea. Plan, save and book on the go.",
    start_url: "/en",
    display: "standalone",
    background_color: "#fbf6ed",
    theme_color: "#0f2039",
    orientation: "portrait",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
