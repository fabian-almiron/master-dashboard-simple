import { loadNavigationFromDatabase, loadPagesFromDatabase, loadTemplatesFromDatabase } from './cms-data'

// Load data from static files (for frontend) with robust fallback
export async function loadStaticNavigation() {
  try {
    const response = await fetch('/generated/navigation.json')
    if (!response.ok) throw new Error('Navigation file not found')
    
    const staticData = await response.json()
    
    // If static data is empty or invalid, fall back to database
    if (!Array.isArray(staticData) || staticData.length === 0) {
      console.log('📋 Static navigation empty, falling back to database')
      return await loadNavigationFromDatabase()
    }
    
    console.log('📋 Loading navigation from static files')
    return staticData
  } catch (error) {
    console.log('📋 Failed to load static navigation, using database fallback')
    return await loadNavigationFromDatabase()
  }
}

export async function loadStaticPages() {
  try {
    const response = await fetch('/generated/pages.json')
    if (!response.ok) throw new Error('Pages file not found')
    
    const staticData = await response.json()
    
    // If static data is empty or invalid, fall back to database
    if (!Array.isArray(staticData) || staticData.length === 0) {
      console.log('📄 Static pages empty, falling back to database')
      return await loadPagesFromDatabase()
    }
    
    console.log('📄 Loading pages from static files')
    return staticData
  } catch (error) {
    console.log('📄 Failed to load static pages, using database fallback')
    return await loadPagesFromDatabase()
  }
}

export async function loadStaticTemplates() {
  try {
    const response = await fetch('/generated/templates.json')
    if (!response.ok) throw new Error('Templates file not found')
    
    const staticData = await response.json()
    
    // If static data is empty or invalid, fall back to database
    if (!Array.isArray(staticData) || staticData.length === 0) {
      console.log('🎨 Static templates empty, falling back to database')
      return await loadTemplatesFromDatabase()
    }
    
    console.log('🎨 Loading templates from static files')
    return staticData
  } catch (error) {
    console.log('🎨 Failed to load static templates, using database fallback')
    return await loadTemplatesFromDatabase()
  }
}

export async function loadStaticSettings() {
  try {
    const response = await fetch('/generated/settings.json')
    if (!response.ok) throw new Error('Settings file not found')
    return await response.json()
  } catch (error) {
    console.warn('Failed to load static settings, falling back to database')
    return {}
  }
} 