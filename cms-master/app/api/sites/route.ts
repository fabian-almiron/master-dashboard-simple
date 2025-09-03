import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

// Create fallback client if env vars are missing (for build time)
let supabaseAdmin: any

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing environment variables in sites API:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey
  })
  
  // Create a mock client for build time
  supabaseAdmin = {
    from: () => ({
      select: () => ({ 
        eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
        order: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } })
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) })
    })
  }
} else {
  // Server-side admin client
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'getCurrentSite') {
      // Get the first site (for single-tenant setup)
      const { data: sites, error } = await supabaseAdmin
        .from('sites')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ site: sites })
    }

    if (action === 'getSiteById') {
      const id = searchParams.get('id')
      if (!id) {
        return NextResponse.json({ error: 'Site ID is required' }, { status: 400 })
      }

      const { data: site, error } = await supabaseAdmin
        .from('sites')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ site })
    }

    // Get all sites
    const { data: sites, error } = await supabaseAdmin
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ sites: sites || [] })
  } catch (error) {
    console.error('Sites API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'createSite':
        const { data: site, error: createError } = await supabaseAdmin
          .from('sites')
          .insert([data])
          .select()
          .single()

        if (createError) {
          return NextResponse.json({ error: createError.message }, { status: 500 })
        }

        // Automatically activate base-theme for new sites
        if (site) {
          const { error: settingError } = await supabaseAdmin
            .from('site_settings')
            .insert([{
              site_id: site.id,
              key: 'active_theme',
              value: 'base-theme'
            }])

          if (settingError) {
            console.warn('Failed to set default active_theme for new site:', settingError)
          } else {
            console.log(`✅ Set base-theme as active theme for site: ${site.id}`)
          }
        }

        return NextResponse.json({ site })

      case 'updateSite':
        const { data: updatedSite, error: updateError } = await supabaseAdmin
          .from('sites')
          .update(data)
          .eq('id', data.id)
          .select()
          .single()

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 500 })
        }

        return NextResponse.json({ site: updatedSite })

      case 'deleteSite':
        const { error: deleteError } = await supabaseAdmin
          .from('sites')
          .delete()
          .eq('id', data.id)

        if (deleteError) {
          return NextResponse.json({ error: deleteError.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Sites API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
