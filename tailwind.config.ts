import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nouva)"],
      },
      screens: {
        "2xl": "1500px",
        "3xl": "1800px",
        "4xl": "2100px",
      },
    },
  },
};
export default config;
