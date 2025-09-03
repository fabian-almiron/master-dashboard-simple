import { NextRequest, NextResponse } from 'next/server'
import { getCurrentSite } from '@/lib/cms-data'
import { 
  generateDefaultTemplatesForTheme,
  autoGenerateTemplatesForAllThemes,
  validateThemeForTemplateGeneration 
} from '@/lib/auto-template-generator'

export async function POST(request: NextRequest) {
  try {
    const { themeId, action = 'generate' } = await request.json()
    
    // Get current site
    const currentSite = await getCurrentSite()
    if (!currentSite) {
      return NextResponse.json({ 
        success: false, 
        error: 'No current site found' 
      }, { status: 400 })
    }

    switch (action) {
      case 'generate':
        if (!themeId) {
          return NextResponse.json({ 
            success: false, 
            error: 'Theme ID is required for generation' 
          }, { status: 400 })
        }

        const result = await generateDefaultTemplatesForTheme(currentSite.id, themeId)
        
        if (result.success) {
          return NextResponse.json({
            success: true,
            message: `Successfully generated ${result.templatesCreated} templates and ${result.blocksCreated} blocks for theme "${themeId}"`,
            result,
            timestamp: new Date().toISOString()
          })
        } else {
          return NextResponse.json({
            success: false,
            error: `Template generation failed: ${result.errors.join(', ')}`,
            result
          }, { status: 500 })
        }

      case 'generate-all':
        const allResult = await autoGenerateTemplatesForAllThemes(currentSite.id)
        
        return NextResponse.json({
          success: allResult.success,
          message: `Processed ${allResult.summary.totalThemes} themes. Created ${allResult.summary.totalTemplatesCreated} templates and ${allResult.summary.totalBlocksCreated} blocks.`,
          result: allResult,
          timestamp: new Date().toISOString()
        })

      case 'validate':
        if (!themeId) {
          return NextResponse.json({ 
            success: false, 
            error: 'Theme ID is required for validation' 
          }, { status: 400 })
        }

        const validation = await validateThemeForTemplateGeneration(themeId)
        
        return NextResponse.json({
          success: true,
          validation,
          message: validation.valid 
            ? `Theme "${themeId}" is ready for template generation`
            : `Theme "${themeId}" is missing required components: ${validation.missingComponents.join(', ')}`
        })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action. Use: generate, generate-all, or validate' 
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Auto-template generation API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const themeId = searchParams.get('themeId')
    const action = searchParams.get('action') || 'validate'
    
    // Get current site
    const currentSite = await getCurrentSite()
    if (!currentSite) {
      return NextResponse.json({ 
        success: false, 
        error: 'No current site found' 
      }, { status: 400 })
    }

    if (action === 'validate') {
      if (!themeId) {
        return NextResponse.json({ 
          success: false, 
          error: 'Theme ID is required for validation' 
        }, { status: 400 })
      }

      const validation = await validateThemeForTemplateGeneration(themeId)
      
      return NextResponse.json({
        success: true,
        themeId,
        validation,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid action for GET request. Use: validate' 
    }, { status: 400 })

  } catch (error) {
    console.error('Auto-template generation GET API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
