import { NextRequest, NextResponse } from 'next/server'
import { getCMSInstances } from '@/lib/master-supabase'
import { sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined
    
    // Fetch instances from database
    const instances = await getCMSInstances(limit)
    
    return NextResponse.json({
      success: true,
      data: instances,
      count: instances.length
    })
    
  } catch (error) {
    console.error('Error fetching CMS instances:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch CMS instances',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
