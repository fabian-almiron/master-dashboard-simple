import { NextRequest, NextResponse } from 'next/server'
import { isMasterSupabaseConfigured } from '@/lib/master-supabase'
import { securityMiddleware, logSecurityEvent } from '@/lib/security'

export async function GET(request: NextRequest) {
  // SECURITY: Disable debug endpoint in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEBUG_ENDPOINTS !== 'true') {
    return NextResponse.json(
      { error: 'Debug endpoints are disabled in production for security' },
      { status: 403 }
    )
  }
  
  // Security check - admin only
  const securityCheck = await securityMiddleware(request, {
    requireAdmin: true,
    rateLimit: { limit: 5, windowMs: 60000 } // 5 requests per minute
  })
  
  if (securityCheck) return securityCheck
  
  // Log access to debug endpoint
  logSecurityEvent('DEBUG_ENDPOINT_ACCESS', {}, request)
  try {
    // Check what environment variables are actually available
    const envCheck = {
      // Master Supabase vars (only database we use)
      NEXT_PUBLIC_MASTER_SUPABASE_URL: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL,
      NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY,
      MASTER_SUPABASE_SERVICE_ROLE_KEY: !!process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY,
      
      // URLs (partial for debugging)
      masterUrlPartial: process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL?.substring(0, 30) + '...',
      
      // Configuration check
      isMasterConfigured: isMasterSupabaseConfigured(),
      
      // Railway info
      isRailway: !!process.env.RAILWAY_ENVIRONMENT,
      railwayEnv: process.env.RAILWAY_ENVIRONMENT,
      nodeEnv: process.env.NODE_ENV
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environmentCheck: envCheck
    })
    
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Debug check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
