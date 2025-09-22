import { NextRequest, NextResponse } from 'next/server'
import { getCMSInstances } from '@/lib/master-supabase'
import { securityMiddleware, sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  // Security check - require authentication in production
  const securityCheck = await securityMiddleware(request, {
    requireAdmin: process.env.NODE_ENV === 'production',
    rateLimit: { limit: 30, windowMs: 60000 } // 30 requests per minute
  })
  
  if (securityCheck) return securityCheck

  try {
    // Get limit from query params, default to 10
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    console.log(`📋 Loading CMS instances (limit: ${limit})...`)
    const instances = await getCMSInstances(limit)
    console.log(`✅ Loaded ${instances.length} CMS instances`)
    
    return NextResponse.json({
      success: true,
      data: instances
    })
  } catch (error) {
    console.error('❌ Error loading CMS instances:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to load CMS instances',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
