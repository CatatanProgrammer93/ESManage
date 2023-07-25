/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F0F0F',
        secondary: '#628EFF',
        tertiary: '#580475',
        quaternary: '#272727',
        quinary: '#121212',
        senary: '#C4C4C4',
      },
    },
  },
  plugins: [],
};
