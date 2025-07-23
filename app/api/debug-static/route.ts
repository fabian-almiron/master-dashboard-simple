import { NextRequest, NextResponse } from 'next/server'

// Check if Supabase environment variables are available
function hasSupabaseConfig() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function POST(request: NextRequest) {
  const debugLogs: string[] = []
  
  // Capture console output
  const originalLog = console.log
  const originalError = console.error
  
  console.log = (...args) => {
    debugLogs.push(`LOG: ${args.join(' ')}`)
    originalLog(...args)
  }
  
  console.error = (...args) => {
    debugLogs.push(`ERROR: ${args.join(' ')}`)
    originalError(...args)
  }
  
  try {
    debugLogs.push('🔄 DEBUG: Starting debug static generation...')
    
    // Check if environment variables are available
    if (!hasSupabaseConfig()) {
      debugLogs.push('⚠️  Supabase not configured - skipping static file generation')
      return NextResponse.json({ 
        success: false, 
        message: 'Supabase configuration not available',
        debugLogs
      }, { status: 503 })
    }
    
    const domain = request.headers.get('host') || 'unknown'
    debugLogs.push(`🌐 Request domain: ${domain}`)
    
    // Dynamically import to avoid loading Supabase during build
    const { generateAllStaticFiles } = await import('@/lib/static-generator-server')
    const { getCurrentSiteId, autoConfigureSiteId } = await import('@/lib/site-config-server')
    
    // DEBUG: Check current site detection - but prioritize domain lookup
    let siteId: string | null = null
    
    // Always try domain-based lookup first (most reliable for Vercel deployments)
    debugLogs.push(`🔍 DEBUG: Trying domain-based lookup first for: ${domain}`)
    try {
      const { getSiteByDomain } = await import('@/lib/supabase')
      const site = await getSiteByDomain(domain)
      if (site) {
        debugLogs.push(`🔍 DEBUG: ✅ Found site by domain lookup: ${site.name} → ${site.id}`)
        siteId = site.id
      } else {
        debugLogs.push(`🔍 DEBUG: ❌ No site found for domain: ${domain}`)
      }
    } catch (error) {
      debugLogs.push(`🔍 DEBUG: ❌ Domain lookup failed: ${error}`)
    }
    
    // Fallback to environment-based detection if domain lookup failed
    if (!siteId) {
      siteId = getCurrentSiteId()
      debugLogs.push(`🔍 DEBUG: Fallback getCurrentSiteId() returned: ${siteId}`)
      
      if (!siteId) {
        debugLogs.push('🔍 DEBUG: Trying auto-configure fallback...')
        siteId = await autoConfigureSiteId()
        debugLogs.push(`🔍 DEBUG: autoConfigureSiteId() returned: ${siteId}`)
      }
    }
    
    debugLogs.push(`🔍 DEBUG: Final siteId to use: ${siteId}`)
    
    // Try to manually test database queries
    if (siteId) {
      debugLogs.push('🔍 DEBUG: Testing direct database queries...')
      
      try {
        const { loadPagesFromDatabase, loadNavigationFromDatabase } = await import('@/lib/cms-data-server')
        
        debugLogs.push('🔍 DEBUG: Testing loadPagesFromDatabase...')
        const pages = await loadPagesFromDatabase(siteId)
        debugLogs.push(`🔍 DEBUG: loadPagesFromDatabase returned ${pages?.length || 0} pages`)
        if (pages && pages.length > 0) {
          debugLogs.push(`🔍 DEBUG: First page: ${JSON.stringify({
            id: pages[0].id,
            title: pages[0].title,
            slug: pages[0].slug,
            status: pages[0].status
          })}`)
        }
        
        debugLogs.push('🔍 DEBUG: Testing loadNavigationFromDatabase...')
        const navigation = await loadNavigationFromDatabase(siteId)
        debugLogs.push(`🔍 DEBUG: loadNavigationFromDatabase returned ${navigation?.length || 0} items`)
        if (navigation && navigation.length > 0) {
          debugLogs.push(`🔍 DEBUG: First nav item: ${JSON.stringify({
            id: navigation[0].id,
            label: navigation[0].label,
            href: navigation[0].href
          })}`)
        }
        
      } catch (dbError) {
        debugLogs.push(`🔍 DEBUG: Database query error: ${dbError}`)
      }
    }
    
    debugLogs.push(`🔍 DEBUG: Calling generateAllStaticFiles with siteId: ${siteId}`)
    const success = await generateAllStaticFiles(siteId)
    debugLogs.push(`🔍 DEBUG: generateAllStaticFiles returned: ${success}`)
    
    // Restore console functions
    console.log = originalLog
    console.error = originalError
    
    return NextResponse.json({ 
      success,
      message: success ? 'Static files regenerated successfully' : 'Some static files failed to generate',
      debugLogs,
      debug: {
        detectedSiteId: siteId,
        requestDomain: domain
      }
    })
    
  } catch (error) {
    console.log = originalLog
    console.error = originalError
    
    debugLogs.push(`❌ Error in debug static generation: ${error}`)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to regenerate static files',
      error: error instanceof Error ? error.message : 'Unknown error',
      debugLogs
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Debug static file generation API - use POST to test generation with debug logs'
  })
} 