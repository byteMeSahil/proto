import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kriya brand palette — saffron, forest green, deep indigo, warm white
        kriya: {
          saffron: "#E8670A",
          "saffron-light": "#FFF0E0",
          "saffron-dark": "#B84E00",
          green: "#1A6B3C",
          "green-light": "#E6F4EC",
          "green-dark": "#0F4024",
          indigo: "#2D3A8C",
          "indigo-light": "#EEF0FB",
          "indigo-dark": "#1A2160",
          gold: "#D4A017",
          "gold-light": "#FDF5DC",
          cream: "#FDFAF5",
          "warm-gray": "#6B6560",
          "light-gray": "#F5F3F0",
          "border-gray": "#E0DDD8",
          success: "#1A6B3C",
          warning: "#D4A017",
          error: "#C0392B",
          info: "#2D3A8C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Noto Sans Devanagari", "Arial", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.14)",
        "inner-soft": "inset 0 1px 3px rgba(0,0,0,0.06)",
        glow: "0 0 0 3px rgba(232, 103, 10, 0.25)",
        "glow-green": "0 0 0 3px rgba(26, 107, 60, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 2s linear infinite",
        "bounce-gentle": "bounce 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "wave": "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
