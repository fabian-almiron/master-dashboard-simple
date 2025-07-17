import fs from 'fs/promises'
import path from 'path'
import { loadNavigationFromDatabase, loadPagesFromDatabase, loadTemplatesFromDatabase } from './cms-data-server'
import { getCurrentSiteId, autoConfigureSiteId } from './site-config-server'

// Static files directory
const STATIC_DIR = path.join(process.cwd(), 'public', 'generated')

// Ensure static directory exists
async function ensureStaticDir() {
  try {
    await fs.access(STATIC_DIR)
  } catch {
    await fs.mkdir(STATIC_DIR, { recursive: true })
  }
}

// Generate navigation JSON file
export async function generateNavigationFile() {
  try {
    console.log('📄 Generating static navigation file...')
    
    await ensureStaticDir()
    const navigation = await loadNavigationFromDatabase()
    
    const filePath = path.join(STATIC_DIR, 'navigation.json')
    await fs.writeFile(filePath, JSON.stringify(navigation, null, 2))
    
    console.log('✅ Static navigation file generated:', filePath)
    return true
  } catch (error) {
    console.error('❌ Error generating navigation file:', error)
    return false
  }
}

// Generate pages JSON file
export async function generatePagesFile() {
  try {
    console.log('📄 Generating static pages file...')
    
    await ensureStaticDir()
    const pages = await loadPagesFromDatabase()
    
    const filePath = path.join(STATIC_DIR, 'pages.json')
    await fs.writeFile(filePath, JSON.stringify(pages, null, 2))
    
    console.log('✅ Static pages file generated:', filePath)
    return true
  } catch (error) {
    console.error('❌ Error generating pages file:', error)
    return false
  }
}

// Generate templates JSON file
export async function generateTemplatesFile() {
  try {
    console.log('📄 Generating static templates file...')
    
    await ensureStaticDir()
    const templates = await loadTemplatesFromDatabase()
    
    const filePath = path.join(STATIC_DIR, 'templates.json')
    await fs.writeFile(filePath, JSON.stringify(templates, null, 2))
    
    console.log('✅ Static templates file generated:', filePath)
    return true
  } catch (error) {
    console.error('❌ Error generating templates file:', error)
    return false
  }
}

// Generate site settings JSON file
export async function generateSiteSettingsFile() {
  try {
    console.log('📄 Generating static site settings file...')
    
    let siteId = getCurrentSiteId()
    if (!siteId) {
      siteId = await autoConfigureSiteId()
      if (!siteId) return false
    }
    
    await ensureStaticDir()
    
    // Load settings from database
    const { getSiteSettings } = await import('./supabase')
    const settings = await getSiteSettings(siteId)
    
    // Convert to key-value object
    const settingsObj = Object.fromEntries(
      settings.map(setting => [setting.key, setting.value])
    )
    
    const filePath = path.join(STATIC_DIR, 'settings.json')
    await fs.writeFile(filePath, JSON.stringify(settingsObj, null, 2))
    
    console.log('✅ Static settings file generated:', filePath)
    return true
  } catch (error) {
    console.error('❌ Error generating settings file:', error)
    return false
  }
}

// Generate all static files
export async function generateAllStaticFiles() {
  console.log('🚀 Generating all static files...')
  
  const results = await Promise.allSettled([
    generateNavigationFile(),
    generatePagesFile(),
    generateTemplatesFile(),
    generateSiteSettingsFile()
  ])
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value === true).length
  const total = results.length
  
  console.log(`📊 Generated ${successful}/${total} static files`)
  
  return successful === total
} 