import { SignIn } from '@clerk/nextjs'
import { AltiraLogo } from '@/components/ui/altira-logo'

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="w-full max-w-md mx-4">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative bg-gray-900 rounded-full p-4 border border-gray-700/50">
              <AltiraLogo size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome to Altira
          </h1>
          <p className="text-gray-400 text-base mt-2">
            Sign in to access your CMS dashboard
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <SignIn 
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
        </div>
      </div>
    </div>
  )
}
