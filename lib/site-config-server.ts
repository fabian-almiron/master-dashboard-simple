import { supabase } from './supabase'

// Server-side site configuration
export interface SiteConfig {
  id: string
  name: string
  domain: string
  isActive: boolean
}

// Get current site ID for server-side operations
// This can be configured via environment variable or default to first active site
export function getCurrentSiteId(): string | null {
  // First check if there's a specific site ID in environment variables
  const envSiteId = process.env.CMS_SITE_ID
  if (envSiteId) {
    return envSiteId
  }

  // For now, we'll use a fallback approach
  // In production, you might want to determine this based on domain or other factors
  return process.env.DEFAULT_SITE_ID || null
}

// Get the most recently created active site (fallback method)
export async function getFirstActiveSite(): Promise<SiteConfig | null> {
  try {
    const { data: site, error } = await supabase
      .from('sites')
      .select('id, name, domain, status')
      .eq('status', 'active')
      .order('created_at', { ascending: false }) // Get the most recent site
      .limit(1)
      .single()

    if (error || !site) {
      console.warn('No active sites found in database')
      return null
    }

    return {
      id: site.id,
      name: site.name,
      domain: site.domain,
      isActive: site.status === 'active'
    }
  } catch (error) {
    console.error('Error getting first active site:', error)
    return null
  }
}

// Auto-configure site ID by finding the first active site
export async function autoConfigureSiteId(): Promise<string | null> {
  try {
    const site = await getFirstActiveSite()
    return site?.id || null
  } catch (error) {
    console.error('Error auto-configuring site ID:', error)
    return null
  }
} 