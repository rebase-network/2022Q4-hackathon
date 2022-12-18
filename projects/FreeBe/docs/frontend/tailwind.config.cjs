/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html", './src/**/*.{html,js,vue,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'light': '#ffffff',
      'dark': "#1f2937",
      'darktext': "#9ca3af",
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#71718a',
      'bermuda': '#78dcca',
      'mianColor': '#0ebcc1', // Main Color
      'traxgray': '#f1f5f9'
    },
    screens: {
      'ssm': '320px',
      'sm': '640px',
      'md': '768px', // Mobile Screens
      'lg': '1024px', // See Screens
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px', // Full
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dark-mode': '#333'
      }
    },
  },

  variants: {
    dark: ['dark'],
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      gradientColorStops: ['dark'],
      placeholderColo: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('@tailwindcss/forms')
  ],
};
