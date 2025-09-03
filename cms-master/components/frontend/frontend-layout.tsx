'use client'

import { useState, useEffect } from 'react'
import { Site, NavigationItem } from '@/lib/supabase'
import { renderThemeComponentSync } from '@/lib/theme-loader'
import { getSiteSetting } from '@/lib/cms-data'

interface FrontendLayoutProps {
  site: Site
  children: React.ReactNode
  navigationItems: NavigationItem[]
  siteSettings: any[]
}

export function FrontendLayout({ site, children, navigationItems, siteSettings }: FrontendLayoutProps) {
  const [activeTheme, setActiveTheme] = useState<string>('')
  const [themeLoading, setThemeLoading] = useState(true)

  useEffect(() => {
    const loadActiveTheme = async () => {
      try {
        setThemeLoading(true)
        // Get the site's active theme from settings
        const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
        const siteActiveTheme = activeThemeSetting?.value
        
        if (!siteActiveTheme) {
          throw new Error('No active theme set for site')
        }
        
        setActiveTheme(siteActiveTheme)
        console.log(`🎨 FrontendLayout using theme: ${siteActiveTheme}`)
      } catch (error) {
        console.error('Error loading active theme for layout:', error)
        setActiveTheme('base-theme')
      } finally {
        setThemeLoading(false)
      }
    }

    loadActiveTheme()
  }, [site.id])

  // Convert settings array to object for easier access
  const settingsObject: any = {}
  if (siteSettings && siteSettings.length > 0) {
    siteSettings.forEach((setting: any) => {
      settingsObject[setting.setting_key] = setting.setting_value
    })
  }

  // Show loading state while theme is being loaded
  if (themeLoading || !activeTheme) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  // Try to render theme header and footer
  const themeHeader = renderThemeComponentSync(activeTheme, 'Header', {
    site,
    navigationItems,
    siteSettings: settingsObject
  })

  const themeFooter = renderThemeComponentSync(activeTheme, 'Footer', {
    site,
    navigationItems,
    siteSettings: settingsObject
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Theme Header */}
      {themeHeader ? (
        <>{themeHeader}</>
      ) : (
        /* Fallback Header */
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {settingsObject?.site_title || site.name}
                </h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                {navigationItems
                  .filter(item => item.is_visible)
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((item) => (
                    <a
                      key={item.id}
                      href={item.href || '#'}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
              </nav>
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Theme Footer */}
      {themeFooter ? (
        <>{themeFooter}</>
      ) : (
        /* Fallback Footer */
        <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {settingsObject?.site_title || site.name}
                </h3>
                <p className="text-gray-400">
                  {settingsObject?.site_description || 'Powered by CMS TailWinds'}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navigationItems
                    .filter(item => item.is_visible)
                    .slice(0, 5)
                    .map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.href || '#'}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <p className="text-gray-400">
                  {settingsObject?.contact_email || 'contact@example.com'}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} {settingsObject?.site_title || site.name}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
