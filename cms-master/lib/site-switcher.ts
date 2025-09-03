import { Site } from './supabase'

const CURRENT_SITE_KEY = 'cms-tailwinds-current-site-id'

// Get the currently selected site ID from localStorage
export function getCurrentSiteId(): string | null {
  if (typeof window === 'undefined') {
    return null // Server-side, no localStorage
  }
  
  try {
    return localStorage.getItem(CURRENT_SITE_KEY)
  } catch (error) {
    console.error('Error reading current site ID from localStorage:', error)
    return null
  }
}

// Set the currently selected site ID in localStorage
export function setCurrentSiteId(siteId: string): void {
  if (typeof window === 'undefined') {
    return // Server-side, no localStorage
  }
  
  try {
    localStorage.setItem(CURRENT_SITE_KEY, siteId)
  } catch (error) {
    console.error('Error saving current site ID to localStorage:', error)
  }
}

// Clear the currently selected site ID from localStorage
export function clearCurrentSiteId(): void {
  if (typeof window === 'undefined') {
    return // Server-side, no localStorage
  }
  
  try {
    localStorage.removeItem(CURRENT_SITE_KEY)
  } catch (error) {
    console.error('Error clearing current site ID from localStorage:', error)
  }
}

// Get all available sites for the switcher
export async function getAvailableSites(): Promise<Site[]> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use direct Supabase query
      const { supabaseAdmin } = await import('./supabase')
      const { data, error } = await supabaseAdmin
        .from('sites')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching available sites:', error)
        return []
      }

      return data || []
    } else {
      // Client-side: use API route
      const response = await fetch('/api/sites')
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Error fetching available sites:', result.error)
        return []
      }

      return result.sites || []
    }
  } catch (error) {
    console.error('Error fetching available sites:', error)
    return []
  }
}

// Generate URL with site parameter
export function generateSiteUrl(siteName: string, currentPath?: string): string {
  if (typeof window === 'undefined') {
    return currentPath || '/'
  }
  
  const url = new URL(currentPath || window.location.pathname, window.location.origin)
  url.searchParams.set('site', siteName)
  return url.toString()
}

// Switch to a different site using URL parameters
export async function switchToSite(siteId: string, availableSites?: Site[]): Promise<boolean> {
  try {
    console.log(`🔄 Switching to site: ${siteId}`)
    
    // Validate that the site exists (use provided sites if available)
    let selectedSite: Site | null = null
    
    if (availableSites) {
      selectedSite = availableSites.find(site => site.id === siteId) || null
      if (!selectedSite) {
        console.error('Site not found:', siteId)
        return false
      }
    } else {
      // Fetch the site if not provided
      try {
        const response = await fetch(`/api/sites?action=getSiteById&id=${siteId}`)
        const result = await response.json()
        if (response.ok && result.site) {
          selectedSite = result.site
        }
      } catch (error) {
        console.error('Error fetching site for switching:', error)
        return false
      }
    }
    
    if (!selectedSite) {
      console.error('Could not find site to switch to:', siteId)
      return false
    }
    
    // Update localStorage as backup
    setCurrentSiteId(siteId)
    
    // Navigate to URL with site parameter
    if (typeof window !== 'undefined') {
      const newUrl = generateSiteUrl(selectedSite.name)
      console.log(`🌐 Switching to URL: ${newUrl}`)
      window.location.href = newUrl
    }
    
    console.log(`✅ Successfully switched to site: ${selectedSite.name}`)
    return true
  } catch (error) {
    console.error('Error switching to site:', error)
    return false
  }
}

// Get site ID from URL query parameters
export function getSiteIdFromUrl(): string | null {
  if (typeof window === 'undefined') {
    return null // Server-side, no window object
  }
  
  try {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('site') || urlParams.get('siteId')
  } catch (error) {
    console.error('Error reading site ID from URL:', error)
    return null
  }
}

