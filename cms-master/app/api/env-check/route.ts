import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...',
    publicServiceKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...'
  }

  return NextResponse.json(envCheck)
}
