/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        'fire-red': '#DC2626',
        'fire-yellow': '#F59E0B',
        'dark-bg': '#0C0A09', // Darker for more premium feel
        'poultry-red': '#DC2626',
        'poultry-dark': '#0C0A09',
        'poultry-gold': '#F59E0B',
        'stone-light': '#F5F5F4',
        'gold-primary': '#C5A059',
        'gold-secondary': '#9B7E46',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '100%': { left: '125%' },
        },
      },
    },
  },
  plugins: [],
}
