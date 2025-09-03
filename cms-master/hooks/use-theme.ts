'use client'

import { useState, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'
import { 
  getThemeComponents, 
  renderThemeComponent, 
  getThemeComponentInfo,
  getThemeMetadata,
  preloadTheme 
} from '@/lib/theme-loader'

interface ThemeState {
  activeTheme: string
  components: ComponentInfo[]
  loading: boolean
  error: string | null
}

export function useTheme() {
  const [themeState, setThemeState] = useState<ThemeState>({
    activeTheme: '',
    components: [],
    loading: true,
    error: null
  })

  // Load active theme from database
  useEffect(() => {
    const loadActiveTheme = async () => {
      try {
        setThemeState(prev => ({ ...prev, loading: true, error: null }))
        
        const currentSite = await getCurrentSite()
        if (!currentSite) {
          throw new Error('No current site found')
        }

        const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
        const activeTheme = activeThemeSetting?.value || 'base-theme'
        
        if (!activeTheme) {
          console.warn('No active theme set, using base-theme as fallback')
        }
        
        // Preload the theme for better performance
        await preloadTheme(activeTheme)
        
        // Load components for the active theme
        const components = await getThemeComponents(activeTheme)
        
        setThemeState({
          activeTheme,
          components,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error loading active theme:', error)
        setThemeState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load theme'
        }))
      }
    }

    loadActiveTheme()
  }, [])

  // Theme-aware component rendering
  const renderComponent = async (componentType: string, props: Record<string, any> = {}) => {
    try {
      return await renderThemeComponent(themeState.activeTheme, componentType, props)
    } catch (error) {
      console.error(`Error rendering component ${componentType}:`, error)
      return null
    }
  }

  // Get component info for the active theme
  const getComponentInfo = async (componentType: string): Promise<ComponentInfo | null> => {
    try {
      return await getThemeComponentInfo(themeState.activeTheme, componentType)
    } catch (error) {
      console.error(`Error getting component info for ${componentType}:`, error)
      return null
    }
  }

  // Get theme metadata
  const getThemeInfo = async () => {
    try {
      return await getThemeMetadata(themeState.activeTheme)
    } catch (error) {
      console.error('Error getting theme metadata:', error)
      return null
    }
  }

  // Refresh theme (useful after theme switching)
  const refreshTheme = async () => {
    setThemeState(prev => ({ ...prev, loading: true }))
    
    try {
      const currentSite = await getCurrentSite()
      if (!currentSite) {
        throw new Error('No current site found')
      }

      const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
      const activeTheme = activeThemeSetting?.value
      
      if (!activeTheme) {
        throw new Error('No active theme set')
      }
      
      const components = await getThemeComponents(activeTheme)
      
      setThemeState({
        activeTheme,
        components,
        loading: false,
        error: null
      })
    } catch (error) {
      console.error('Error refreshing theme:', error)
      setThemeState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh theme'
      }))
    }
  }

  return {
    ...themeState,
    renderComponent,
    getComponentInfo,
    getThemeInfo,
    refreshTheme
  }
}
