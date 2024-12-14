import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        galaxyFold: "300px",
        ssm: "641px",
        360: "360px",
        704: "704px",
        520: "520px",
        1170: "1170px",
        900: "900px",
        "1200px": "1200px",
        1066: "1066px",
        1300: "1300px",
        1450: "1450px",
        1250: "1250px",
      },
      container: {
        screens: {
          default: "280px",
          360: "360px",
          704: "704px",
          1170: "1170px",
        },
      },
      fontFamily: {
        Inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
