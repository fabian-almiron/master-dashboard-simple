'use client'

import { useEffect, useState } from 'react'

export function ClerkSignIn() {
  const [SignInComponent, setSignInComponent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only import Clerk on the client side after component mounts
    const loadClerkSignIn = async () => {
      try {
        const clerkModule = await import('@clerk/nextjs')
        setSignInComponent(() => clerkModule.SignIn)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load Clerk SignIn:', err)
        setError('Failed to load sign-in form')
        setIsLoading(false)
      }
    }

    loadClerkSignIn()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="w-80 h-96 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading sign-in form...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !SignInComponent) {
    return (
      <div className="flex justify-center">
        <div className="w-80 h-96 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-sm">{error || 'Sign-in unavailable'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SignInComponent 
      signUpUrl={null}
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl shadow-black/50",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
          socialButtonsBlockButtonText: "text-white",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          formFieldInput: "bg-gray-800 border-gray-700 text-white",
          formFieldLabel: "text-gray-300",
          identityPreviewText: "text-gray-300",
          identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
          footerActionText: "text-gray-400",
          footerActionLink: "text-blue-400 hover:text-blue-300",
          dividerLine: "bg-gray-700",
          dividerText: "text-gray-400",
          otpCodeFieldInput: "bg-gray-800 border-gray-700 text-white",
          alternativeMethodsBlockButton: "text-blue-400 hover:text-blue-300",
          footerAction: "hidden", // Hide the sign-up link
        }
      }}
    />
  )
}
