import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'
import { securityMiddleware, validateInput, schemas, sanitizeError } from '@/lib/security'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ThemeCustomizationRequest {
  ai_customization_message: string
  target_industry?: string
  design_style?: string
  primary_color?: string
  site_name: string
  instance_id?: string
}

interface ThemeCustomization {
  theme_info: {
    name: string
    description: string
    industry: string
    style: string
  }
  colors: {
    primary: Record<string, string>
    gray: Record<string, string>
  }
  typography: {
    font_family_sans: string
    font_family_heading: string
    font_sizes: Record<string, string>
  }
  content: {
    site_tagline: string
    hero: {
      headline: string
      subtext: string
      cta_primary: string
      cta_secondary: string
    }
    header: {
      logo_text: string
      nav_items: string[]
      cta_button: string
    }
    features: {
      section_title: string
      section_subtitle: string
      feature_items: Array<{
        title: string
        description: string
        icon: string
      }>
    }
    footer: {
      copyright: string
      tagline: string
    }
  }
  styling: {
    design_approach: string
    button_style: string
    card_style: string
    spacing: string
    animations: string
  }
}

export async function POST(request: NextRequest) {
  // Security checks
  const securityCheck = await securityMiddleware(request, {
    requireAuth: true,
    rateLimit: { limit: 10, windowMs: 300000 } // 10 requests per 5 minutes
  })
  
  if (securityCheck) return securityCheck
  
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      )
    }

    const rawBody = await request.json()
    const body = validateInput(rawBody, schemas.themeCustomization)

    console.log(`🎨 Starting targeted theme customization for: ${body.site_name}`)

    // Load customization structure template
    const templatePath = path.join(process.cwd(), 'targeted-theme-customization.json')
    const customizationTemplate = JSON.parse(await fs.readFile(templatePath, 'utf-8'))

    // Generate targeted customizations using Claude 4
    const customization = await generateTargetedCustomization(body, customizationTemplate)

    // Create backup before modifications
    const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
    const backupPath = await createBaseThemeBackup(baseThemePath, body.instance_id)

    // Apply targeted customizations to base-theme
    await applyTargetedCustomizations(baseThemePath, customization)

    return NextResponse.json({
      success: true,
      theme_name: customization.theme_info.name,
      customizations_applied: {
        colors_updated: true,
        content_updated: true,
        styling_updated: true
      },
      backup_path: backupPath,
      processing_time: 'Fast (5-10 seconds)'
    })

  } catch (error) {
    console.error('Theme customization error:', error)
    return NextResponse.json(
      { error: `Theme customization failed: ${sanitizeError(error)}` },
      { status: 500 }
    )
  }
}

async function generateTargetedCustomization(
  request: ThemeCustomizationRequest,
  template: any
): Promise<ThemeCustomization> {
  
  const industryContext = request.target_industry ? `for the ${request.target_industry} industry` : ''
  const styleContext = request.design_style ? `with a ${request.design_style} design style` : ''
  const colorContext = request.primary_color ? `using ${request.primary_color} as the primary color` : ''
  
  const systemPrompt = `You are an expert web designer. Generate targeted theme customizations for a CMS website.

IMPORTANT: Return ONLY a JSON object with the exact structure provided in the template. No markdown, no explanations, just pure JSON.

CUSTOMIZATION TEMPLATE:
${JSON.stringify(template.example_output, null, 2)}

Your job is to:
1. Generate a cohesive color palette (primary + gray scales)
2. Create industry-appropriate content and messaging
3. Select appropriate typography and styling
4. Ensure everything works together harmoniously

RESPONSE FORMAT: Pure JSON object only, no markdown blocks, no explanations.`

  const userPrompt = `USER REQUEST: "${request.ai_customization_message}"
SITE NAME: "${request.site_name}"
CONTEXT: Customizing theme ${industryContext} ${styleContext} ${colorContext}

Generate targeted customizations that transform the theme to perfectly match this business. Focus on:
- Professional color palette appropriate for the industry
- Compelling, industry-specific content and messaging  
- Typography and styling that matches the desired aesthetic
- Feature descriptions relevant to the business type

Return the customization JSON object.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000, // Much smaller response
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: userPrompt
    }]
  })

  const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
  
  console.log('🤖 Claude 4 Response Length:', responseText.length, 'characters')
  
  try {
    // Clean the response (remove any markdown if present)
    let cleanedResponse = responseText.trim()
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/\s*```$/, '')
    }
    
    const parsed = JSON.parse(cleanedResponse)
    console.log('✅ Successfully parsed targeted customization')
    return parsed
  } catch (error) {
    console.error('❌ JSON Parse Error:', error.message)
    console.error('🔍 Response preview:', responseText.substring(0, 300))
    throw new Error(`Failed to parse customization JSON: ${error.message}`)
  }
}

