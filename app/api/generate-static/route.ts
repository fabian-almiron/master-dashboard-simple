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
    
    // DEBUG: Add detailed logging for site detection
    console.log('🔍 DEBUG: Starting site detection...')
    
    // Get domain from request headers for debugging
    const domain = request.headers.get('host') || 'unknown'
    console.log('🌐 Request domain:', domain)
    
    // Dynamically import to avoid loading Supabase during build
    const { generateAllStaticFiles, ensureDefaultSite } = await import('@/lib/static-generator-server')
    const { getCurrentSiteId, autoConfigureSiteId } = await import('@/lib/site-config-server')
    
    // DEBUG: Check current site detection
    let siteId = getCurrentSiteId()
    console.log('🔍 DEBUG: getCurrentSiteId() returned:', siteId)
    
    if (!siteId) {
      console.log('🔍 DEBUG: No site ID found, trying domain-based lookup...')
      
      // Try domain-based lookup directly since VERCEL_URL might not be available in API context
      try {
        console.log('🔍 DEBUG: Looking up site by domain:', domain)
        const { getSiteByDomain } = await import('@/lib/supabase')
        const site = await getSiteByDomain(domain)
        if (site) {
          console.log('🔍 DEBUG: Found site by direct domain lookup:', site.name, '→', site.id)
          siteId = site.id
        } else {
          console.log('🔍 DEBUG: No site found for domain:', domain)
        }
      } catch (error) {
        console.log('🔍 DEBUG: Direct domain lookup failed:', error)
      }
      
      if (!siteId) {
        console.log('🔍 DEBUG: Trying auto-configure fallback...')
        siteId = await autoConfigureSiteId()
        console.log('🔍 DEBUG: autoConfigureSiteId() returned:', siteId)
      }
    }
    
    // DEBUG: Check if site exists in database
    if (siteId) {
      try {
        const { getSiteById } = await import('@/lib/supabase')
        const site = await getSiteById(siteId)
        console.log('🔍 DEBUG: Site found in database:', site ? `${site.name} (${site.domain})` : 'NOT FOUND')
      } catch (error) {
        console.log('🔍 DEBUG: Error checking site in database:', error)
      }
    }
    
    // First ensure we have a default site configured
    try {
      const ensuredSiteId = await ensureDefaultSite()
      console.log('🔍 DEBUG: ensureDefaultSite() returned:', ensuredSiteId)
    } catch (siteError) {
      console.error('❌ Error ensuring default site:', siteError)
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to configure default site. Please set up your site first.',
        error: siteError instanceof Error ? siteError.message : 'Site configuration error',
        needsSiteSetup: true,
        debug: {
          detectedSiteId: siteId,
          requestDomain: domain
        }
      }, { status: 422 })
    }
    
    console.log('🔍 DEBUG: Calling generateAllStaticFiles with siteId:', siteId)
    const success = await generateAllStaticFiles(siteId)
    console.log('🔍 DEBUG: generateAllStaticFiles returned:', success)
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Static files regenerated successfully',
        timestamp: new Date().toISOString(),
        debug: {
          detectedSiteId: siteId,
          requestDomain: domain
        }
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Some static files failed to generate. This may be normal for a new installation.',
        debug: {
          detectedSiteId: siteId,
          requestDomain: domain
        }
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