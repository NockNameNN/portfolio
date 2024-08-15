import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'high-height': { 'raw': '(min-height: 500px)'},
      'game-screen': { 'raw': '(min-height: 720px) and (min-width: 1024px)'},
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        'game': 'repeat(24, minmax(0, 1fr))',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-game': 'linear-gradient(180deg, #237b6d, rgba(67, 217, 173, .13))',
        'blurry-gradient-blue': 'radial-gradient(circle at 50% 50%, rgba(77, 91, 206, 1), rgba(76, 0, 255, 0))',
        'blurry-gradient-green': 'radial-gradient(circle at 50% 50%, rgba(67, 217, 173, 1), rgba(76, 0, 255, 0))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'black': {
          DEFAULT: '#01080E',
          light: '#011627',
          dark: '#011221',
        },
        'green': {
          DEFAULT: '#3C9D93',
          light: '#43D9AD',
        },
        'white': {
          DEFAULT: '#FFFFFF', 
          'header': '#E5E9F0'
        },
        'orange': '#FEA55F',
        'red': '#E99287',
        'purpure': '#C98BDF',
        'gray': '#607B96',
        'blue': '#4D5BCE',
        'line': '#1E2D3D',
        'background': '#010C15'
      },
      fontSize: {
        head: '62px',
        subhead: '32px',
        body: '18px',
        label: '16px',
        code: '14px',
      },
      fontWeight: {
        'retina': '450',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      borderColor: {
        DEFAULT: '#1E2D3D',
        'orange': '#FEA55F',
      },
      borderRadius: {
        'blurry-gradient': '0% 0% 50% 50%',
      },
      boxShadow: {
        'inner-game': 'inset 0px 2px 0px 0px rgba(255, 255, 255, 0.3)',
        'inner-snake': 'inset 1px 5px 11px rgba(2, 18, 27, 0.71)',
        'hover-button': '0 0 10px #43d9ad',
      }
    },
  },
  plugins: [],
};
export default config;
