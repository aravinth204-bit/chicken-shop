/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fire-red': '#DC2626',
        'fire-yellow': '#F59E0B',
        'dark-bg': '#1C1917',
        'poultry-red': '#DC2626',
        'poultry-dark': '#1C1917',
        'poultry-gold': '#F59E0B',
        'stone-light': '#F5F5F4',
      }
    },
  },
  plugins: [],
}
