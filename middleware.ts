import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
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
