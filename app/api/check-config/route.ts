import { NextRequest, NextResponse } from 'next/server'
import { isMasterSupabaseConfigured, getMasterSupabase } from '@/lib/master-supabase'

export async function GET(request: NextRequest) {
  try {
    // Check configuration
    const isConfigured = isMasterSupabaseConfigured()
    
    if (!isConfigured) {
      return NextResponse.json({
        configured: false,
        message: 'Master Supabase not configured'
      })
    }
    
    // Test actual database connection
    const masterSupabase = getMasterSupabase()
    const { data, error } = await masterSupabase
      .from('cms_instances')
      .select('count')
      .limit(1)
    
    if (error) {
      return NextResponse.json({
        configured: true,
        connected: false,
        error: error.message
      })
    }
    
    return NextResponse.json({
      configured: true,
      connected: true,
      message: 'Master dashboard ready'
    })
    
  } catch (error) {
    return NextResponse.json({
      configured: false,
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
