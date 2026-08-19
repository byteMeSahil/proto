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
        sidebar: {
          bg: "#1B4332",
          hover: "#2D6A4F",
          active: "#2D6A4F",
          text: "#ffffff",
          muted: "rgba(255,255,255,0.65)",
          border: "rgba(255,255,255,0.10)",
          footer: "#163829",
        },
        brand: {
          green: "#2D6A4F",
          "green-light": "#52B788",
          "green-dark": "#1B4332",
          orange: "#E8670A",
          "orange-light": "#FFF0E0",
          "orange-dark": "#B84E00",
          gold: "#D4A017",
          "gold-light": "#FDF5DC",
          blue: "#2563EB",
          "blue-light": "#EFF6FF",
          red: "#DC2626",
          "red-light": "#FEF2F2",
          amber: "#D97706",
          "amber-light": "#FFFBEB",
          purple: "#7C3AED",
          "purple-light": "#F5F3FF",
          teal: "#0D9488",
          "teal-light": "#F0FDFA",
        },
        surface: {
          bg: "#F5F4F0",
          card: "#FFFFFF",
          border: "#E5E7EB",
          "border-dark": "#D1D5DB",
          muted: "#F9FAFB",
        },
        text: {
          primary: "#111827",
          secondary: "#374151",
          muted: "#6B7280",
          light: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-md": "0 4px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
        sidebar: "2px 0 8px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in": "slideIn 0.25s ease-out",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        wave: "wave 1.2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseDot: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.3)" } },
        wave: { "0%,100%": { transform: "scaleY(0.4)" }, "50%": { transform: "scaleY(1.2)" } },
      },
      width: { sidebar: "240px" },
      minHeight: { content: "calc(100vh - 64px)" },
    },
  },
  plugins: [],
};
export default config;
