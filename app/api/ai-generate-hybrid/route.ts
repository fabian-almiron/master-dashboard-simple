import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs/promises'
import path from 'path'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ComponentBlock {
  id: string
  name: string
  description: string
  tags: string[]
  style: string
  complexity: string
  features: string[]
  suitable_for: string[]
  template: string
}

interface ComponentBlocks {
  headers: ComponentBlock[]
  heroes: ComponentBlock[]
  footers: ComponentBlock[]
}

interface AISelection {
  selectedComponents: {
    header: string
    hero: string
    footer: string
  }
  sitemap: Array<{
    path: string
    name: string
    description: string
  }>
  content: {
    header: any
    hero: any
    footer: any
  }
  projectConfig: {
    name: string
    description: string
    style: string
    colors: {
      primary: string
      secondary: string
    }
  }
}

async function loadComponentBlocks(): Promise<ComponentBlocks> {
  const [headersData, heroesData, footersData] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-header-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-hero-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-footer-blocks.json'), 'utf-8')
  ])

  return {
    headers: JSON.parse(headersData).headers,
    heroes: JSON.parse(heroesData).heroes,
    footers: JSON.parse(footersData).footers
  }
}

async function getAISelection(prompt: string, componentBlocks: ComponentBlocks): Promise<AISelection> {
  const systemPrompt = `You are an expert web designer. Based on the user's request, select the most appropriate components and generate realistic content.

AVAILABLE COMPONENTS:

HEADERS:
${componentBlocks.headers.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

HEROES:
${componentBlocks.heroes.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

FOOTERS:
${componentBlocks.footers.map(f => `- ${f.id}: ${f.name} (${f.tags.join(', ')}) - ${f.description}`).join('\n')}

IMPORTANT: Always provide ALL possible props for each component type. Different components may need different props:
- Header components may need: ctaText, ctaHref, socialLinks, contactInfo (phone, email, address, hours), emergencyPhone, serviceAreas, patientPortalHref, agentInfo (name, phone, email), searchHref
- Hero components may need: primaryCta, secondaryCta, ctaText, ctaHref, features, heroImage, backgroundImage, credentials, testimonialQuote, testimonialAuthor, emergencyPhone, officeHours, patientStats (yearsExperience, patientsServed, satisfactionRate), specialOffer, hours, location, menuHighlights, serviceAreas, guarantees, responseTime, serviceHighlights, agentName, agentCredentials, marketStats (propertiesSold, avgDaysOnMarket, clientSatisfaction)
- Footer components may need: tagline, description, columns, contactInfo (email, phone, address, hours), socialLinks, credentials, emergencyPhone, patientResources, specialHours, serviceAreas, licenses, specialOffers, agentInfo (name, phone, email, license), marketStats (propertiesSold, avgDaysOnMarket, clientSatisfaction)
Include all of them even if some are optional for the selected component. Generate realistic, industry-appropriate content for service businesses.

Return ONLY a JSON object with realistic content:
{
  "selectedComponents": {
    "header": "header-id",
    "hero": "hero-id", 
    "footer": "footer-id"
  },
  "sitemap": [
    {"path": "/", "name": "Home", "description": "Main landing page"},
    {"path": "/about", "name": "About", "description": "About page description"}
  ],
  "content": {
    "header": {
      "logo": "Company Name",
      "navigation": [{"label": "Home", "href": "/"}, {"label": "About", "href": "/about"}],
      "ctaText": "Get Started",
      "ctaHref": "/contact",
      "socialLinks": [{"platform": "twitter", "href": "#"}, {"platform": "instagram", "href": "#"}],
      "contactInfo": {
        "phone": "+1 (555) 123-4567",
        "email": "info@company.com",
        "address": "123 Main St, City, State",
        "hours": "Mon-Fri 9AM-5PM"
      },
      "emergencyPhone": "+1 (555) 911-HELP",
      "serviceAreas": "City & Surrounding Areas",
      "patientPortalHref": "/patient-portal",
      "agentInfo": {
        "name": "John Smith",
        "phone": "+1 (555) 123-4567",
        "email": "john@company.com"
      },
      "searchHref": "/search"
    },
    "hero": {
      "headline": "Your Compelling Headline",
      "description": "Engaging description",
      "primaryCta": {"text": "Get Started", "href": "/contact"},
      "secondaryCta": {"text": "Learn More", "href": "/about"},
      "ctaText": "Get Started",
      "ctaHref": "/contact",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "heroImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "backgroundImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "credentials": ["Licensed Professional", "Certified Expert", "Award Winner"],
      "testimonialQuote": "Exceptional service and expertise!",
      "testimonialAuthor": "John Smith, Client",
      "emergencyPhone": "+1 (555) 911-HELP",
      "officeHours": "Mon-Fri 9AM-5PM",
      "patientStats": {"yearsExperience": "15+", "patientsServed": "5000+", "satisfactionRate": "98%"},
      "specialOffer": "20% off first service for new clients",
      "hours": "Mon-Sun 11AM-10PM",
      "location": "Downtown District",
      "menuHighlights": ["Signature Dish", "Chef's Special", "Popular Item"],
      "serviceAreas": "City & 30-Mile Radius",
      "guarantees": ["100% Satisfaction", "Licensed & Insured", "Free Estimates"],
      "responseTime": "30 minutes",
      "serviceHighlights": ["Signature Service", "Popular Treatment", "Specialty Option"],
      "agentName": "John Smith",
      "agentCredentials": ["Licensed Realtor", "MLS Member", "Top Producer"],
      "marketStats": {"propertiesSold": "150+", "avgDaysOnMarket": "18", "clientSatisfaction": "98%"}
    },
    "footer": {
      "companyName": "Company Name",
      "tagline": "Optional tagline for dark minimal footer",
      "description": "Optional description for multi-column footer",
      "navigation": [{"label": "Home", "href": "/"}, {"label": "About", "href": "/about"}],
      "socialLinks": [{"platform": "twitter", "href": "#"}, {"platform": "linkedin", "href": "#"}],
      "copyright": "© 2024 Company Name. All rights reserved.",
      "columns": [{"title": "Services", "links": [{"label": "Web Design", "href": "/services"}]}],
      "contactInfo": {"email": "info@company.com", "phone": "+1 (555) 123-4567", "address": "123 Main St, City, State", "hours": "Mon-Fri 9AM-5PM"},
      "credentials": ["Licensed Professional", "Certified Expert", "Insured"],
      "emergencyPhone": "+1 (555) 911-HELP",
      "patientResources": [{"label": "Patient Portal", "href": "/portal"}, {"label": "Forms", "href": "/forms"}],
      "specialHours": "Holiday hours may vary",
      "serviceAreas": "City & Surrounding Areas",
      "licenses": ["License #12345", "Bonded & Insured"],
      "specialOffers": [{"title": "New Client Special", "description": "20% off first service"}],
      "agentInfo": {"name": "John Smith", "phone": "+1 (555) 123-4567", "email": "john@company.com", "license": "RE License #12345"},
      "marketStats": {"propertiesSold": "150+", "avgDaysOnMarket": "18", "clientSatisfaction": "98%"}
    }
  },
  "projectConfig": {
    "name": "project-name",
    "description": "Brief project description",
    "style": "modern-minimalist",
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#8B5CF6"
    }
  }
}`

  const stream = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 4000,
    temperature: 0.7,
    stream: true,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Create a website: ${prompt}`
      }
    ]
  })

  let fullResponse = ''
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      if (chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text
      }
    }
  }

  let cleanedResponse = fullResponse.trim()
  cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '')
  
  const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in AI response')
  }
  
  return JSON.parse(jsonMatch[0])
}

function generateProjectFiles(selection: AISelection, componentBlocks: ComponentBlocks): { [key: string]: string } {
  const selectedHeader = componentBlocks.headers.find(h => h.id === selection.selectedComponents.header)
  const selectedHero = componentBlocks.heroes.find(h => h.id === selection.selectedComponents.hero)
  const selectedFooter = componentBlocks.footers.find(f => f.id === selection.selectedComponents.footer)

  if (!selectedHeader || !selectedHero || !selectedFooter) {
    throw new Error('Selected components not found')
  }

  const files: { [key: string]: string } = {}

  // Package.json
  files['package.json'] = JSON.stringify({
    name: selection.projectConfig.name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      next: '14.0.4',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'lucide-react': '^0.263.1'
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^3',
      typescript: '^5'
    }
  }, null, 2)

  // Next.config.js
  files['next.config.js'] = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'pexels.com',
      }
    ],
  },
}

module.exports = nextConfig`

  // Tailwind config
  files['tailwind.config.ts'] = `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${selection.projectConfig.colors.primary}',
        secondary: '${selection.projectConfig.colors.secondary}',
      },
    },
  },
  plugins: [],
}
export default config`

  // PostCSS config
  files['postcss.config.js'] = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

module.exports = config`
  // TypeScript config
  files['tsconfig.json'] = JSON.stringify({
    compilerOptions: {
      lib: ['dom', 'dom.iterable', 'es6'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [
        {
          name: 'next'
        }
      ],
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  }, null, 2)

  // Global CSS
  files['src/app/globals.css'] = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: ${selection.projectConfig.colors.primary};
  --secondary-color: ${selection.projectConfig.colors.secondary};
}`

  // Layout
  files['src/app/layout.tsx'] = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${selection.content.header.logo}',
  description: '${selection.projectConfig.description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`

  // Components
  files['src/components/Header.tsx'] = selectedHeader.template
  files['src/components/Hero.tsx'] = selectedHero.template
  files['src/components/Footer.tsx'] = selectedFooter.template

  // Home page with proper props
  const headerProps = JSON.stringify(selection.content.header, null, 2).replace(/"/g, '')
  const heroProps = JSON.stringify(selection.content.hero, null, 2).replace(/"/g, '')
  const footerProps = JSON.stringify(selection.content.footer, null, 2).replace(/"/g, '')

  files['src/app/page.tsx'] = `import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  const headerProps = ${JSON.stringify(selection.content.header, null, 2)}
  const heroProps = ${JSON.stringify(selection.content.hero, null, 2)}
  const footerProps = ${JSON.stringify(selection.content.footer, null, 2)}

  return (
    <>
      <Header {...headerProps} />
      <Hero {...heroProps} />
      <Footer {...footerProps} />
    </>
  )
}`

  // Generate additional pages from sitemap
  selection.sitemap.forEach(page => {
    if (page.path !== '/') {
      const pagePath = page.path === '/' ? 'page.tsx' : `${page.path.slice(1)}/page.tsx`
      files[`src/app/${pagePath}`] = `import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ${page.name.replace(/\s+/g, '')}() {
  const headerProps = ${JSON.stringify(selection.content.header, null, 2)}
  const footerProps = ${JSON.stringify(selection.content.footer, null, 2)}

  return (
    <>
      <Header {...headerProps} />
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">${page.name}</h1>
          <p className="text-xl text-gray-600">${page.description}</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}`
    }
  })

  // README
  files['README.md'] = `# ${selection.content.header.logo}

${selection.projectConfig.description}

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

This project uses:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Components Used

- Header: ${selectedHeader.name}
- Hero: ${selectedHero.name}
- Footer: ${selectedFooter.name}

Generated using the Hybrid Component System.`

  return files
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 })
    }

    console.log('🎯 Starting hybrid component generation...')

    // Load component blocks
    const componentBlocks = await loadComponentBlocks()

    // Get AI selection and content
    const selection = await getAISelection(prompt, componentBlocks)

    // Generate project files
    const files = generateProjectFiles(selection, componentBlocks)

    // Create the ai-generated-site directory
    const projectRoot = process.cwd()
    const siteDir = path.join(projectRoot, 'ai-generated-site')

    try {
      await fs.rm(siteDir, { recursive: true, force: true })
    } catch (error) {
      // Directory doesn't exist, which is fine
    }

    await fs.mkdir(siteDir, { recursive: true })

    console.log('📁 Creating hybrid component structure...')

    // Create all the files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(siteDir, filePath)
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, content, 'utf-8')
    }

    console.log('✅ Hybrid website generated successfully!')

    return NextResponse.json({
      success: true,
      message: 'Hybrid website generated successfully!',
      description: `${selection.projectConfig.description} Built using pre-optimized components with AI-generated content.`,
      approach: 'hybrid-component-system',
      selectedComponents: {
        header: componentBlocks.headers.find(h => h.id === selection.selectedComponents.header)?.name,
        hero: componentBlocks.heroes.find(h => h.id === selection.selectedComponents.hero)?.name,
        footer: componentBlocks.footers.find(f => f.id === selection.selectedComponents.footer)?.name
      },
      sitemap: selection.sitemap,
      totalFiles: Object.keys(files).length,
      location: 'ai-generated-site/',
      files: Object.keys(files),
      tokensUsed: 'Significantly reduced (~4k vs 32k)'
    })

  } catch (error) {
    console.error('Error in hybrid generation:', error)
    
    return NextResponse.json({
      error: 'Failed to generate hybrid website',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
