'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Globe, Check } from 'lucide-react'
import { Site } from '@/lib/supabase'
import { getAvailableSites, getCurrentSiteId, switchToSite } from '@/lib/site-switcher'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface SiteSwitcherProps {
  currentSite?: Site | null
  sites?: Site[]
  className?: string
}

export default function SiteSwitcher({ currentSite, sites: propSites = [], className = '' }: SiteSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentSiteId, setCurrentSiteId] = useState<string | null>(null)

  // Use sites from props if provided, otherwise fetch them
  const sites = propSites.length > 0 ? propSites : []

  useEffect(() => {
    setCurrentSiteId(getCurrentSiteId())
  }, [])

  const handleSiteSwitch = async (siteId: string) => {
    if (siteId === currentSiteId) {
      setIsOpen(false)
      return
    }

    try {
      setLoading(true)
      
      // Get the site name for URL-friendly switching
      const selectedSite = sites.find(s => s.id === siteId)
      if (!selectedSite) {
        console.error('Site not found:', siteId)
        return
      }
      
      // Update URL with site parameter instead of localStorage
      const url = new URL(window.location.href)
      url.searchParams.set('site', selectedSite.name)
      
      // Update localStorage as backup
      setCurrentSiteId(siteId)
      
      // Navigate to the new URL
      window.location.href = url.toString()
      
    } catch (error) {
      console.error('Error switching site:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentSiteName = currentSite?.name || 'Select Site'
  const currentSiteDomain = currentSite?.domain || ''

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-2 min-w-[200px] justify-between text-slate-300 border-slate-600 hover:text-slate-100 hover:bg-slate-700/50 hover:border-slate-500 transition-all"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Globe className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <div className="text-left min-w-0">
            <div className="font-medium truncate text-slate-200">{currentSiteName}</div>
            {currentSiteDomain && (
              <div className="text-xs truncate text-slate-400">
                {currentSiteDomain}
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-64 overflow-y-auto bg-slate-800/95 border-slate-600 backdrop-blur-sm">
          <div className="p-2">
            {loading ? (
              <div className="p-4 text-center text-sm text-slate-400">
                Loading sites...
              </div>
            ) : sites.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-400">
                No sites available
              </div>
            ) : (
              <div className="space-y-1">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => handleSiteSwitch(site.id)}
                    disabled={loading}
                    className={`w-full p-3 text-left rounded-md transition-all hover:bg-slate-700/50 ${
                      site.id === currentSiteId ? 'bg-slate-700/70 border border-slate-500' : 'border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate text-slate-200">{site.name}</div>
                        <div className="text-xs truncate text-slate-400">
                          {site.domain}
                        </div>
                        <div className="text-xs text-slate-500">
                          {site.status} • {site.plan}
                        </div>
                      </div>
                      {site.id === currentSiteId && (
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
