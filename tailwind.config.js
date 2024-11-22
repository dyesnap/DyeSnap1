import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"], // Adjust paths if necessary
  theme: {
    container: {
      padding: {
        DEFAULT: "20px",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        primary: "#1a202c", // Dark gray for text and UI
        secondary: "#2d3748", // Slightly lighter gray for contrast
        accent: "#f6ad55", // Orange for call-to-action buttons
        background: "#ffffff", // White for clean layout
        neutral: "#718096", // Gray for muted text
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"], // Clean and modern fonts
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "button-hover": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "button-hover": "button-hover 0.3s ease-in-out",
      },
    },
  },
  plugins: [typographyPlugin],
};
