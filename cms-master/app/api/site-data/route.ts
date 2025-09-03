import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')
    const type = searchParams.get('type') // 'navigation' or 'settings'

    if (!siteId) {
      return NextResponse.json({ error: 'Site ID is required' }, { status: 400 })
    }

    if (type === 'navigation') {
      const { data: navigationItems, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('site_id', siteId)
        .order('order_index', { ascending: true })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ navigationItems })
    }

    if (type === 'settings') {
      const { data: siteSettings, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('site_id', siteId)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      // Convert array of settings to key-value object
      const settingsObject: any = {}
      if (siteSettings && siteSettings.length > 0) {
        siteSettings.forEach((setting: any) => {
          settingsObject[setting.setting_key] = setting.setting_value
        })
      }

      return NextResponse.json({ siteSettings: settingsObject })
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
