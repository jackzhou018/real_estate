import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Coastal-luxury palette: deep navy + warm brass + warm cream
        primary: "#1B3A5B",
        primaryActive: "#13293F",
        accent: "#B0894F",
        accentActive: "#95713B",
        ink: "#14253B",
        body: "#41495A",
        muted: "#5C6470",
        hairline: "#E6E0D4",
        soft: "#F4F0E8",
        strong: "#ECE6DA",
        cream: "#FBF9F5"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 37, 59, 0.04), 0 8px 24px -12px rgba(20, 37, 59, 0.18)",
        lift: "0 2px 4px rgba(20, 37, 59, 0.05), 0 18px 40px -18px rgba(20, 37, 59, 0.28)",
        card: "0 1px 0 rgba(20, 37, 59, 0.04), 0 12px 30px -18px rgba(20, 37, 59, 0.22)"
      },
      letterSpacing: {
        eyebrow: "0.18em"
      }
    }
  },
  plugins: []
};

export default config;
