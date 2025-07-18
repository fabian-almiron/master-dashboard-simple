import { NextRequest, NextResponse } from 'next/server'

// Check if Supabase environment variables are available
function hasSupabaseConfig() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Regenerating static files...')
    
    // Check if environment variables are available
    if (!hasSupabaseConfig()) {
      console.log('⚠️  Supabase not configured - skipping static file generation')
      return NextResponse.json({ 
        success: false, 
        message: 'Supabase configuration not available',
        error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
      }, { status: 503 })
    }
    
    // Optional: Add authentication here to prevent unauthorized regeneration
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.STATIC_GENERATION_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    
    // Dynamically import to avoid loading Supabase during build
    const { generateAllStaticFiles } = await import('@/lib/static-generator-server')
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
  // Check if Supabase is configured during build time
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ 
      message: 'Static file generation API - Supabase configuration required',
      configured: false
    })
  }
  
  return NextResponse.json({ 
    message: 'Static file generation API - use POST to regenerate files',
    configured: true
  })
} 