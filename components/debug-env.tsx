'use client'

import { useState } from 'react'

export function DebugEnv() {
  const [showDebug, setShowDebug] = useState(false)
  
  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }
  
  const clientEnvCheck = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'MISSING',
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'MISSING'
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="bg-blue-600 text-white px-3 py-2 rounded text-xs"
      >
        Debug Env
      </button>
      
      {showDebug && (
        <div className="absolute bottom-12 right-0 bg-gray-900 border border-gray-700 rounded p-4 w-80 text-xs text-white max-h-60 overflow-auto">
          <h3 className="font-bold mb-2">Client Environment Variables:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(clientEnvCheck, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
