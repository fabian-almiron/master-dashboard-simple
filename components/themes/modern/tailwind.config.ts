import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './components/themes/modern/**/*.{ts,tsx}',
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
      colors: {
        border: "hsl(var(--modern-border))",
        input: "hsl(var(--modern-input))",
        ring: "hsl(var(--modern-ring))",
        background: "hsl(var(--modern-background))",
        foreground: "hsl(var(--modern-foreground))",
        primary: {
          DEFAULT: "hsl(var(--modern-primary))",
          foreground: "hsl(var(--modern-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--modern-secondary))",
          foreground: "hsl(var(--modern-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--modern-destructive))",
          foreground: "hsl(var(--modern-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--modern-muted))",
          foreground: "hsl(var(--modern-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--modern-accent))",
          foreground: "hsl(var(--modern-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--modern-popover))",
          foreground: "hsl(var(--modern-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--modern-card))",
          foreground: "hsl(var(--modern-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--modern-radius)",
        md: "calc(var(--modern-radius) - 2px)",
        sm: "calc(var(--modern-radius) - 4px)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--modern-primary) / 0.5)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--modern-primary) / 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config 