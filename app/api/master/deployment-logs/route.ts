import { NextRequest, NextResponse } from 'next/server'
import { getMasterSupabase } from '@/lib/master-supabase'
import { sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    const masterSupabase = getMasterSupabase()
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : 20
    
    // Fetch deployment logs from database
    const { data, error } = await masterSupabase
      .from('deployment_logs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })
    
  } catch (error) {
    console.error('Error fetching deployment logs:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch deployment logs',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
