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
      spacing: {
        22: "5.5rem",
      },
      fontFamily: {
        sans: ["var(--font-nouva)"],
      },
      screens: {
        "2xl": "1500px",
        "3xl": "1800px",
        "4xl": "2100px",
      },
      colors: {
        custom: {
          pink: "#FF0080",
          blue: "#0070F3",
          cyan: "#50E3C2",
          orange: "#F5A623",
          violet: "#7928CA",
        },
      },
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.custom.pink"),
          },
          "40%": {
            ["border-color"]: theme("colors.custom.pink"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.custom.pink"),
            color: theme("colors.custom.white"),
          },
          "40%": {
            background: theme("colors.custom.pink"),
            color: theme("colors.custom.white"),
          },
        },
      }),
    },
  },
};
export default config;
