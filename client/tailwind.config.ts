import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — deliberately narrow. Gold is a detail, never a fill color.
        navy: {
          DEFAULT: "#0A0E1A",
          soft: "#111527",
          line: "#22273B",
        },
        ivory: {
          DEFAULT: "#F5F1E7",
          soft: "#EFEADD",
          line: "#DFD8C6",
        },
        charcoal: {
          DEFAULT: "#1B1A17",
          soft: "#2B2A26",
        },
        gold: {
          DEFAULT: "#A9824C",
          soft: "#C7A874",
          dim: "#8A6B3E",
        },
        stone: {
          DEFAULT: "#8B8677",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2.15rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
