import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const debugLogs: string[] = []
  
  try {
    debugLogs.push('🔍 DEBUG: Starting debug generation test...')
    
    // Test 1: Environment check
    const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    debugLogs.push(`🔍 Supabase config: ${hasSupabase}`)
    
    if (!hasSupabase) {
      return NextResponse.json({ success: false, debugLogs, error: 'No Supabase config' })
    }
    
    // Test 2: Site detection
    const domain = request.headers.get('host') || 'unknown'
    debugLogs.push(`🔍 Request domain: ${domain}`)
    
    const { getCurrentSiteId, autoConfigureSiteId } = await import('@/lib/site-config-server')
    
    let siteId = getCurrentSiteId()
    debugLogs.push(`🔍 getCurrentSiteId(): ${siteId}`)
    
    if (!siteId) {
      try {
        const { getSiteByDomain } = await import('@/lib/supabase')
        const site = await getSiteByDomain(domain)
        if (site) {
          siteId = site.id
          debugLogs.push(`🔍 getSiteByDomain() found: ${site.name} → ${site.id}`)
        } else {
          debugLogs.push(`🔍 getSiteByDomain() found nothing for: ${domain}`)
        }
      } catch (error) {
        debugLogs.push(`🔍 getSiteByDomain() error: ${error}`)
      }
    }
    
    if (!siteId) {
      siteId = await autoConfigureSiteId()
      debugLogs.push(`🔍 autoConfigureSiteId(): ${siteId}`)
    }
    
    if (!siteId) {
      return NextResponse.json({ 
        success: false, 
        debugLogs, 
        error: 'No site ID detected' 
      })
    }
    
    // Test 3: Database queries
    const { loadPagesFromDatabase, loadNavigationFromDatabase } = await import('@/lib/cms-data-server')
    
    debugLogs.push(`🔍 Testing database queries with siteId: ${siteId}`)
    
    try {
      const pages = await loadPagesFromDatabase(siteId)
      debugLogs.push(`🔍 Pages query result: ${pages.length} pages found`)
      if (pages.length > 0) {
        debugLogs.push(`🔍 First page: ${pages[0].title} (${pages[0].status})`)
      }
    } catch (error) {
      debugLogs.push(`🔍 Pages query error: ${error}`)
    }
    
    try {
      const navigation = await loadNavigationFromDatabase(siteId)
      debugLogs.push(`🔍 Navigation query result: ${navigation.length} items found`)
      if (navigation.length > 0) {
        debugLogs.push(`🔍 First nav item: ${navigation[0].label}`)
      }
    } catch (error) {
      debugLogs.push(`🔍 Navigation query error: ${error}`)
    }
    
    // Test 4: Static generation attempt
    debugLogs.push(`🔍 Testing static file generation...`)
    
    try {
      const { generateAllStaticFiles } = await import('@/lib/static-generator-server')
      const result = await generateAllStaticFiles(siteId)
      debugLogs.push(`🔍 generateAllStaticFiles() result: ${result}`)
    } catch (error) {
      debugLogs.push(`🔍 generateAllStaticFiles() error: ${error}`)
    }
    
    return NextResponse.json({ 
      success: true, 
      debugLogs,
      detectedSiteId: siteId,
      domain: domain
    })
    
  } catch (error) {
    debugLogs.push(`🔍 DEBUG endpoint error: ${error}`)
    return NextResponse.json({ 
      success: false, 
      debugLogs,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Debug generation endpoint - use POST to run diagnostics'
  })
} 