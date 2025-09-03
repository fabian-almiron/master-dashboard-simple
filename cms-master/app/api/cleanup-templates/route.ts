import { NextRequest, NextResponse } from 'next/server'
import { getCurrentSite } from '@/lib/cms-data'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get current site
    const currentSite = await getCurrentSite()
    if (!currentSite) {
      return NextResponse.json({ 
        success: false, 
        error: 'No current site found' 
      }, { status: 400 })
    }

    // Get all templates for the site
    const { data: allTemplates, error: fetchError } = await supabaseAdmin
      .from('templates')
      .select('*')
      .eq('site_id', currentSite.id)
      .order('created_at', { ascending: true })

    if (fetchError) {
      return NextResponse.json({
        success: false,
        error: `Failed to fetch templates: ${fetchError.message}`
      }, { status: 500 })
    }

    let cleaned = 0
    let renamed = 0
    const issues = []

    // Group templates by type and theme
    const templatesByType = {
      header: {} as Record<string, any[]>,
      footer: {} as Record<string, any[]>,
      page: {} as Record<string, any[]>
    }

    // Group templates
    allTemplates?.forEach((template: any) => {
      const themeId = template.theme_id || 'unknown'
      if (!templatesByType[template.type as keyof typeof templatesByType][themeId]) {
        templatesByType[template.type as keyof typeof templatesByType][themeId] = []
      }
      templatesByType[template.type as keyof typeof templatesByType][themeId].push(template)
    })

    // Clean up duplicates and rename templates
    for (const [type, themeGroups] of Object.entries(templatesByType)) {
      for (const [themeId, templates] of Object.entries(themeGroups)) {
        if (templates.length > 1) {
          // Keep the first one, delete the rest
          const toKeep = templates[0]
          const toDelete = templates.slice(1)

          // Delete duplicates
          for (const template of toDelete) {
            const { error: deleteError } = await supabaseAdmin
              .from('templates')
              .delete()
              .eq('id', template.id)

            if (!deleteError) {
              cleaned++
            } else {
              issues.push(`Failed to delete duplicate template ${template.name}: ${deleteError.message}`)
            }
          }

          // Rename the kept template if needed
          const themeDisplayName = themeId.charAt(0).toUpperCase() + themeId.slice(1)
          const typeName = type === 'page' ? 'Page Template' : type.charAt(0).toUpperCase() + type.slice(1)
          const newName = `${themeDisplayName} ${typeName}`
          
          if (toKeep.name !== newName) {
            const { error: updateError } = await supabaseAdmin
              .from('templates')
              .update({ name: newName })
              .eq('id', toKeep.id)

            if (!updateError) {
              renamed++
            } else {
              issues.push(`Failed to rename template ${toKeep.name}: ${updateError.message}`)
            }
          }
        } else if (templates.length === 1) {
          // Just rename if needed
          const template = templates[0]
          const themeDisplayName = themeId.charAt(0).toUpperCase() + themeId.slice(1)
          const typeName = type === 'page' ? 'Page Template' : type.charAt(0).toUpperCase() + type.slice(1)
          const newName = `${themeDisplayName} ${typeName}`
          
          if (template.name !== newName) {
            const { error: updateError } = await supabaseAdmin
              .from('templates')
              .update({ name: newName })
              .eq('id', template.id)

            if (!updateError) {
              renamed++
            } else {
              issues.push(`Failed to rename template ${template.name}: ${updateError.message}`)
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Deleted ${cleaned} duplicates, renamed ${renamed} templates.`,
      summary: {
        templatesDeleted: cleaned,
        templatesRenamed: renamed,
        issues: issues
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Template cleanup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current site
    const currentSite = await getCurrentSite()
    if (!currentSite) {
      return NextResponse.json({ 
        success: false, 
        error: 'No current site found' 
      }, { status: 400 })
    }

    // Analyze templates for issues
    const { data: allTemplates, error: fetchError } = await supabaseAdmin
      .from('templates')
      .select('*')
      .eq('site_id', currentSite.id)

    if (fetchError) {
      return NextResponse.json({
        success: false,
        error: `Failed to fetch templates: ${fetchError.message}`
      }, { status: 500 })
    }

    // Count duplicates
    const templatesByType: Record<string, any[]> = {}
    const duplicates: any[] = []

    allTemplates?.forEach((template: any) => {
      const key = `${template.theme_id}-${template.type}`
      if (!templatesByType[key]) {
        templatesByType[key] = []
      }
      templatesByType[key].push(template)
    })

    Object.entries(templatesByType).forEach(([key, templates]) => {
      if ((templates as any[]).length > 1) {
        duplicates.push({
          key,
          count: (templates as any[]).length,
          templates: templates
        })
      }
    })

    return NextResponse.json({
      success: true,
      analysis: {
        totalTemplates: allTemplates?.length || 0,
        duplicateGroups: duplicates.length,
        duplicateTemplates: duplicates.reduce((sum, group) => sum + group.count - 1, 0),
        duplicates: duplicates
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Template analysis error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
