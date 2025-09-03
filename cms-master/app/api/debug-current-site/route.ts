import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

// Create fallback client if env vars are missing (for build time)
let supabaseAdmin: any = null

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables in debug-current-site')
  // Create a mock client that will return appropriate errors
  supabaseAdmin = {
    from: () => ({
      select: () => ({
        limit: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    })
  }
} else {

  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug: Checking current site and theme...')
    
    // Get the first site (current logic)
    const { data: currentSite, error: siteError } = await supabaseAdmin
      .from('sites')
      .select('*')
      .limit(1)
      .single()

    if (siteError) {
      return NextResponse.json({ error: siteError.message }, { status: 500 })
    }

    // Get the active theme for this site
    const { data: themeSetting, error: themeError } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('site_id', currentSite.id)
      .eq('key', 'active_theme')
      .maybeSingle()

    if (themeError) {
      return NextResponse.json({ error: themeError.message }, { status: 500 })
    }

    const debugInfo = {
      current_site: {
        id: currentSite.id,
        name: currentSite.name,
        domain: currentSite.domain,
        created_at: currentSite.created_at
      },
      theme_setting: themeSetting ? {
        id: themeSetting.id,
        site_id: themeSetting.site_id,
        key: themeSetting.key,
        value: themeSetting.value,
        created_at: themeSetting.created_at,
        updated_at: themeSetting.updated_at
      } : null,
      active_theme: themeSetting?.value || 'NO THEME SET',
      has_theme_setting: !!themeSetting
    }

    console.log('🔍 Debug: Current site info:', debugInfo)

    return NextResponse.json({
      success: true,
      ...debugInfo
    })

  } catch (error) {
    console.error('❌ Debug current site API error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
