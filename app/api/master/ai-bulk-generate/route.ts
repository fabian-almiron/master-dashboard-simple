import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'

interface BulkGenerationRequest {
  website_context: {
    name: string
    industry: string
    description: string
    style_preference: string
    brand_personality: string
  }
  components_to_generate: string[] // ['header', 'hero', 'features', 'footer']
  creative_freedom_level: 'conservative' | 'balanced' | 'experimental'
  claude_api_key: string
  backup_base_theme?: boolean
}

interface BulkGenerationResult {
  success: boolean
  components_generated: {
    component_type: string
    template_used: string
    success: boolean
    error?: string
  }[]
  backup_path?: string
  total_processing_time: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BulkGenerationRequest = await request.json()
    
    if (!body.claude_api_key) {
      return NextResponse.json(
        { error: 'Claude API key is required' },
        { status: 400 }
      )
    }

    console.log(`🎨 Starting bulk component generation for: ${body.website_context.name}`)
    console.log(`📦 Components to generate: ${body.components_to_generate.join(', ')}`)

    const startTime = Date.now()
    
    // Create backup if requested
    let backupPath = ''
    if (body.backup_base_theme) {
      const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
      backupPath = await createBaseThemeBackup(baseThemePath, `bulk-${Date.now()}`)
      console.log(`📁 Created backup: ${backupPath}`)
    }

    // Load component templates
    const templatesPath = path.join(process.cwd(), 'component-templates.json')
    const templates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))

    // Generate all components in parallel
    const generationPromises = body.components_to_generate.map(async (componentType) => {
      try {
        const result = await generateSingleComponent(
          componentType as any,
          body.website_context,
          templates,
          body.claude_api_key,
          body.creative_freedom_level
        )
        
        return {
          component_type: componentType,
          template_used: result.selected_template,
          success: true
        }
      } catch (error) {
        console.error(`Failed to generate ${componentType}:`, error)
        return {
          component_type: componentType,
          template_used: 'fallback',
          success: false,
          error: (error as Error).message
        }
      }
    })

    const results = await Promise.all(generationPromises)
    const processingTime = Math.round((Date.now() - startTime) / 1000)

    return NextResponse.json({
      success: true,
      components_generated: results,
      backup_path: backupPath,
      total_processing_time: `${processingTime} seconds`,
      message: `Generated ${results.filter(r => r.success).length}/${results.length} components successfully`
    } as BulkGenerationResult)

  } catch (error) {
    console.error('Bulk generation error:', error)
    return NextResponse.json(
      { error: `Bulk generation failed: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}

// Generate a single component using the dual-AI approach
async function generateSingleComponent(
  componentType: string,
  websiteContext: any,
  templates: any,
  claudeApiKey: string,
  creativeFreedom: string
) {
  const templateCategory = `${componentType}_templates`
  const availableTemplates = templates[templateCategory]
  
  if (!availableTemplates) {
    throw new Error(`No templates available for ${componentType}`)
  }

  // AI #1: Template Selection (Fast)
  const selectedTemplate = await selectOptimalTemplate(
    componentType,
    websiteContext,
    availableTemplates,
    claudeApiKey
  )

  // AI #2: Content Generation (Creative)
  const generatedContent = await generateCreativeContent(
    selectedTemplate,
    componentType,
    websiteContext,
    availableTemplates[selectedTemplate].template,
    claudeApiKey,
    creativeFreedom
  )

  // Template Engine: Merge
  const finalComponent = applyContentToTemplate(
    availableTemplates[selectedTemplate].template,
    generatedContent
  )

  // Write to base-theme
  await writeComponentToBaseTheme(componentType, finalComponent)

  return {
    selected_template: selectedTemplate,
    generated_content: generatedContent,
    final_component: finalComponent
  }
}

// AI #1: Lightning-fast template selection
async function selectOptimalTemplate(
  componentType: string,
  websiteContext: any,
  availableTemplates: any,
  claudeApiKey: string
): Promise<string> {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  const templateList = Object.entries(availableTemplates).map(([name, data]: [string, any]) => 
    `${name}: ${data.description}`
  ).join('\n')

  const prompt = `Select the BEST template for this ${componentType} component.

WEBSITE: ${websiteContext.name}
INDUSTRY: ${websiteContext.industry}
STYLE: ${websiteContext.style_preference || 'modern'}
PERSONALITY: ${websiteContext.brand_personality || 'professional'}

AVAILABLE TEMPLATES:
${templateList}

Consider:
- Industry appropriateness
- Style compatibility  
- Brand personality match
- Modern design trends

Return ONLY the template name (e.g., "glassmorphism").`

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307', // Fast selection
    max_tokens: 30,
    temperature: 0.3, // Lower creativity for selection
    messages: [{ role: 'user', content: prompt }]
  })

  const selection = response.content[0].type === 'text' 
    ? response.content[0].text.trim().replace(/['"]/g, '')
    : Object.keys(availableTemplates)[0]

  return availableTemplates[selection] ? selection : Object.keys(availableTemplates)[0]
}

// AI #2: Creative content generation with full freedom
async function generateCreativeContent(
  templateName: string,
  componentType: string,
  websiteContext: any,
  templateCode: string,
  claudeApiKey: string,
  creativeFreedom: string
): Promise<Record<string, string>> {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  const placeholders = extractTemplatePlaceholders(templateCode)
  
  const creativityInstructions = {
    conservative: 'Use industry-standard language and conventional messaging',
    balanced: 'Be creative and engaging while maintaining professionalism',
    experimental: 'Push creative boundaries! Be bold, unique, and memorable. Think outside the box!'
  }[creativeFreedom]

  const prompt = `🎨 You are a world-class creative director and copywriter. Generate AMAZING content for this ${componentType} component.

WEBSITE: ${websiteContext.name}
INDUSTRY: ${websiteContext.industry}
DESCRIPTION: ${websiteContext.description || ''}
TEMPLATE STYLE: ${templateName}

CREATIVITY LEVEL: ${creativityInstructions}

PLACEHOLDERS TO FILL:
${placeholders.map(p => `{{${p}}}`).join(', ')}

REQUIREMENTS:
- Match the ${templateName} design aesthetic perfectly
- Create industry-specific, compelling copy
- Be memorable and engaging
- Use action-oriented language for CTAs
- Keep text concise but impactful
- Consider the target audience for ${websiteContext.industry}

EXAMPLES OF GREAT CONTENT:
- HEADLINE: "Transform Your Business with AI" vs "Our AI Solutions"
- CTA: "Start Your Journey" vs "Click Here"
- DESCRIPTION: "Revolutionary platform that..." vs "We provide services"

Return a JSON object with each placeholder as a key:
{
  "${placeholders[0] || 'PLACEHOLDER'}": "Your creative content here",
  "${placeholders[1] || 'PLACEHOLDER_2'}": "Your creative content here"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', // Creative model
    max_tokens: 20000,
    temperature: creativeFreedom === 'experimental' ? 0.9 : 0.7, // Variable creativity
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
      
      const content = JSON.parse(text)
      return content
    }
  } catch (error) {
    console.error('Failed to parse AI content:', error)
  }

  // Fallback content generation
  return generateFallbackContent(placeholders, websiteContext)
}

// Extract all {{PLACEHOLDER}} values from template
function extractTemplatePlaceholders(templateCode: string): string[] {
  const matches = templateCode.match(/\{\{([^}]+)\}\}/g) || []
  return [...new Set(matches.map(match => match.replace(/[{}]/g, '')))]
}

