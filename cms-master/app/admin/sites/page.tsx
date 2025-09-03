'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Globe, ExternalLink, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Site } from '@/lib/supabase'
import SiteSwitcher from '@/components/admin/site-switcher'

function SitesList() {
  const [sites, setSites] = useState<Site[]>([])
  const [currentSite, setCurrentSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const loadSites = async () => {
      try {
        setLoading(true)
        setError('')
        
        const [sitesResponse, currentSiteResponse] = await Promise.all([
          fetch('/api/sites'),
          fetch('/api/sites?action=getCurrentSite')
        ])

        if (!mounted) return // Component unmounted, don't update state

        if (sitesResponse.ok) {
          const sitesData = await sitesResponse.json()
          setSites(sitesData.sites || [])
        } else {
          throw new Error('Failed to fetch sites')
        }

        if (currentSiteResponse.ok) {
          const currentSiteData = await currentSiteResponse.json()
          setCurrentSite(currentSiteData.site)
        }
      } catch (err) {
        if (!mounted) return
        console.error('Error loading sites:', err)
        setError('Failed to load sites')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadSites()

    return () => {
      mounted = false
    }
  }, []) // Empty dependency array to run only once

  const handleDeleteSite = async (siteId: string) => {
    setDeleteLoading(siteId)
    setError('')
    
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteSite',
          data: { id: siteId }
        }),
      })

      if (response.ok) {
        // Remove the site from the local state
        setSites(prev => prev.filter(site => site.id !== siteId))
        
        // If we deleted the current site, clear it
        if (currentSite?.id === siteId) {
          setCurrentSite(null)
        }
        
        setShowDeleteConfirm(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to delete site')
      }
    } catch (err) {
      console.error('Error deleting site:', err)
      setError('An error occurred while deleting the site')
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sites Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your multi-tenant sites and switch between them
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/sites/new">
            <Plus className="h-4 w-4 mr-2" />
            Create New Site
          </Link>
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Site Info */}
      {currentSite && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Current Site
            </CardTitle>
            <CardDescription>
              You are currently managing this site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{currentSite.name}</h3>
                <p className="text-gray-600">{currentSite.domain}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    currentSite.status === 'active' ? 'bg-green-100 text-green-800' :
                    currentSite.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentSite.status}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {currentSite.plan}
                  </span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href={`https://${currentSite.domain}`} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Site
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Site Switcher */}
      <Card>
        <CardHeader>
          <CardTitle>Switch Sites</CardTitle>
          <CardDescription>
            Select a different site to manage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SiteSwitcher currentSite={currentSite} sites={sites} />
        </CardContent>
      </Card>

      {/* All Sites List */}
      <Card>
        <CardHeader>
          <CardTitle>All Sites ({sites.length})</CardTitle>
          <CardDescription>
            Manage all your sites from one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sites.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sites yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first site to get started
              </p>
              <Button asChild>
                <Link href="/admin/sites/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Site
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sites.map((site) => (
                <Card key={site.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {site.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {site.domain}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/sites/${site.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowDeleteConfirm(site.id)}
                          disabled={deleteLoading === site.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        site.status === 'active' ? 'bg-green-100 text-green-800' :
                        site.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {site.status}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {site.plan}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`https://${site.domain}`} target="_blank">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Link>
                      </Button>
                      {site.id === currentSite?.id && (
                        <span className="text-xs text-green-600 font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Delete Site
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete this site? This action cannot be undone and will permanently delete all pages, templates, and related data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const siteToDelete = sites.find(s => s.id === showDeleteConfirm)
                return siteToDelete ? (
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium">{siteToDelete.name}</p>
                    <p className="text-sm text-gray-600">{siteToDelete.domain}</p>
                  </div>
                ) : null
              })()}
              
              <div className="flex items-center gap-3">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSite(showDeleteConfirm)}
                  disabled={deleteLoading === showDeleteConfirm}
                  className="flex-1"
                >
                  {deleteLoading === showDeleteConfirm ? 'Deleting...' : 'Delete Site'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(null)}
                  disabled={deleteLoading === showDeleteConfirm}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function SitesPage() {
  return <SitesList />
}
