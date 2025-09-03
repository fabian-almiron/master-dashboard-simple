import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'

// Cache for theme modules to avoid repeated imports
const themeModuleCache: Record<string, any> = {}

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
      return [] // No fallback - let the system handle it
    }
  } catch (error) {
    console.error('Error discovering themes:', error)
    return [] // No fallback - let the system handle it
  }
}

// Get the active theme ID from the database
export async function getActiveThemeId(): Promise<string> {
  try {
    const currentSite = await getCurrentSite()
    if (!currentSite) {
      console.warn('No current site found')
      throw new Error('No current site found')
    }

    const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
    const activeTheme = activeThemeSetting?.value
    
    if (!activeTheme) {
      console.warn('No active theme set, checking for available themes...')
      // We'll handle this in the dynamic loading function
      return 'default' // This will trigger theme discovery
    }
    
    console.log(`🎨 Active theme: ${activeTheme}`)
    return activeTheme
  } catch (error) {
    console.error('Error getting active theme:', error)
    throw error
  }
}

// Dynamically import theme functions based on active theme
export async function getDynamicThemeFunctions() {
  let activeThemeId: string
  
  try {
    activeThemeId = await getActiveThemeId()
  } catch (error) {
    // If we can't get the active theme, discover available themes
    console.log('🔍 Discovering available themes...')
    const availableThemes = await discoverAvailableThemes()
    
    if (availableThemes.length === 0) {
      throw new Error('No themes found in /themes directory')
    }
    
    // Use the first available theme
    activeThemeId = availableThemes[0]
    console.log(`🎨 Using discovered theme: ${activeThemeId}`)
  }
  
  // Check cache first
  if (themeModuleCache[activeThemeId]) {
    return themeModuleCache[activeThemeId]
  }

  try {
    console.log(`🔄 Dynamically importing theme: ${activeThemeId}`)
    const themeModule = await import(`@/themes/${activeThemeId}/auto-register`)
    
    // Cache the module
    themeModuleCache[activeThemeId] = {
      getComponent: themeModule.getComponent,
      renderComponent: themeModule.renderComponent,
      getComponentInfo: themeModule.getComponentInfo,
      getAllComponents: themeModule.getAllComponents,
      getComponentsByCategory: themeModule.getComponentsByCategory,
      componentInfo: themeModule.componentInfo,
      componentRegistry: themeModule.componentRegistry,
      themeName: themeModule.themeName,
      themeDescription: themeModule.themeDescription,
      themeAuthor: themeModule.themeAuthor,
      themeVersion: themeModule.themeVersion,
    }
    
    console.log(`✅ Successfully loaded dynamic theme functions from: ${activeThemeId}`)
    return themeModuleCache[activeThemeId]
  } catch (error) {
    console.error(`❌ Failed to load theme ${activeThemeId}:`, error)
    throw new Error(`Theme "${activeThemeId}" not found`)
  }
}

// Convenience functions that automatically use the active theme
export async function getComponent(componentType: string) {
  const themeFunctions = await getDynamicThemeFunctions()
  return themeFunctions.getComponent(componentType)
}

export async function renderComponent(componentType: string, props: Record<string, any> = {}) {
  const themeFunctions = await getDynamicThemeFunctions()
  return themeFunctions.renderComponent(componentType, props)
}

export async function getComponentInfo(componentType: string) {
  const themeFunctions = await getDynamicThemeFunctions()
  return themeFunctions.getComponentInfo(componentType)
}

export async function getAllComponents() {
  const themeFunctions = await getDynamicThemeFunctions()
  return themeFunctions.getAllComponents()
}

export async function getComponentsByCategory(category: string) {
  const themeFunctions = await getDynamicThemeFunctions()
  return themeFunctions.getComponentsByCategory(category)
}

// Clear cache (useful for development/testing)
export function clearThemeCache() {
  Object.keys(themeModuleCache).forEach(key => {
    delete themeModuleCache[key]
  })
  console.log('🧹 Dynamic theme cache cleared')
}
