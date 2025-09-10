import { NextRequest, NextResponse } from 'next/server'
import { isMasterSupabaseFullyConfigured, testMasterConnection } from '@/lib/master-supabase'
import { securityMiddleware, sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  // Security check - admin only for config details
  const securityCheck = await securityMiddleware(request, {
    requireAdmin: true,
    rateLimit: { limit: 10, windowMs: 60000 } // 10 requests per minute
  })
  
  if (securityCheck) return securityCheck
  try {
    const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY
    const isMasterConfigured = isMasterSupabaseFullyConfigured()
    
    let connectionTest = { success: false, message: 'Not configured' }
    if (isMasterConfigured) {
      connectionTest = await testMasterConnection()
    }
    
    return NextResponse.json({
      success: true,
      configured: isMasterConfigured,
      connected: connectionTest.success,
      error: connectionTest.success ? null : connectionTest.message,
      config: {
        master_database_configured: isMasterConfigured,
        master_database_connected: connectionTest.success,
        anthropic_api_key_available: hasAnthropicKey,
        api_key_source: hasAnthropicKey ? 'environment' : 'none'
      }
    })
  } catch (error) {
    console.error('Config check error:', error)
    return NextResponse.json(
      { 
        success: false,
        configured: false,
        connected: false,
        error: 'Failed to check configuration',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}