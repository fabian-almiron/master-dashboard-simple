import { NextRequest, NextResponse } from 'next/server'
import { isMasterSupabaseConfigured } from '@/lib/master-supabase'

export async function GET(request: NextRequest) {
  try {
    // Check what environment variables are actually available
    const envCheck = {
      // Master Supabase vars
      NEXT_PUBLIC_MASTER_SUPABASE_URL: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL,
      NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY,
      MASTER_SUPABASE_SERVICE_ROLE_KEY: !!process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY,
      
      // Shared CMS vars
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      
      // URLs (partial for debugging)
      masterUrlPartial: process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL?.substring(0, 30) + '...',
      sharedUrlPartial: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      
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
