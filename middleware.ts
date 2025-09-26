import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Development bypass for authentication
const isDevelopment = process.env.NODE_ENV === 'development'
const bypassAuth = process.env.BYPASS_AUTH === 'true'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Bypass authentication in development if BYPASS_AUTH is set
        if (isDevelopment && bypassAuth) {
          console.log('🔓 Development mode: Bypassing authentication')
          return true
        }
        
        // Protect /master routes
        if (req.nextUrl.pathname.startsWith('/master')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/master/:path*', '/api/master/:path*']
}
