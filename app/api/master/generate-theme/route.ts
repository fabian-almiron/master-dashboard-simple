import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import Anthropic from '@anthropic-ai/sdk'
// Theme generation rules embedded directly to avoid JSON import issues
const themeRules = {
  projectContext: {
    description: "You are building a theme for CMS TailWinds, a Next.js-based content management system with auto-discovery of UI components. The theme will be dropped into a /themes/[theme-name]/ directory and must work immediately with the CMS's component auto-discovery system.",
    system: "Next.js + TypeScript",
    framework: "Tailwind CSS",
    autoDiscovery: true,
    themeDirectory: "/themes/[theme-name]/"
  },
  componentMetadata: {
    format: {
      structure: {
        type: "ComponentName",
        name: "Display Name",
        description: "Component description for admin interface",
        category: "content-blocks",
        icon: "IconName"
      }
    }
  },
  requiredComponents: {
    Header: {
      category: "layout",
      metadata: {
        type: "Header",
        name: "Header",
        description: "Site navigation and branding header",
        category: "layout",
        icon: "Navigation"
      }
    }
  },
  cssVariablesSystem: {
    usage: {
      backgrounds: [
        "bg-theme-primary-500 // Main brand color",
        "bg-theme-primary-50 // Light brand tint",
        "bg-theme-gray-50 // Light gray background"
      ],
      textColors: [
        "text-theme-primary-600 // Brand text",
        "text-theme-gray-900 // Dark text",
        "text-theme-gray-600 // Medium text"
      ],
      borders: [
        "border-theme-gray-200 // Light borders",
        "border-theme-primary-500 // Brand borders"
      ],
      focusStates: [
        "focus:ring-theme-primary-500 // Focus rings"
      ]
    }
  },
  componentExamples: {
    hero: {
      metadata: {
        type: "Hero",
        name: "Hero Section",
        description: "Main landing section with headline and CTA",
        category: "content-blocks",
        icon: "Zap"
      },
      structure: {
        section: "w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-theme-primary-50 to-theme-accent-50",
        container: "container px-4 md:px-6 mx-auto",
        content: "flex flex-col items-center space-y-4 text-center",
        headline: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-theme-gray-900",
        description: "mx-auto max-w-[700px] text-theme-gray-600 md:text-xl",
        buttons: "space-x-4 with primary and secondary buttons"
      }
    }
  },
  responsiveDesign: {
    classes: {
      text: "text-sm md:text-base lg:text-lg",
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "py-8 md:py-12 lg:py-16",
      padding: "px-4 md:px-6"
    }
  },
  icons: {
    commonIcons: [
      "Navigation", "Menu", "Layout", "Grid", "Square", "Circle",
      "Zap", "Star", "Heart", "Mail", "Phone", "User",
      "ArrowRight", "ChevronRight", "Plus", "Minus", "X",
      "Check", "AlertCircle", "Info", "Settings"
    ]
  }
}

interface ThemeGenerationRequest {
  websiteName: string
  themeName: string
  description: string
  industry: string
  colorScheme: string
  style: string
  mood: string
  prompt?: string
  claudeApiKey: string
}

// Simple fallback functions to avoid template string issues
function createFallbackHeader(websiteName: string): string {
  return [
    '// AI generation failed - using basic template',
    'export const metadata = {',
    '  type: \'Header\',',
    '  name: \'Header\',',
    '  description: \'Site navigation and branding header\',',
    '  category: \'layout\',',
    '  icon: \'Menu\',',
    '}',
    '',
    'export default function Header() {',
    '  return (',
    '    <header className="bg-white border-b border-gray-200">',
    '      <div className="container mx-auto px-4 py-4">',
    '        <div className="flex justify-between items-center">',
    `          <h1 className="text-xl font-bold">${websiteName}</h1>`,
    '          <nav className="space-x-4">',
    '            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>',
    '            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>',
    '            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>',
    '          </nav>',
    '        </div>',
    '      </div>',
    '    </header>',
    '  )',
    '}'
  ].join('\n')
}

