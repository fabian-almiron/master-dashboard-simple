import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Webhook: Site-specific static regeneration...')
    const { action, siteId, siteDomain } = await request.json()
    
    if (action === "regenerate" && siteId) {
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
        strategy: "100% headless - site-specific generation"
      })
    }
    
    return NextResponse.json({ 
      message: "Webhook received - no action taken",
      supportedActions: ["regenerate"],
      requiredFields: ["siteId"]
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
