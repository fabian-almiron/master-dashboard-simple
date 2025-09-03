'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import { getCurrentSite } from '@/lib/cms-data'
import './admin.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasSite, setHasSite] = useState(false)

  useEffect(() => {
    checkSiteSetup()
  }, [])

  const checkSiteSetup = async () => {
    try {
      // Check if there's a current site ID in localStorage
      const currentSiteId = typeof window !== 'undefined' 
        ? localStorage.getItem('cms-tailwinds-current-site-id')
        : null
      
      if (currentSiteId) {
        setHasSite(true)
      } else {
        // Only make API call if no localStorage site ID
        try {
          const response = await fetch('/api/sites')
          const result = await response.json()
          
          if (result.sites && result.sites.length > 0) {
            const firstSite = result.sites[0]
            console.log('Setting first available site as current:', firstSite.id)
            localStorage.setItem('cms-tailwinds-current-site-id', firstSite.id)
            setHasSite(true)
          } else {
            setHasSite(false)
          }
        } catch (error) {
          console.warn('Could not fetch sites:', error)
          setHasSite(false)
        }
      }
    } catch (error) {
      console.error('Error checking site setup:', error)
      setHasSite(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen admin-layout flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin...</p>
        </div>
      </div>
    )
  }

  if (!hasSite) {
    // Show admin interface even without site (will show empty states)
    return (
      <div className="flex h-screen admin-layout">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto admin-content">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Site Selected</h2>
              <p className="text-gray-600 mb-6">
                You need to create a site or select an existing one to continue.
              </p>
              <a
                href="/admin/sites/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Your First Site
              </a>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen admin-layout">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}
