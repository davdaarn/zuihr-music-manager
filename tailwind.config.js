const colors = require('tailwindcss/colors')

module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,

      // background: {
      //   primary: 'var(--bg-primary)',
      // }
      dark: {
        'background-gradient': {
          dark: '#0F141D',
          light: '#0F141D',
        },
        primary: '#0F141D',
        text: {
          active: '#B6BBC3',
          muted: '#394251',
        },
        item: {
          active: '#3A4454',
          muted: '#616E84',
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
