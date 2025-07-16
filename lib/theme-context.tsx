'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ComponentType, ComponentInfo } from './cms-types'

// Theme interface
export interface Theme {
  id: string
  name: string
  description: string
  author: string
  version: string
  componentRegistry: Record<string, React.ComponentType<any>>
  componentInfo: ComponentInfo[]
  getComponent: (type: ComponentType) => React.ComponentType<any> | undefined
  renderComponent: (type: ComponentType, props?: Record<string, any>) => React.ReactNode
  getComponentInfo: (type: ComponentType) => ComponentInfo | undefined
  getAllComponents: () => ComponentInfo[]
  getComponentsByCategory: (category: string) => ComponentInfo[]
}

// Available themes
const availableThemes = ['default', 'modern'] // Add more themes here

// Theme context
interface ThemeContextType {
  currentTheme: Theme | null
  availableThemes: string[]
  switchTheme: (themeId: string) => Promise<void>
  loading: boolean
  error: string | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load theme from localStorage or use default
  const getStoredTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cms-current-theme') || defaultTheme
    }
    return defaultTheme
  }

  // Save theme to localStorage
  const saveTheme = (themeId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms-current-theme', themeId)
    }
  }

  // Load theme styles dynamically
  const loadThemeStyles = async (themeId: string) => {
    try {
      // Remove existing theme styles
      const existingStyles = document.querySelectorAll('[data-theme-styles]')
      existingStyles.forEach(style => style.remove())

      // Load theme styles from static file
      const response = await fetch(`/themes/${themeId}/styles.css`)
      if (response.ok) {
        const css = await response.text()
        const styleElement = document.createElement('style')
        styleElement.setAttribute('data-theme-styles', themeId)
        styleElement.textContent = css
        document.head.appendChild(styleElement)
        console.log(`Loaded styles for theme: ${themeId}`)
      } else {
        console.warn(`Failed to load styles for theme "${themeId}": ${response.status}`)
      }
    } catch (err) {
      console.warn(`Failed to load styles for theme "${themeId}":`, err)
    }
  }

  // Load theme dynamically
  const loadTheme = async (themeId: string): Promise<Theme | null> => {
    try {
      setLoading(true)
      setError(null)

      // Load theme styles
      if (typeof window !== 'undefined') {
        await loadThemeStyles(themeId)
      }

      // Dynamic import of theme registry
      const themeModule = await import(`../components/themes/${themeId}/register-blocks`)
      
      const theme: Theme = {
        id: themeId,
        name: themeModule.themeName,
        description: themeModule.themeDescription,
        author: themeModule.themeAuthor,
        version: themeModule.themeVersion,
        componentRegistry: themeModule.componentRegistry,
        componentInfo: themeModule.componentInfo,
        getComponent: themeModule.getComponent,
        renderComponent: themeModule.renderComponent,
        getComponentInfo: themeModule.getComponentInfo,
        getAllComponents: themeModule.getAllComponents,
        getComponentsByCategory: themeModule.getComponentsByCategory,
      }

      return theme
    } catch (err) {
      console.error(`Failed to load theme "${themeId}":`, err)
      setError(`Failed to load theme "${themeId}"`)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Switch theme function
  const switchTheme = async (themeId: string) => {
    if (!availableThemes.includes(themeId)) {
      setError(`Theme "${themeId}" not found`)
      return
    }

    const theme = await loadTheme(themeId)
    if (theme) {
      setCurrentTheme(theme)
      saveTheme(themeId)
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    const initTheme = async () => {
      const storedTheme = getStoredTheme()
      await switchTheme(storedTheme)
    }
    
    initTheme()
  }, [])

  const value: ThemeContextType = {
    currentTheme,
    availableThemes,
    switchTheme,
    loading,
    error,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Convenience hooks
export function useCurrentTheme() {
  const { currentTheme } = useTheme()
  return currentTheme
}

export function useThemeComponents() {
  const { currentTheme } = useTheme()
  return {
    componentRegistry: currentTheme?.componentRegistry || {},
    componentInfo: currentTheme?.componentInfo || [],
    getComponent: currentTheme?.getComponent || (() => undefined),
    renderComponent: currentTheme?.renderComponent || (() => null),
    getComponentInfo: currentTheme?.getComponentInfo || (() => undefined),
    getAllComponents: currentTheme?.getAllComponents || (() => []),
    getComponentsByCategory: currentTheme?.getComponentsByCategory || (() => []),
  }
} 