/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1026",
          900: "#111741",
          800: "#1A2258",
          700: "#252E7A",
        },
        gold: {
          50: "#FDF9EC",
          100: "#FAF0D3",
          200: "#F4E0A3",
          300: "#ECCC6E",
          400: "#E4B845",
          500: "#C9A227",
          600: "#A8861D",
          700: "#86691A",
        },
        parchment: {
          50: "#FFFEFB",
          100: "#FDF9EF",
          200: "#FAF3E3",
          300: "#F2E7C9",
          400: "#E8DCC0",
        },
      },
      fontFamily: {
        serif: ['"Frank Ruhl Libre"', '"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        sacred: "0 20px 60px -15px rgba(11, 16, 38, 0.35), 0 8px 24px -8px rgba(201, 162, 39, 0.25)",
        card: "0 8px 32px -8px rgba(11, 16, 38, 0.18)",
        glow: "0 0 24px rgba(201, 162, 39, 0.45)",
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.99)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeSlide: "fadeSlide 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