// Get site name from URL query parameters
export function getSiteNameFromUrl(): string | null {
  if (typeof window === 'undefined') {
    return null // Server-side, no window object
  }
  
  try {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('site')
  } catch (error) {
    console.error('Error reading site name from URL:', error)
    return null
  }
}

// Get the current domain/hostname
export function getCurrentDomain(): string | null {
  if (typeof window === 'undefined') {
    return null // Server-side, no window object
  }
  
  try {
    return window.location.hostname
  } catch (error) {
    console.error('Error reading current domain:', error)
    return null
  }
}

// Find site by domain (for production deployments)
export async function getSiteByDomain(domain: string): Promise<Site | null> {
  try {
    const { supabaseAdmin } = await import('./supabase')
    const { data, error } = await supabaseAdmin
      .from('sites')
      .select('*')
      .eq('domain', domain)
      .single()

    if (error) {
      console.log(`🔍 No site found for domain: ${domain}`)
      return null
    }

    console.log(`🌐 Found site by domain: ${domain} -> ${data.name} (${data.id})`)
    return data
  } catch (error) {
    console.error('Error fetching site by domain:', error)
    return null
  }
}

// Get the current site with domain and URL-based selection
export async function getCurrentSiteWithFallback(searchParams?: any, headers?: any): Promise<Site | null> {
  try {
    const { supabaseAdmin } = await import('./supabase')
    
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: Check URL search params first, then domain, then environment variable
      let targetSiteId: string | null = null
      let targetSiteName: string | null = null
      let requestDomain: string | null = null
      
      // 1. Try to get site from URL search params (passed from page component)
      if (searchParams) {
        // Handle both URLSearchParams object and plain object
        if (typeof searchParams.get === 'function') {
          // URLSearchParams object
          targetSiteId = searchParams.get('siteId') || searchParams.get('site')
          targetSiteName = searchParams.get('site')
        } else {
          // Plain object from Next.js
          targetSiteId = searchParams.siteId as string || searchParams.site as string
          targetSiteName = searchParams.site as string
        }
      }
      
      // 2. If no URL params, try to detect by domain (for production)
      if (!targetSiteId && !targetSiteName) {
        // Try multiple sources for domain detection
        if (headers) {
          // From request headers (most reliable for server-side)
          requestDomain = headers.get('host') || headers.host
        }
        
        if (!requestDomain) {
          // From environment variables
          requestDomain = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || null
        }
        
        // Extract just the hostname if it's a full URL
        if (requestDomain) {
          try {
            if (requestDomain.startsWith('http')) {
              const url = new URL(requestDomain)
              requestDomain = url.hostname
            }
          } catch {
            // If URL parsing fails, use as-is
          }
          
          console.log(`🌐 Server-side: Checking domain: ${requestDomain}`)
          const domainSite = await getSiteByDomain(requestDomain)
          if (domainSite) {
            return domainSite
          }
        }
      }
      
      // 2. Try to find by site name if provided
      if (targetSiteName) {
        console.log(`🔧 Server-side: Looking up site by name: ${targetSiteName}`)
        const { data, error } = await supabaseAdmin
          .from('sites')
          .select('*')
          .eq('name', targetSiteName)
          .single()

        if (!error && data) {
          console.log(`🎯 Server-side: Found site by name: ${data.name} (${data.id})`)
          return data
        } else {
          console.warn(`⚠️ Site not found by name: ${targetSiteName}`)
        }
      }
      
      // 3. Try to use site ID if provided
      if (targetSiteId) {
        console.log(`🔧 Server-side: Looking up site by ID: ${targetSiteId}`)
        const { data, error } = await supabaseAdmin
          .from('sites')
          .select('*')
          .eq('id', targetSiteId)
          .single()

        if (!error && data) {
          console.log(`🎯 Server-side: Found site by ID: ${data.name} (${data.id})`)
          return data
        } else {
          console.warn(`⚠️ Site not found by ID: ${targetSiteId}`)
        }
      }
      
      // 4. Fallback to environment variable (if still set)
      const envSiteId = process.env.CMS_SITE_ID || process.env.NEXT_PUBLIC_CMS_SITE_ID
      if (envSiteId) {
        console.log(`🔧 Server-side: Trying environment variable: ${envSiteId}`)
        const { data, error } = await supabaseAdmin
          .from('sites')
          .select('*')
          .eq('id', envSiteId)
          .single()

        if (!error && data) {
          console.log(`🎯 Server-side: Using env site: ${data.name} (${data.id})`)
          return data
        } else {
          console.warn(`⚠️ Environment site not found: ${envSiteId}`)
        }
      }
      
      // 5. Final fallback: use the first active site
      console.log('🔄 Server-side: Using first active site as fallback')
      const { data, error } = await supabaseAdmin
        .from('sites')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

      if (error) {
        console.error('Error fetching fallback site:', error)
        return null
      }

      console.log(`🎯 Server-side: Using fallback site: ${data.name} (${data.id})`)
      return data
    } else {
      // Client-side: Check URL params first, then domain, then localStorage
      let currentSiteId = getSiteIdFromUrl()
      const currentSiteName = getSiteNameFromUrl()
      const currentDomain = getCurrentDomain()
      
      // Determine if we have a site name or site ID from URL
      let targetSite: Site | null = null
      
      // 1. Try URL parameters first (highest priority)
      if (currentSiteName || currentSiteId) {
        try {
          // Fetch all sites to do the lookup
          const response = await fetch(`/api/sites`)
          const result = await response.json()
          
          if (response.ok && result.sites) {
            // Try to find by site name first (more user-friendly)
            if (currentSiteName) {
              targetSite = result.sites.find((s: Site) => s.name === currentSiteName) || null
              if (targetSite) {
                console.log(`🔍 Client-side: Found site by URL name: ${currentSiteName} -> ${targetSite.id}`)
              }
            }
            
            // If not found by name, try by ID
            if (!targetSite && currentSiteId) {
              targetSite = result.sites.find((s: Site) => s.id === currentSiteId) || null
              if (targetSite) {
                console.log(`🔍 Client-side: Found site by URL ID: ${currentSiteId}`)
              }
            }
          }
        } catch (error) {
          console.error('Error looking up site from URL:', error)
        }
      }
      
      // 2. Try domain-based detection (for production deployments)
      if (!targetSite && currentDomain) {
        try {
          const response = await fetch(`/api/sites`)
          const result = await response.json()
          
          if (response.ok && result.sites) {
            targetSite = result.sites.find((s: Site) => s.domain === currentDomain) || null
            if (targetSite) {
              console.log(`🌐 Client-side: Found site by domain: ${currentDomain} -> ${targetSite.name} (${targetSite.id})`)
            }
          }
        } catch (error) {
          console.error('Error looking up site by domain:', error)
        }
      }
      
      // 3. Fallback to localStorage if no URL params or domain worked
      if (!targetSite) {
        const localStorageId = getCurrentSiteId()
        if (localStorageId) {
          console.log(`🔄 Client-side: No URL/domain site found, trying localStorage: ${localStorageId}`)
          
          try {
            const response = await fetch(`/api/sites?action=getSiteById&id=${localStorageId}`)
            const result = await response.json()
            
            if (response.ok && result.site) {
              targetSite = result.site
              if (targetSite) {
                console.log(`🎯 Client-side: Using localStorage site: ${targetSite.name} (${targetSite.id})`)
              }
            }
          } catch (error) {
            console.error('Error fetching site from localStorage:', error)
          }
        }
      }
      
      if (!targetSite) {
        console.warn('⚠️ No current site found in URL, domain, or localStorage')
        return null
      }

      console.log(`🎯 Client-side: Using site: ${targetSite.name} (${targetSite.id})`)
      return targetSite
    }
  } catch (error) {
    console.error('Error getting current site with fallback:', error)
    return null
  }
}
