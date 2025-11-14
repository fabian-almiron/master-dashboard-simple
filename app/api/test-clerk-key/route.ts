import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const secretKey = process.env.CLERK_SECRET_KEY
  
  if (!publishableKey) {
    return NextResponse.json({ 
      error: 'Publishable key not found',
      status: 'failed'
    }, { status: 400 })
  }
  
  // Test the key format and validity
  const keyAnalysis = {
    publishableKey: {
      exists: !!publishableKey,
      length: publishableKey.length,
      prefix: publishableKey.substring(0, 8),
      fullKey: publishableKey, // Show full key for debugging (safe since it's public)
      isLiveKey: publishableKey.startsWith('pk_live_'),
      isTestKey: publishableKey.startsWith('pk_test_'),
    },
    secretKey: {
      exists: !!secretKey,
      length: secretKey?.length || 0,
      prefix: secretKey?.substring(0, 8) || 'MISSING',
      isLiveKey: secretKey?.startsWith('sk_live_'),
      isTestKey: secretKey?.startsWith('sk_test_'),
    },
    expectedFormat: {
      note: 'Clerk keys should be longer than 40 characters',
      publishableKeyValid: publishableKey.length > 40,
      secretKeyValid: (secretKey?.length || 0) > 40
    }
  }
  
  // Test if we can make a request to Clerk API
  let clerkApiTest = {
    tested: false,
    error: null as string | null,
    response: null as any
  }
  
  try {
    // Try to fetch Clerk's frontend API config
    const clerkResponse = await fetch(`https://api.clerk.com/v1/environment`, {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    clerkApiTest.tested = true
    clerkApiTest.response = {
      status: clerkResponse.status,
      statusText: clerkResponse.statusText,
      ok: clerkResponse.ok
    }
    
    if (!clerkResponse.ok) {
      const errorText = await clerkResponse.text()
      clerkApiTest.error = errorText
    }
  } catch (error: any) {
    clerkApiTest.tested = true
    clerkApiTest.error = error.message
  }
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    keyAnalysis,
    clerkApiTest,
    recommendation: keyAnalysis.expectedFormat.publishableKeyValid 
      ? 'Key format looks OK' 
      : '⚠️ Key seems too short - please verify you copied the full key from Clerk dashboard'
  })
}
