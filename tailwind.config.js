/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0A1F44",
          900: "#0D2654",
          800: "#13305E",
          700: "#1B3D70",
        },
        accent: {
          50: "#EEF2FF",
          100: "#DCE5FF",
          400: "#5B82FF",
          500: "#2655FF",
          600: "#1F46DB",
          700: "#1A3AB8",
        },
        ink: {
          900: "#0B1220",
          700: "#2B3445",
          500: "#5B6472",
          400: "#8A93A3",
        },
        surface: {
          DEFAULT: "#F4F7FC",
          card: "#FFFFFF",
          border: "#E3E8F2",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(10, 31, 68, 0.04), 0 1px 1px 0 rgba(10, 31, 68, 0.03)",
        soft: "0 8px 24px -8px rgba(10, 31, 68, 0.12)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
    },
  },
  plugins: [],
};
