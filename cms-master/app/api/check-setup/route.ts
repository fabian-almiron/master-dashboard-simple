import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Check if any sites exist
    const { data: sites, error } = await supabaseAdmin
      .from('sites')
      .select('id, name')
      .limit(1)

    if (error) {
      console.error('Error checking sites:', error)
      return NextResponse.json({ needsSetup: true, error: error.message })
    }

    const needsSetup = !sites || sites.length === 0

    return NextResponse.json({
      needsSetup,
      siteCount: sites?.length || 0,
      firstSite: sites?.[0] || null
    })
  } catch (error) {
    console.error('Error in check-setup:', error)
    return NextResponse.json(
      { needsSetup: true, error: 'Failed to check setup status' },
      { status: 500 }
    )
  }
}
