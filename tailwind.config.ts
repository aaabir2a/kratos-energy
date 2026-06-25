import type { Config } from "tailwindcss";

/**
 * Kratos Energy brand theme.
 * Mirrors the tokens defined in the design system (colors_and_type.css)
 * so utilities like `bg-green-500`, `text-navy-700`, `shadow-green`,
 * `rounded-lg` and `font-display` map 1:1 to the brand.
 * Type: Bricolage Grotesque (display) + Hanken Grotesk (body).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Leaf green — primary brand
        green: {
          50: "#f1f8e9",
          100: "#e0efcb",
          200: "#c4e09c",
          300: "#a5d06c",
          400: "#8bc34a",
          500: "#6cae34",
          600: "#559025",
          700: "#427018",
        },
        // Forest / deep eco green — dark sections
        forest: {
          500: "#1f7a52",
          700: "#115c3c",
          800: "#0e4a31",
          900: "#0c3b28",
        },
        // Navy — headings, trust
        navy: {
          500: "#2a52be",
          700: "#1e3a8a",
          800: "#18306f",
          900: "#122456",
        },
        // Gold — warranty / value accent
        gold: {
          300: "#f7da7a",
          400: "#f4ce47",
          500: "#e6b724",
        },
        // Neutrals
        paper: "#f6f8f4",
        mist: "#eef2ec",
        ink: "#15201a",
        ash: {
          200: "#e2e7df",
          300: "#cbd2c6",
          400: "#9aa494",
          500: "#6b7568",
          700: "#3a4338",
        },
        // Clean Energy Council badge orange
        cec: "#F39200",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        xl: "32px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15,40,25,.06), 0 1px 1px rgba(15,40,25,.04)",
        md: "0 6px 18px rgba(15,50,30,.08), 0 2px 6px rgba(15,50,30,.05)",
        lg: "0 18px 44px rgba(12,59,40,.14), 0 6px 14px rgba(12,59,40,.07)",
        green: "0 10px 26px rgba(108,174,52,.32)",
        gold: "0 10px 26px rgba(230,183,36,.30)",
      },
      maxWidth: {
        container: "1180px",
      },
      screens: {
        // Dedicated breakpoint: collapse the wide 9-item nav into a hamburger
        nav: "1180px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(.22,.61,.36,1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flash: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,.61,.36,1) both",
        flash: "flash 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
