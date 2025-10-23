'use client'

import { useUser, UserButton, useSession } from '@clerk/nextjs'
import { ReactNode } from 'react'

// Wrapper component that gracefully handles missing ClerkProvider during build
export function ClerkWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Safe useUser hook that doesn't crash during build
export function useSafeUser() {
  try {
    return useUser()
  } catch (error) {
    // During build (no ClerkProvider), return safe defaults
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
  try {
    return <UserButton {...props} />
  } catch (error) {
    // During build (no ClerkProvider), return placeholder
    return (
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">U</span>
      </div>
    )
  }
}
