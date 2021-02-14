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
      cyan: colors.cyan,
      gray: colors.gray,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      emerald: colors.emerald,
      blue: colors.blue,
      lightBlue: colors.lightBlue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      customGray: '#002842',
      active: '#00e6cf',

      // background: {
      //   primary: 'var(--bg-primary)',
      // }
      theme: {
        'background-gradient': {
          dark: '#0F141D',
          light: '#0F141D',
        },
        primary: 'var(--bg-primary)',
        text: {
          active: 'var(--text-active)',
          muted: 'var(--text-muted)',
        },
        item: {
          active: 'var(--item-active)',
          muted: 'var(--item-muted)',
        },
        gradient: {
          start: 'var(--gradient-start)',
          end: 'var(--gradient-end)'
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: [
        "disabled"
      ],
      backgroundColor: [
        "disabled"
      ],
      cursor: [
        "disabled"
      ]
    },
  },
  plugins: [],
}
