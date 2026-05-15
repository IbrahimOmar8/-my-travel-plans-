import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf6ee",
          100: "#f3e7cc",
          200: "#e9d29c",
          300: "#dab769",
          400: "#cda047",
          500: "#b88536",
          600: "#9b6a2c",
          700: "#7c5126",
          800: "#624024",
          900: "#523620"
        },
        nile: {
          50: "#eef9fb",
          100: "#d4f0f5",
          200: "#aee0eb",
          300: "#77c8d9",
          400: "#3aa6bf",
          500: "#1f87a3",
          600: "#1b6c87",
          700: "#1c576e",
          800: "#1e495b",
          900: "#1c3d4d"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
