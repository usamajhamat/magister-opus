import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#122033",
        navy: {
          DEFAULT: "#1B3654",
          deep: "#0C1A2B",
          soft: "#2A4A6B",
        },
        gold: {
          DEFAULT: "#B8954A",
          light: "#E8D5A3",
          dark: "#8C6D2A",
        },
        parchment: "#F6F0E4",
        cream: "#FBF7EF",
        burgundy: "#6E2F3C",
        forest: "#2C4A3E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(18, 32, 51, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
