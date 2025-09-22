import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/master-supabase'
import { securityMiddleware, sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  // Security check - require authentication in production
  const securityCheck = await securityMiddleware(request, {
    requireAdmin: process.env.NODE_ENV === 'production',
    rateLimit: { limit: 60, windowMs: 60000 } // 60 requests per minute
  })
  
  if (securityCheck) return securityCheck

  try {
    console.log('📊 Loading dashboard stats...')
    const stats = await getDashboardStats()
    console.log('✅ Dashboard stats loaded:', stats)
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('❌ Error loading dashboard stats:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to load dashboard statistics',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
