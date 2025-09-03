// Server-side theme discovery utilities
// This file uses Node.js modules and should only be imported in server-side code

import fs from 'fs'
import path from 'path'

// Cache for discovered themes to avoid filesystem scanning on every request
let discoveredThemes: string[] | null = null
let lastDiscoveryTime = 0
const DISCOVERY_CACHE_TTL = 5000 // 5 seconds cache

// Discover all available themes by scanning the themes directory
export async function discoverThemes(): Promise<string[]> {
  // Return cached results if still valid
  const now = Date.now()
  if (discoveredThemes && (now - lastDiscoveryTime) < DISCOVERY_CACHE_TTL) {
    return discoveredThemes
  }

  try {
    const themesDir = path.join(process.cwd(), 'themes')
    
    // Check if themes directory exists
    if (!fs.existsSync(themesDir)) {
      console.warn('Themes directory not found, creating it...')
      fs.mkdirSync(themesDir, { recursive: true })
      return []
    }

    const entries = fs.readdirSync(themesDir, { withFileTypes: true })
    const themes: string[] = []

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const themeId = entry.name
        const autoRegisterPath = path.join(themesDir, themeId, 'auto-register.tsx')
        
        // Check if theme has required auto-register.tsx file
        if (fs.existsSync(autoRegisterPath)) {
          themes.push(themeId)
          console.log(`🎨 Discovered theme: ${themeId}`)
        } else {
          console.warn(`⚠️  Theme "${themeId}" missing auto-register.tsx file`)
        }
      }
    }

    // Update cache
    discoveredThemes = themes
    lastDiscoveryTime = now

    console.log(`✅ Theme discovery complete. Found ${themes.length} themes:`, themes)
    return themes
  } catch (error) {
    console.error('Error discovering themes:', error)
    return ['default'] // Fallback to default theme
  }
}

// Validate theme structure (server-side version with filesystem access)
export async function validateThemeStructure(themeId: string): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = []
  
  try {
    const themesDir = path.join(process.cwd(), 'themes')
    const themeDir = path.join(themesDir, themeId)
    
    // Check if theme directory exists
    if (!fs.existsSync(themeDir)) {
      errors.push(`Theme directory does not exist: ${themeDir}`)
      return { valid: false, errors }
    }
    
    // Check required files
    const requiredFiles = [
      'auto-register.tsx',
      'styles.css',
      'tailwind.config.ts'
    ]
    
    for (const file of requiredFiles) {
      const filePath = path.join(themeDir, file)
      if (!fs.existsSync(filePath)) {
        errors.push(`Missing required file: ${file}`)
      }
    }
    
    // Check ui directory
    const uiDir = path.join(themeDir, 'ui')
    if (!fs.existsSync(uiDir)) {
      errors.push('Missing ui directory')
    } else {
      // Check if ui directory has any component files
      const uiFiles = fs.readdirSync(uiDir).filter(file => 
        file.endsWith('.tsx') && !file.startsWith('.')
      )
      if (uiFiles.length === 0) {
        errors.push('ui directory is empty - no component files found')
      }
    }
    
    // Check package-like files
    const optionalFiles = ['README.md', 'main.js']
    const missingOptional = optionalFiles.filter(file => 
      !fs.existsSync(path.join(themeDir, file))
    )
    if (missingOptional.length > 0) {
      console.log(`ℹ️  Theme "${themeId}" missing optional files: ${missingOptional.join(', ')}`)
    }
    
  } catch (error) {
    errors.push(`Validation error: ${error}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Clear discovery cache
export function clearDiscoveryCache() {
  discoveredThemes = null
  lastDiscoveryTime = 0
  console.log('🧹 Discovery cache cleared')
}

// Get theme statistics
export async function getThemeStats() {
  const themes = await discoverThemes()
  const stats = {
    totalThemes: themes.length,
    validThemes: 0,
    invalidThemes: 0,
    themes: [] as Array<{
      id: string
      valid: boolean
      errors: string[]
    }>
  }
  
  for (const themeId of themes) {
    const validation = await validateThemeStructure(themeId)
    stats.themes.push({
      id: themeId,
      valid: validation.valid,
      errors: validation.errors
    })
    
    if (validation.valid) {
      stats.validThemes++
    } else {
      stats.invalidThemes++
    }
  }
  
  return stats
}
