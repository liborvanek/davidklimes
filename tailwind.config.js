const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.svelte',
    ],
    options: {
      defaultExtractor: (content) => [
        // This is an internal Tailwind function that we're not supposed to be allowed to use
        // So if this stops working, please open an issue at
        // https://github.com/babichjacob/sapper-postcss-template/issues
        // rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
      ],
      keyframes: false,
    },
  },
  theme: {
    extend: {
      backgroundOpacity: {
        97: '0.97',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.4)',
      },
      colors: {
        blue: {
          1000: '#1f1e52',
        },
        'dark-gray': {
          50: '#f0f6fc',
          100: '#c9d1d9',
          200: '#b1bac4',
          300: '#8b949e',
          400: '#6e7681',
          500: '#484f58',
          600: '#30363d',
          700: '#21262d',
          800: '#161b22',
          900: '#0d1117',
        },
        'dark-blue': {
          50: '#cae8ff',
          100: '#a5d6ff',
          200: '#79c0ff',
          300: '#58a6ff',
          400: '#388bfd',
          500: '#1f6feb',
          600: '#1158c7',
          700: '#0d419d',
          800: '#0c2d6b',
          900: '#051d4d',
        },
        brown: {
          50: '#f9f8f3',
          100: '#f1efe5',
          200: '#ded9c3',
          300: '#d3c9b0',
          400: '#b7a683',
        },
      },
      fontSize: {
        sm: ['0.9rem'],
        '6xl': ['3.75rem'],
      },
      listStyleType: {
        square: 'square',
      },
      rotate: {
        '-33': '-33deg',
        33: '33deg',
        '-23': '-23deg',
        23: '23deg',
      },
      screens: {
        'xs-only': { max: '475px' },
        ...defaultTheme.screens,
        'hover-hover': { raw: '(hover: hover)' },
      },
      transitionProperty: {
        rotate: 'rotate',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
    borderWidth: {
      DEFAULT: '3px',
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.warmGray,
      green: colors.lime,
      red: colors.red,
      blue: colors.indigo,
    },
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1380px',
      },
    },
    fontFamily: {
      usual: 'usual, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
      scale: ['group-hover'],
      rotate: ['group-hover'],
    },
  },
  plugins: [typography],
};
