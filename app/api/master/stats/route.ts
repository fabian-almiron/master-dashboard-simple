import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/master-supabase'
import { sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {  
    // Fetch dashboard statistics
    const stats = await getDashboardStats()
    
    return NextResponse.json({
      success: true,
      data: stats
    })
    
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch dashboard statistics',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
