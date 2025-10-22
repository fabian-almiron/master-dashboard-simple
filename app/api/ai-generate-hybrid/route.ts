import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs/promises'
import path from 'path'
import { 
  extractInterfaceFromTemplate, 
  formatInterfaceForPrompt,
  buildComponentInterfaceMap 
} from '@/lib/interface-extractor'

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
  features: ComponentBlock[]
  testimonials: ComponentBlock[]
  footers: ComponentBlock[]
}

interface AISelection {
  selectedComponents: {
    header: string
    hero: string
    features: string
    testimonials: string
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
    features: any
    testimonials: any
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
  const [headersData, heroesData, featuresData, testimonialsData, footersData] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-header-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-hero-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-features-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-testimonials-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-footer-blocks.json'), 'utf-8')
  ])

  return {
    headers: JSON.parse(headersData).headers,
    heroes: JSON.parse(heroesData).heroes,
    features: JSON.parse(featuresData).features,
    testimonials: JSON.parse(testimonialsData).testimonials,
    footers: JSON.parse(footersData).footers
  }
}

async function getAISelection(prompt: string, componentBlocks: ComponentBlocks): Promise<AISelection> {
  // Build interface map for all components
  const interfaceMap = buildComponentInterfaceMap(componentBlocks)
  
  // Example interfaces for the AI (we'll inject real ones based on selection)
  const exampleHeaderInterface = extractInterfaceFromTemplate(componentBlocks.headers[0].template)
  const exampleHeroInterface = extractInterfaceFromTemplate(componentBlocks.heroes[0].template)
  const exampleFeaturesInterface = extractInterfaceFromTemplate(componentBlocks.features[0].template)
  const exampleTestimonialsInterface = extractInterfaceFromTemplate(componentBlocks.testimonials[0].template)
  const exampleFooterInterface = extractInterfaceFromTemplate(componentBlocks.footers[0].template)
  
  const systemPrompt = `You are an expert web designer. Based on the user's request, select the most appropriate components and generate realistic content.

AVAILABLE COMPONENTS:

HEADERS:
${componentBlocks.headers.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

HEROES:
${componentBlocks.heroes.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

FEATURES:
${componentBlocks.features.map(f => `- ${f.id}: ${f.name} (${f.tags.join(', ')}) - ${f.description}`).join('\n')}

TESTIMONIALS:
${componentBlocks.testimonials.map(t => `- ${t.id}: ${t.name} (${t.tags.join(', ')}) - ${t.description}`).join('\n')}

FOOTERS:
${componentBlocks.footers.map(f => `- ${f.id}: ${f.name} (${f.tags.join(', ')}) - ${f.description}`).join('\n')}

🚨 CRITICAL: EXACT INTERFACE MATCHING REQUIRED 🚨

Each component has a STRICT TypeScript interface. You MUST generate props that EXACTLY match the interface:

✅ DO:
- Generate ONLY properties defined in the interface
- Include ALL required properties (non-optional)
- Use correct property types (string, number, array, object)
- Match exact property names (case-sensitive)
- Use valid icon names from iconMap when applicable

❌ DON'T:
- Add extra properties not in the interface
- Miss required properties
- Nest required properties inside other objects incorrectly
- Use industry-specific properties from other component types
- Generate "just in case" properties

EXAMPLE INTERFACES (actual interfaces vary by component):

${exampleHeaderInterface ? formatInterfaceForPrompt(exampleHeaderInterface) : 'Header interface not found'}

${exampleFeaturesInterface ? formatInterfaceForPrompt(exampleFeaturesInterface) : 'Features interface not found'}

COMPONENT-SPECIFIC RULES:

For Excavation/Construction components:
- Header icons: Truck, HardHat, Shield, MapPin, Award, CheckCircle
- Features icons: "truck", "hardHat", "shield", "mapPin", "award", "check"
- Use orange color theme (orange-50, orange-100, orange-600)

For all components:
- Keep it simple and minimal
- Only generate properties that exist in the interface
- Don't bloat with unused properties

Return ONLY a JSON object. Generate MINIMAL props that match the selected component interfaces EXACTLY:

EXAMPLE for excavation-construction header (header-excavation-construction):
{
  "selectedComponents": {
    "header": "header-excavation-construction",
    "hero": "hero-excavation-construction",
    "features": "features-excavation-construction",
    "testimonials": "testimonials-excavation-construction",
    "footer": "footer-excavation-construction"
  },
  "sitemap": [
    {"path": "/", "name": "Home", "description": "Main landing page"},
    {"path": "/services", "name": "Services", "description": "Our services"},
    {"path": "/about", "name": "About", "description": "About our company"},
    {"path": "/contact", "name": "Contact", "description": "Contact us"}
  ],
  "content": {
    "header": {
      "logo": "Company Name",
      "navigation": [{"label": "Home", "href": "/"}, {"label": "Services", "href": "/services"}],
      "ctaText": "Get Quote",
      "ctaHref": "/contact",
      "contactPhone": "+1 (555) 123-4567",
      "serviceAreas": "City & Surrounding Areas"
    },
    "hero": {
      "headline": "Your Headline",
      "description": "Description here",
      "primaryCta": {"text": "Get Started", "href": "/contact"},
      "secondaryCta": {"text": "Learn More", "href": "/about"},
      "heroImage": "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800&h=600&fit=crop",
      "contactPhone": "+1 (555) 123-4567",
      "serviceAreas": "City & Surrounding Areas",
      "projectTypes": ["Service 1", "Service 2", "Service 3"],
      "guarantees": ["Guarantee 1", "Guarantee 2"],
      "yearsExperience": "10+"
    },
    "features": {
      "headline": "Why Choose Us",
      "description": "What makes us different",
      "features": [
        {"icon": "truck", "title": "Feature 1", "description": "Description", "guarantee": "Promise"}
      ],
      "companyInfo": {
        "yearsExperience": "10+",
        "projectsCompleted": "500+",
        "serviceAreas": "City & Area",
        "equipmentCount": "12+"
      }
    },
    "testimonials": {
      "headline": "What Clients Say",
      "description": "Real reviews",
      "testimonials": [
        {
          "quote": "Great service!",
          "author": "John Doe",
          "location": "City, State",
          "rating": 5,
          "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          "projectType": "Project Type",
          "projectResult": "Excellent result",
          "completionTime": "2 days"
        }
      ],
      "companyStats": {
        "projectsCompleted": "500+",
        "yearsExperience": "10+",
        "customerSatisfaction": "100%"
      }
    },
    "footer": {
      "companyName": "Company Name",
      "tagline": "Your tagline",
      "description": "Brief description",
      "navigation": [{"label": "Home", "href": "/"}],
      "contactInfo": {
        "email": "info@company.com",
        "phone": "+1 (555) 123-4567",
        "address": "123 Main St",
        "hours": "Mon-Fri 9AM-5PM"
      },
      "serviceAreas": "City & Areas",
      "licenses": ["License #12345"],
      "yearsExperience": "10+",
      "guarantees": ["Guarantee 1", "Guarantee 2"],
      "socialLinks": [{"platform": "facebook", "href": "#"}],
      "copyright": "© 2024 Company. All rights reserved."
    }
  },
  "projectConfig": {
    "name": "project-name",
    "description": "Project description",
    "style": "modern",
    "colors": {"primary": "#3B82F6", "secondary": "#8B5CF6"}
  }
}

REMEMBER: Generate ONLY the properties that exist in the selected component's interface. No extras!`

  const stream = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 32000,
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
  const selectedFeatures = componentBlocks.features.find(f => f.id === selection.selectedComponents.features)
  const selectedTestimonials = componentBlocks.testimonials.find(t => t.id === selection.selectedComponents.testimonials)
  const selectedFooter = componentBlocks.footers.find(f => f.id === selection.selectedComponents.footer)

  if (!selectedHeader || !selectedHero || !selectedFeatures || !selectedTestimonials || !selectedFooter) {
    throw new Error('Selected components not found')
  }

  const files: { [key: string]: string } = {}

  // Note: vercel.json is NOT generated here to save tokens
  // Static vercel.json exists in ai-generated-site/ and gets copied during deployment

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
      next: '15.1.3',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'lucide-react': '^0.468.0'
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^3.4.0',
      typescript: '^5'
    }
  }, null, 2)

  // Next.config.js
  files['next.config.js'] = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
      lib: ['dom', 'dom.iterable', 'esnext'],
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
  files['src/components/Features.tsx'] = selectedFeatures.template
  files['src/components/Testimonials.tsx'] = selectedTestimonials.template
  files['src/components/Footer.tsx'] = selectedFooter.template

  // Home page with proper props
  const headerProps = JSON.stringify(selection.content.header, null, 2).replace(/"/g, '')
  const heroProps = JSON.stringify(selection.content.hero, null, 2).replace(/"/g, '')
  const footerProps = JSON.stringify(selection.content.footer, null, 2).replace(/"/g, '')

  files['src/app/page.tsx'] = `import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  const headerProps = ${JSON.stringify(selection.content.header, null, 2)}
  const heroProps = ${JSON.stringify(selection.content.hero, null, 2)}
  const featuresProps = ${JSON.stringify(selection.content.features, null, 2)}
  const testimonialsProps = ${JSON.stringify(selection.content.testimonials, null, 2)}
  const footerProps = ${JSON.stringify(selection.content.footer, null, 2)}

  return (
    <>
      <Header {...headerProps} />
      <Hero {...heroProps} />
      <Features {...featuresProps} />
      <Testimonials {...testimonialsProps} />
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
    const vercelJsonPath = path.join(siteDir, 'vercel.json')
    
    // Backup existing vercel.json if it exists
    let vercelJsonBackup: string | null = null
    try {
      vercelJsonBackup = await fs.readFile(vercelJsonPath, 'utf-8')
      console.log('📋 Backing up existing vercel.json configuration')
    } catch {
      // vercel.json doesn't exist, no backup needed
    }

    try {
      await fs.rm(siteDir, { recursive: true, force: true })
    } catch (error) {
      // Directory doesn't exist, which is fine
    }

    await fs.mkdir(siteDir, { recursive: true })
    
    // Restore vercel.json backup if we had one
    if (vercelJsonBackup) {
      await fs.writeFile(vercelJsonPath, vercelJsonBackup, 'utf-8')
      console.log('✅ Restored vercel.json configuration')
    }

    console.log('📁 Creating hybrid component structure...')

    // Create all the files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(siteDir, filePath)
      
      // Skip vercel.json since we've already restored the user's version
      if (filePath === 'vercel.json' && vercelJsonBackup) {
        console.log('⚠️  Skipping vercel.json generation - using restored configuration')
        continue
      }
      
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
        features: componentBlocks.features.find(f => f.id === selection.selectedComponents.features)?.name,
        testimonials: componentBlocks.testimonials.find(t => t.id === selection.selectedComponents.testimonials)?.name,
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
