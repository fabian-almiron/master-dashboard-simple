'use client'

import { useEffect, useState } from 'react'
import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'

export function ThemeCSSLoader() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActiveTheme() {
      try {
        setLoading(true)
        
        // Get current site
        const currentSite = await getCurrentSite()
        if (!currentSite) {
          console.warn('No current site found for theme CSS loading')
          setLoading(false)
          return
        }

        // Get active theme setting
        const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
        const themeId = activeThemeSetting?.value

        if (!themeId) {
          console.warn('No active theme set for site:', currentSite.name)
          setLoading(false)
          return
        }

        console.log(`🎨 Loading CSS for theme: ${themeId}`)
        setActiveTheme(themeId)

        // Dynamically import the theme's CSS
        try {
          await import(`@/themes/${themeId}/styles.css`)
          console.log(`✅ CSS loaded for theme: ${themeId}`)
        } catch (error) {
          console.error(`❌ Failed to load CSS for theme ${themeId}:`, error)
        }

      } catch (error) {
        console.error('Error loading theme CSS:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActiveTheme()
  }, [])

  // This component doesn't render anything visible
  return null
}
