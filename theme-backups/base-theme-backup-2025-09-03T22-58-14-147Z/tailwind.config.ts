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
        sans: ["Crimson Text", "sans-serif"],
        heading: ["Playfair Display", "sans-serif"],
      },
      colors: {
        'theme-primary': {
          50: '#fefcf0',
          100: '#fef7d8',
          200: '#fdeeb0',
          300: '#fbe087',
          400: '#f8cc5e',
          500: '#d4af37',
          600: '#b8952e',
          700: '#9c7b25',
          800: '#80611c',
          900: '#644713',
        },
        'theme-gray': {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#ebe7e0',
          300: '#d6cfc4',
          400: '#b8ab9c',
          500: '#8b7355',
          600: '#6b4423',
          700: '#4a2c16',
          800: '#2d1a0d',
          900: '#1a0f08',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config