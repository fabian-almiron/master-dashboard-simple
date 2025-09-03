import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { siteId } = await request.json()

    if (!siteId) {
      return NextResponse.json({
        success: false,
        error: 'Site ID is required'
      }, { status: 400 })
    }

    // This endpoint just returns success - the client will handle localStorage
    return NextResponse.json({
      success: true,
      message: `Current site set to: ${siteId}`,
      siteId
    })

  } catch (error) {
    console.error('Error setting current site:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to set current site'
    }, { status: 500 })
  }
}
