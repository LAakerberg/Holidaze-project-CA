/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  // ...
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eerie_black: '#1C1C1C',
        dark_slate_gray: '#2F4858',
        light_salmon: '#FF9C73',
        fawn: '#E8A068',
        topaz: '#FFC97F',
        yellow_red: '#E8C068',
        shandy: '#FFE173',
      },
    },
    screens: {
      mobile: '400px',
      // => @media (min-width: 400px) { ... }
      tablet: '500px',
      // => @media (min-width: 400px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 640px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1836px',
      // => @media (min-width: 1836px) { ... }
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.4xl') },
        h2: { fontSize: theme('fontSize.3xl') },
        h3: { fontSize: theme('fontSize.2xl') },
        h4: { fontSize: theme('fontSize.xl') },
      });
    }),
  ],
};
