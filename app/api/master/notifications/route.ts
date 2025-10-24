import { NextRequest, NextResponse } from 'next/server'
import { getNotifications } from '@/lib/master-supabase'
import { sanitizeError } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const unreadOnlyParam = searchParams.get('unreadOnly')
    
    const limit = limitParam ? parseInt(limitParam, 10) : 20
    const unreadOnly = unreadOnlyParam === 'true'
    
    // Fetch notifications from database
    const notifications = await getNotifications(limit, unreadOnly)
    
    return NextResponse.json({
      success: true,
      data: notifications,
      count: notifications.length
    })
    
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch notifications',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