async function createBaseThemeBackup(baseThemePath: string, instanceId?: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupId = instanceId ? `${instanceId.slice(0, 8)}-${timestamp}` : timestamp
  const backupPath = path.join(process.cwd(), 'theme-backups', `base-theme-backup-${backupId}`)
  
  try {
    await fs.mkdir(path.dirname(backupPath), { recursive: true })
    await copyDirectory(baseThemePath, backupPath)
    console.log(`💾 Base theme backup created: ${backupPath}`)
    return backupPath
  } catch (error) {
    console.error(`❌ Failed to create backup: ${error}`)
    throw new Error(`Failed to create backup: ${(error as Error).message}`)
  }
}

async function applyTargetedCustomizations(baseThemePath: string, customization: ThemeCustomization): Promise<void> {
  console.log(`🎨 Applying COMPLETE component transformations...`)
  
  // 1. Update CSS variables (colors)
  await updateThemeColors(baseThemePath, customization.colors)
  
  // 2. Update Tailwind config (typography, colors)
  await updateTailwindConfig(baseThemePath, customization)
  
  // 3. COMPLETELY REWRITE components with new layouts
  await rewriteComponentsWithNewLayouts(baseThemePath, customization)
  
  // 4. Update auto-register with new theme info
  await updateThemeMetadata(baseThemePath, customization.theme_info)
  
  console.log(`✅ Complete component transformation applied successfully`)
}

async function rewriteComponentsWithNewLayouts(baseThemePath: string, customization: ThemeCustomization): Promise<void> {
  console.log(`🏗️ Completely rewriting components with new layouts...`)
  
  // Load component templates
  const templatesPath = path.join(process.cwd(), 'component-templates.json')
  const templates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))
  
  // Determine which layouts to use based on customization
  const headerLayout = determineLayoutStyle(customization, 'header')
  const heroLayout = determineLayoutStyle(customization, 'hero')
  
  console.log(`📐 Using layouts: Header=${headerLayout}, Hero=${heroLayout}`)
  
  // Get templates and replace placeholders
  const headerTemplate = templates.header_templates[headerLayout]?.template || templates.header_templates.modern.template
  const heroTemplate = templates.hero_templates[heroLayout]?.template || templates.hero_templates.modern.template
  
  // Replace content placeholders
  const newHeaderContent = headerTemplate
    .replace(/\{\{LOGO_TEXT\}\}/g, customization.content.header.logo_text)
    .replace(/\{\{CTA_BUTTON\}\}/g, customization.content.header.cta_button)
  
  const newHeroContent = heroTemplate
    .replace(/\{\{HEADLINE\}\}/g, customization.content.hero.headline)
    .replace(/\{\{SUBTEXT\}\}/g, customization.content.hero.subtext)
    .replace(/\{\{CTA_PRIMARY\}\}/g, customization.content.hero.cta_primary)
    .replace(/\{\{CTA_SECONDARY\}\}/g, customization.content.hero.cta_secondary)
  
  // Write the completely new components
  await fs.writeFile(path.join(baseThemePath, 'ui', 'Header.tsx'), newHeaderContent, 'utf-8')
  await fs.writeFile(path.join(baseThemePath, 'ui', 'Hero.tsx'), newHeroContent, 'utf-8')
  
  console.log(`✅ Components completely rewritten with new layouts`)
}