function createFallbackHero(websiteName: string, description: string): string {
  return [
    '// AI generation failed - using basic template',
    'export const metadata = {',
    '  type: \'Hero\',',
    '  name: \'Hero Section\',',
    '  description: \'Main landing section with headline and CTA\',',
    '  category: \'content-blocks\',',
    '  icon: \'Zap\',',
    '}',
    '',
    'export default function Hero() {',
    '  return (',
    '    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">',
    '      <div className="container mx-auto px-4 text-center">',
    `        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ${websiteName}</h1>`,
    `        <p className="text-xl mb-8 max-w-2xl mx-auto">${description}</p>`,
    '        <div className="space-x-4">',
    '          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Started</button>',
    '          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">Learn More</button>',
    '        </div>',
    '      </div>',
    '    </section>',
    '  )',
    '}'
  ].join('\n')
}

function createFallbackFeatures(): string {
  return [
    '// AI generation failed - using basic template',
    'export const metadata = {',
    '  type: \'Features\',',
    '  name: \'Features Section\',',
    '  description: \'Showcase your key features and benefits\',',
    '  category: \'content-blocks\',',
    '  icon: \'Grid3X3\',',
    '}',
    '',
    'export default function Features() {',
    '  const features = [',
    '    { title: \'Feature One\', description: \'Description of your first key feature goes here.\', icon: \'✓\' },',
    '    { title: \'Feature Two\', description: \'Description of your second key feature goes here.\', icon: \'✓\' },',
    '    { title: \'Feature Three\', description: \'Description of your third key feature goes here.\', icon: \'✓\' }',
    '  ]',
    '',
    '  return (',
    '    <section className="py-16 bg-gray-50">',
    '      <div className="container mx-auto px-4">',
    '        <div className="text-center mb-12">',
    '          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Features</h2>',
    '          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover what makes our solution unique and powerful.</p>',
    '        </div>',
    '        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">',
    '          {features.map((feature, index) => (',
    '            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">',
    '              <div className="text-4xl text-green-500 mb-4">{feature.icon}</div>',
    '              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>',
    '              <p className="text-gray-600">{feature.description}</p>',
    '            </div>',
    '          ))}',
    '        </div>',
    '      </div>',
    '    </section>',
    '  )',
    '}'
  ].join('\n')
}

// Generate color palette using Claude AI
async function generateColorPalette(colorScheme: string, websiteName: string, prompt: string, claudeApiKey: string) {
  const promptText = `
You are a color design expert specializing in creating cohesive color palettes for CMS TailWinds themes.

CRITICAL: You MUST follow the exact CSS variables system defined in the theme generation rules. The colors must work immediately with the theme system.

WEBSITE: "${websiteName}"
COLOR SCHEME: ${colorScheme}
${prompt ? `ADDITIONAL REQUIREMENTS: ${prompt}` : ''}

REQUIRED CSS VARIABLES SYSTEM:
${JSON.stringify(themeRules.cssVariablesSystem.root.variables, null, 2)}

REQUIRED OUTPUT FORMAT:
Return ONLY a JSON object with this exact structure:
{
  "primary": "RGB values separated by spaces (e.g., '25 118 210')",
  "gray": "RGB values separated by spaces (e.g., '97 97 97')",
  "accent": "RGB values separated by spaces (e.g., '76 175 80')"
}

The RGB values should:
- Be separated by single spaces (not commas)
- Work well together as a cohesive palette
- Match the "${colorScheme}" color scheme description
- Follow modern design principles for the "${websiteName}" website

Each color should have the full RGB triplet (three values) for proper CSS variable usage.
`

  const anthropic = new Anthropic({
    apiKey: claudeApiKey,
  })

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1000,
    temperature: 0.7,
    messages: [
      {
        role: 'user',
        content: promptText
      }
    ]
  })

  try {
    const content = response.content[0]
    if (content.type === 'text') {
      const colors = JSON.parse(content.text.trim())
      return colors
    }
  } catch (error) {
    console.error('Failed to parse Claude color response:', error)
  }

  // Fallback colors
  return {
    primary: '25 118 210',
    gray: '97 97 97',
    accent: '76 175 80'
  }
}

