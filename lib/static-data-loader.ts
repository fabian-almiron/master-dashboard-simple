// Serverless environment detection
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
const isServer = typeof window === 'undefined'

// Helper function to safely read static files (server-side only)
async function readStaticFile(filename: string): Promise<any> {
  if (!isServer) {
    // Browser environment - use fetch instead
    try {
      const response = await fetch(`/generated/${filename}`)
      if (!response.ok) throw new Error('File not found')
      return await response.json()
    } catch (error) {
      console.log(`📄 Static file ${filename} not found via fetch, will use database fallback`)
      return null
    }
  }
  
  // Server environment - use fs
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public', 'generated', filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.log(`📄 Static file ${filename} not found on server, will use database fallback`)
    return null
  }
}

// Helper function to load data with database fallback
async function loadWithFallback<T>(
  staticFilename: string,
  databaseLoader: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  // Multi-site hosting: Always try static files first for performance
  // This enables CDN caching and reduces database load for 50+ sites
  
  // Try static file first
  const staticData = await readStaticFile(staticFilename)
  if (staticData !== null) {
    console.log(`✅ Loaded ${staticFilename} from static file`)
    return staticData
  }
  
  // Fallback to database (server-side only)
  if (isServer) {
    console.log(`🔄 Loading ${staticFilename} from database (static file unavailable)`)
    try {
      return await databaseLoader()
    } catch (error) {
      console.error(`❌ Database fallback failed for ${staticFilename}:`, error)
      return defaultValue
    }
  }
  
  // Browser fallback
  console.log(`⚠️ Using default value for ${staticFilename} (browser environment, no database access)`)
  return defaultValue
}

export async function loadStaticPages(forceSiteId?: string | null) {
  return loadWithFallback(
    'pages.json',
    async () => {
      const { loadPagesFromDatabase } = await import('./cms-data-server')
      return await loadPagesFromDatabase(forceSiteId)
    },
    []
  )
}

export async function loadStaticNavigation(forceSiteId?: string | null) {
  return loadWithFallback(
    'navigation.json',
    async () => {
      const { loadNavigationFromDatabase } = await import('./cms-data-server')
      return await loadNavigationFromDatabase(forceSiteId)
    },
    []
  )
}

export async function loadStaticSettings(forceSiteId?: string | null) {
  return loadWithFallback(
    'settings.json',
    async () => {
      const { getCurrentSiteId } = await import('./site-config-server')
      const siteId = forceSiteId || getCurrentSiteId()
      if (!siteId) {
        return { theme: 'default', siteName: 'My Site', siteDescription: '', domain: '' }
      }
      
      const { getSiteById } = await import('./supabase')
      const site = await getSiteById(siteId)
      return {
        theme: site?.settings?.theme || 'default',
        siteName: site?.name || 'My Site',
        siteDescription: site?.settings?.description || '',
        domain: site?.domain || ''
      }
    },
    { theme: 'default', siteName: 'My Site', siteDescription: '', domain: '' }
  )
}

export async function loadStaticTemplates(forceSiteId?: string | null) {
  return loadWithFallback(
    'templates.json',
    async () => {
      const { loadTemplatesFromDatabase } = await import('./cms-data-server')
      return await loadTemplatesFromDatabase(forceSiteId)
    },
    []
  )
} 