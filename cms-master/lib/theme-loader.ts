import { ComponentInfo } from '@/lib/cms-types'
import React from 'react'

// Theme registry - maps theme IDs to their auto-register modules
const themeRegistry: Record<string, any> = {}

// Discover available themes from the /themes directory
async function discoverAvailableThemes(): Promise<string[]> {
  try {
    const response = await fetch('/api/discover-themes')
    const data = await response.json()
    
    if (data.success) {
      console.log(`🔍 Discovered themes via API: ${data.themes.join(', ')}`)
      return data.themes
    } else {
      console.warn('Failed to discover themes via API:', data.error)
      return ['chatbooks-theme'] // Fallback
    }
  } catch (error) {
    console.error('Error discovering themes:', error)
    return ['chatbooks-theme'] // Fallback
  }
}

// Known themes (will be populated dynamically)
let knownThemes: string[] = []

// Lazy load theme modules
async function loadThemeModule(themeId: string) {
  if (themeRegistry[themeId]) {
    return themeRegistry[themeId]
  }
 
  try {
    // Dynamically import the theme
    console.log(`🔄 Loading theme module: ${themeId}`)
    const themeModule = await import(`@/themes/${themeId}/auto-register`)
    themeRegistry[themeId] = themeModule
    console.log(`✅ Successfully loaded theme: ${themeId}`)
    return themeModule
  } catch (error) {
    console.error(`❌ Failed to load theme ${themeId}:`, error)
    
    // No fallback - just throw error if theme doesn't exist
    throw new Error(`Theme "${themeId}" not found`)
  }
}

// Get all components for a specific theme
export async function getThemeComponents(themeId: string): Promise<ComponentInfo[]> {
  const themeModule = await loadThemeModule(themeId)
  return themeModule.componentInfo || []
}

// Get a specific component from a theme
export async function getThemeComponent(themeId: string, componentType: string) {
  const themeModule = await loadThemeModule(themeId)
  return themeModule.getComponent ? themeModule.getComponent(componentType) : null
}

// Render a component from a specific theme
export async function renderThemeComponent(themeId: string, componentType: string, props: Record<string, any> = {}) {
  const themeModule = await loadThemeModule(themeId)
  if (themeModule.renderComponent) {
    return themeModule.renderComponent(componentType, props)
  }
  return null
}

// Synchronous version for server-side rendering
export function renderThemeComponentSync(themeId: string, componentType: string, props: Record<string, any> = {}) {
  // For server-side rendering, we need to use synchronous imports
  try {
    console.log(`🔧 Loading component "${componentType}" from theme "${themeId}"`)
    
    // Try to load the specific theme only
    const themeModule = require(`@/themes/${themeId}/auto-register`)
    
    if (themeModule.renderComponent) {
      const result = themeModule.renderComponent(componentType, props)
      console.log(`✅ Successfully rendered "${componentType}" from theme "${themeId}"`)
      return result
    }
    
    console.error(`❌ No renderComponent function found in theme "${themeId}"`)
    return null
  } catch (error) {
    console.error(`❌ Component "${componentType}" not available in theme "${themeId}"`)
    return null
  }
}

// Get component info from a specific theme
export async function getThemeComponentInfo(themeId: string, componentType: string): Promise<ComponentInfo | null> {
  const themeModule = await loadThemeModule(themeId)
  if (themeModule.getComponentInfo) {
    return themeModule.getComponentInfo(componentType)
  }
  return null
}

// Get all available themes (client-safe version)
export async function getAvailableThemes(): Promise<string[]> {
  try {
    const response = await fetch('/api/discover-themes')
    const data = await response.json()
    
    if (data.success) {
      console.log(`🔍 getAvailableThemes found: ${data.themes.join(', ')}`)
      return data.themes
    } else {
      console.warn('Failed to get available themes:', data.error)
      return []
    }
  } catch (error) {
    console.error('Error getting available themes:', error)
    return []
  }
}

// Update known themes (for server-side discovery results)
export function updateKnownThemes(themes: string[]) {
  knownThemes = themes
  console.log('📝 Updated known themes:', themes)
}

// Preload a theme (useful for performance)
export async function preloadTheme(themeId: string) {
  await loadThemeModule(themeId)
}

// Get theme metadata
export async function getThemeMetadata(themeId: string) {
  const themeModule = await loadThemeModule(themeId)
  return {
    name: themeModule.themeName || themeId,
    description: themeModule.themeDescription || '',
    author: themeModule.themeAuthor || '',
    version: themeModule.themeVersion || '1.0.0',
  }
}

// Client-safe theme validation (simplified)
export async function validateTheme(themeId: string): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = []
  
  try {
    // Try to load the auto-register module
    const themeModule = await loadThemeModule(themeId)
    
    // Check required exports
    const requiredExports = ['componentRegistry', 'componentInfo', 'getComponent', 'renderComponent']
    for (const exportName of requiredExports) {
      if (!themeModule[exportName]) {
        errors.push(`Missing required export: ${exportName}`)
      }
    }
    
    // Check if componentInfo is an array
    if (themeModule.componentInfo && !Array.isArray(themeModule.componentInfo)) {
      errors.push('componentInfo must be an array')
    }
    
  } catch (error) {
    errors.push(`Failed to load theme: ${error}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Clear theme cache (useful for development)
export function clearThemeCache() {
  Object.keys(themeRegistry).forEach(key => {
    delete themeRegistry[key]
  })
  console.log('🧹 Theme cache cleared')
}
