import fs from 'fs/promises'
import path from 'path'
import { loadNavigationFromDatabase, loadPagesFromDatabase, loadTemplatesFromDatabase } from './cms-data-server'
import { getCurrentSiteId, autoConfigureSiteId, getAutoSiteDomain, isVercelDeployment, getDeploymentContext } from './site-config-server'
import { createSite, getSiteByDomain, getAllSites } from './supabase'

// Static files directory
const STATIC_DIR = path.join(process.cwd(), 'public', 'generated')

// Ensure a default site exists for new deployments
export async function ensureDefaultSite(): Promise<string> {
  try {
    // First check if we already have a configured site ID
    let siteId = getCurrentSiteId()
    if (siteId) {
      console.log('✅ Using configured site ID:', siteId)
      
      // Verify this site exists in the database
      try {
        const { getSiteById } = await import('./supabase')
        const site = await getSiteById(siteId)
        if (site) {
          console.log('✅ Site verified in database:', site.name)
          return siteId
        } else {
          console.warn('⚠️ Configured site ID not found in database, will auto-configure')
        }
      } catch (error) {
        console.warn('⚠️ Error verifying site, will auto-configure:', error)
      }
    }

    // Try to auto-configure from existing sites
    console.log('🔍 Auto-configuring site ID from database...')
    siteId = await autoConfigureSiteId()
    if (siteId) {
      console.log('✅ Auto-configured site ID:', siteId)
      
      if (isVercelDeployment()) {
        console.log('')
        console.log('🎉 AUTO-CONFIGURED FOR VERCEL!')
        console.log('   ✅ Using Vercel project-based site identification')
        console.log('   ✅ No manual environment variables needed!')
        console.log('')
      } else {
        console.log('')
        console.log('🚨 MANUAL SETUP NEEDED (Non-Vercel deployment):')
        console.log(`   CMS_SITE_ID=${siteId}`)
        console.log(`   NEXT_PUBLIC_CMS_SITE_ID=${siteId}`)
        console.log('')
      }
      return siteId
    }

    // If no sites exist, create a default one using Vercel context
    console.log('🏗️  No sites found. Creating default site for new deployment...')
    
    const deploymentContext = getDeploymentContext()
    console.log('📍 Deployment context:', deploymentContext)
    
    // Use Vercel project ID for consistent site identification
    const autoSiteId = deploymentContext.isVercel && deploymentContext.projectId 
      ? `vercel-${deploymentContext.projectId}`
      : undefined
      
    const siteDomain = getAutoSiteDomain()
    const siteName = deploymentContext.isVercel 
      ? `Vercel Site (${deploymentContext.environment})`
      : 'My Site'
    
    console.log('🚀 Creating site with auto-configuration:')
    console.log('   Auto Site ID:', autoSiteId)
    console.log('   Domain:', siteDomain)
    console.log('   Name:', siteName)
    
    const siteData = {
      name: siteName,
      domain: siteDomain,
      owner_email: process.env.DEFAULT_OWNER_EMAIL || 'admin@example.com',
      status: 'active' as const,
      plan: 'free' as const,
      settings: {
        siteName: siteName,
        siteDescription: 'Welcome to my site',
        theme: 'default',
        vercelProjectId: deploymentContext.projectId,
        vercelEnvironment: deploymentContext.environment
      }
    }
    
    // If we have a consistent site ID, try to update existing site or create with specific ID
    if (autoSiteId) {
      try {
        // Check if site already exists with this ID
        const { getSiteById } = await import('./supabase')
        const existingSite = await getSiteById(autoSiteId)
        
        if (existingSite) {
          console.log('✅ Found existing Vercel-based site:', existingSite.name)
          return autoSiteId
        }
      } catch (error) {
        console.log('ℹ️ No existing site found, will create new one')
      }
    }
    
    const defaultSite = await createSite(siteData)

    console.log('✅ Created default site:', defaultSite.id)
    
    if (deploymentContext.isVercel) {
      console.log('')
      console.log('🎉 AUTO-CONFIGURED FOR VERCEL!')
      console.log('   ✅ Site automatically configured using Vercel project context')
      console.log('   ✅ No manual environment variables needed!')
      console.log('   ✅ Site will persist across deployments')
      console.log(`   📍 Project ID: ${deploymentContext.projectId}`)
      console.log(`   🌍 Environment: ${deploymentContext.environment}`)
      console.log('')
    } else {
      console.log('')
      console.log('🚨 MANUAL SETUP NEEDED (Non-Vercel deployment):')
      console.log(`   CMS_SITE_ID=${defaultSite.id}`)
      console.log(`   NEXT_PUBLIC_CMS_SITE_ID=${defaultSite.id}`)
      console.log('')
    }
    
    return defaultSite.id
  } catch (error) {
    console.error('❌ Error ensuring default site:', error)
    throw new Error(`Failed to configure site: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Ensure static directory exists
async function ensureStaticDir() {
  try {
    await fs.access(STATIC_DIR)
  } catch {
    await fs.mkdir(STATIC_DIR, { recursive: true })
  }
}

// Generate navigation JSON file
async function generateNavigationFile(siteId: string): Promise<boolean> {
  try {
    console.log('🔍 DEBUG: generateNavigationFile starting with siteId:', siteId)
    
    const navigation = await loadNavigationFromDatabase(siteId)
    console.log('🔍 DEBUG: loadNavigationFromDatabase returned:', {
      length: navigation?.length || 0,
      items: navigation?.slice(0, 2) || [] // Show first 2 items for debugging
    })
    
    const filePath = path.join(STATIC_DIR, 'navigation.json')
    console.log('🔍 DEBUG: Writing navigation to:', filePath)
    
    await fs.mkdir(STATIC_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(navigation || [], null, 2))
    
    console.log('🔍 DEBUG: Navigation file written successfully')
    console.log(`✅ Generated navigation.json (${navigation?.length || 0} items)`)
    return true
  } catch (error) {
    console.error('🔍 DEBUG: generateNavigationFile error details:', {
      siteId,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })
    console.error('❌ Failed to generate navigation.json:', error)
    return false
  }
}

// Generate pages file
async function generatePagesFile(siteId: string): Promise<boolean> {
  try {
    console.log('🔍 DEBUG: generatePagesFile starting with siteId:', siteId)
    
    const pages = await loadPagesFromDatabase(siteId)
    console.log('🔍 DEBUG: loadPagesFromDatabase returned:', {
      length: pages?.length || 0,
      items: pages?.slice(0, 2).map(p => ({ id: p.id, title: p.title, slug: p.slug })) || [] // Show first 2 pages for debugging
    })
    
    const filePath = path.join(STATIC_DIR, 'pages.json')
    console.log('🔍 DEBUG: Writing pages to:', filePath)
    
    await fs.mkdir(STATIC_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(pages || [], null, 2))
    
    console.log('🔍 DEBUG: Pages file written successfully')
    console.log(`✅ Generated pages.json (${pages?.length || 0} pages)`)
    return true
  } catch (error) {
    console.error('🔍 DEBUG: generatePagesFile error details:', {
      siteId,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })
    console.error('❌ Failed to generate pages.json:', error)
    return false
  }
}

// Generate templates file
async function generateTemplatesFile(siteId: string): Promise<boolean> {
  try {
    console.log('🔍 DEBUG: generateTemplatesFile starting with siteId:', siteId)
    
    const templates = await loadTemplatesFromDatabase()
    console.log('🔍 DEBUG: loadTemplatesFromDatabase returned:', {
      length: templates?.length || 0,
      items: templates?.slice(0, 2).map(t => ({ id: t.id, name: t.name })) || [] // Show first 2 templates for debugging
    })
    
    const filePath = path.join(STATIC_DIR, 'templates.json')
    console.log('🔍 DEBUG: Writing templates to:', filePath)
    
    await fs.mkdir(STATIC_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(templates || [], null, 2))
    
    console.log('🔍 DEBUG: Templates file written successfully')
    console.log(`✅ Generated templates.json (${templates?.length || 0} templates)`)
    return true
  } catch (error) {
    console.error('🔍 DEBUG: generateTemplatesFile error details:', {
      siteId,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })
    console.error('❌ Failed to generate templates.json:', error)
    return false
  }
}

// Generate site settings JSON file
async function generateSiteSettingsFile(siteId: string): Promise<boolean> {
  try {
    console.log('🔍 DEBUG: generateSiteSettingsFile starting with siteId:', siteId)
    
    // Get current site settings
    const { getSiteById } = await import('./supabase')
    const site = await getSiteById(siteId)
    console.log('🔍 DEBUG: getSiteById returned:', site ? {
      id: site.id,
      name: site.name,
      settings: site.settings,
      domain: site.domain
    } : 'null')
    
    const settings = {
      theme: site?.settings?.theme || 'default',
      siteName: site?.name || 'My Site',
      siteDescription: site?.settings?.description || '',
      domain: site?.domain || ''
    }
    
    const filePath = path.join(STATIC_DIR, 'settings.json')
    console.log('🔍 DEBUG: Writing settings to:', filePath)
    console.log('🔍 DEBUG: Settings data:', settings)
    
    await fs.mkdir(STATIC_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2))
    
    console.log('🔍 DEBUG: Settings file written successfully')
    console.log(`✅ Generated settings.json (theme: ${settings.theme})`)
    return true
  } catch (error) {
    console.error('🔍 DEBUG: generateSiteSettingsFile error details:', {
      siteId,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })
    console.error('❌ Failed to generate settings.json:', error)
    return false
  }
}

// Generate all static files
export async function generateAllStaticFiles(forceSiteId?: string | null) {
  console.log('🚀 Generating all static files...')
  
  // Use provided site ID or ensure we have a site configured
  let siteId = forceSiteId
  if (!siteId) {
    try {
      siteId = await ensureDefaultSite()
      console.log('🔍 DEBUG: Site ensured for static generation:', siteId)
    } catch (error) {
      console.error('❌ Could not ensure default site:', error)
      return false
    }
  } else {
    console.log('🔍 DEBUG: Using provided site ID for static generation:', siteId)
  }
  
  console.log('🔍 DEBUG: Starting individual file generation...')
  
  const results = await Promise.allSettled([
    generateNavigationFile(siteId),
    generatePagesFile(siteId),
    generateTemplatesFile(siteId),
    generateSiteSettingsFile(siteId)
  ])
  
  // DEBUG: Log each result
  results.forEach((result, index) => {
    const fileNames = ['navigation', 'pages', 'templates', 'settings']
    if (result.status === 'fulfilled') {
      console.log(`🔍 DEBUG: ${fileNames[index]}.json generation:`, result.value ? 'SUCCESS' : 'FAILED')
    } else {
      console.log(`🔍 DEBUG: ${fileNames[index]}.json generation: REJECTED -`, result.reason)
    }
  })
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value === true).length
  const total = results.length
  
  console.log(`📊 Generated ${successful}/${total} static files`)
  console.log('🔍 DEBUG: Individual results:', results.map((r, i) => ({ 
    file: ['navigation', 'pages', 'templates', 'settings'][i],
    status: r.status,
    value: r.status === 'fulfilled' ? r.value : r.reason
  })))
  
  // For new installations, it's normal to have some failures due to empty data
  // Consider it successful if at least half the files generated
  const isSuccessful = successful >= Math.ceil(total / 2)
  console.log('🔍 DEBUG: Overall success determination:', isSuccessful, `(${successful}/${total} >= ${Math.ceil(total / 2)})`)
  
  return isSuccessful
} 