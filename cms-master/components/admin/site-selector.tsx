'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAvailableSites, getCurrentSiteId, switchToSite } from '@/lib/site-switcher'
import { Site } from '@/lib/supabase'

export default function SiteSelector() {
  const [sites, setSites] = useState<Site[]>([])
  const [currentSiteId, setCurrentSiteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSites()
    setCurrentSiteId(getCurrentSiteId())
  }, [])

  const loadSites = async () => {
    try {
      const availableSites = await getAvailableSites()
      setSites(availableSites)
    } catch (error) {
      console.error('Error loading sites:', error)
    }
  }

  const handleSiteSelect = async (siteId: string) => {
    if (siteId === currentSiteId) return

    try {
      setLoading(true)
      const success = await switchToSite(siteId)
      if (success) {
        setCurrentSiteId(siteId)
      }
    } catch (error) {
      console.error('Error switching site:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Site Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sites.map((site) => (
            <Button
              key={site.id}
              variant={site.id === currentSiteId ? "default" : "outline"}
              onClick={() => handleSiteSelect(site.id)}
              disabled={loading}
              className="w-full justify-start"
            >
              <div className="text-left">
                <div className="font-medium">{site.name}</div>
                <div className="text-xs opacity-70">{site.domain}</div>
                {site.id === currentSiteId && (
                  <div className="text-xs text-green-600">✓ Current Site</div>
                )}
              </div>
            </Button>
          ))}
        </div>
        
        {currentSiteId && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">
              <strong>Current Site ID:</strong> {currentSiteId}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
