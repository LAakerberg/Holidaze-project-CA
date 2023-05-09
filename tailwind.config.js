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
