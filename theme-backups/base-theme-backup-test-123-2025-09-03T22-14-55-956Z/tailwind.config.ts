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
        sans: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      colors: {
        'theme-primary': {
          50: 'rgb(var(--theme-primary-50) / <alpha-value>)',
          100: 'rgb(var(--theme-primary-100) / <alpha-value>)',
          200: 'rgb(var(--theme-primary-200) / <alpha-value>)',
          300: 'rgb(var(--theme-primary-300) / <alpha-value>)',
          400: 'rgb(var(--theme-primary-400) / <alpha-value>)',
          500: 'rgb(var(--theme-primary-500) / <alpha-value>)',  // Main brand color
          600: 'rgb(var(--theme-primary-600) / <alpha-value>)',
          700: 'rgb(var(--theme-primary-700) / <alpha-value>)',
          800: 'rgb(var(--theme-primary-800) / <alpha-value>)',
          900: 'rgb(var(--theme-primary-900) / <alpha-value>)',
        },
        'theme-gray': {
          50: 'rgb(var(--theme-gray-50) / <alpha-value>)',
          100: 'rgb(var(--theme-gray-100) / <alpha-value>)',
          200: 'rgb(var(--theme-gray-200) / <alpha-value>)',
          300: 'rgb(var(--theme-gray-300) / <alpha-value>)',
          400: 'rgb(var(--theme-gray-400) / <alpha-value>)',
          500: 'rgb(var(--theme-gray-500) / <alpha-value>)',
          600: 'rgb(var(--theme-gray-600) / <alpha-value>)',
          700: 'rgb(var(--theme-gray-700) / <alpha-value>)',
          800: 'rgb(var(--theme-gray-800) / <alpha-value>)',
          900: 'rgb(var(--theme-gray-900) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
