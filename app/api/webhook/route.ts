import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Webhook: Site-specific static regeneration...')
    const { action, siteId: providedSiteId, siteDomain } = await request.json()
    
    if (action === "regenerate") {
      // Get domain for site detection
      const domain = request.headers.get('host') || 'unknown'
      console.log('🌐 Request domain:', domain)
      
      let siteId = providedSiteId
      
      // If no siteId provided, try domain-based detection
      if (!siteId) {
        console.log('🔍 No siteId provided, trying domain-based detection...')
        try {
          const { getSiteByDomain } = await import('@/lib/supabase')
          const targetDomain = siteDomain || domain
          const site = await getSiteByDomain(targetDomain)
          if (site) {
            siteId = site.id
            console.log('✅ Found site by domain:', site.name, '→', site.id)
          } else {
            console.log('🔍 No site found for domain:', targetDomain)
          }
        } catch (error) {
          console.log('⚠️ Domain lookup failed:', error)
        }
      }
      
      if (!siteId) {
        return NextResponse.json({ 
          success: false,
          message: "No site ID provided and domain lookup failed",
          domain: domain,
          hint: "Provide siteId in request body or ensure site exists for this domain"
        }, { status: 400 })
      }
      
      console.log('🎯 Regenerating static files for site:', siteId)
      
      // Import the generation function
      const { generateAllStaticFiles } = await import('@/lib/static-generator-server')
      
      // Generate static files with the specific site ID
      const success = await generateAllStaticFiles(siteId)
      
      return NextResponse.json({ 
        success, 
        siteId,
        message: success ? "Site-specific static files generated successfully" : "Static file generation failed",
        timestamp: new Date().toISOString(),
        strategy: "100% headless - domain-based site detection"
      })
    }
    
    return NextResponse.json({ 
      message: "Webhook received - no action taken",
      supportedActions: ["regenerate"],
      optionalFields: ["siteId", "siteDomain"]
    })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: "Webhook failed to process request"
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Site-specific static regeneration webhook",
    usage: "POST with { action: 'regenerate', siteId: 'site-uuid' }",
    purpose: "100% headless multi-site static file generation"
  })
}
