import fs from 'fs/promises'
import path from 'path'

// Serverless environment detection
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME

// Helper function to safely read static files
async function readStaticFile(filename: string): Promise<any> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'generated', filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.log(`📄 Static file ${filename} not found or invalid, will use database fallback`)
    return null
  }
}

// Helper function to load data with database fallback
async function loadWithFallback<T>(
  staticFilename: string,
  databaseLoader: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  // In serverless environments, always use database
  if (isServerless) {
    console.log(`🌐 Serverless environment detected, loading ${staticFilename} from database`)
    try {
      return await databaseLoader()
    } catch (error) {
      console.error(`❌ Database fallback failed for ${staticFilename}:`, error)
      return defaultValue
    }
  }
  
  // Try static file first
  const staticData = await readStaticFile(staticFilename)
  if (staticData !== null) {
    console.log(`✅ Loaded ${staticFilename} from static file`)
    return staticData
  }
  
  // Fallback to database
  console.log(`🔄 Loading ${staticFilename} from database (static file unavailable)`)
  try {
    return await databaseLoader()
  } catch (error) {
    console.error(`❌ Database fallback failed for ${staticFilename}:`, error)
    return defaultValue
  }
}

export async function loadStaticPages() {
  return loadWithFallback(
    'pages.json',
    async () => {
      const { loadPagesFromDatabase } = await import('./cms-data-server')
      return await loadPagesFromDatabase()
    },
    []
  )
}

export async function loadStaticNavigation() {
  return loadWithFallback(
    'navigation.json',
    async () => {
      const { loadNavigationFromDatabase } = await import('./cms-data-server')
      return await loadNavigationFromDatabase()
    },
    []
  )
}

export async function loadStaticSettings() {
  return loadWithFallback(
    'settings.json',
    async () => {
      const { getCurrentSiteId } = await import('./site-config-server')
      const siteId = getCurrentSiteId()
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

export async function loadStaticTemplates() {
  return loadWithFallback(
    'templates.json',
    async () => {
      const { loadTemplatesFromDatabase } = await import('./cms-data-server')
      return await loadTemplatesFromDatabase()
    },
    []
  )
} 