'use client'

import { useEffect, useState } from 'react'
import { getCurrentSite, getSiteSetting } from '@/lib/cms-data'

export function ThemeDebug() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [currentSite, setCurrentSite] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkTheme() {
      try {
        const site = await getCurrentSite()
        setCurrentSite(site)
        
        if (site) {
          const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
          setActiveTheme(activeThemeSetting?.value || 'none')
        }
      } catch (error) {
        console.error('Error checking theme:', error)
      } finally {
        setLoading(false)
      }
    }

    checkTheme()
  }, [])

  if (loading) {
    return <div className="p-4 bg-gray-100">Loading theme debug...</div>
  }

  return (
    <div className="p-6 space-y-4 border-2 border-red-300 bg-red-50 rounded-lg">
      <h3 className="text-lg font-bold text-red-800">Theme Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>Current Site:</strong> {currentSite?.name || 'None'} ({currentSite?.id || 'None'})</p>
        <p><strong>Active Theme:</strong> {activeTheme}</p>
      </div>
      
      {/* Test aveda theme classes */}
      <div className="space-y-2">
        <h4 className="font-semibold text-red-700">Theme Color Tests:</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-theme-primary-50 border border-theme-primary-200 rounded">
            <p className="text-theme-primary-700 text-xs">Primary 50</p>
          </div>
          
          <div className="p-3 bg-theme-primary-500 text-white rounded">
            <p className="text-xs">Primary 500</p>
          </div>
          
          <div className="p-3 bg-theme-secondary-50 border border-theme-secondary-200 rounded">
            <p className="text-theme-secondary-700 text-xs">Secondary 50</p>
          </div>
          
          <div className="p-3 bg-theme-secondary-500 text-white rounded">
            <p className="text-xs">Secondary 500</p>
          </div>
        </div>
        
        <div className="p-3 aveda-organic-bg rounded">
          <p className="text-xs">Organic Background Class</p>
        </div>
        
        <h4 className="aveda-heading text-theme-primary-600 text-sm">Aveda Heading Test</h4>
        <p className="aveda-body-text text-sm">Aveda Body Text Test</p>
      </div>
      
      {/* Test if CSS is loaded */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-blue-700 text-xs">
          <strong>CSS Status:</strong> If you see colored boxes above, the aveda theme CSS is loaded correctly.
        </p>
      </div>
    </div>
  )
}
