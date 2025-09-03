'use client'

import { useEffect, useState } from 'react'
import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'

export function ThemeTest() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkTheme() {
      try {
        const currentSite = await getCurrentSite()
        if (!currentSite) return

        const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
        setActiveTheme(activeThemeSetting?.value || 'none')
      } catch (error) {
        console.error('Error checking theme:', error)
      } finally {
        setLoading(false)
      }
    }

    checkTheme()
  }, [])

  if (loading) {
    return <div className="p-4 bg-gray-100">Loading theme test...</div>
  }

  return (
    <div className="p-6 space-y-4 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold">Theme Test Component</h3>
      
      <div className="space-y-2">
        <p><strong>Active Theme:</strong> {activeTheme}</p>
        
        {/* Test aveda theme classes */}
        <div className="space-y-2">
          <div className="p-3 bg-theme-primary-50 border border-theme-primary-200 rounded">
            <p className="text-theme-primary-700">Primary 50 Background</p>
          </div>
          
          <div className="p-3 bg-theme-primary-500 text-white rounded">
            <p>Primary 500 Background</p>
          </div>
          
          <div className="p-3 bg-theme-secondary-50 border border-theme-secondary-200 rounded">
            <p className="text-theme-secondary-700">Secondary 50 Background</p>
          </div>
          
          <div className="p-3 bg-theme-secondary-500 text-white rounded">
            <p>Secondary 500 Background</p>
          </div>
          
          <div className="p-3 bg-theme-accent-50 border border-theme-accent-200 rounded">
            <p className="text-theme-accent-700">Accent 50 Background</p>
          </div>
          
          <div className="p-3 bg-theme-accent-500 text-white rounded">
            <p>Accent 500 Background</p>
          </div>
        </div>
        
        {/* Test aveda custom classes */}
        <div className="space-y-2">
          <div className="aveda-organic-bg p-3 rounded">
            <p>Organic Background Class</p>
          </div>
          
          <h4 className="aveda-heading text-theme-primary-600">Aveda Heading</h4>
          
          <p className="aveda-body-text">Aveda Body Text</p>
        </div>
      </div>
    </div>
  )
}
