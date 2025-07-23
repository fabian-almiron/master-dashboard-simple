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
    const { generateAllStaticFiles, ensureDefaultSite } = await import('@/lib/static-generator-server')
    const { getCurrentSiteId, autoConfigureSiteId } = await import('@/lib/site-config-server')
    
    // Get domain for site detection
    const domain = request.headers.get('host') || 'unknown'
    console.log('🌐 Request domain:', domain)
    
    // PRIORITY 1: Try domain-based lookup first (most reliable for multi-site)
    let siteId: string | null = null
    try {
      const { getSiteByDomain } = await import('@/lib/supabase')
      const site = await getSiteByDomain(domain)
      if (site) {
        siteId = site.id
        console.log('✅ Found site by domain:', site.name, '→', site.id)
      } else {
        console.log('🔍 No site found for domain:', domain)
      }
    } catch (error) {
      console.log('⚠️ Domain lookup failed:', error)
    }
    
    // PRIORITY 2: Fallback to environment detection only if domain lookup failed
    if (!siteId) {
      siteId = getCurrentSiteId()
      console.log('🔄 Fallback to getCurrentSiteId():', siteId)
      
      if (!siteId) {
        siteId = await autoConfigureSiteId()
        console.log('🔄 Fallback to autoConfigureSiteId():', siteId)
      }
    }
    
    // First ensure we have a default site configured
    try {
      if (!siteId) {
        await ensureDefaultSite()
      } else {
        console.log('✅ Using detected site ID:', siteId)
      }
    } catch (siteError) {
      console.error('❌ Error ensuring default site:', siteError)
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to configure default site. Please set up your site first.',
        error: siteError instanceof Error ? siteError.message : 'Site configuration error',
        needsSiteSetup: true
      }, { status: 422 })
    }
    
    const success = await generateAllStaticFiles(siteId)
    
    // Check if we're in a serverless environment
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    
    if (success) {
      const message = isServerless 
        ? 'Static files generated successfully for CDN caching (serverless multi-site mode)'
        : 'Static files regenerated successfully'
        
      return NextResponse.json({ 
        success: true, 
        message,
        serverless: isServerless,
        timestamp: new Date().toISOString(),
        cacheStrategy: 'static-first-with-database-fallback'
      }, {
        headers: {
          // Cache the API response for 5 minutes to prevent excessive regeneration
          'Cache-Control': 'public, s-maxage=300, max-age=60',
          'CDN-Cache-Control': 'max-age=300'
        }
      })
    } else {
      const message = isServerless
        ? 'Database connection or data loading failed'
        : 'Some static files failed to generate. This may be normal for a new installation.'
        
      return NextResponse.json({ 
        success: false, 
        message,
        serverless: isServerless
      }, { status: 200 }) // Changed to 200 since partial failure is acceptable
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