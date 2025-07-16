'use client'

import { supabase } from './supabase'

// Site configuration for multi-tenant setup
export interface SiteConfig {
  id: string
  name: string
  domain: string
  isActive: boolean
}

// Get or create site configuration
export async function getCurrentSite(): Promise<SiteConfig | null> {
  if (typeof window === 'undefined') return null

  try {
    // Check if site is already configured in localStorage
    const storedSiteId = localStorage.getItem('cms_site_id')
    
    if (storedSiteId) {
      // Verify site exists in database
      const { data: site, error } = await supabase
        .from('sites')
        .select('id, name, domain, status')
        .eq('id', storedSiteId)
        .single()

      if (!error && site) {
        return {
          id: site.id,
          name: site.name,
          domain: site.domain,
          isActive: site.status === 'active'
        }
      } else {
        // Site doesn't exist, clear invalid ID
        localStorage.removeItem('cms_site_id')
      }
    }

    // No valid site found, return null (will trigger site setup)
    return null
  } catch (error) {
    console.error('Error getting current site:', error)
    return null
  }
}

// Create a new site
export async function createSite(siteData: {
  name: string
  domain: string
  owner_email: string
}): Promise<SiteConfig | null> {
  try {
    const { data: site, error } = await supabase
      .from('sites')
      .insert([{
        name: siteData.name,
        domain: siteData.domain,
        owner_email: siteData.owner_email,
        status: 'active',
        plan: 'free'
      }])
      .select()
      .single()

    if (error) throw error

    // Store site ID in localStorage
    localStorage.setItem('cms_site_id', site.id)

    return {
      id: site.id,
      name: site.name,
      domain: site.domain,
      isActive: site.status === 'active'
    }
  } catch (error) {
    console.error('Error creating site:', error)
    return null
  }
}

// Set current site
export function setCurrentSite(siteId: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cms_site_id', siteId)
  }
}

// Get current site ID (synchronous)
export function getCurrentSiteId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cms_site_id')
} 