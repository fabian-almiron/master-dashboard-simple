import dynamic from 'next/dynamic'

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic'

// Dynamically import the entire sign-in component with no SSR
const DynamicSignIn = dynamic(() => import('@/components/dynamic-sign-in'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 bg-blue-400/20 blur-md animate-pulse mx-auto"></div>
        </div>
        <p className="text-gray-300">Loading sign-in...</p>
      </div>
    </div>
  )
})

export default function SignInPage() {
  return <DynamicSignIn />
}
