'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentSite, getPagesBySite, deletePage } from '@/lib/cms-data'
import { formatDateTime } from '@/lib/utils'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  FileText
} from 'lucide-react'
import { Page } from '@/lib/supabase'

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      setLoading(true)
      const site = await getCurrentSite()
      if (site) {
        const pagesData = await getPagesBySite(site.id)
        setPages(pagesData)
      }
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async (pageId: string, pageTitle: string) => {
    if (confirm(`Are you sure you want to delete "${pageTitle}"? This action cannot be undone.`)) {
      const success = await deletePage(pageId)
      if (success) {
        setPages(pages.filter(page => page.id !== pageId))
      } else {
        alert('Failed to delete page. Please try again.')
      }
    }
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
  
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
    
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600">Manage your site's pages and content.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredPages.length} {filteredPages.length === 1 ? 'Page' : 'Pages'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No pages found' : 'No pages yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first page'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button asChild>
                  <Link href="/admin/pages/new">Create your first page</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="group relative flex items-start justify-between p-6 bg-slate-800/50 border border-slate-600 rounded-xl hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors">
                        {page.title}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        page.status === 'published' 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                      }`}>
                        {page.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span className="font-mono text-slate-300 bg-slate-700/50 px-2 py-1 rounded border border-slate-600">
                        /{page.slug}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span>Created {formatDateTime(page.created_at)}</span>
                      <span className="text-slate-500">•</span>
                      <span>Modified {formatDateTime(page.updated_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="h-10 w-10 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500 transition-all"
                    >
                      <Link href={`/${page.slug}`} target="_blank" title="View page">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                      className="h-10 w-10 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500 transition-all"
                    >
                      <Link href={`/admin/pages/${page.id}/edit`} title="Edit page">
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id, page.title)}
                      className="h-10 w-10 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-slate-600 hover:border-red-400/50 transition-all"
                      title="Delete page"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
