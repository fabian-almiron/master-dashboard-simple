import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This endpoint helps debug Railway environment variable issues
  // Remove this endpoint after fixing the database connection
  
  const envCheck = {
    // Check if environment variables exist (don't expose actual values)
    NEXT_PUBLIC_MASTER_SUPABASE_URL: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL,
    NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY,
    MASTER_SUPABASE_SERVICE_ROLE_KEY: !!process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY,
    
    // Show partial URLs for debugging (first 30 chars + ...)
    masterUrlPreview: process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL?.substring(0, 30) + '...',
    
    // Railway specific
    RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
    NODE_ENV: process.env.NODE_ENV,
    
    // Check if we're using fallback
    usingFallback: !process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL
  }
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: 'railway-debug',
    variables: envCheck,
    message: envCheck.usingFallback 
      ? 'ISSUE: Missing Master Supabase environment variables - using fallback client'
      : 'SUCCESS: All required Master database environment variables are present'
  })
}
