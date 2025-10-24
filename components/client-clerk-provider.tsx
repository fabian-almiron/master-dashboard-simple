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

  // If no publishable key, show error
  if (!publishableKey) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-gray-400">Clerk publishable key is missing</p>
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
