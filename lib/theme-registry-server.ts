import fs from 'fs'
import path from 'path'

// Cache for theme discovery
let cachedThemes: string[] | null = null
let lastScanTime = 0
const CACHE_DURATION = 30000 // 30 seconds cache

// Discover themes automatically by scanning the themes directory
export function discoverThemes(): string[] {
  // Use cache if recent
  const now = Date.now()
  if (cachedThemes && (now - lastScanTime) < CACHE_DURATION) {
    return cachedThemes
  }

  try {
    const themesPath = path.join(process.cwd(), 'components', 'themes')
    
    // Check if themes directory exists
    if (!fs.existsSync(themesPath)) {
      console.warn('Themes directory not found:', themesPath)
      return ['default', 'modern'] // Fallback
    }

    // Get all directories in themes folder
    const items = fs.readdirSync(themesPath, { withFileTypes: true })
    
    const themes = items
      .filter(item => item.isDirectory()) // Only directories
      .map(item => item.name)
      .filter(name => {
        // Check if directory has required register-blocks.tsx file
        const registerFile = path.join(themesPath, name, 'register-blocks.tsx')
        return fs.existsSync(registerFile)
      })
      .sort() // Alphabetical order

    console.log('🎨 Discovered themes:', themes)
    
    // Update cache
    cachedThemes = themes
    lastScanTime = now
    
    return themes
    
  } catch (error) {
    console.error('Error discovering themes:', error)
    return ['default', 'modern'] // Safe fallback
  }
}

// Clear theme cache (useful for development)
export function clearThemeCache() {
  cachedThemes = null
  lastScanTime = 0
  console.log('🧹 Theme cache cleared')
}

// Validate theme structure
export function validateTheme(themeName: string): boolean {
  try {
    const themePath = path.join(process.cwd(), 'components', 'themes', themeName)
    
    // Check required files
    const requiredFiles = [
      'register-blocks.tsx',
      'styles.css',
      'tailwind.config.ts'
    ]
    
    const requiredDirs = [
      'ui',
      'page-templates'
    ]
    
    // Check files
    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(themePath, file))) {
        console.warn(`⚠️ Theme "${themeName}" missing required file: ${file}`)
        return false
      }
    }
    
    // Check directories
    for (const dir of requiredDirs) {
      if (!fs.existsSync(path.join(themePath, dir))) {
        console.warn(`⚠️ Theme "${themeName}" missing required directory: ${dir}`)
        return false
      }
    }
    
    return true
    
  } catch (error) {
    console.error(`Error validating theme "${themeName}":`, error)
    return false
  }
} 