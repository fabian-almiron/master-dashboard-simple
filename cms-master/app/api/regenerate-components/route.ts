import { NextRequest, NextResponse } from 'next/server'
import { getThemeComponentStats, regenerateAutoRegister } from '@/lib/component-discovery'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const themeId = searchParams.get('themeId')
    
    if (!themeId) {
      return NextResponse.json({
        success: false,
        error: 'themeId parameter is required'
      }, { status: 400 })
    }
    
    console.log(`🔍 [API] Getting component stats for theme: ${themeId}`)
    
    // Get component statistics
    const stats = await getThemeComponentStats(themeId)
    
    console.log(`✅ [API] Component stats retrieved for theme ${themeId}:`, {
      total: stats.totalComponents,
      main: stats.mainComponents,
      sub: stats.subComponentsCount,
      registrable: stats.registrableComponents
    })
    
    return NextResponse.json({
      success: true,
      themeId,
      stats,
      message: `Component stats retrieved for theme ${themeId}`
    })
    
  } catch (error) {
    console.error('❌ [API] Component stats retrieval failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to retrieve component stats'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { themeId, action } = body
    
    if (!themeId || !action) {
      return NextResponse.json({
        success: false,
        error: 'themeId and action parameters are required'
      }, { status: 400 })
    }
    
    if (action === 'regenerate') {
      console.log(`🔄 [API] Regenerating auto-register for theme: ${themeId}`)
      
      // Regenerate the auto-register.tsx file
      const result = await regenerateAutoRegister(themeId)
      
      if (result.success) {
        console.log(`✅ [API] Auto-register regenerated for theme ${themeId}`)
        
        // Get updated component stats
        const stats = await getThemeComponentStats(themeId)
        
        return NextResponse.json({
          success: true,
          themeId,
          message: result.message,
          stats,
          timestamp: new Date().toISOString()
        })
      } else {
        console.error(`❌ [API] Auto-register regeneration failed for theme ${themeId}:`, result.message)
        
        return NextResponse.json({
          success: false,
          themeId,
          error: result.message,
          message: 'Failed to regenerate auto-register file'
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({
      success: false,
      error: `Invalid action: ${action}. Supported actions: regenerate`
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ [API] Component regeneration failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to process component regeneration request'
    }, { status: 500 })
  }
}
