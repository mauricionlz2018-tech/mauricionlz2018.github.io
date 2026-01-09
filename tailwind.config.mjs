import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.1)" },
          "100%": { opacity: "0.5", transform: "scale(1)" },
        },
      },
      animation: {
        "glow-slow": "glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
});
