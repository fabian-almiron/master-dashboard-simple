import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'
import { securityMiddleware, sanitizeError } from '@/lib/security'

interface ComponentGenerationRequest {
  component_type: 'header' | 'hero' | 'card' | 'cta' | 'testimonial' | 'footer' | 'pricing' | 'features' | 'contact' | 'button' | 'navigation' | 'stats' | 'team'
  user_description: string
  website_context: {
    name: string
    industry: string
    style_preference?: string
    brand_personality?: string
  }
  claude_api_key: string
  creative_freedom_level?: 'conservative' | 'balanced' | 'experimental'
}

interface ComponentResult {
  selected_template: string
  generated_content: Record<string, string>
  final_component: string
  template_confidence: number
}

export async function POST(request: NextRequest) {
  // Security checks
  const securityCheck = await securityMiddleware(request, {
    requireAuth: true,
    rateLimit: { limit: 20, windowMs: 300000 } // 20 requests per 5 minutes
  })
  
  if (securityCheck) return securityCheck
  
  try {
    const body: ComponentGenerationRequest = await request.json()
    
    const claudeApiKey = body.claude_api_key || process.env.ANTHROPIC_API_KEY
    
    if (!claudeApiKey) {
      return NextResponse.json(
        { error: 'Claude API key is required (provide in request or set ANTHROPIC_API_KEY environment variable)' },
        { status: 400 }
      )
    }

    console.log(`🎨 Generating ${body.component_type} component for: ${body.website_context.name}`)

    // Load component templates
    const templatesPath = path.join(process.cwd(), 'component-templates.json')
    const templates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))
    
    const componentTemplates = templates[`${body.component_type}_templates`]
    if (!componentTemplates) {
      return NextResponse.json(
        { error: `No templates found for component type: ${body.component_type}` },
        { status: 400 }
      )
    }

    // Step 1: AI Template Selector (Fast AI)
    const selectedTemplate = await selectBestTemplate(
      body.user_description,
      body.website_context,
      componentTemplates,
      claudeApiKey
    )

    // Step 2: AI Content Generator (Creative AI)
    const generatedContent = await generateTemplateContent(
      selectedTemplate,
      body.user_description,
      body.website_context,
      componentTemplates[selectedTemplate].template,
      claudeApiKey,
      body.creative_freedom_level || 'balanced'
    )

    // Step 3: Template Engine - Merge template with content
    const finalComponent = mergeTemplateWithContent(
      componentTemplates[selectedTemplate].template,
      generatedContent
    )

    return NextResponse.json({
      success: true,
      result: {
        selected_template: selectedTemplate,
        template_description: componentTemplates[selectedTemplate].description,
        generated_content: generatedContent,
        final_component: finalComponent,
        component_code: finalComponent, // Add this for frontend compatibility
        template_confidence: 0.95 // Could be returned from AI
      } as ComponentResult,
      processing_time: 'Fast (3-8 seconds)'
    })

  } catch (error) {
    console.error('Component generation error:', error)
    return NextResponse.json(
      { error: `Component generation failed: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}

// AI #1: Fast template selection
async function selectBestTemplate(
  userDescription: string,
  websiteContext: any,
  availableTemplates: any,
  claudeApiKey: string
): Promise<string> {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  const templateOptions = Object.keys(availableTemplates).map(key => ({
    name: key,
    description: availableTemplates[key].description
  }))

  const prompt = `You are a design expert. Select the BEST template for this request.

USER REQUEST: "${userDescription}"
WEBSITE: ${websiteContext.name} (${websiteContext.industry})
STYLE PREFERENCE: ${websiteContext.style_preference || 'modern'}

AVAILABLE TEMPLATES:
${templateOptions.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Return ONLY the template name (e.g., "glassmorphism" or "brutalist"). No explanations.`

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307', // Fast model for simple selection
    max_tokens: 50,
    messages: [{ role: 'user', content: prompt }]
  })

  const selectedTemplate = response.content[0].type === 'text' 
    ? response.content[0].text.trim().replace(/['"]/g, '')
    : Object.keys(availableTemplates)[0] // Fallback

  return availableTemplates[selectedTemplate] ? selectedTemplate : Object.keys(availableTemplates)[0]
}

// AI #2: Creative content generation
async function generateTemplateContent(
  templateName: string,
  userDescription: string,
  websiteContext: any,
  templateCode: string,
  claudeApiKey: string,
  creativeFreedom: string
): Promise<Record<string, string>> {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  // Extract placeholders from template
  const placeholders = extractPlaceholders(templateCode)
  
  const creativityLevel = {
    conservative: 'Stay close to standard industry conventions',
    balanced: 'Be creative while maintaining professionalism', 
    experimental: 'Push creative boundaries and be bold with unique ideas'
  }[creativeFreedom]

  const prompt = `You are a creative copywriter and brand strategist. Generate compelling content for these template placeholders.

USER REQUEST: "${userDescription}"
WEBSITE: ${websiteContext.name}
INDUSTRY: ${websiteContext.industry}
BRAND PERSONALITY: ${websiteContext.brand_personality || 'professional'}
TEMPLATE STYLE: ${templateName}

CREATIVITY INSTRUCTION: ${creativityLevel}

PLACEHOLDERS TO FILL:
${placeholders.map(p => `- {{${p}}}: [Generate appropriate content]`).join('\n')}

REQUIREMENTS:
- Content should match the ${templateName} design style
- Industry-appropriate language for ${websiteContext.industry}
- Compelling and engaging copy
- Professional but memorable
- Each placeholder should be 1-8 words (keep concise)

Return ONLY a JSON object with placeholder names as keys and generated content as values:
{
  "${placeholders[0]}": "Generated content here",
  "${placeholders[1]}": "Generated content here"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', // Creative model for content
    max_tokens: 20000,
    temperature: 0.8, // Higher creativity
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
    console.error('Failed to parse AI content response:', error)
  }

  // Fallback content
  const fallbackContent: Record<string, string> = {}
  placeholders.forEach(placeholder => {
    fallbackContent[placeholder] = getFallbackContent(placeholder, websiteContext.name)
  })
  return fallbackContent
}

// Extract {{PLACEHOLDER}} values from template
function extractPlaceholders(templateCode: string): string[] {
  const matches = templateCode.match(/\{\{([^}]+)\}\}/g)
  if (!matches) return []
  
  return [...new Set(matches.map(match => match.replace(/[{}]/g, '')))]
}

// Template engine - replace placeholders with content
function mergeTemplateWithContent(template: string, content: Record<string, string>): string {
  let result = template
  
  Object.entries(content).forEach(([placeholder, value]) => {
    const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g')
    result = result.replace(regex, value)
  })
  
  return result
}

// Fallback content generator
function getFallbackContent(placeholder: string, websiteName: string): string {
  const fallbacks: Record<string, string> = {
    'LOGO_TEXT': websiteName,
    'HEADLINE': `Welcome to ${websiteName}`,
    'SUBTEXT': 'Your trusted partner for exceptional service',
    'CTA_PRIMARY': 'Get Started',
    'CTA_SECONDARY': 'Learn More',
    'CTA_BUTTON': 'Contact Us',
    'SECTION_TITLE': 'Our Services',
    'COMPANY_NAME': websiteName,
    'BUTTON_TEXT': 'Click Here'
  }
  
  return fallbacks[placeholder] || placeholder.toLowerCase().replace('_', ' ')
}