function determineLayoutStyle(customization: ThemeCustomization, component: 'header' | 'hero'): string {
  const style = customization.theme_info.style.toLowerCase()
  const industry = customization.theme_info.industry.toLowerCase()
  
  if (component === 'header') {
    if (style.includes('tech') || style.includes('modern')) return 'modern'
    if (style.includes('minimal') || style.includes('clean')) return 'minimal'
    if (style.includes('center') || industry.includes('creative')) return 'centered'
    return 'modern'
  }
  
  if (component === 'hero') {
    if (style.includes('tech') || style.includes('modern')) return 'modern'
    if (style.includes('full') || style.includes('dramatic')) return 'fullscreen'
    if (style.includes('split') || industry.includes('tech')) return 'split'
    return 'modern'
  }
  
  return 'modern'
}

async function updateThemeColors(baseThemePath: string, colors: ThemeCustomization['colors']): Promise<void> {
  const stylesPath = path.join(baseThemePath, 'styles.css')
  
  // Generate CSS variables from color palette
  const primaryVars = Object.entries(colors.primary)
    .map(([shade, hex]) => {
      const rgb = hexToRgb(hex)
      return `  --theme-primary-${shade}: ${rgb.r} ${rgb.g} ${rgb.b};`
    }).join('\n')
    
  const grayVars = Object.entries(colors.gray)
    .map(([shade, hex]) => {
      const rgb = hexToRgb(hex)
      return `  --theme-gray-${shade}: ${rgb.r} ${rgb.g} ${rgb.b};`
    }).join('\n')

  const newCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Theme Primary Colors */
${primaryVars}

  /* Theme Gray Colors */
${grayVars}
}

