import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const width = searchParams.get('width') || '400'
    const height = searchParams.get('height') || '300'
    const text = searchParams.get('text') || 'Placeholder'

    // Create a simple SVG placeholder instead of using sharp
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
              fill="#6b7280" text-anchor="middle" dy=".3em">
          ${text}
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error generating placeholder:', error)
    return new NextResponse('Error generating placeholder', { status: 500 })
  }
}
