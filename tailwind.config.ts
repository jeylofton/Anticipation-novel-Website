import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0e14",
        night: "#141a23",
        "night-2": "#1a212c",
        copper: "#b85042",
        ember: "#d97757",
        "ember-soft": "#e09473",
        bone: "#e8e2d5",
        "bone-2": "#d4cdbd",
        smoke: "#8a8478",
        gold: "#c9a96e",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
      },
      maxWidth: {
        prose: "640px",
        card: "560px",
      },
      keyframes: {
        "hero-drift": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.1)" },
        },
        "scroll-pulse": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "hero-drift": "hero-drift 30s ease-in-out infinite alternate",
        "scroll-pulse": "scroll-pulse 2.4s ease-in-out infinite",
        "fade-up": "fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
