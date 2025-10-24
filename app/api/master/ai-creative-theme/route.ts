import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'
import { securityMiddleware, sanitizeError } from '@/lib/security'

interface CreativeThemeRequest {
  user_vision: string // "Create a cyberpunk website with neon effects and dark theme"
  website_context: {
    name: string
    industry: string
    description: string
    target_audience?: string
  }
  creative_constraints?: {
    must_include_components?: string[] // ['header', 'hero', 'features']
    avoid_styles?: string[] // ['brutalist', 'retro']
    color_preferences?: string[] // ['blue', 'dark', 'neon']
  }
  claude_api_key_1: string // For template selection
  claude_api_key_2?: string // For content generation (optional second AI)
  allow_experimental?: boolean // Let AI go wild with creativity
}

interface CreativeThemeResult {
  success: boolean
  theme_vision: {
    selected_style: string
    color_story: string
    design_philosophy: string
  }
  components_created: {
    component: string
    template: string
    innovation_level: 'standard' | 'enhanced' | 'experimental'
  }[]
  backup_path: string
  ai_creativity_report: string
}

export async function POST(request: NextRequest) {
  // Security checks
  const securityCheck = await securityMiddleware(request, {
    requireAuth: true,
    rateLimit: { limit: 5, windowMs: 600000 } // 5 requests per 10 minutes (resource intensive)
  })
  
  if (securityCheck) return securityCheck
  
  try {
    const body: CreativeThemeRequest = await request.json()
    
    if (!body.claude_api_key_1) {
      return NextResponse.json(
        { error: 'At least one Claude API key is required' },
        { status: 400 }
      )
    }

    console.log(`🎨 Starting CREATIVE theme generation for: ${body.website_context.name}`)
    console.log(`🚀 User vision: "${body.user_vision}"`)

    const startTime = Date.now()

    // Create backup first
    const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
    const backupPath = await createBaseThemeBackup(baseThemePath, `creative-${Date.now()}`)

    // Load component templates
    const templatesPath = path.join(process.cwd(), 'component-templates.json')
    const templates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))

    // Step 1: AI Vision Analysis & Theme Strategy
    const themeStrategy = await analyzeVisionAndCreateStrategy(
      body.user_vision,
      body.website_context,
      body.creative_constraints,
      templates,
      body.claude_api_key_1,
      body.allow_experimental || false
    )

    console.log(`🎯 Theme strategy: ${themeStrategy.design_philosophy}`)

    // Step 2: Generate all components based on strategy
    const componentResults = await generateComponentsFromStrategy(
      themeStrategy,
      templates,
      body.claude_api_key_2 || body.claude_api_key_1,
      body.allow_experimental || false
    )

    // Step 3: Create cohesive theme colors
    await generateAndApplyThemeColors(
      themeStrategy,
      baseThemePath,
      body.claude_api_key_1
    )

    const processingTime = Math.round((Date.now() - startTime) / 1000)

    return NextResponse.json({
      success: true,
      theme_vision: {
        selected_style: themeStrategy.primary_style,
        color_story: themeStrategy.color_narrative,
        design_philosophy: themeStrategy.design_philosophy
      },
      components_created: componentResults,
      backup_path: backupPath,
      ai_creativity_report: themeStrategy.creativity_report,
      processing_time: `${processingTime} seconds`,
      message: `🎉 Created a completely custom theme based on your vision!`
    } as CreativeThemeResult)

  } catch (error) {
    console.error('Creative theme generation error:', error)
    return NextResponse.json(
      { error: `Creative theme generation failed: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}

// AI Vision Analysis - Let AI decide EVERYTHING about the theme
async function analyzeVisionAndCreateStrategy(
  userVision: string,
  websiteContext: any,
  constraints: any,
  templates: any,
  claudeApiKey: string,
  allowExperimental: boolean
) {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  const availableStyles = [
    ...Object.keys(templates.header_templates || {}),
    ...Object.keys(templates.hero_templates || {}),
    ...Object.keys(templates.card_templates || {})
  ].filter((style, index, arr) => arr.indexOf(style) === index)

  const creativityLevel = allowExperimental 
    ? "🚀 EXPERIMENTAL MODE: Push all boundaries! Be bold, innovative, and create something truly unique!"
    : "🎨 CREATIVE MODE: Be innovative while maintaining usability and professionalism."

  const prompt = `🎨 You are a visionary creative director with unlimited design freedom. Analyze this vision and create a comprehensive theme strategy.

USER VISION: "${userVision}"

WEBSITE CONTEXT:
- Name: ${websiteContext.name}
- Industry: ${websiteContext.industry}
- Description: ${websiteContext.description}
- Target Audience: ${websiteContext.target_audience || 'General'}

AVAILABLE DESIGN STYLES:
${availableStyles.join(', ')}

${creativityLevel}

CONSTRAINTS (if any):
${constraints ? JSON.stringify(constraints, null, 2) : 'No constraints - full creative freedom!'}

Create a cohesive theme strategy that brings this vision to life. Think about:
- Overall aesthetic and mood
- Color psychology and emotional impact
- Component harmony and flow
- User experience journey
- Brand personality expression

Return a JSON object with this structure:
{
  "primary_style": "chosen_style_name",
  "secondary_styles": ["style2", "style3"],
  "design_philosophy": "2-3 sentence description of the design approach",
  "color_narrative": "Story about the color choices and emotional impact",
  "component_strategy": {
    "header": "style_choice_with_reason",
    "hero": "style_choice_with_reason", 
    "features": "style_choice_with_reason",
    "footer": "style_choice_with_reason"
  },
  "innovation_areas": ["specific areas where you'll be creative"],
  "creativity_report": "What makes this theme special and unique"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2000,
    temperature: allowExperimental ? 0.9 : 0.7,
    messages: [{ role: 'user', content: prompt }]
  })

  try {
    if (response.content[0].type === 'text') {
      let text = response.content[0].text.trim()
      
      // Handle markdown code blocks from Claude 4
      if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      return JSON.parse(text)
    }
  } catch (error) {
    console.error('Failed to parse strategy response:', error)
  }

  // Fallback strategy
  return {
    primary_style: 'modern',
    design_philosophy: 'Clean, professional design with modern aesthetics',
    color_narrative: 'Professional color palette that builds trust',
    component_strategy: {
      header: 'modern',
      hero: 'modern', 
      features: 'bento_grid',
      footer: 'modern_minimal'
    },
    creativity_report: 'Applied modern design principles with user-focused improvements'
  }
}

// Generate components based on the creative strategy
async function generateComponentsFromStrategy(
  strategy: any,
  templates: any,
  claudeApiKey: string,
  allowExperimental: boolean
) {
  const componentsToGenerate = Object.keys(strategy.component_strategy || {})
  const results = []

  for (const componentType of componentsToGenerate) {
    try {
      const templateChoice = strategy.component_strategy[componentType]
      const templateCategory = `${componentType}_templates`
      
      if (!templates[templateCategory] || !templates[templateCategory][templateChoice]) {
        console.warn(`Template not found: ${templateChoice} for ${componentType}`)
        continue
      }

      // Generate ultra-creative content for this component
      const content = await generateUltraCreativeContent(
        componentType,
        templateChoice,
        strategy,
        templates[templateCategory][templateChoice].template,
        claudeApiKey,
        allowExperimental
      )

      // Apply content to template
      const finalComponent = applyContentToTemplate(
        templates[templateCategory][templateChoice].template,
        content
      )

      // Write to base-theme
      await writeComponentToBaseTheme(componentType, finalComponent)

      results.push({
        component: componentType,
        template: templateChoice,
        innovation_level: allowExperimental ? 'experimental' : 'enhanced'
      })

    } catch (error) {
      console.error(`Failed to generate ${componentType}:`, error)
      results.push({
        component: componentType,
        template: 'fallback',
        innovation_level: 'standard'
      })
    }
  }

  return results
}

// Ultra-creative content generation with maximum freedom
async function generateUltraCreativeContent(
  componentType: string,
  templateChoice: string,
  strategy: any,
  templateCode: string,
  claudeApiKey: string,
  allowExperimental: boolean
): Promise<Record<string, string>> {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })
  const placeholders = extractTemplatePlaceholders(templateCode)

  const creativityMode = allowExperimental
    ? "🚀 MAXIMUM CREATIVITY: Break conventions! Be bold, memorable, and revolutionary!"
    : "🎨 HIGH CREATIVITY: Be innovative and engaging while maintaining professionalism."

  const prompt = `${creativityMode}

You are generating content for a ${componentType} component using the "${templateChoice}" template style.

THEME STRATEGY:
- Design Philosophy: ${strategy.design_philosophy}
- Color Story: ${strategy.color_narrative}
- Primary Style: ${strategy.primary_style}

PLACEHOLDERS TO FILL:
${placeholders.map(p => `{{${p}}}`).join(', ')}

CREATIVE BRIEF:
Create content that perfectly embodies the theme strategy. This ${componentType} should feel like it was designed by a world-class creative agency specifically for this brand.

For ${componentType} components, focus on:
- Compelling, action-oriented language
- Industry-specific terminology that resonates
- Emotional connection with the target audience
- Memorable phrases that stick in users' minds
- Professional but distinctive voice

EXAMPLES OF GREAT VS BORING:
❌ Boring: "Our Services" / "Learn More" / "Contact Us"
✅ Great: "Transform Your Business" / "Start Your Journey" / "Let's Build Together"

❌ Boring: "We provide quality solutions for your business needs"
✅ Great: "Revolutionary technology that transforms how industry leaders operate"

Return ONLY a JSON object:
{
  "${placeholders[0] || 'PLACEHOLDER'}": "Your creative content",
  "${placeholders[1] || 'PLACEHOLDER_2'}": "Your creative content"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 50000,
    temperature: allowExperimental ? 0.9 : 0.8,
    messages: [{ role: 'user', content: prompt }]
  })

  try {
    if (response.content[0].type === 'text') {
      let text = response.content[0].text.trim()
      
      // Handle markdown code blocks from Claude 4
      if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      return JSON.parse(text)
    }
  } catch (error) {
    console.error('Failed to parse creative content:', error)
  }

  return generateFallbackContent(placeholders, { name: 'Website' })
}

// Generate and apply cohesive theme colors
async function generateAndApplyThemeColors(
  strategy: any,
  baseThemePath: string,
  claudeApiKey: string
) {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  const prompt = `Generate a cohesive color palette that perfectly matches this theme strategy:

