'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('🚨 [Error Boundary] Application error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this page. This might be due to:
          </p>
        </div>

        <div className="text-left mb-6 space-y-2">
          <div className="bg-gray-50 p-3 rounded text-sm">
            <strong>Possible causes:</strong>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• Database connection issues</li>
              <li>• Missing environment variables</li>
              <li>• Site configuration problems</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>
          
          {error.digest && (
            <div className="bg-red-50 p-3 rounded text-sm">
              <strong>Error ID:</strong> <code className="text-red-800">{error.digest}</code>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go to Homepage
          </a>
          
          <a
            href="/admin"
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go to Admin
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If this problem persists, check your environment variables and database connection.
          </p>
        </div>
      </div>
    </div>
  )
}