// Generate styles.css content
async function generateStylesCSS(colorScheme: string, websiteName: string, prompt: string, claudeApiKey: string) {
  const colors = await generateColorPalette(colorScheme, websiteName, prompt, claudeApiKey)

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Theme Primary Colors */
  --theme-primary-50: ${colors.primary} / 0.05;
  --theme-primary-100: ${colors.primary} / 0.1;
  --theme-primary-200: ${colors.primary} / 0.2;
  --theme-primary-300: ${colors.primary} / 0.3;
  --theme-primary-400: ${colors.primary} / 0.4;
  --theme-primary-500: ${colors.primary} / 1;
  --theme-primary-600: ${colors.primary} / 0.8;
  --theme-primary-700: ${colors.primary} / 0.6;
  --theme-primary-800: ${colors.primary} / 0.4;
  --theme-primary-900: ${colors.primary} / 0.2;

  /* Theme Gray Colors */
  --theme-gray-50: ${colors.gray} / 0.05;
  --theme-gray-100: ${colors.gray} / 0.1;
  --theme-gray-200: ${colors.gray} / 0.2;
  --theme-gray-300: ${colors.gray} / 0.3;
  --theme-gray-400: ${colors.gray} / 0.4;
  --theme-gray-500: ${colors.gray} / 1;
  --theme-gray-600: ${colors.gray} / 0.8;
  --theme-gray-700: ${colors.gray} / 0.6;
  --theme-gray-800: ${colors.gray} / 0.4;
  --theme-gray-900: ${colors.gray} / 0.2;

  /* Theme Accent Colors */
  --theme-accent-50: ${colors.accent} / 0.05;
  --theme-accent-100: ${colors.accent} / 0.1;
  --theme-accent-200: ${colors.accent} / 0.2;
  --theme-accent-300: ${colors.accent} / 0.3;
  --theme-accent-400: ${colors.accent} / 0.4;
  --theme-accent-500: ${colors.accent} / 1;
  --theme-accent-600: ${colors.accent} / 0.8;
  --theme-accent-700: ${colors.accent} / 0.6;
  --theme-accent-800: ${colors.accent} / 0.4;
  --theme-accent-900: ${colors.accent} / 0.2;
}

/* Custom styles for ${websiteName} theme */
.theme-custom-gradient {
  background: linear-gradient(135deg, rgb(${colors.primary}) 0%, rgb(${colors.accent}) 100%);
}

