/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#FAFAFA",
          mist: "#F5F7FA",
        },
        ink: {
          900: "#0B1220",
          700: "#111827",
          500: "#374151",
          400: "#6B7280",
          300: "#9CA3AF",
        },
        accent: {
          blue: "#2563EB",
          cyan: "#06B6D4",
          violet: "#7C3AED",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(17,24,39,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.045) 1px, transparent 1px)",
        "aurora":
          "radial-gradient(60% 50% at 20% 20%, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0) 60%), radial-gradient(50% 45% at 85% 15%, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0) 60%), radial-gradient(55% 45% at 60% 90%, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0) 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(17, 24, 39, 0.08)",
        "glass-lg": "0 20px 60px rgba(17, 24, 39, 0.10)",
        "glow-blue": "0 0 40px rgba(37, 99, 235, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
