import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

// Create fallback client if env vars are missing (for build time)
let supabaseAdmin: any

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables in debug-theme-settings')
  // Create a mock client that will return appropriate errors
  supabaseAdmin = {
    from: () => ({
      select: () => ({
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          maybeSingle: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
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
    console.log('🔍 Debug: Checking all sites and their theme settings...')
    
    // Get all sites
    const { data: sites, error: sitesError } = await supabaseAdmin
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false })

    if (sitesError) {
      return NextResponse.json({ error: sitesError.message }, { status: 500 })
    }

    // Get all site settings
    const { data: siteSettings, error: settingsError } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('key', 'active_theme')

    if (settingsError) {
      return NextResponse.json({ error: settingsError.message }, { status: 500 })
    }

    // Create a map of site settings
    const themeSettingsMap = new Map()
    siteSettings?.forEach((setting: any) => {
      themeSettingsMap.set(setting.site_id, setting.value)
    })

    // Combine sites with their theme settings
    const sitesWithThemes = sites?.map((site: any) => ({
      id: site.id,
      name: site.name,
      domain: site.domain,
      created_at: site.created_at,
      active_theme: themeSettingsMap.get(site.id) || 'NO THEME SET',
      has_theme_setting: themeSettingsMap.has(site.id)
    }))

    console.log('🔍 Debug: Sites with theme settings:', sitesWithThemes)

    return NextResponse.json({
      success: true,
      sites: sitesWithThemes,
      total_sites: sites?.length || 0,
      sites_with_themes: siteSettings?.length || 0,
      theme_settings: siteSettings
    })

  } catch (error) {
    console.error('❌ Debug API error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
