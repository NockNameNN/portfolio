import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
        'orage': '#FEA55F',
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
      borderWidth: {
        DEFAULT: '1px',
      },
      borderColor: {
        DEFAULT: '#1E2D3D',
        'orange': '#FEA55F',
      },
    },
  },
  plugins: [],
};
export default config;