.theme-glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
`
}

// Generate tailwind.config.ts content
async function generateTailwindConfig(websiteName: string, colorScheme: string, prompt: string, claudeApiKey: string) {
  const colors = await generateColorPalette(colorScheme, websiteName, prompt, claudeApiKey)

  return `import type { Config } from "tailwindcss"

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
          50: 'rgb(${colors.primary} / 0.05)',
          100: 'rgb(${colors.primary} / 0.1)',
          200: 'rgb(${colors.primary} / 0.2)',
          300: 'rgb(${colors.primary} / 0.3)',
          400: 'rgb(${colors.primary} / 0.4)',
          500: 'rgb(${colors.primary} / 1)',
          600: 'rgb(${colors.primary} / 0.8)',
          700: 'rgb(${colors.primary} / 0.6)',
          800: 'rgb(${colors.primary} / 0.4)',
          900: 'rgb(${colors.primary} / 0.2)',
        },
        'theme-gray': {
          50: 'rgb(${colors.gray} / 0.05)',
          100: 'rgb(${colors.gray} / 0.1)',
          200: 'rgb(${colors.gray} / 0.2)',
          300: 'rgb(${colors.gray} / 0.3)',
          400: 'rgb(${colors.gray} / 0.4)',
          500: 'rgb(${colors.gray} / 1)',
          600: 'rgb(${colors.gray} / 0.8)',
          700: 'rgb(${colors.gray} / 0.6)',
          800: 'rgb(${colors.gray} / 0.4)',
          900: 'rgb(${colors.gray} / 0.2)',
        },
        'theme-accent': {
          50: 'rgb(${colors.accent} / 0.05)',
          100: 'rgb(${colors.accent} / 0.1)',
          200: 'rgb(${colors.accent} / 0.2)',
          300: 'rgb(${colors.accent} / 0.3)',
          400: 'rgb(${colors.accent} / 0.4)',
          500: 'rgb(${colors.accent} / 1)',
          600: 'rgb(${colors.accent} / 0.8)',
          700: 'rgb(${colors.accent} / 0.6)',
          800: 'rgb(${colors.accent} / 0.4)',
          900: 'rgb(${colors.accent} / 0.2)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
`
}

// Generate Header component using Claude AI
async function generateHeaderComponent(websiteName: string, style: string, mood: string, prompt: string, claudeApiKey: string) {
  const promptText = 'You are a React/Next.js developer specializing in creating beautiful header components for CMS TailWinds themes.\n\n' +
    'CRITICAL: You MUST follow the exact rules and structure defined in the theme generation rules. The theme must work immediately with the CMS\'s component auto-discovery system.\n\n' +
    'WEBSITE DETAILS:\n' +
    '- Name: "' + websiteName + '"\n' +
    '- Style: ' + style + '\n' +
    '- Mood: ' + mood + '\n' +
    (prompt ? '- Additional requirements: ' + prompt + '\n' : '') +
    '\nREQUIRED COMPONENT STRUCTURE:\n' +
    JSON.stringify(themeRules.requiredComponents.Header, null, 2) + '\n\n' +
    'REQUIRED METADATA FORMAT:\n' +
    JSON.stringify(themeRules.componentMetadata.format, null, 2) + '\n\n' +
    'REQUIRED STYLING SYSTEM:\n' +
    JSON.stringify(themeRules.cssVariablesSystem.usage, null, 2) + '\n\n' +
    'Return ONLY the complete React component code as a string with:\n' +
    '1. TypeScript with proper types\n' +
    '2. Exact metadata export format as specified\n' +
    '3. useNavigation hook integration\n' +
    '4. Mobile-responsive design\n' +
    '5. Lucide React icons\n' +
    '6. Theme color classes only\n' +
    '7. Component named "Header" with category "layout"\n\n' +
    'The generated code MUST be immediately usable in the CMS without any modifications.'

  const anthropic = new Anthropic({
    apiKey: claudeApiKey,
  })

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 2000,
    temperature: 0.7,
    messages: [
      {
        role: 'user',
        content: promptText
      }
    ]
  })

  if (response.content[0].type === 'text') {
    return response.content[0].text.trim()
  }

  // Use fallback template if AI fails
  return createFallbackHeader(websiteName)
}

// Generate Footer component
function generateFooterComponent(websiteName: string) {
  return `import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Footer',
  description: 'Site footer with links and information for ${websiteName}',
  category: 'layout',
  icon: 'Layout',
}

export default function Footer() {
  return (
    <footer className="w-full bg-theme-gray-900 text-white">
      <div className="container px-5 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-theme-primary-500 to-theme-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">${websiteName.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-xl font-bold">${websiteName}</span>
            </div>
            <p className="text-theme-gray-400 max-w-md">
              Your website description goes here. This is a great place to tell visitors about your mission and values.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-theme-gray-400">
              <li><a href="#" className="hover:text-theme-primary-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-theme-primary-400 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-theme-primary-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-theme-primary-400 transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-theme-gray-800 mt-8 pt-8 text-center text-theme-gray-400">
          <p>&copy; 2024 ${websiteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}`
}

// Generate Hero component (legacy - replaced by AI version)
function generateHeroComponentLegacy(websiteName: string, description: string, mood: string) {
  const moodClasses = {
    professional: 'text-left',
    friendly: 'text-center',
    energetic: 'text-center',
    calm: 'text-center',
    elegant: 'text-center',
    creative: 'text-center',
    adventurous: 'text-left',
    minimal: 'text-center'
  }

  return `import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Hero Section',
  description: 'Main landing section with headline and CTA for ${websiteName}',
  category: 'content-blocks',
  icon: 'Zap',
}

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-theme-primary-50 to-theme-accent-50">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col items-center space-y-4 ${moodClasses[mood as keyof typeof moodClasses] || 'text-center'}">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-theme-gray-900">
              Welcome to ${websiteName}
            </h1>
            <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl">
              ${description}
            </p>
          </div>
          <div className="space-x-4">
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-theme-primary-500 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-theme-primary-600 focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-theme-gray-300 bg-white px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-theme-gray-50 focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}`
}

// Generate other components (simplified versions - legacy)
function generateFeaturesComponentLegacy() {
  return `import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { CheckCircle } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Features Section',
  description: 'Showcase your key features and benefits',
  category: 'content-blocks',
  icon: 'Grid3X3',
}

