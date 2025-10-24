import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs/promises'
import path from 'path'
import { 
  extractInterfaceFromTemplate, 
  formatInterfaceForPrompt,
  buildComponentInterfaceMap,
  validatePropsMatchInterface,
  type ExtractedInterface
} from '@/lib/interface-extractor'
import { securityMiddleware } from '@/lib/security'

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
  ctas: ComponentBlock[]
  footers: ComponentBlock[]
}

interface AISelection {
  selectedComponents: {
    header: string
    hero: string
    features: string
    testimonials: string
    cta: string
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
    cta: any
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
  const [headersData, heroesData, featuresData, testimonialsData, ctasData, footersData] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-header-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-hero-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-features-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-testimonials-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-cta-blocks.json'), 'utf-8'),
    fs.readFile(path.join(process.cwd(), 'component-blocks/available-footer-blocks.json'), 'utf-8')
  ])

  return {
    headers: JSON.parse(headersData).headers,
    heroes: JSON.parse(heroesData).heroes,
    features: JSON.parse(featuresData).features,
    testimonials: JSON.parse(testimonialsData).testimonials,
    ctas: JSON.parse(ctasData).ctas,
    footers: JSON.parse(footersData).footers
  }
}

// STAGE 1: Component Selection Only (no content generation)
async function selectComponentsOnly(prompt: string, componentBlocks: ComponentBlocks): Promise<{
  selectedComponents: {
    header: string
    hero: string  
    features: string
    testimonials: string
    cta: string
    footer: string
  }
  sitemap: Array<{ path: string; name: string; description: string }>
  projectConfig: {
    name: string
    description: string
    style: string
    colors: { primary: string; secondary: string }
  }
}> {
  const selectionPrompt = `🚨 STRICT JSON API - EXACT FORMAT REQUIRED 🚨

You are a JSON API that selects components based on STYLE MATCHING. 

🎯 CRITICAL: Match the user's style requirements to component tags and descriptions!

USER REQUEST: "${prompt}"

🔍 STYLE MATCHING RULES:
- "dark", "tech", "modern" → Choose components with "dark", "tech", "modern", "gradient" tags
  EXAMPLE: For "dark tech website" → header-dark-modern, hero-gradient-dark, footer-dark-minimal
- "healthcare", "medical" → Choose components with "healthcare", "medical", "trust" tags  
- "restaurant", "food" → Choose components with "restaurant", "hospitality", "warm" tags
- "creative", "artistic" → Choose components with "creative", "artistic", "portfolio" tags
- "professional", "business" → Choose components with "professional", "corporate", "business" tags

🎯 IMPORTANT: Look at the tags in parentheses (dark, gradient, modern, tech) and match them to the user's request!

AVAILABLE COMPONENTS TO CHOOSE FROM:

HEADERS (choose ONE id):
${componentBlocks.headers.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

HEROES (choose ONE id):
${componentBlocks.heroes.map(h => `- ${h.id}: ${h.name} (${h.tags.join(', ')}) - ${h.description}`).join('\n')}

FEATURES (choose ONE id):
${componentBlocks.features.map(f => `- ${f.id}: ${f.name} (${f.tags.join(', ')}) - ${f.description}`).join('\n')}

TESTIMONIALS (choose ONE id):
${componentBlocks.testimonials.map(t => `- ${t.id}: ${t.name} (${t.tags.join(', ')}) - ${t.description}`).join('\n')}

CTAS (choose ONE id):
${componentBlocks.ctas.map(c => `- ${c.id}: ${c.name} (${c.tags.join(', ')}) - ${c.description}`).join('\n')}

FOOTERS (choose ONE id):
${componentBlocks.footers.map(f => `- ${f.id}: ${f.name} (${f.tags.join(', ')}) - ${f.description}`).join('\n')}

🚨 SELECTION STRATEGY:
1. ANALYZE the user's request for style keywords (dark, modern, tech, creative, etc.)
2. MATCH those keywords to component tags in parentheses 
3. SELECT components whose tags BEST MATCH the requested style
4. PREFER variety - don't always pick the same "safe" options
5. CREATE a cohesive style across all selected components

⚠️ AVOID: Always selecting "header-modern-nav", "hero-centered-cta", "features-grid-icons" - show variety!

🚨 CRITICAL: Return ONLY this EXACT JSON structure with component IDs:

{
  "selectedComponents": {
    "header": "exact-component-id-from-list-above",
    "hero": "exact-component-id-from-list-above",
    "features": "exact-component-id-from-list-above",
    "testimonials": "exact-component-id-from-list-above",
    "cta": "exact-component-id-from-list-above",
    "footer": "exact-component-id-from-list-above"
  },
  "sitemap": [
    {"path": "/", "name": "Home", "description": "Main landing page"},
    {"path": "/about", "name": "About", "description": "About page"},
    {"path": "/contact", "name": "Contact", "description": "Contact page"}
  ],
  "projectConfig": {
    "name": "project-name",
    "description": "Brief description",
    "style": "modern",
    "colors": {"primary": "#3B82F6", "secondary": "#8B5CF6"}
  }
}

NO other text, NO explanations, NO other JSON structure. ONLY the exact JSON above with real component IDs.`

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 50000,
    temperature: 0.4, // Balanced for variety while staying coherent
    stream: true,
    system: 'You are a JSON API. Return ONLY valid JSON matching the exact structure requested. No explanations, no other text.',
    messages: [{ role: 'user', content: selectionPrompt }]
  })

  let response = ''
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      response += chunk.delta.text
    }
  }

  console.log('📝 Raw AI response:', response.substring(0, 200) + '...')
  
  const cleanedResponse = response.trim().replace(/```json\s*/, '').replace(/```\s*$/, '')
  const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) {
    console.error('❌ No JSON found in component selection response:', cleanedResponse)
    throw new Error('No JSON found in component selection')
  }
  
  console.log('🧹 Cleaned JSON:', jsonMatch[0].substring(0, 200) + '...')
  
  try {
    const parsed = JSON.parse(jsonMatch[0])
    console.log('✅ Parsed selection result keys:', Object.keys(parsed))
    return parsed
  } catch (error) {
    console.error('❌ JSON parse error:', error)
    console.error('❌ Failed to parse:', jsonMatch[0])
    throw new Error('Failed to parse component selection JSON')
  }
}

