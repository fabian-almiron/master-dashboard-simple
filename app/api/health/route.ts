import { NextRequest, NextResponse } from 'next/server'
import { getMasterSupabase } from '@/lib/master-supabase'
import { getRailwayEnvironmentInfo, getMasterDashboardUrl } from '@/lib/railway-config'
import { securityMiddleware, sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  // Basic rate limiting for health checks
  const securityCheck = await securityMiddleware(request, {
    rateLimit: { limit: 30, windowMs: 60000 } // 30 requests per minute
  })
  
  if (securityCheck) return securityCheck
  try {
    // Basic health check
    const startTime = Date.now()
    
    // Check database connection
    const masterSupabase = getMasterSupabase()
    const { data, error } = await masterSupabase
      .from('cms_instances')
      .select('count')
      .limit(1)
    
    const responseTime = Date.now() - startTime
    const railwayInfo = getRailwayEnvironmentInfo()
    
    if (error) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: 'Database connection failed',
          details: error.message,
          timestamp: new Date().toISOString(),
          environment: railwayInfo
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'unknown'
    })
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        details: sanitizeError(error),
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