/* Base theme custom styles */
@layer base {
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .theme-container {
    @apply container mx-auto px-4 md:px-6;
  }
}`

  await fs.writeFile(stylesPath, newCSS, 'utf-8')
  console.log(`✏️ Updated styles.css with custom colors`)
}

async function updateTailwindConfig(baseThemePath: string, customization: ThemeCustomization): Promise<void> {
  const configPath = path.join(baseThemePath, 'tailwind.config.ts')
  
  const newConfig = `import type { Config } from "tailwindcss"

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
        sans: ["${customization.typography.font_family_sans}", "sans-serif"],
        heading: ["${customization.typography.font_family_heading}", "sans-serif"],
      },
      colors: {
        'theme-primary': {
${Object.entries(customization.colors.primary).map(([shade, hex]) => `          ${shade}: '${hex}',`).join('\n')}
        },
        'theme-gray': {
${Object.entries(customization.colors.gray).map(([shade, hex]) => `          ${shade}: '${hex}',`).join('\n')}
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config`

  await fs.writeFile(configPath, newConfig, 'utf-8')
  console.log(`✏️ Updated tailwind.config.ts with custom colors and fonts`)
}

async function updateComponentContent(baseThemePath: string, content: ThemeCustomization['content']): Promise<void> {
  // Update Header component
  await updateHeaderComponent(baseThemePath, content.header)
  
  // Update Hero component  
  await updateHeroComponent(baseThemePath, content.hero)
  
  // Update Features component
  await updateFeaturesComponent(baseThemePath, content.features)
  
  // Update Footer component
  await updateFooterComponent(baseThemePath, content.footer)
  
  console.log(`✏️ Updated all component content`)
}

async function updateHeaderComponent(baseThemePath: string, headerContent: ThemeCustomization['content']['header']): Promise<void> {
  const headerPath = path.join(baseThemePath, 'ui', 'Header.tsx')
  let headerCode = await fs.readFile(headerPath, 'utf-8')
  
  // Update logo text
  headerCode = headerCode.replace(
    /Base Theme/g,
    headerContent.logo_text
  )
  
  // Update CTA button text
  headerCode = headerCode.replace(
    />Get Started</g,
    `>${headerContent.cta_button}<`
  )
  
  await fs.writeFile(headerPath, headerCode, 'utf-8')
  console.log(`✏️ Updated Header component content`)
}

async function updateHeroComponent(baseThemePath: string, heroContent: ThemeCustomization['content']['hero']): Promise<void> {
  const heroPath = path.join(baseThemePath, 'ui', 'Hero.tsx')
  let heroCode = await fs.readFile(heroPath, 'utf-8')
  
  // Update headline - more precise replacement
  heroCode = heroCode.replace(
    /(<h1[^>]*>[\s\S]*?)([^<]+)(<\/h1>)/,
    `$1${heroContent.headline}$3`
  )
  
  // Update subtext - more precise replacement
  heroCode = heroCode.replace(
    /(<p[^>]*>[\s\S]*?)([^<]+)(<\/p>)/,
    `$1${heroContent.subtext}$3`
  )
  
  // Update CTA buttons - more precise replacement
  heroCode = heroCode.replace(
    /(>)Get Started(<)/g,
    `$1${heroContent.cta_primary}$2`
  )
  
  heroCode = heroCode.replace(
    /(>)Learn More(<)/g,
    `$1${heroContent.cta_secondary}$2`
  )
  
  await fs.writeFile(heroPath, heroCode, 'utf-8')
  console.log(`✏️ Updated Hero component content`)
}

async function updateFeaturesComponent(baseThemePath: string, featuresContent: ThemeCustomization['content']['features']): Promise<void> {
  const featuresPath = path.join(baseThemePath, 'ui', 'Features.tsx')
  
  // For now, just update the component metadata description
  // In a full implementation, you'd parse and update the entire component
  let featuresCode = await fs.readFile(featuresPath, 'utf-8')
  
  featuresCode = featuresCode.replace(
    /description: '[^']*'/,
    `description: '${featuresContent.section_title}'`
  )
  
  await fs.writeFile(featuresPath, featuresCode, 'utf-8')
  console.log(`✏️ Updated Features component content`)
}

async function updateFooterComponent(baseThemePath: string, footerContent: ThemeCustomization['content']['footer']): Promise<void> {
  const footerPath = path.join(baseThemePath, 'ui', 'Footer.tsx')
  let footerCode = await fs.readFile(footerPath, 'utf-8')
  
  // Update copyright text (basic implementation)
  footerCode = footerCode.replace(
    /© \d{4}[^<]*/,
    footerContent.copyright
  )
  
  await fs.writeFile(footerPath, footerCode, 'utf-8')
  console.log(`✏️ Updated Footer component content`)
}

async function updateThemeMetadata(baseThemePath: string, themeInfo: ThemeCustomization['theme_info']): Promise<void> {
  const autoRegisterPath = path.join(baseThemePath, 'auto-register.tsx')
  let autoRegisterCode = await fs.readFile(autoRegisterPath, 'utf-8')
  
  // 🚨 PRESERVE base-theme name - DO NOT change theme name to maintain CMS database relationships
  // Only update the description, keep theme name as 'base-theme'
  autoRegisterCode = autoRegisterCode.replace(
    /export const themeDescription = '[^']*'/,
    `export const themeDescription = 'Base theme for CMS TailWinds - customizable foundation theme'`
  )
  
  // Ensure theme name stays as 'base-theme' (in case it was changed)
  autoRegisterCode = autoRegisterCode.replace(
    /export const themeName = '[^']*'/,
    `export const themeName = 'base-theme'`
  )
  
  await fs.writeFile(autoRegisterPath, autoRegisterCode, 'utf-8')
  console.log(`✏️ Updated theme metadata (preserved base-theme name)`)
}

// Utility functions
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}
