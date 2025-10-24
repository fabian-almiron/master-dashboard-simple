import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'

interface TemplateCreationRequest {
  component_type: 'header' | 'hero' | 'card' | 'cta' | 'testimonial' | 'footer' | 'pricing' | 'features' | 'contact' | 'button' | 'navigation' | 'stats' | 'team'
  design_vision: string // "Create a floating holographic header with particle effects"
  style_name: string // "floating_holographic"
  website_context: {
    name: string
    industry: string
  }
  claude_api_key: string
  add_to_templates?: boolean // Whether to save this as a new template
}

interface TemplateCreationResult {
  success: boolean
  new_template: {
    name: string
    description: string
    template_code: string
  }
  added_to_library: boolean
  ready_to_use: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: TemplateCreationRequest = await request.json()
    
    if (!body.claude_api_key) {
      return NextResponse.json(
        { error: 'Claude API key is required' },
        { status: 400 }
      )
    }

    console.log(`🎨 Creating NEW ${body.component_type} template: "${body.style_name}"`)
    console.log(`🚀 Design vision: "${body.design_vision}"`)

    // Generate completely new template from scratch
    const newTemplate = await createCustomTemplate(
      body.component_type,
      body.design_vision,
      body.style_name,
      body.website_context,
      body.claude_api_key
    )

    // Optionally add to template library
    let addedToLibrary = false
    if (body.add_to_templates) {
      await addTemplateToLibrary(
        body.component_type,
        body.style_name,
        newTemplate.description,
        newTemplate.template_code
      )
      addedToLibrary = true
      console.log(`📚 Added "${body.style_name}" to template library`)
    }

    return NextResponse.json({
      success: true,
      new_template: {
        name: body.style_name,
        description: newTemplate.description,
        template_code: newTemplate.template_code
      },
      added_to_library: addedToLibrary,
      ready_to_use: true,
      message: `🎉 Created new ${body.component_type} template: "${body.style_name}"`
    } as TemplateCreationResult)

  } catch (error) {
    console.error('Template creation error:', error)
    return NextResponse.json(
      { error: `Template creation failed: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}

// AI creates a completely new template from scratch
async function createCustomTemplate(
  componentType: string,
  designVision: string,
  styleName: string,
  websiteContext: any,
  claudeApiKey: string
) {
  const anthropic = new Anthropic({ apiKey: claudeApiKey })

  // Load existing templates for reference and inspiration
  const templatesPath = path.join(process.cwd(), 'component-templates.json')
  const existingTemplates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))
  const templateCategory = `${componentType}_templates`
  
  const existingStyles = existingTemplates[templateCategory] 
    ? Object.keys(existingTemplates[templateCategory]).join(', ')
    : 'minimal, modern'

  const prompt = `🎨 You are a world-class React developer and UI designer. Create a COMPLETELY NEW ${componentType} component template from scratch.

DESIGN VISION: "${designVision}"
STYLE NAME: "${styleName}"
WEBSITE: ${websiteContext.name} (${websiteContext.industry})

EXISTING STYLES (for reference, but CREATE SOMETHING NEW):
${existingStyles}

REQUIREMENTS:
1. Create a React/TypeScript component with proper metadata export
2. Use {{PLACEHOLDER}} format for dynamic content
3. Use Tailwind CSS with theme variables (theme-primary-500, theme-gray-100, etc.)
4. Include Lucide React icons where appropriate
5. Make it mobile-responsive
6. Follow the exact metadata format:

export const metadata: ComponentInfo = {
  type: '${componentType.charAt(0).toUpperCase() + componentType.slice(1)}',
  name: 'Descriptive Name',
  description: 'Brief description',
  category: 'layout' or 'content-blocks' or 'ui-elements',
  icon: 'LucideIconName',
}

CREATIVE FREEDOM INSTRUCTIONS:
🚀 Be BOLD and INNOVATIVE! Create something that doesn't exist yet!
- Push design boundaries
- Use advanced CSS techniques (gradients, animations, transforms)
- Create unique visual effects
- Think about micro-interactions
- Make it memorable and distinctive
- Consider modern design trends (glassmorphism, neumorphism, gradients, etc.)

TEMPLATE PLACEHOLDERS TO INCLUDE:
${getRequiredPlaceholders(componentType).map(p => `- {{${p}}}`).join('\n')}

Return a JSON object with:
{
  "description": "One sentence describing this unique template style",
  "template_code": "Complete React component code as a string"
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 8000,
    temperature: 0.8, // High creativity for new templates
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
      
      const result = JSON.parse(text)
      return {
        description: result.description,
        template_code: result.template_code
      }
    }
  } catch (error) {
    console.error('Failed to parse template creation response:', error)
  }

  // Fallback template
  return {
    description: `Custom ${styleName} ${componentType} template`,
    template_code: createFallbackTemplate(componentType, styleName, websiteContext.name)
  }
}

// Add new template to the component-templates.json library
async function addTemplateToLibrary(
  componentType: string,
  styleName: string,
  description: string,
  templateCode: string
) {
  const templatesPath = path.join(process.cwd(), 'component-templates.json')
  const templates = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))
  
  const templateCategory = `${componentType}_templates`
  
  if (!templates[templateCategory]) {
    templates[templateCategory] = {}
  }
  
  templates[templateCategory][styleName] = {
    description,
    template: templateCode
  }
  
  await fs.writeFile(templatesPath, JSON.stringify(templates, null, 2), 'utf-8')
  console.log(`📚 Added ${styleName} template to ${templateCategory}`)
}

