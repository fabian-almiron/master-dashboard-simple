import { ClientOnly } from '@/components/client-only'
import { ClerkSignIn } from '@/components/clerk-sign-in'

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
              <svg width="32" height="32" viewBox="0 0 99 23" className="text-blue-400" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M93.5266 8.66132C94.2176 8.66132 94.8794 8.74702 95.511 8.91815C96.148 9.08928 96.7121 9.35469 97.2034 9.71405C97.7 10.0734 98.0911 10.536 98.3772 11.1008C98.6633 11.6598 98.8069 12.3301 98.8069 13.1115V21.9758H95.5354V20.1535H95.4378C95.238 20.5642 94.9707 20.9267 94.636 21.2404C94.3014 21.5483 93.8995 21.7912 93.4299 21.968C92.9603 22.1391 92.4174 22.2238 91.802 22.2238C91.0087 22.2238 90.3016 22.079 89.6809 21.7883C89.0601 21.4916 88.568 21.0549 88.2063 20.4787C87.8501 19.8969 87.6721 19.1719 87.6721 18.3049C87.6722 17.575 87.7994 16.9621 88.053 16.466C88.3067 15.9698 88.652 15.5701 89.0891 15.2678C89.5264 14.9654 90.0233 14.7372 90.5794 14.5832C91.1408 14.4292 91.7296 14.3207 92.345 14.258C93.0683 14.1781 93.6514 14.1038 94.094 14.0353C94.5366 13.9612 94.8582 13.8527 95.0579 13.7101C95.2573 13.5676 95.3566 13.3566 95.3567 13.0773V13.0256C95.3567 12.4837 95.1952 12.0644 94.8714 11.7678C94.5529 11.4712 94.0993 11.3225 93.511 11.3224C92.8902 11.3224 92.3957 11.468 92.0286 11.759C91.6616 12.0441 91.4189 12.4037 91.3001 12.8371L88.1096 12.5637C88.2715 11.7652 88.5899 11.0751 89.0647 10.4933C89.5398 9.90578 90.1532 9.45456 90.9036 9.14081C91.6592 8.82147 92.5336 8.66135 93.5266 8.66132ZM95.3811 15.884C95.2732 15.9581 95.1246 16.0264 94.9358 16.0891C94.7523 16.1461 94.5448 16.2008 94.3128 16.2521C94.0808 16.2977 93.8485 16.3402 93.6165 16.3801C93.3844 16.4143 93.1735 16.4453 92.9846 16.4738C92.5799 16.5365 92.2263 16.6368 91.9241 16.7736C91.6218 16.9105 91.3864 17.0964 91.219 17.3303C91.0518 17.5584 90.968 17.8436 90.968 18.1857C90.9681 18.6817 91.138 19.0611 91.4778 19.3234C91.8233 19.5801 92.2612 19.7082 92.7903 19.7082C93.2976 19.7082 93.7454 19.6028 94.134 19.3918C94.5227 19.175 94.8278 18.8838 95.0491 18.5187C95.2703 18.1537 95.3811 17.7405 95.3811 17.2785V15.884Z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome to Altira
          </h1>
          <p className="text-gray-400 text-base mt-2">
            Sign in to access your CMS dashboard
          </p>
        </div>

        {/* Client-Only Clerk Sign In Component */}
        <ClientOnly
          fallback={
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm">Loading sign-in...</p>
                </div>
              </div>
            </div>
          }
        >
          <ClerkSignIn />
        </ClientOnly>
      </div>
    </div>
  )
}
