// Railway-specific configuration utilities

/**
 * Get the current Railway public domain
 * Railway automatically sets RAILWAY_PUBLIC_DOMAIN when deployed
 */
export function getRailwayDomain(): string {
  // Railway sets this automatically
  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN
  
  if (railwayDomain) {
    return `https://${railwayDomain}`
  }
  
  // Fallback to environment variable or localhost for development
  return process.env.NEXT_PUBLIC_MASTER_DASHBOARD_URL || 'http://localhost:3000'
}

/**
 * Get the master dashboard URL for Railway deployment
 * This handles both Railway's dynamic domains and custom domains
 */
export function getMasterDashboardUrl(): string {
  // Check for custom domain first
  const customUrl = process.env.NEXT_PUBLIC_MASTER_DASHBOARD_URL
  if (customUrl && !customUrl.includes('localhost')) {
    return customUrl
  }
  
  // Use Railway's public domain
  return getRailwayDomain()
}

/**
 * Check if we're running on Railway
 */
export function isRailwayDeployment(): boolean {
  return !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PUBLIC_DOMAIN)
}

/**
 * Get Railway-specific environment info
 */
export function getRailwayEnvironmentInfo() {
  return {
    isRailway: isRailwayDeployment(),
    environment: process.env.RAILWAY_ENVIRONMENT || 'unknown',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN || null,
    serviceId: process.env.RAILWAY_SERVICE_ID || null,
    deploymentId: process.env.RAILWAY_DEPLOYMENT_ID || null,
    region: process.env.RAILWAY_REGION || null,
    replica: process.env.RAILWAY_REPLICA_ID || null
  }
}

/**
 * Get the appropriate port for Railway deployment
 */
export function getPort(): number {
  return parseInt(process.env.PORT || '3000', 10)
}

/**
 * Get Railway-specific headers for API requests
 */
export function getRailwayHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  
  if (isRailwayDeployment()) {
    headers['X-Railway-Environment'] = process.env.RAILWAY_ENVIRONMENT || 'production'
    if (process.env.RAILWAY_SERVICE_ID) {
      headers['X-Railway-Service-ID'] = process.env.RAILWAY_SERVICE_ID
    }
  }
  
  return headers
}
