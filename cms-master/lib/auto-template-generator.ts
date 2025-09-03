// Auto-template generation for new themes
// Creates default template blocks using the theme's Header, Footer, and DNDArea components

import { supabaseAdmin } from './supabase'
import { getThemeComponents } from './theme-loader'
import { ComponentInfo } from './cms-types'

export interface ThemeTemplateGeneration {
  success: boolean
  templatesCreated: number
  blocksCreated: number
  errors: string[]
  details: {
    headerTemplate?: string
    footerTemplate?: string  
    pageTemplate?: string
  }
}

// Generate default templates for a newly discovered theme
export async function generateDefaultTemplatesForTheme(
  siteId: string, 
  themeId: string
): Promise<ThemeTemplateGeneration> {
  const result: ThemeTemplateGeneration = {
    success: false,
    templatesCreated: 0,
    blocksCreated: 0,
    errors: [],
    details: {}
  }

  try {
    console.log(`🎨 Generating default templates for theme: ${themeId}`)

    // Check if templates already exist for this theme
    const { data: existingThemeTemplates } = await supabaseAdmin
      .from('templates')
      .select('*')
      .eq('site_id', siteId)
      .eq('theme_id', themeId)

    if (existingThemeTemplates && existingThemeTemplates.length > 0) {
      result.errors.push(`Templates already exist for theme: ${themeId}`)
      return result
    }

    // Get theme components to identify required components
    const themeComponents = await getThemeComponents(themeId)
    
    if (!themeComponents || themeComponents.length === 0) {
      result.errors.push(`No components found for theme: ${themeId}`)
      return result
    }

    // Find required components
    const headerComponent = themeComponents.find(c => c.type === 'Header' && c.category === 'layout')
    const footerComponent = themeComponents.find(c => c.type === 'Footer' && c.category === 'layout')
    const dndAreaComponent = themeComponents.find(c => c.type === 'DNDArea' && c.category === 'layout')

    if (!headerComponent) {
      result.errors.push(`Theme ${themeId} missing required Header component`)
    }
    if (!footerComponent) {
      result.errors.push(`Theme ${themeId} missing required Footer component`)
    }
    if (!dndAreaComponent) {
      result.errors.push(`Theme ${themeId} missing required DNDArea component`)
    }

    if (result.errors.length > 0) {
      return result
    }

    // Create default templates with unique, descriptive names
    const themeDisplayName = themeId.charAt(0).toUpperCase() + themeId.slice(1)
    
    // Check if this should be the default theme (usually the first one created)
    const { data: allTemplatesCount } = await supabaseAdmin
      .from('templates')
      .select('id', { count: 'exact' })
      .eq('site_id', siteId)
    
    const isFirstTheme = !allTemplatesCount || allTemplatesCount.length === 0
    
    const templates = [
      {
        site_id: siteId,
        name: `${themeDisplayName} Header`,
        type: 'header' as const,
        theme_id: themeId,
        is_default: isFirstTheme
      },
      {
        site_id: siteId,
        name: `${themeDisplayName} Footer`,
        type: 'footer' as const,
        theme_id: themeId,
        is_default: isFirstTheme
      },
      {
        site_id: siteId,
        name: `${themeDisplayName} Page Template`,
        type: 'page' as const,
        theme_id: themeId,
        is_default: isFirstTheme
      }
    ]

    // Insert templates into database
    const { data: createdTemplates, error: templateError } = await supabaseAdmin
      .from('templates')
      .insert(templates)
      .select()

    if (templateError) {
      result.errors.push(`Failed to create templates: ${templateError.message}`)
      return result
    }

    if (!createdTemplates || createdTemplates.length === 0) {
      result.errors.push('No templates were created')
      return result
    }

    result.templatesCreated = createdTemplates.length
    console.log(`✅ Created ${createdTemplates.length} templates for theme ${themeId}`)

    // Create template blocks for each template
    const templateBlocks = []

    for (const template of createdTemplates) {
      result.details[template.type as keyof typeof result.details] = template.id

              if (template.type === 'header') {
          // Header template with Header component
          templateBlocks.push({
            site_id: siteId,
            template_id: template.id,
            component_type: 'Header',
            order_index: 0,
            props: {
              theme: themeId,
              siteName: 'Your Site Name',
              showNavigation: true
            },
            is_visible: true
          })
        } else if (template.type === 'footer') {
          // Footer template with Footer component
          templateBlocks.push({
            site_id: siteId,
            template_id: template.id,
            component_type: 'Footer',
            order_index: 0,
            props: {
              theme: themeId,
              copyright: `© ${new Date().getFullYear()} Your Company Name`,
              showSocialLinks: true
            },
            is_visible: true
          })
        } else if (template.type === 'page') {
          // Page template with DNDArea component for content injection
          templateBlocks.push({
            site_id: siteId,
            template_id: template.id,
            component_type: 'DNDArea',
            order_index: 0,
            props: {
              theme: themeId,
              padding: 'medium',
              background: '',
              isTemplateEdit: false
            },
            is_visible: true
          })
        }
    }

    // Insert template blocks
    if (templateBlocks.length > 0) {
      const { error: blocksError } = await supabaseAdmin
        .from('template_blocks')
        .insert(templateBlocks)

      if (blocksError) {
        result.errors.push(`Failed to create template blocks: ${blocksError.message}`)
        return result
      }

      result.blocksCreated = templateBlocks.length
      console.log(`✅ Created ${templateBlocks.length} template blocks for theme ${themeId}`)
    }

    result.success = true
    console.log(`🎉 Successfully generated default templates for theme: ${themeId}`)

    return result

  } catch (error) {
    result.errors.push(`Template generation error: ${error}`)
    console.error('Error generating default templates:', error)
    return result
  }
}

