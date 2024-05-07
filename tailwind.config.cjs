const { resolveProjectPath } = require('wasp/dev');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFEFCB',
          100: '#FFE8B8',
          200: '#FFE1A5',
          300: '#FFDA92',
          400: '#FFD37F',
          500: '#FFBC4A',
          600: '#FFAC00',
          700: '#FF9F00',
          800: '#FF9200',
          900: '#FF8500',
        },
        secondary: {
          50: '#FFB3C6',
          100: '#FF99AD',
          200: '#FF8095',
          300: '#FF667C',
          400: '#FF4D64',
          500: '#FF2E49', // Updated secondary color
          600: '#FF1E33',
          700: '#FF0B1C',
          800: '#E80005',
          900: '#BF0000',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
};