// Get required placeholders for each component type
function getRequiredPlaceholders(componentType: string): string[] {
  const placeholderMap: Record<string, string[]> = {
    header: ['LOGO_TEXT', 'CTA_BUTTON'],
    hero: ['HEADLINE', 'SUBTEXT', 'CTA_PRIMARY', 'CTA_SECONDARY'],
    card: ['TITLE', 'DESCRIPTION', 'CTA_TEXT', 'CATEGORY'],
    cta: ['HEADLINE', 'SUBTEXT', 'CTA_PRIMARY', 'CTA_SECONDARY'],
    testimonial: ['TESTIMONIAL_TEXT', 'CUSTOMER_NAME', 'CUSTOMER_ROLE'],
    footer: ['COMPANY_NAME', 'COMPANY_DESCRIPTION', 'PHONE', 'EMAIL', 'ADDRESS'],
    pricing: ['SECTION_TITLE', 'PLAN_1_NAME', 'PLAN_1_PRICE', 'PLAN_1_CTA'],
    features: ['SECTION_TITLE', 'FEATURE_1_TITLE', 'FEATURE_1_DESCRIPTION'],
    contact: ['SECTION_TITLE', 'CONTACT_EMAIL', 'CONTACT_PHONE', 'FORM_CTA'],
    button: ['BUTTON_TEXT'],
    navigation: ['NAV_ITEM_1', 'NAV_ITEM_2', 'NAV_ITEM_3', 'NAV_ITEM_4'],
    stats: ['STAT_1_NUMBER', 'STAT_1_LABEL', 'STAT_2_NUMBER', 'STAT_2_LABEL'],
    team: ['MEMBER_1_NAME', 'MEMBER_1_ROLE', 'MEMBER_1_BIO']
  }
  
  return placeholderMap[componentType] || ['TITLE', 'DESCRIPTION']
}

// Create fallback template if AI fails
function createFallbackTemplate(componentType: string, styleName: string, websiteName: string): string {
  const componentName = componentType.charAt(0).toUpperCase() + componentType.slice(1)
  
  return `"use client"

import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: '${componentName}',
  name: '${componentName}',
  description: 'Custom ${styleName} ${componentType} component',
  category: '${componentType === 'header' || componentType === 'footer' ? 'layout' : 'content-blocks'}',
  icon: 'Square',
}

export default function ${componentName}() {
  return (
    <div className="w-full bg-theme-primary-500 text-white p-8">
      <div className="theme-container">
        <h2 className="text-2xl font-bold">{{TITLE}}</h2>
        <p className="text-theme-gray-100">{{DESCRIPTION}}</p>
      </div>
    </div>
  )
}`
}
