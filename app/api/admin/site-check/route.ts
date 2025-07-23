import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')
    const domain = searchParams.get('domain')

    // If checking by site ID
    if (siteId) {
      const { data: site, error } = await supabase
        .from('sites')
        .select('id, name, domain, status')
        .eq('id', siteId)
        .single()

      if (error) {
        return NextResponse.json({ exists: false, error: error.message })
      }

      return NextResponse.json({
        exists: true,
        id: site.id,
        name: site.name,
        domain: site.domain,
        status: site.status
      })
    }

    // If checking by domain
    if (domain) {
      const { data: site, error } = await supabase
        .from('sites')
        .select('id, name, domain, status')
        .eq('domain', domain)
        .eq('status', 'active')
        .single()

      if (error && error.code !== 'PGRST116') {
        return NextResponse.json({ exists: false, error: error.message })
      }

      if (site) {
        return NextResponse.json({
          exists: true,
          id: site.id,
          name: site.name,
          domain: site.domain,
          status: site.status,
          detectionMethod: 'domain'
        })
      }

      return NextResponse.json({ exists: false, message: 'No site found for domain' })
    }

    // If no parameters, return all sites for debugging
    const { data: sites, error } = await supabase
      .from('sites')
      .select('id, name, domain, status')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ exists: false, error: error.message })
    }

    return NextResponse.json({
      exists: sites.length > 0,
      count: sites.length,
      sites: sites,
      message: 'All active sites listed'
    })

  } catch (error) {
    console.error('Site check error:', error)
    return NextResponse.json(
      { exists: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 