DESIGN PHILOSOPHY: ${strategy.design_philosophy}
COLOR STORY: ${strategy.color_narrative}
PRIMARY STYLE: ${strategy.primary_style}

Create colors that:
- Support the design philosophy emotionally
- Work harmoniously together
- Are accessible (proper contrast ratios)
- Feel premium and professional

Return ONLY a JSON object with RGB values:
{
  "primary": "25 118 210",
  "gray": "71 85 105", 
  "accent": "59 130 246"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 500,
    temperature: 0.6,
    messages: [{ role: 'user', content: prompt }]
  })

  let colors = { primary: '25 118 210', gray: '71 85 105', accent: '59 130 246' }
  
  try {
    if (response.content[0].type === 'text') {
      let text = response.content[0].text.trim()
      
      // Handle markdown code blocks from Claude 4
      if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      colors = JSON.parse(text)
    }
  } catch (error) {
    console.error('Failed to parse colors, using defaults:', error)
  }

  // Apply colors to theme
  await updateThemeColors(baseThemePath, colors)
}

// Helper functions
function extractTemplatePlaceholders(templateCode: string): string[] {
  const matches = templateCode.match(/\{\{([^}]+)\}\}/g) || []
  return [...new Set(matches.map(match => match.replace(/[{}]/g, '')))]
}

