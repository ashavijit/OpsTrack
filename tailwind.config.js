/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter Variable', 'system-ui', 'sans-serif'],
        outfit: ['Outfit Variable', 'system-ui', 'sans-serif'],
        'space-grotesk': ['Space Grotesk Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};