import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './ui/**/*.{ts,tsx}',
    './page-templates/**/*.{ts,tsx}',
    './*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        'theme-primary': {
          50: '#ecfdf4',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#00ff88',
          600: '#00d970',
          700: '#00b35c',
          800: '#008d48',
          900: '#006735',
        },
        'theme-gray': {
          50: '#0a0a0b',
          100: '#111113',
          200: '#1a1a1d',
          300: '#2d2d32',
          400: '#404047',
          500: '#525259',
          600: '#65656b',
          700: '#7a7a80',
          800: '#9d9da3',
          900: '#e8e8ea',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config