import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface LayoutTransformRequest {
  ai_customization_message: string
  target_industry?: string
  design_style?: string
  primary_color?: string
  site_name: string
}

interface CompleteThemeTransform {
  theme_info: {
    name: string
    description: string
  }
  colors: {
    primary: Record<string, string>
    gray: Record<string, string>
  }
  complete_files: {
    "ui/Header.tsx": string
    "ui/Hero.tsx": string
    "ui/Footer.tsx": string
    "styles.css": string
    "auto-register.tsx": string
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LayoutTransformRequest = await request.json()
    
    console.log('🎨 Starting COMPLETE layout transformation...')
    console.log('📝 Request:', data.ai_customization_message)
    
    // Load layout variations and current theme files for reference
    const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
    const layoutVariationsPath = path.join(process.cwd(), 'layout-variations.json')
    
    const [layoutVariations, currentHeader, currentHero, currentFooter, currentStyles] = await Promise.all([
      fs.readFile(layoutVariationsPath, 'utf-8').then(JSON.parse),
      fs.readFile(path.join(baseThemePath, 'ui', 'Header.tsx'), 'utf-8'),
      fs.readFile(path.join(baseThemePath, 'ui', 'Hero.tsx'), 'utf-8'),
      fs.readFile(path.join(baseThemePath, 'ui', 'Footer.tsx'), 'utf-8'),
      fs.readFile(path.join(baseThemePath, 'styles.css'), 'utf-8')
    ])

    // Generate complete new layouts
    const transformation = await generateCompleteLayouts(data, layoutVariations)
    
    // Create backup
    const backupPath = await createBaseThemeBackup(baseThemePath)
    
    // Apply the complete transformation
    await applyCompleteTransformation(baseThemePath, transformation)
    
    console.log('✅ Complete layout transformation applied!')
    
    return NextResponse.json({
      success: true,
      theme_name: transformation.theme_info.name,
      transformations_applied: {
        header_completely_redesigned: true,
        hero_completely_redesigned: true,
        footer_completely_redesigned: true,
        colors_updated: true,
        styles_updated: true
      },
      backup_path: backupPath,
      processing_time: "Complete Redesign (10-15 seconds)"
    })
    
  } catch (error) {
    console.error('❌ Complete layout transformation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to transform layouts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateCompleteLayouts(
  request: LayoutTransformRequest, 
  layoutVariations: any
): Promise<CompleteThemeTransform> {
  
  const industryContext = request.target_industry ? `for ${request.target_industry} industry` : ''
  const styleContext = request.design_style ? `with ${request.design_style} design style` : ''
  const colorContext = request.primary_color ? `using ${request.primary_color} as primary color` : ''

  const systemPrompt = `You are an expert React developer and web designer. You will COMPLETELY REDESIGN and REWRITE entire React components for a CMS theme.

LAYOUT VARIATIONS AVAILABLE:
${JSON.stringify(layoutVariations, null, 2)}

CRITICAL REQUIREMENTS:
1. You must generate COMPLETE, WORKING React component files
2. Each component must be COMPLETELY DIFFERENT layouts/structures from the originals
3. Use Tailwind CSS with theme CSS variables (--theme-primary-500, --theme-gray-900, etc.)
4. Maintain proper React component structure with TypeScript
5. Include proper component metadata exports
6. Components must be responsive and accessible
7. Be BOLD and CREATIVE with completely different layouts

RESPONSE FORMAT:
You MUST respond with ONLY a valid JSON object with this structure:

{
  "theme_info": {
    "name": "Creative theme name",
    "description": "Description of the design approach"
  },
  "colors": {
    "primary": {
      "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#d8b4fe",
      "400": "#c084fc", "500": "#a855f7", "600": "#9333ea", "700": "#7c3aed",
      "800": "#6b21a8", "900": "#581c87"
    },
    "gray": {
      "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db",
      "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151",
      "800": "#1f2937", "900": "#111827"
    }
  },
  "complete_files": {
    "ui/Header.tsx": "COMPLETE React component code with completely different layout",
    "ui/Hero.tsx": "COMPLETE React component code with completely different layout", 
    "ui/Footer.tsx": "COMPLETE React component code with completely different layout",
    "styles.css": "Complete CSS with new color variables",
    "auto-register.tsx": "Updated theme registration file"
  }
}

COMPONENT REQUIREMENTS:
- Header: Must include ComponentInfo metadata export, navigation, logo, CTA button
- Hero: Must include ComponentInfo metadata export, headline, subtext, CTA buttons
- Footer: Must include ComponentInfo metadata export, copyright, links
- All must use theme CSS variables for colors
- All must be responsive with Tailwind classes
- Import proper icons from 'lucide-react'

CREATE COMPLETELY DIFFERENT LAYOUTS - not just content changes!`

  const userPrompt = `USER REQUEST: "${request.ai_customization_message}"
SITE NAME: "${request.site_name}"
CONTEXT: ${industryContext} ${styleContext} ${colorContext}

COMPLETELY REDESIGN the Header, Hero, and Footer components with entirely different layouts and structures that perfectly match this business vision. Be creative and bold - change the entire structure, not just content!

Examples of layout changes to make:
- Header: Change from horizontal nav to vertical sidebar, or centered layout, or creative positioning
- Hero: Change from centered to split-screen, or fullscreen, or card-based layout  
- Use completely different spacing, arrangements, and visual hierarchies
- Apply appropriate color palettes for the industry
- Make layouts that feel completely different from the original

Return the complete transformation JSON.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000, // Much larger for complete components
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: userPrompt
    }]
  })

  const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
  
  console.log('🤖 Claude Complete Layout Response Length:', responseText.length, 'characters')
  
  try {
    // Parse the JSON response
    let cleanedResponse = responseText.trim()
    if (cleanedResponse.startsWith('```json')) {
      const match = cleanedResponse.match(/```json\s*([\s\S]*?)\s*```/)
      if (match) cleanedResponse = match[1]
    } else if (cleanedResponse.startsWith('```')) {
      const match = cleanedResponse.match(/```\s*([\s\S]*?)\s*```/)
      if (match) cleanedResponse = match[1]
    }
    
    const parsed = JSON.parse(cleanedResponse)
    console.log('✅ Successfully parsed complete layout transformation')
    
    return parsed as CompleteThemeTransform
    
  } catch (parseError) {
    console.error('❌ Failed to parse complete layout response:', parseError)
    console.log('Raw response:', responseText.substring(0, 1000), '...')
    throw new Error('Could not parse complete layout transformation response as JSON')
  }
}

async function createBaseThemeBackup(baseThemePath: string): Promise<string> {
  const backupDir = path.join(process.cwd(), 'theme-backups')
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = path.join(backupDir, `base-theme-backup-${timestamp}`)
  
  await fs.mkdir(backupDir, { recursive: true })
  await copyDirectory(baseThemePath, backupPath)
  
  console.log(`💾 Complete theme backup created: ${backupPath}`)
  return backupPath
}

async function applyCompleteTransformation(baseThemePath: string, transformation: CompleteThemeTransform): Promise<void> {
  console.log('🚀 Applying complete layout transformation...')
  
  // Write all the complete new files
  for (const [filePath, content] of Object.entries(transformation.complete_files)) {
    const fullPath = path.join(baseThemePath, filePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`✅ Completely rewrote: ${filePath}`)
  }
  
  console.log('🎨 Complete layout transformation applied successfully!')
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