async function getAISelection(prompt: string, componentBlocks: ComponentBlocks): Promise<AISelection> {
  
  // STAGE 1: Component Selection
  console.log('🎯 Stage 1: Selecting components...')
  const componentSelectionResult = await selectComponentsOnly(prompt, componentBlocks)
  console.log('✅ Component selection result:', JSON.stringify(componentSelectionResult, null, 2))
  
  // Validate component selection result
  if (!componentSelectionResult || !componentSelectionResult.selectedComponents) {
    throw new Error('Component selection failed: Invalid result structure')
  }
  
  // STAGE 2: Generate content for selected components (self-contained approach)
  console.log('🎯 Stage 2: Generating component content...')
  const contentGenerationResult = await generateComponentContent(
    prompt,
    componentSelectionResult
  )

  console.log('✅ Content generation completed successfully')

  // Combine selection + content
  return {
    ...componentSelectionResult,
    content: contentGenerationResult
  }
}

// STAGE 2: Generate content for self-contained components
async function generateComponentContent(
  prompt: string,
  selection: any
): Promise<any> {
  
  const systemPrompt = `🚨 SELF-CONTAINED COMPONENT CONTENT GENERATION 🚨

You are generating realistic content for SPECIFIC selected components that will replace placeholder data.

SELECTED COMPONENTS:
- Header: ${selection.selectedComponents.header}
- Hero: ${selection.selectedComponents.hero}
- Features: ${selection.selectedComponents.features}
- Testimonials: ${selection.selectedComponents.testimonials}
- Footer: ${selection.selectedComponents.footer}

PROJECT INFO:
- Name: ${selection.projectConfig.name}
- Description: ${selection.projectConfig.description}
- Style: ${selection.projectConfig.style}
- Colors: ${JSON.stringify(selection.projectConfig.colors)}

🎯 YOUR TASK:

Generate realistic, contextual content for each component that matches the user's request: "${prompt}"

📋 CONTENT REQUIREMENTS:

1. **Company/Brand Name**: Create a fitting name based on the user's prompt
2. **Navigation Links**: Generate appropriate menu items for the business type
3. **Headlines & Copy**: Write compelling, professional content
4. **Contact Information**: Create realistic contact details
5. **Features/Services**: Generate relevant features/benefits
6. **Testimonials**: Write believable customer reviews
7. **Social Links**: Use appropriate platforms for the business type

🎨 STYLE MATCHING:

Match your content to the selected component styles:
- Modern/Tech: Focus on innovation, efficiency, cutting-edge solutions
- Creative/Artistic: Emphasize creativity, uniqueness, artistic vision
- Professional/Business: Highlight expertise, trust, professional results

🔗 ICON NAMES (Lucide Icons Only):
Use these exact names: "check", "star", "heart", "award", "shield", "zap", "clock", "users", "globe", "phone", "mail", "coffee", "utensils", "wheat", "chefHat", "sun", "leaf", "sparkles", "home", "map", "truck", "settings", "wrench"

❌ NEVER USE: "tool", "tools" (not valid Lucide icons)

📧 CONTACT INFO FORMAT:
- Email: realistic format (hello@company.com, info@business.com)
- Phone: (555) XXX-XXXX format
- Address: Include street, city, state, zip

Return ONLY this JSON structure with realistic content:

{
  "companyName": "Realistic Company Name",
  "navigation": [
    {"label": "Home", "href": "/"},
    {"label": "About", "href": "/about"},
    {"label": "Services", "href": "/services"},
    {"label": "Contact", "href": "/contact"}
  ],
  "heroHeadline": "Compelling Main Headline",
  "heroDescription": "Engaging description that sells the value proposition",
  "features": [
    {"icon": "check", "title": "Feature 1", "description": "Benefit description"},
    {"icon": "star", "title": "Feature 2", "description": "Benefit description"}
  ],
  "testimonials": [
    {"quote": "Great experience quote", "author": "Customer Name", "role": "Job Title", "company": "Company Name", "rating": 5}
  ],
  "ctaHeadline": "Ready to Get Started?",
  "ctaDescription": "Contact us today for your free consultation and estimate",
  "contactEmail": "info@company.com",
  "contactPhone": "(555) 123-4567",
  "contactAddress": "123 Street Name, City, ST 12345",
  "socialLinks": [
    {"platform": "facebook", "href": "https://facebook.com/company"},
    {"platform": "instagram", "href": "https://instagram.com/company"}
  ]
}`

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 50000,
    temperature: 0.7,
    stream: true,
    system: systemPrompt,
    messages: [{ role: 'user', content: `Generate content for: ${prompt}` }]
  })

  let response = ''
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      response += chunk.delta.text
    }
  }

  const cleanedResponse = response.trim().replace(/```json\s*/, '').replace(/```\s*$/, '')
  const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in content generation')
  
  const content = JSON.parse(jsonMatch[0])
  
  console.log('✅ Generated content:', JSON.stringify(content, null, 2))
  
  return content
}