function applyContentToTemplate(template: string, content: Record<string, string>): string {
  let result = template
  Object.entries(content).forEach(([placeholder, value]) => {
    const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g')
    result = result.replace(regex, value)
  })
  return result
}

async function writeComponentToBaseTheme(componentType: string, componentCode: string) {
  const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
  const componentFile = `${componentType.charAt(0).toUpperCase() + componentType.slice(1)}.tsx`
  const componentPath = path.join(baseThemePath, 'ui', componentFile)
  
  await fs.writeFile(componentPath, componentCode, 'utf-8')
  console.log(`✅ ${componentType} component written to base-theme`)
}

async function createBaseThemeBackup(baseThemePath: string, instanceId: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(process.cwd(), 'theme-backups')
  const backupPath = path.join(backupDir, `base-theme-backup-${instanceId}-${timestamp}`)
  
  await fs.mkdir(backupDir, { recursive: true })
  await copyDirectory(baseThemePath, backupPath)
  
  return backupPath
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

async function updateThemeColors(baseThemePath: string, colors: any) {
  const stylesPath = path.join(baseThemePath, 'styles.css')
  
  const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* AI-Generated Theme Colors */
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

/* Custom theme utilities */
.theme-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.theme-glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
`

  await fs.writeFile(stylesPath, cssContent, 'utf-8')
  console.log('✅ Theme colors applied to styles.css')
}

function generateFallbackContent(placeholders: string[], websiteContext: any): Record<string, string> {
  const content: Record<string, string> = {}
  
  placeholders.forEach(placeholder => {
    switch (placeholder) {
      case 'LOGO_TEXT':
        content[placeholder] = websiteContext.name || 'Brand'
        break
      case 'HEADLINE':
        content[placeholder] = `Welcome to ${websiteContext.name || 'Our Website'}`
        break
      case 'SUBTEXT':
        content[placeholder] = 'Your trusted partner for exceptional service'
        break
      case 'CTA_PRIMARY':
        content[placeholder] = 'Get Started'
        break
      case 'CTA_SECONDARY':
        content[placeholder] = 'Learn More'
        break
      default:
        content[placeholder] = placeholder.toLowerCase().replace(/_/g, ' ')
    }
  })
  
  return content
}
