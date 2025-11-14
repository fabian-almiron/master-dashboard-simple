'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode, useEffect, useState } from 'react'

interface ClientClerkProviderProps {
  children: ReactNode
  publishableKey: string
}

export function ClientClerkProvider({ children, publishableKey }: ClientClerkProviderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Add a small delay to ensure ClerkProvider is fully ready
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Show loading state during mount/initialization
  if (!isMounted || !showContent) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 bg-blue-400/20 blur-md animate-pulse mx-auto"></div>
          </div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if we're in development and handle key validation
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isValidKey = publishableKey && publishableKey !== ''
  
  // If no publishable key, show error with helpful development information
  if (!isValidKey) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Clerk Configuration Required</h1>
          <p className="text-gray-400 mb-4">Clerk publishable key is missing</p>
          {isDevelopment && (
            <div className="text-left bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-yellow-400 text-sm mb-2">For development:</p>
              <p className="text-gray-300 text-xs mb-1">1. Create a <code>.env.local</code> file</p>
              <p className="text-gray-300 text-xs mb-1">2. Add your development Clerk keys:</p>
              <code className="text-green-400 text-xs block mt-2">
                NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
              </code>
              <p className="text-orange-400 text-xs mt-2">
                ⚠️ Use test keys (pk_test_) for development, not production keys (pk_live_)
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Check if using production keys in development
  if (isDevelopment && publishableKey.startsWith('pk_live_')) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <h1 className="text-2xl font-bold text-orange-400 mb-4">Invalid Key for Development</h1>
          <p className="text-gray-400 mb-4">Production Clerk keys cannot be used in development</p>
          <div className="text-left bg-gray-800 p-4 rounded-lg border border-orange-700">
            <p className="text-orange-400 text-sm mb-2">Solution:</p>
            <p className="text-gray-300 text-xs mb-2">Replace your production key with a development key:</p>
            <code className="text-red-400 text-xs block">❌ pk_live_... (production)</code>
            <code className="text-green-400 text-xs block mt-1">✅ pk_test_... (development)</code>
            <p className="text-gray-400 text-xs mt-2">
              Get development keys from your Clerk dashboard
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Only render with ClerkProvider once everything is ready
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  )
}
