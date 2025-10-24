'use client'

import { useUser, UserButton, useSession } from '@clerk/nextjs'
import { ReactNode } from 'react'

// Wrapper component that gracefully handles missing ClerkProvider during build
export function ClerkWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Safe useUser hook that doesn't crash during build or before client mount
export function useSafeUser() {
  try {
    // During server-side rendering, return safe defaults immediately
    if (typeof window === 'undefined') {
      return {
        user: null,
        isLoaded: false,
        isSignedIn: false
      }
    }
    
    // Check if auth is bypassed in development
    const isDevelopment = process.env.NODE_ENV === 'development'
    const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'
    
    if (isDevelopment && bypassAuth) {
      // Return mock authenticated user for bypassed auth
      return {
        user: {
          id: 'dev-user',
          emailAddresses: [{ emailAddress: 'dev@localhost.local' }],
          firstName: 'Developer',
          lastName: 'User'
        },
        isLoaded: true,
        isSignedIn: true
      }
    }
    
    return useUser()
  } catch (error) {
    // If ClerkProvider isn't ready yet, return safe defaults
    return {
      user: null,
      isLoaded: false,
      isSignedIn: false
    }
  }
}

// Safe useSession hook that doesn't crash during build
export function useSafeSession() {
  try {
    // During build (server-side), return safe defaults immediately
    if (typeof window === 'undefined') {
      return {
        session: null,
        isLoaded: false
      }
    }
    
    return useSession()
  } catch (error) {
    // During build (no ClerkProvider), return safe defaults
    return {
      session: null,
      isLoaded: false
    }
  }
}

// Safe UserButton that doesn't crash during build
export function SafeUserButton(props: any) {
  // Always return placeholder on server-side
  if (typeof window === 'undefined') {
    return (
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">U</span>
      </div>
    )
  }
  
  try {
    return <UserButton {...props} />
  } catch (error) {
    // If ClerkProvider isn't ready, return placeholder
    return (
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">U</span>
      </div>
    )
  }
}