// Apply generated content to template
function applyContentToTemplate(template: string, content: Record<string, string>): string {
  let result = template
  
  Object.entries(content).forEach(([placeholder, value]) => {
    const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g')
    result = result.replace(regex, value)
  })
  
  return result
}

// Write component to base-theme
async function writeComponentToBaseTheme(componentType: string, componentCode: string) {
  const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
  const componentFile = `${componentType.charAt(0).toUpperCase() + componentType.slice(1)}.tsx`
  const componentPath = path.join(baseThemePath, 'ui', componentFile)
  
  await fs.writeFile(componentPath, componentCode, 'utf-8')
  console.log(`✅ ${componentType} component written to base-theme`)
}

// Create backup of base-theme
async function createBaseThemeBackup(baseThemePath: string, instanceId: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(process.cwd(), 'theme-backups')
  const backupPath = path.join(backupDir, `base-theme-backup-${instanceId}-${timestamp}`)
  
  await fs.mkdir(backupDir, { recursive: true })
  await copyDirectory(baseThemePath, backupPath)
  
  return backupPath
}

// Copy directory recursively
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

// Generate fallback content if AI fails
function generateFallbackContent(placeholders: string[], websiteContext: any): Record<string, string> {
  const content: Record<string, string> = {}
  
  placeholders.forEach(placeholder => {
    switch (placeholder) {
      case 'LOGO_TEXT':
        content[placeholder] = websiteContext.name
        break
      case 'HEADLINE':
        content[placeholder] = `Welcome to ${websiteContext.name}`
        break
      case 'SUBTEXT':
        content[placeholder] = `Your trusted partner in ${websiteContext.industry}`
        break
      case 'CTA_PRIMARY':
        content[placeholder] = 'Get Started'
        break
      case 'CTA_SECONDARY':
        content[placeholder] = 'Learn More'
        break
      case 'CTA_BUTTON':
        content[placeholder] = 'Contact Us'
        break
      case 'COMPANY_NAME':
        content[placeholder] = websiteContext.name
        break
      default:
        content[placeholder] = placeholder.toLowerCase().replace(/_/g, ' ')
    }
  })
  
  return content
}
