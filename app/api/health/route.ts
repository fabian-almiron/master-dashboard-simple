import { NextRequest, NextResponse } from 'next/server'
import { masterSupabase } from '@/lib/master-supabase'
import { getRailwayEnvironmentInfo, getMasterDashboardUrl } from '@/lib/railway-config'

export async function GET(request: NextRequest) {
  try {
    // Basic health check
    const startTime = Date.now()
    
    // Check database connection
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
      environment: railwayInfo,
      masterDashboardUrl: getMasterDashboardUrl(),
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT || '3000'
    })
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        environment: getRailwayEnvironmentInfo()
      },
      { status: 503 }
    )
  }
}
