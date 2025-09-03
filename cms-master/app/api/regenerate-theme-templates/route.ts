import { NextRequest, NextResponse } from 'next/server'
import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'
import { generateDefaultTemplatesForTheme } from '@/lib/auto-template-generator'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { forceRegenerate } = await request.json()

    const site = await getCurrentSite()
    if (!site) {
      return NextResponse.json({
        success: false,
        error: 'No active site found'
      }, { status: 404 })
    }

    // Get the active theme
    const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
    const activeTheme = activeThemeSetting?.value || 'base-theme'
    
    console.log(`🎨 Regenerating templates for active theme: ${activeTheme}`)

    // If forceRegenerate is true, delete existing templates for this theme
    if (forceRegenerate) {
      console.log(`🗑️ Clearing existing templates for theme: ${activeTheme}`)
      
      // First, get all template IDs for this theme
      const { data: existingTemplates } = await supabaseAdmin
        .from('templates')
        .select('id')
        .eq('site_id', site.id)
        .eq('theme_id', activeTheme)
      
      if (existingTemplates && existingTemplates.length > 0) {
        const templateIds = existingTemplates.map((t: any) => t.id)
        
        // Delete template blocks first (foreign key constraint)
        const { error: blocksError } = await supabaseAdmin
          .from('template_blocks')
          .delete()
          .in('template_id', templateIds)
        
        if (blocksError) {
          console.error('Error deleting template blocks:', blocksError)
          return NextResponse.json({
            success: false,
            error: `Failed to delete template blocks: ${blocksError.message}`
          }, { status: 500 })
        }
        
        // Then delete the templates
        const { error: templatesError } = await supabaseAdmin
          .from('templates')
          .delete()
          .eq('site_id', site.id)
          .eq('theme_id', activeTheme)
        
        if (templatesError) {
          console.error('Error deleting templates:', templatesError)
          return NextResponse.json({
            success: false,
            error: `Failed to delete templates: ${templatesError.message}`
          }, { status: 500 })
        }
        
        console.log(`✅ Deleted ${existingTemplates.length} existing templates for theme: ${activeTheme}`)
      }
    }

    // Generate new templates
    console.log(`🏗️ Generating fresh templates for theme: ${activeTheme}`)
    const result = await generateDefaultTemplatesForTheme(site.id, activeTheme)
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: `Template generation failed: ${result.errors.join(', ')}`,
        result
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully regenerated templates for theme: ${activeTheme}`,
      theme: activeTheme,
      templatesCreated: result.templatesCreated,
      blocksCreated: result.blocksCreated,
      result
    })

  } catch (error) {
    console.error('Error regenerating theme templates:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to regenerate theme templates'
    }, { status: 500 })
  }
}
