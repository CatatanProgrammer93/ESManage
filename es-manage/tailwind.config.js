/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F0F0F",
        secondary: "#2F2F2F",
        tertiary: "#3F3F3F",
        quaternary: "#4F4F4F",
        quinary: "#5F5F5F",
      },
    },
  },
  plugins: [],
};
