import { NextResponse } from 'next/server'

export async function GET() {
  // Check if environment variables are loaded
  const envCheck = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY,
    hasSupabaseServiceKey: !!process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrlPreview: process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL?.substring(0, 40) + '...',
    allEnvVars: {
      // Show all env vars that start with NEXT_PUBLIC_ (safe to expose)
      ...Object.fromEntries(
        Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      )
    }
  }

  return NextResponse.json(envCheck)
}
