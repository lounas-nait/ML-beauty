import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#fce8e3',
          200: '#f8d4ce',
          300: '#f4a89c',
          400: '#ef6b54',
          500: '#e84d2f',
          600: '#c73b1f',
          700: '#a5291a',
          800: '#8b251a',
          900: '#75251d',
        },
        rose: {
          50: '#fff5f7',
          100: '#ffe0e6',
          200: '#ffc0d3',
          300: '#ff99b3',
          400: '#ff5a80',
          500: '#ff2d66',
          600: '#e60039',
          700: '#bd002d',
          800: '#990027',
          900: '#7d0025',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '700': '700ms',
      },
    },
  },
  plugins: [],
}

export default config
