'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentSite, getSiteStatistics } from '@/lib/cms-data'
import { formatDateTime } from '@/lib/utils'
import { 
  FileText, 
  Layout, 
  Navigation, 
  Plus, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'


interface SiteStats {
  totalPages: number
  publishedPages: number
  draftPages: number
  totalTemplates: number
  navigationItems: number
  recentPages: any[]
}

export default function AdminDashboard() {
  // Force cache bust - admin dashboard
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [siteName, setSiteName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const site = await getCurrentSite()
        if (site) {
          setSiteName(site.name)
          const statistics = await getSiteStatistics(site.id)
          setStats(statistics)
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with {siteName}.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/pages/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Page
            </Link>
          </Button>
        </div>
      </div>



      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.publishedPages || 0} published, {stats?.draftPages || 0} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTemplates || 0}</div>
            <p className="text-xs text-muted-foreground">
              Reusable template designs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Navigation Items</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.navigationItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              Menu items configured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Status</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">
              Site is live and operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentPages && stats.recentPages.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{page.title}</h4>
                      <p className="text-sm text-gray-600">
                        Created {formatDateTime(page.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        page.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.status}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/pages/${page.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No pages created yet</p>
                <Button asChild>
                  <Link href="/admin/pages/new">Create your first page</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/admin/pages/new" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Page
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/admin/templates" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Manage Templates
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/admin/navigation" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Edit Navigation
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/admin/themes" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Browse Themes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Create Pages</h3>
              <p className="text-sm text-gray-600 mb-3">
                Build pages using our drag-and-drop editor with components from your active theme.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/pages">Manage Pages</Link>
              </Button>
            </div>
            
            <div className="text-center">
              <Layout className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Design Templates</h3>
              <p className="text-sm text-gray-600 mb-3">
                Create reusable header, footer, and page templates for consistent design.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/templates">Manage Templates</Link>
              </Button>
            </div>
            
            <div className="text-center">
              <Navigation className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Setup Navigation</h3>
              <p className="text-sm text-gray-600 mb-3">
                Configure your site's navigation menu with internal and external links.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/navigation">Edit Navigation</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
