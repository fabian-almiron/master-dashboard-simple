import { NextRequest, NextResponse } from 'next/server'
import { generateAllStaticFiles } from '@/lib/static-generator-server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Regenerating static files...')
    
    // Optional: Add authentication here to prevent unauthorized regeneration
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.STATIC_GENERATION_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    
    const success = await generateAllStaticFiles()
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Static files regenerated successfully',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Some static files failed to generate' 
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('❌ Error in static generation API:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to regenerate static files',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Static file generation API - use POST to regenerate files' 
  })
} 