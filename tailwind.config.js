/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-down': 'fadeDown 0.4s ease-out',
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      clipPath: {
        'left': 'inset(0 50% 0 0)',   // show left half only
        'right': 'inset(0 0 0 50%)',  // show right half only
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.clip-left': {
          'clip-path': 'inset(0 50% 0 0)',
        },
        '.clip-right': {
          'clip-path': 'inset(0 0 0 50%)',
        },
      });
    },
  ],
}