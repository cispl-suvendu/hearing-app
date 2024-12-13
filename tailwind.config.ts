import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "var(--dark)",
        light: "var(--light)",
        rossQuartz:"var(--roseQuartz)",
        cream:"var(--cream)",
        dustyRose:"var(--dustyRose)",
        coral:"var(--coral)",
        skyLight:"var(--skyLight)",
        primaryDark:"var(--primaryDark)",
        primaryLight:"var(--primaryLight)",
        supportingSky:"var(--supportingSky)",
        supportingMegenda:"var(--supportingMegenda)",
        supprtingCoral:"var(--supprtingCoral)",
        grayText:"var(--grayText)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
