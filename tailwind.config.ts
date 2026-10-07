import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16213A",
        navy: "#1B2A4A",
        paper: "#FFFFFF", mist: "#F1F4F9",
        brass: "#D4293C",
        teal: "#D4293C",
        line: "#E4E7EE",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
