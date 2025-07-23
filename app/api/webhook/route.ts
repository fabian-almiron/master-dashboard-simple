import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { action, siteId, siteDomain } = await request.json()
    
    if (action === "regenerate" && siteId) {
      // Set site context for generation
      process.env.CMS_SITE_ID = siteId
      process.env.NEXT_PUBLIC_CMS_SITE_ID = siteId
      
      const { generateAllStaticFiles } = await import("@/lib/static-generator-server")
      const success = await generateAllStaticFiles(siteId)
      
      return NextResponse.json({ 
        success, 
        siteId,
        message: success ? "Site-specific static files generated" : "Generation failed"
      })
    }
    
    return NextResponse.json({ message: "Webhook received" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