export default function Features() {
  const features = [
    {
      title: 'Feature One',
      description: 'Description of your first key feature goes here.',
      icon: <CheckCircle className="h-6 w-6 text-theme-primary-500" />
    },
    {
      title: 'Feature Two',
      description: 'Description of your second key feature goes here.',
      icon: <CheckCircle className="h-6 w-6 text-theme-primary-500" />
    },
    {
      title: 'Feature Three',
      description: 'Description of your third key feature goes here.',
      icon: <CheckCircle className="h-6 w-6 text-theme-primary-500" />
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-gray-900 mb-4">
            Our Features
          </h2>
          <p className="mx-auto max-w-[600px] text-theme-gray-600 md:text-lg">
            Discover what makes our solution unique and powerful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-theme-gray-50 rounded-lg">
              <div className="mb-4 p-3 bg-theme-primary-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-theme-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-theme-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`
}

// Generate DNDArea component (required)
function generateDNDAreaComponent() {
  return `import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: 'DNDArea',
  name: 'Content Area',
  description: 'Dynamic content area for templates (Elementor-style)',
  category: 'layout',
  icon: 'Square',
}

interface DNDAreaProps {
  pageBlocks?: any[]
  isTemplateEdit?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  background?: string
}

export default function DNDArea({
  pageBlocks = [],
  isTemplateEdit = false,
  padding = 'medium',
  background = ''
}: DNDAreaProps) {
  const paddingClass = {
    none: '',
    small: 'py-4',
    medium: 'py-8 md:py-12',
    large: 'py-12 md:py-24'
  }[padding]

  if (isTemplateEdit) {
    return (
      <div
        className={\`w-full \${paddingClass} \${background}\`}
        style={background && !background.startsWith('bg-') ? { backgroundColor: background } : {}}
      >
        <div className="container mx-auto px-4">
          <div className="border-2 border-dashed border-theme-gray-300 rounded-lg p-8 text-center bg-theme-gray-50">
            <div className="text-theme-gray-600">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Page Content Area</h3>
              <p className="text-sm">This area will display the page's content blocks when the template is used.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pageBlocks || pageBlocks.length === 0) {
    return (
      <div className={\`w-full \${paddingClass} \${background}\`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-theme-gray-900 mb-4">No Content Available</h2>
            <p className="text-theme-gray-600">Add content blocks to this page to see them here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={\`w-full \${paddingClass} \${background}\`}>
      <div className="container mx-auto px-4">
        {pageBlocks.map((block, index) => (
          <div key={block.id || index} className="mb-8">
            {/* Block content rendered by CMS */}
          </div>
        ))}
      </div>
    </div>
  )
}`
}

// Generate auto-register.tsx
function generateAutoRegister(themeName: string, websiteName: string) {
  return `import React from 'react'
import type { ComponentInfo } from '@/lib/cms-types'

// Import theme styles
import './styles.css'

// Import all your main UI components with metadata
import Header, { metadata as HeaderMetadata } from './ui/Header'
import Footer, { metadata as FooterMetadata } from './ui/Footer'
import DNDArea, { metadata as DNDAreaMetadata } from './ui/DNDArea'
import Hero, { metadata as HeroMetadata } from './ui/Hero'
import Features, { metadata as FeaturesMetadata } from './ui/Features'
// Add any additional components you create

export const themeName = '${themeName}'
export const themeDescription = 'AI-generated theme for ${websiteName}'
export const themeAuthor = 'AI Theme Generator'
export const themeVersion = '1.0.0'

export const componentRegistry = {
  [HeaderMetadata.type]: Header,
  [FooterMetadata.type]: Footer,
  [DNDAreaMetadata.type]: DNDArea,
  [HeroMetadata.type]: Hero,
  [FeaturesMetadata.type]: Features,
  // Add any additional components you create
} as const

export const componentInfo: ComponentInfo[] = [
  HeaderMetadata,
  FooterMetadata,
  DNDAreaMetadata,
  HeroMetadata,
  FeaturesMetadata,
  // Add any additional component metadata you create
]

export const getComponent = (type: string) => componentRegistry[type as keyof typeof componentRegistry]
export const renderComponent = (type: string, props: Record<string, any> = {}) => {
  const Component = getComponent(type)
  return Component ? <Component {...props} /> : null
}
export const getComponentInfo = (type: string) => componentInfo.find(info => info.type === type)
export const getAllComponents = () => componentInfo
export const getComponentsByCategory = (category: string) => componentInfo.filter(info => info.category === category)
`
}

// Generate register-blocks.tsx
function generateRegisterBlocks() {
  return `export * from './auto-register'`
}

// Generate README.md
function generateReadme(themeName: string, websiteName: string) {
  return `# ${themeName} Theme

AI-generated theme for ${websiteName}.

## Installation

1. Copy this theme folder to your CMS themes directory
2. The theme will be automatically discovered by the CMS
3. Activate the theme from the admin panel

## Components

This theme includes the following components:

- **Header**: Navigation and branding header
- **Footer**: Site footer with links
- **DNDArea**: Dynamic content area for templates
- **Hero**: Main landing section
- **Features**: Feature showcase section

## Customization

The theme uses CSS custom properties for easy customization. Edit the \`styles.css\` file to modify colors and other design elements.

## Color Scheme

- Primary: Theme brand colors
- Gray: Neutral colors for text and backgrounds
- Accent: Secondary accent colors

## Generated by AI

This theme was generated using AI based on the following specifications:
- Website: ${websiteName}
- Theme Name: ${themeName}
- Generation Date: ${new Date().toISOString().split('T')[0]}
`
}

// Generate Hero component using Claude AI
async function generateHeroComponent(websiteName: string, description: string, style: string, mood: string, prompt: string, claudeApiKey: string) {
  const promptText = 'You are a React/Next.js developer specializing in creating compelling hero sections for CMS TailWinds themes.\n\n' +
    'CRITICAL: You MUST follow the exact rules and structure defined in the theme generation rules. The theme must work immediately with the CMS\'s component auto-discovery system.\n\n' +
    'WEBSITE DETAILS:\n' +
    '- Name: "' + websiteName + '"\n' +
    '- Description: "' + description + '"\n' +
    '- Style: ' + style + '\n' +
    '- Mood: ' + mood + '\n' +
    (prompt ? '- Additional requirements: ' + prompt + '\n' : '') +
    '\nREQUIRED METADATA FORMAT:\n' +
    JSON.stringify(themeRules.componentExamples.hero.metadata, null, 2) + '\n\n' +
    'REQUIRED STRUCTURE:\n' +
    JSON.stringify(themeRules.componentExamples.hero.structure, null, 2) + '\n\n' +
    'REQUIRED STYLING SYSTEM:\n' +
    JSON.stringify(themeRules.cssVariablesSystem.usage, null, 2) + '\n\n' +
    'REQUIRED RESPONSIVE DESIGN:\n' +
    JSON.stringify(themeRules.responsiveDesign.classes, null, 2) + '\n\n' +
    'Return ONLY the complete React component code as a string with:\n' +
    '1. TypeScript with proper types\n' +
    '2. Exact metadata export format as specified\n' +
    '3. Compelling headline based on website description\n' +
    '4. Call-to-action buttons\n' +
    '5. Mobile-responsive design\n' +
    '6. Lucide React icons (if needed)\n' +
    '7. Theme color classes only\n' +
    '8. Component named "Hero" with category "content-blocks"\n\n' +
    'The generated code MUST be immediately usable in the CMS without any modifications.'

  const anthropic = new Anthropic({
    apiKey: claudeApiKey,
  })

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: promptText
        }
      ]
    })

    if (response.content[0].type === 'text') {
      return response.content[0].text.trim()
    }
  } catch (error) {
    console.error('Claude API error for Hero component:', error)
  }

  // Use fallback template if AI fails
  return createFallbackHero(websiteName, description)
}

