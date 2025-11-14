import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This endpoint helps debug environment variables in Railway
  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    
    // Check if Clerk keys are accessible
    clerkKeys: {
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'SET' : 'MISSING',
      secretKey: process.env.CLERK_SECRET_KEY ? 'SET' : 'MISSING',
      publishableKeyLength: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.length || 0,
      publishableKeyPrefix: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 15) + '...' || 'NONE'
    },
    
    // Check other important environment variables
    otherVars: {
      bypass_auth: process.env.BYPASS_AUTH || 'NOT_SET',
      sign_in_url: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'NOT_SET',
      node_env: process.env.NODE_ENV || 'NOT_SET'
    },
    
    // Railway specific checks
    railway: {
      project_id: process.env.RAILWAY_PROJECT_ID ? 'SET' : 'MISSING',
      service_id: process.env.RAILWAY_SERVICE_ID ? 'SET' : 'MISSING',
      environment_name: process.env.RAILWAY_ENVIRONMENT_NAME || 'NOT_SET'
    }
  }
  
  return NextResponse.json(envCheck)
}