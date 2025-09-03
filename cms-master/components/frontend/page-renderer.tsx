'use client'

import { useState, useEffect } from 'react'
import { Page, PageBlock, Template, TemplateBlock, Site, NavigationItem } from '@/lib/supabase'
import { renderThemeComponentSync } from '@/lib/theme-loader'
import { getSiteSetting } from '@/lib/cms-data'
import { FrontendLayout } from './frontend-layout'

interface PageRendererProps {
  page: Page
  pageBlocks: PageBlock[]
  template: Template | null
  templateBlocks: TemplateBlock[]
  site: Site
  navigationItems: NavigationItem[]
  siteSettings: any[]
}

export function PageRenderer({ 
  page, 
  pageBlocks, 
  template, 
  templateBlocks, 
  site,
  navigationItems,
  siteSettings
}: PageRendererProps) {
  const [activeTheme, setActiveTheme] = useState<string>('')
  const [themeLoading, setThemeLoading] = useState(true)

  useEffect(() => {
    const loadActiveTheme = async () => {
      try {
        setThemeLoading(true)
        // Get the site's active theme from settings
        const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
        const siteActiveTheme = activeThemeSetting?.value || 'base-theme'
        
        if (!siteActiveTheme) {
          console.warn('No active theme set for site, using base-theme as fallback')
        }
        
        // Use site's active theme instead of page's theme_id
        setActiveTheme(siteActiveTheme)
        
        console.log(`🎨 Frontend rendering with theme: ${siteActiveTheme} (page had: ${page.theme_id})`)
      } catch (error) {
        console.error('Error loading active theme for frontend:', error)
        // Fallback to page's theme_id
        setActiveTheme(page.theme_id)
      } finally {
        setThemeLoading(false)
      }
    }

    loadActiveTheme()
  }, [site.id, page.theme_id])
  
  // Show loading state while theme is being loaded
  if (themeLoading || !activeTheme) {
    return (
      <FrontendLayout site={site} navigationItems={navigationItems} siteSettings={siteSettings}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </FrontendLayout>
    )
  }
  
  // Debug: Log the active theme being used
  console.log(`🎯 PageRenderer using active theme: "${activeTheme}"`)
  
  // If we have a template, render it with page content
  if (template && templateBlocks.length > 0) {
    return (
      <FrontendLayout site={site} navigationItems={navigationItems} siteSettings={siteSettings}>
        <div className="min-h-screen">
          {templateBlocks
            .sort((a, b) => a.order_index - b.order_index)
            .map((block) => {
              if (!block.is_visible) return null
              
              // If this is a DNDArea component, inject the page blocks
              if (block.component_type === 'DNDArea') {
                const renderedComponent = renderThemeComponentSync(activeTheme, block.component_type, {
                  ...block.props,
                  pageBlocks: pageBlocks.map(pb => ({
                    id: pb.id,
                    type: pb.component_type,
                    props: pb.props,
                    order: pb.order_index,
                    isVisible: pb.is_visible
                  }))
                })
                
                if (!renderedComponent) {
                  return (
                    <div key={block.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <p className="text-red-600">Component "{block.component_type}" not available in theme "{activeTheme}"</p>
                    </div>
                  )
                }
                
                return (
                  <div key={block.id} className="relative">
                    {renderedComponent}
                  </div>
                )
              }
              
              // Otherwise render the template block normally
              const renderedComponent = renderThemeComponentSync(activeTheme, block.component_type, block.props || {})
              
              if (!renderedComponent) {
                return (
                  <div key={block.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <p className="text-red-600">Component "{block.component_type}" not available in theme "{activeTheme}"</p>
                  </div>
                )
              }
              
              return (
                <div key={block.id} className="relative">
                  {renderedComponent}
                </div>
              )
            })}
        </div>
      </FrontendLayout>
    )
  }
  
  // If no template, render page blocks directly
  return (
    <FrontendLayout site={site} navigationItems={navigationItems} siteSettings={siteSettings}>
      <div className="min-h-screen">
        {pageBlocks
          .sort((a, b) => a.order_index - b.order_index)
          .map((block) => {
            if (!block.is_visible) return null
            
            const renderedComponent = renderThemeComponentSync(activeTheme, block.component_type, block.props || {})
            
            if (!renderedComponent) {
              return (
                <div key={block.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <p className="text-red-600">Component "{block.component_type}" not available in theme "{activeTheme}"</p>
                </div>
              )
            }
            
            return (
              <div key={block.id} className="relative">
                {renderedComponent}
              </div>
            )
          })}
      </div>
    </FrontendLayout>
  )
}