// Generate Features component using Claude AI
async function generateFeaturesComponent(websiteName: string, industry: string, prompt: string, claudeApiKey: string) {
  const promptText = 'You are a React/Next.js developer specializing in creating features sections for CMS TailWinds themes.\n\n' +
    'CRITICAL: You MUST follow the exact rules and structure defined in the theme generation rules. The theme must work immediately with the CMS\'s component auto-discovery system.\n\n' +
    'WEBSITE DETAILS:\n' +
    '- Name: "' + websiteName + '"\n' +
    '- Industry: ' + industry + '\n' +
    (prompt ? '- Additional requirements: ' + prompt + '\n' : '') +
    '\nREQUIRED METADATA FORMAT:\n' +
    '{\n' +
    '  "type": "Features",\n' +
    '  "name": "Features Section",\n' +
    '  "description": "Showcase your key features and benefits",\n' +
    '  "category": "content-blocks",\n' +
    '  "icon": "Grid3X3"\n' +
    '}\n\n' +
    'REQUIRED STYLING SYSTEM:\n' +
    JSON.stringify(themeRules.cssVariablesSystem.usage, null, 2) + '\n\n' +
    'REQUIRED RESPONSIVE DESIGN:\n' +
    JSON.stringify(themeRules.responsiveDesign.classes, null, 2) + '\n\n' +
    'REQUIRED ICONS:\n' +
    JSON.stringify(themeRules.icons.commonIcons.slice(0, 10), null, 2) + '\n\n' +
    'Return ONLY the complete React component code as a string with:\n' +
    '1. TypeScript with proper types\n' +
    '2. Exact metadata export format as specified\n' +
    '3. 3-4 industry-relevant features with compelling descriptions\n' +
    '4. Lucide React icons for each feature\n' +
    '5. Mobile-responsive grid layout\n' +
    '6. Theme color classes only\n' +
    '7. Component named "Features" with category "content-blocks"\n\n' +
    'Create features that are specifically relevant to the "' + industry + '" industry and would genuinely help users understand the value proposition.\n\n' +
    'The generated code MUST be immediately usable in the CMS without any modifications.'

  const anthropic = new Anthropic({
    apiKey: claudeApiKey,
  })

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: promptText
        }
      ]
    })

    if (response.content[0].type === 'text') {
      return response.content[0].text.trim()
    }
  } catch (error) {
    console.error('Claude API error for Features component:', error)
  }

  // Use fallback template if AI fails
  return createFallbackFeatures()
}

