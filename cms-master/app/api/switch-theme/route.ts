import { NextRequest, NextResponse } from 'next/server'
import { getCurrentSite, setSiteSetting, getTemplatesBySite, updatePage, getPagesBySite } from '@/lib/cms-data'
import { clearThemeCache } from '@/lib/theme-loader'
import { clearThemeCache as clearDynamicThemeCache } from '@/lib/dynamic-theme-import'
import { regenerateAutoRegister } from '@/lib/component-discovery'

export async function POST(request: NextRequest) {
  try {
    const { themeId, updateExistingPages } = await request.json()

    if (!themeId) {
      return NextResponse.json({
        success: false,
        error: 'Theme ID is required'
      }, { status: 400 })
    }

    const site = await getCurrentSite()
    if (!site) {
      return NextResponse.json({
        success: false,
        error: 'No active site found'
      }, { status: 404 })
    }

    // Clear all theme caches to ensure fresh loading
    clearThemeCache()
    clearDynamicThemeCache()
    
    // Regenerate auto-register for the new theme to ensure it's up to date
    try {
      console.log(`🔄 Regenerating auto-register for theme: ${themeId}`)
      const regenerateResult = await regenerateAutoRegister(themeId)
      if (!regenerateResult.success) {
        console.warn(`⚠️ Auto-register regeneration failed for ${themeId}:`, regenerateResult.message)
      } else {
        console.log(`✅ Auto-register regenerated for theme: ${themeId}`)
      }
    } catch (error) {
      console.warn(`⚠️ Error regenerating auto-register for ${themeId}:`, error)
    }
    
    // Update the active theme setting
    const themeUpdateSuccess = await setSiteSetting(site.id, 'active_theme', themeId)
    if (!themeUpdateSuccess) {
      return NextResponse.json({
        success: false,
        error: 'Failed to update theme setting'
      }, { status: 500 })
    }

    let updatedPages = 0
    let errors: string[] = []

    // If requested, update existing pages to use new theme's templates
    if (updateExistingPages) {
      try {
        // Get all templates for this site
        const allTemplates = await getTemplatesBySite(site.id)
        
        // Find default templates for the new theme
        const newThemeTemplates = allTemplates.filter(template => 
          template.theme_id === themeId && template.is_default
        )
        
        const defaultHeader = newThemeTemplates.find(t => t.type === 'header')
        const defaultFooter = newThemeTemplates.find(t => t.type === 'footer')
        const defaultPage = newThemeTemplates.find(t => t.type === 'page')
        
        // Get all pages for this site
        const pages = await getPagesBySite(site.id)
        
        // Update each page to use new theme's default templates
        for (const page of pages) {
          const updateData: any = {}
          
          if (defaultHeader) updateData.header_template_id = defaultHeader.id
          if (defaultFooter) updateData.footer_template_id = defaultFooter.id
          if (defaultPage) updateData.page_template_id = defaultPage.id
          
          if (Object.keys(updateData).length > 0) {
            const success = await updatePage(page.id, updateData)
            if (success) {
              updatedPages++
            } else {
              errors.push(`Failed to update page: ${page.title}`)
            }
          }
        }
      } catch (error) {
        console.error('Error updating pages:', error)
        errors.push('Failed to update some pages')
      }
    }

    return NextResponse.json({
      success: true,
      message: `Theme switched to ${themeId} successfully`,
      updatedPages,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Error switching theme:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to switch theme'
    }, { status: 500 })
  }
}
