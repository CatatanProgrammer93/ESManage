/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F0F0F',
        secondary: '#628EFF',
        tertiary: '#580475',
        quaternary: '#4F4F4F',
        quinary: '#5F5F5F',
      },
    },
  },
  plugins: [],
};
