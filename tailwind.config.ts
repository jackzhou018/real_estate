import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c",
        primaryActive: "#e00b41",
        ink: "#222222",
        body: "#3f3f3f",
        muted: "#6a6a6a",
        hairline: "#dddddd",
        soft: "#f7f7f7",
        strong: "#f2f2f2"
      },
      boxShadow: {
        soft: "rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0"
      }
    }
  },
  plugins: []
};

export default config;
