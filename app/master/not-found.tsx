// Force dynamic rendering for all master routes
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  )
}