// Helper function to replace placeholder data in component templates
function generateSelfContainedComponent(template: string, content: any, componentType: string, originalPrompt?: string): string {
  let updatedTemplate = template
  
  // Replace common placeholders based on component type and generated content
  switch (componentType) {
    case 'header':
      updatedTemplate = updatedTemplate
        .replace(/COMPANY_NAME/g, content.companyName || 'Your Company')
        .replace(/"logo": ".*?"/, `"logo": "${content.companyName || 'Your Company'}"`)
        .replace(/"navigation": \[[\s\S]*?\]/, `"navigation": ${JSON.stringify(content.navigation || [])}`)
        .replace(/"ctaText": ".*?"/, `"ctaText": "${content.navigation?.find((n: any) => n.label.toLowerCase().includes('contact'))?.label || 'Get Started'}"`)
        .replace(/"ctaHref": ".*?"/, `"ctaHref": "${content.navigation?.find((n: any) => n.label.toLowerCase().includes('contact'))?.href || '/contact'}"`)
      break
      
    case 'hero':
      updatedTemplate = updatedTemplate
        .replace(/"headline": ".*?"/, `"headline": "${content.heroHeadline || 'Transform Your Business'}"`)
        .replace(/"description": ".*?"/, `"description": "${content.heroDescription || 'Professional solutions that drive results.'}"`)
      break
      
    case 'features':
      if (content.features) {
        updatedTemplate = updatedTemplate
          .replace(/"headline": ".*?"/, `"headline": "Why Choose ${content.companyName || 'Our Service'}"`)
          .replace(/"description": ".*?"/, `"description": "Discover the benefits that make us the preferred choice."`)
          .replace(/"features": \[[\s\S]*?\]/, `"features": ${JSON.stringify(content.features)}`)
      }
      break
      
    case 'testimonials':
      if (content.testimonials) {
        updatedTemplate = updatedTemplate
          .replace(/"testimonials": \[[\s\S]*?\]/, `"testimonials": ${JSON.stringify(content.testimonials)}`)
      }
      break
      
    case 'cta':
      updatedTemplate = updatedTemplate
        .replace(/"headline": ".*?"/, `"headline": "${content.ctaHeadline || 'Ready to Get Started?'}"`)
        .replace(/"description": ".*?"/, `"description": "${content.ctaDescription || 'Contact us today for more information.'}"`)
      
      // Handle phone numbers in CTA
      if (content.contactPhone) {
        updatedTemplate = updatedTemplate
          .replace(/"phone": ".*?"/, `"phone": "${content.contactPhone}"`)
          .replace(/\(555\) 123-4567/g, content.contactPhone)
          .replace(/\(555\) 911-HELP/g, content.contactPhone)
          .replace(/5551234567/g, content.contactPhone.replace(/[^\d]/g, ''))
          .replace(/5559114357/g, content.contactPhone.replace(/[^\d]/g, ''))
      }
      
      // Handle email in CTA
      if (content.contactEmail) {
        updatedTemplate = updatedTemplate
          .replace(/"email": ".*?"/, `"email": "${content.contactEmail}"`)
          .replace(/info@company\.com/g, content.contactEmail)
      }
      
      // Handle address in CTA
      if (content.contactAddress) {
        updatedTemplate = updatedTemplate
          .replace(/"address": ".*?"/, `"address": "${content.contactAddress}"`)
      }
      
      // Generate business-appropriate benefits based on business type
      if (content.companyName || content.ctaHeadline || originalPrompt) {
        const businessType = ((content.companyName || '') + ' ' + (content.ctaHeadline || '') + ' ' + (content.heroHeadline || '') + ' ' + (originalPrompt || '')).toLowerCase()
        console.log(`🎯 CTA Business type detection: "${businessType}"`)
        let benefits = []
        
        if (businessType.includes('spa') || businessType.includes('wellness') || businessType.includes('beauty')) {
          benefits = [
            "Luxury spa experience",
            "Licensed therapists",
            "Organic products",
            "Relaxing atmosphere"
          ]
        } else if (businessType.includes('architect') || businessType.includes('design') || businessType.includes('luxury') || businessType.includes('home')) {
          benefits = [
            "Award-winning designs",
            "Licensed architects",
            "Luxury project portfolio",
            "Custom design consultation"
          ]
        } else if (businessType.includes('contractor') || businessType.includes('service') || businessType.includes('repair') || businessType.includes('emergency')) {
          benefits = [
            "Free consultation",
            "Written estimates", 
            "Licensed & insured",
            "Same-day service available"
          ]
        } else if (businessType.includes('tech') || businessType.includes('software') || businessType.includes('saas')) {
          benefits = [
            "Free trial available",
            "24/7 customer support",
            "Secure and reliable",
            "No setup fees"
          ]
        } else {
          benefits = [
            "Professional consultation",
            "Tailored solutions",
            "Experienced team", 
            "Quality guaranteed"
          ]
        }
        
        updatedTemplate = updatedTemplate
          .replace(/benefits: \[[\s\S]*?\]/, `benefits: ${JSON.stringify(benefits)}`)
        
        // Replace hard-coded contractor messaging with business-appropriate text
        if (businessType.includes('architect') || businessType.includes('design')) {
          updatedTemplate = updatedTemplate
            .replace(/Licensed & Insured Professionals/g, "Licensed Architecture Professionals")
            .replace(/Fully licensed contractor with comprehensive insurance coverage/g, "Licensed architects with professional liability coverage")
        } else if (businessType.includes('spa') || businessType.includes('wellness')) {
          updatedTemplate = updatedTemplate
            .replace(/Licensed & Insured Professionals/g, "Certified Wellness Professionals")
            .replace(/Fully licensed contractor with comprehensive insurance coverage/g, "Licensed therapists and wellness practitioners")
        } else if (businessType.includes('tech') || businessType.includes('software')) {
          updatedTemplate = updatedTemplate
            .replace(/Licensed & Insured Professionals/g, "Expert Development Team")
            .replace(/Fully licensed contractor with comprehensive insurance coverage/g, "Professional development services with security compliance")
        }
      }
      break
      
    case 'footer':
      updatedTemplate = updatedTemplate
        .replace(/Your Company/g, content.companyName || 'Your Company')
        .replace(/"companyName": ".*?"/, `"companyName": "${content.companyName || 'Your Company'}"`)
        .replace(/"navigation": \[[\s\S]*?\]/, `"navigation": ${JSON.stringify(content.navigation || [])}`)
        .replace(/"socialLinks": \[[\s\S]*?\]/, `"socialLinks": ${JSON.stringify(content.socialLinks || [])}`)
      
      // Handle contact info if present
      if (content.contactEmail || content.contactPhone || content.contactAddress) {
        const contactInfo = {
          email: content.contactEmail || "hello@company.com",
          phone: content.contactPhone || "(555) 123-4567", 
          address: content.contactAddress || "123 Main St, City, ST 12345"
        }
        updatedTemplate = updatedTemplate
          .replace(/"email": ".*?"/, `"email": "${contactInfo.email}"`)
          .replace(/"phone": ".*?"/, `"phone": "${contactInfo.phone}"`)
          .replace(/"address": ".*?"/, `"address": "${contactInfo.address}"`)
      }
      break
  }
  
  return updatedTemplate
}