export async function POST(request: NextRequest) {
  try {
    const body: ThemeGenerationRequest = await request.json()
    const {
      websiteName,
      themeName,
      description,
      industry,
      colorScheme,
      style,
      mood,
      prompt,
      claudeApiKey
    } = body

    // Create theme directory structure
    const themesDir = path.join(process.cwd(), 'cms-master', 'themes')
    const themeDir = path.join(themesDir, themeName)
    const uiDir = path.join(themeDir, 'ui')

    // Create directories
    await fs.mkdir(themeDir, { recursive: true })
    await fs.mkdir(uiDir, { recursive: true })

    // Generate and write files
    const files = [
      // Core configuration files
      { path: path.join(themeDir, 'styles.css'), content: await generateStylesCSS(colorScheme, websiteName, prompt, claudeApiKey) },
      { path: path.join(themeDir, 'tailwind.config.ts'), content: await generateTailwindConfig(websiteName, colorScheme, prompt, claudeApiKey) },
      { path: path.join(themeDir, 'auto-register.tsx'), content: generateAutoRegister(themeName, websiteName) },
      { path: path.join(themeDir, 'register-blocks.tsx'), content: generateRegisterBlocks() },
      { path: path.join(themeDir, 'README.md'), content: generateReadme(themeName, websiteName) },

      // UI Components
      { path: path.join(uiDir, 'Header.tsx'), content: await generateHeaderComponent(websiteName, style, mood, prompt, claudeApiKey) },
      { path: path.join(uiDir, 'Footer.tsx'), content: generateFooterComponent(websiteName) },
      { path: path.join(uiDir, 'DNDArea.tsx'), content: generateDNDAreaComponent() },
      { path: path.join(uiDir, 'Hero.tsx'), content: await generateHeroComponent(websiteName, description, style, mood, prompt, claudeApiKey) },
      { path: path.join(uiDir, 'Features.tsx'), content: await generateFeaturesComponent(websiteName, industry, prompt, claudeApiKey) },
    ]

    // Write all files
    for (const file of files) {
      await fs.writeFile(file.path, file.content, 'utf-8')
    }

    return NextResponse.json({
      success: true,
      message: `Theme "${themeName}" generated successfully`,
      themeName,
      themePath: `cms-master/themes/${themeName}`,
      filesGenerated: files.length
    })

  } catch (error) {
    console.error('Theme generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate theme', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
