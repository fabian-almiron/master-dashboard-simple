'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode, useEffect, useState } from 'react'

interface ClientClerkProviderProps {
  children: ReactNode
  publishableKey: string
}

export function ClientClerkProvider({ children, publishableKey }: ClientClerkProviderProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // During server-side rendering or if not mounted, render without ClerkProvider
  if (!isMounted || !publishableKey) {
    return <>{children}</>
  }

  // Only render ClerkProvider on the client with valid key
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  )
}
