import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/master(.*)',
  '/api/master(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // Check if auth bypass is enabled in development
  const isDevelopment = process.env.NODE_ENV === 'development'
  const bypassAuth = process.env.BYPASS_AUTH === 'true'
  
  // Skip auth protection if bypassed in development
  if (isDevelopment && bypassAuth) {
    console.log('🔓 Middleware: Auth bypassed for route:', req.nextUrl.pathname)
    return
  }
  
  // Allow build to succeed even without Clerk keys (they'll be required at runtime)
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // Check if we have a valid key and it's not a production key in development
  const hasValidKey = publishableKey && publishableKey !== ''
  const isProductionKeyInDev = isDevelopment && publishableKey?.startsWith('pk_live_')
  
  // Only protect routes if Clerk is properly configured and not using wrong key type
  if (hasValidKey && !isProductionKeyInDev && isProtectedRoute(req)) {
    try {
      await auth.protect()
    } catch (error) {
      // In development with wrong key type, log helpful message
      if (isDevelopment && isProductionKeyInDev) {
        console.log('⚠️  Middleware: Cannot use production Clerk keys in development')
      }
      console.log('🔒 Middleware: Auth protection failed for route:', req.nextUrl.pathname)
      // Let the error propagate to show Clerk's auth UI
      throw error
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
