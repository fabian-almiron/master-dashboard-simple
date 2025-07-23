import { supabase } from './supabase'

// Server-side site configuration
export interface SiteConfig {
  id: string
  name: string
  domain: string
  isActive: boolean
}

// Auto-configuration for Vercel deployments
export function getCurrentSiteId(): string | null {
  // Priority order for site ID detection:
  // 1. Explicitly set CMS_SITE_ID (highest priority)
  // 2. Auto-generated from Vercel deployment context
  // 3. Default site ID fallback
  
  const explicitSiteId = process.env.CMS_SITE_ID || process.env.DEFAULT_SITE_ID
  if (explicitSiteId) {
    console.log('✅ Using explicit site ID:', explicitSiteId)
    return explicitSiteId
  }

  // Auto-generate site ID from Vercel deployment context
  if (process.env.VERCEL) {
    const vercelUrl = process.env.VERCEL_URL
    const vercelProjectId = process.env.VERCEL_PROJECT_ID
    const vercelEnv = process.env.VERCEL_ENV
    
    if (vercelProjectId) {
      // Use Vercel project ID as consistent site identifier
      const autoSiteId = `vercel-${vercelProjectId}`
      console.log('🔧 Auto-generated site ID from Vercel context:', autoSiteId)
      console.log('   Project ID:', vercelProjectId)
      console.log('   Environment:', vercelEnv)
      console.log('   URL:', vercelUrl)
      return autoSiteId
    }
  }

  console.log('⚠️ No site ID found, using fallback')
  return null
}

// Auto-configure site domain from Vercel
export function getAutoSiteDomain(): string {
  if (process.env.VERCEL) {
    const vercelUrl = process.env.VERCEL_URL
    if (vercelUrl) {
      return vercelUrl.replace(/^https?:\/\//, '')
    }
  }
  
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || 'localhost:3000'
}

// Auto-configure site from existing sites in database
export async function autoConfigureSiteId(): Promise<string | null> {
  try {
    console.log('🔍 Auto-configuring site from database...')
    
    // Try domain-based detection first (consistent with client-side)
    if (process.env.VERCEL_URL) {
      const vercelDomain = process.env.VERCEL_URL.replace(/^https?:\/\//, '')
      console.log('🔍 Trying domain-based lookup for:', vercelDomain)
      
      try {
        const { getSiteByDomain } = await import('./supabase')
        const site = await getSiteByDomain(vercelDomain)
        if (site) {
          console.log('✅ Found site by domain:', site.name, '→', site.id)
          return site.id
        }
      } catch (error) {
        console.log('⚠️ Domain-based lookup failed:', error)
      }
    }
    
    // Fallback: For Vercel deployments, use project ID as identifier (but look for existing site with this pattern)
    if (process.env.VERCEL && process.env.VERCEL_PROJECT_ID) {
      const autoSiteId = `vercel-${process.env.VERCEL_PROJECT_ID}`
      console.log('🔍 Trying Vercel project-based ID:', autoSiteId)
      
      try {
        const { getSiteById } = await import('./supabase')
        const site = await getSiteById(autoSiteId)
        if (site) {
          console.log('✅ Found site by Vercel project ID:', site.name)
          return autoSiteId
        }
      } catch (error) {
        console.log('⚠️ Vercel project ID lookup failed:', error)
      }
    }

    // Final fallback: Try to find existing sites and use the first one
    const { getAllSites } = await import('./supabase')
    const sites = await getAllSites()
    
    if (sites && sites.length > 0) {
      const firstSite = sites[0]
      console.log('✅ Using first available site:', firstSite.id, '(', firstSite.name, ')')
      return firstSite.id
    }

    console.log('⚠️ No sites found in database')
    return null
  } catch (error) {
    console.error('❌ Error auto-configuring site:', error)
    return null
  }
}

// Check if we're in a Vercel deployment
export function isVercelDeployment(): boolean {
  return !!process.env.VERCEL
}

// Get deployment context information
export function getDeploymentContext() {
  return {
    isVercel: !!process.env.VERCEL,
    projectId: process.env.VERCEL_PROJECT_ID,
    environment: process.env.VERCEL_ENV,
    url: process.env.VERCEL_URL,
    region: process.env.VERCEL_REGION,
    gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA
  }
} 