// Auto-generate templates for all discovered themes that don't have them
export async function autoGenerateTemplatesForAllThemes(siteId: string): Promise<{
  success: boolean
  processedThemes: string[]
  results: Record<string, ThemeTemplateGeneration>
  summary: {
    totalThemes: number
    successfulThemes: number
    failedThemes: number
    totalTemplatesCreated: number
    totalBlocksCreated: number
  }
}> {
  const results: Record<string, ThemeTemplateGeneration> = {}
  const processedThemes: string[] = []
  
  try {
    // Discover all available themes
    const { discoverThemes } = await import('./theme-discovery')
    const availableThemes = await discoverThemes()
    
    console.log(`🔍 Found ${availableThemes.length} themes for template generation`)

    // Get existing templates to avoid duplicates
    const { data: existingTemplates } = await supabaseAdmin
      .from('templates')
      .select('theme_id')
      .eq('site_id', siteId)

    const themesWithTemplates = new Set(
      existingTemplates?.map((t: { theme_id: string }) => t.theme_id) || []
    )

    // Process each theme
    for (const themeId of availableThemes) {
      processedThemes.push(themeId)

      if (themesWithTemplates.has(themeId)) {
        console.log(`⏭️  Skipping theme ${themeId} - templates already exist`)
        results[themeId] = {
          success: true,
          templatesCreated: 0,
          blocksCreated: 0,
          errors: [],
          details: {}
        }
        continue
      }

      console.log(`🎨 Processing theme: ${themeId}`)
      const themeResult = await generateDefaultTemplatesForTheme(siteId, themeId)
      results[themeId] = themeResult
    }

    // Calculate summary
    const summary = {
      totalThemes: processedThemes.length,
      successfulThemes: Object.values(results).filter(r => r.success).length,
      failedThemes: Object.values(results).filter(r => !r.success).length,
      totalTemplatesCreated: Object.values(results).reduce((sum, r) => sum + r.templatesCreated, 0),
      totalBlocksCreated: Object.values(results).reduce((sum, r) => sum + r.blocksCreated, 0)
    }

    console.log(`📊 Template generation summary:`, summary)

    return {
      success: summary.failedThemes === 0,
      processedThemes,
      results,
      summary
    }

  } catch (error) {
    console.error('Error in auto-template generation:', error)
    return {
      success: false,
      processedThemes,
      results,
      summary: {
        totalThemes: 0,
        successfulThemes: 0,
        failedThemes: processedThemes.length,
        totalTemplatesCreated: 0,
        totalBlocksCreated: 0
      }
    }
  }
}

// Check if a theme has the required components for template generation
export async function validateThemeForTemplateGeneration(themeId: string): Promise<{
  valid: boolean
  missingComponents: string[]
  availableComponents: ComponentInfo[]
}> {
  try {
    const themeComponents = await getThemeComponents(themeId)
    const requiredComponents = ['Header', 'Footer', 'DNDArea']
    const availableComponentTypes = themeComponents.map(c => c.type)
    
    const missingComponents = requiredComponents.filter(
      required => !availableComponentTypes.includes(required)
    )

    return {
      valid: missingComponents.length === 0,
      missingComponents,
      availableComponents: themeComponents
    }
  } catch (error) {
    console.error(`Error validating theme ${themeId}:`, error)
    return {
      valid: false,
      missingComponents: ['Header', 'Footer', 'DNDArea'],
      availableComponents: []
    }
  }
}