function generateProjectFiles(selection: AISelection, componentBlocks: ComponentBlocks, originalPrompt: string): { [key: string]: string } {
  const selectedHeader = componentBlocks.headers.find(h => h.id === selection.selectedComponents.header)
  const selectedHero = componentBlocks.heroes.find(h => h.id === selection.selectedComponents.hero)
  const selectedFeatures = componentBlocks.features.find(f => f.id === selection.selectedComponents.features)
  const selectedTestimonials = componentBlocks.testimonials.find(t => t.id === selection.selectedComponents.testimonials)
  const selectedCTA = componentBlocks.ctas.find(c => c.id === selection.selectedComponents.cta)
  const selectedFooter = componentBlocks.footers.find(f => f.id === selection.selectedComponents.footer)

  if (!selectedHeader || !selectedHero || !selectedFeatures || !selectedTestimonials || !selectedCTA || !selectedFooter) {
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
  title: '${selection.projectConfig.name}',
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

  // Components - Replace placeholder data with generated content
  files['src/components/Header.tsx'] = generateSelfContainedComponent(selectedHeader.template, selection.content, 'header', originalPrompt)
  files['src/components/Hero.tsx'] = generateSelfContainedComponent(selectedHero.template, selection.content, 'hero', originalPrompt)
  files['src/components/Features.tsx'] = generateSelfContainedComponent(selectedFeatures.template, selection.content, 'features', originalPrompt)
  files['src/components/Testimonials.tsx'] = generateSelfContainedComponent(selectedTestimonials.template, selection.content, 'testimonials', originalPrompt)
  files['src/components/CTA.tsx'] = generateSelfContainedComponent(selectedCTA.template, selection.content, 'cta', originalPrompt)
  files['src/components/Footer.tsx'] = generateSelfContainedComponent(selectedFooter.template, selection.content, 'footer', originalPrompt)

  // Home page - Clean and simple with self-contained components
  files['src/app/page.tsx'] = `import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}`

  // Generate additional pages from sitemap - Clean and simple
  selection.sitemap.forEach(page => {
    if (page.path !== '/') {
      const pagePath = page.path === '/' ? 'page.tsx' : `${page.path.slice(1)}/page.tsx`
      files[`src/app/${pagePath}`] = `import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ${page.name.replace(/\s+/g, '')}() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">${page.name}</h1>
          <p className="text-xl text-gray-600">${page.description}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}`
    }
  })

  // README
  files['README.md'] = `# ${selection.projectConfig.name}

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
  // Security check with rate limiting for AI generation
  const securityCheck = await securityMiddleware(request, {
    requireAuth: true,
    rateLimit: { limit: 10, windowMs: 60000 } // 10 AI generations per minute
  })
  
  if (securityCheck) return securityCheck
  
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
    const files = generateProjectFiles(selection, componentBlocks, prompt)

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
        cta: componentBlocks.ctas.find(c => c.id === selection.selectedComponents.cta)?.name,
        footer: componentBlocks.footers.find(f => f.id === selection.selectedComponents.footer)?.name
      },
      sitemap: selection.sitemap,
      totalFiles: Object.keys(files).length,
      location: 'ai-generated-site/',
      files: Object.keys(files),
      tokensUsed: 'High-quality generation (up to 50k tokens for comprehensive content)'
    })

  } catch (error) {
    console.error('Error in hybrid generation:', error)
    
    return NextResponse.json({
      error: 'Failed to generate hybrid website',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
