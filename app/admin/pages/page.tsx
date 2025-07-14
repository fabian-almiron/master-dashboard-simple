'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash2, 
  Copy,
  Calendar,
  FileText
} from 'lucide-react'

// Default pages to initialize with
const defaultPages = [
  {
    id: '1',
    title: 'Homepage',
    slug: 'home',
    status: 'published',
    updatedAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T09:00:00Z',
    description: 'Main landing page for the website'
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about',
    status: 'draft',
    updatedAt: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T10:15:00Z',
    description: 'Company information and team details'
  },
  {
    id: '3',
    title: 'Contact',
    slug: 'contact',
    status: 'published',
    updatedAt: '2024-01-12T08:20:00Z',
    createdAt: '2024-01-03T14:30:00Z',
    description: 'Contact form and company information'
  },
  {
    id: '4',
    title: 'Services',
    slug: 'services',
    status: 'draft',
    updatedAt: '2024-01-08T16:10:00Z',
    createdAt: '2024-01-04T11:45:00Z',
    description: 'List of services we provide'
  }
]

// Local storage utilities
const STORAGE_KEY = 'cms_pages'

function loadPagesFromStorage() {
  if (typeof window === 'undefined') return defaultPages
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading pages from localStorage:', error)
  }
  
  // If no stored data, save default pages and return them
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPages))
  return defaultPages
}

function savePagesToStorage(pages: any[]) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
  } catch (error) {
    console.error('Error saving pages to localStorage:', error)
  }
}

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([])
  const [filteredPages, setFilteredPages] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load pages from localStorage on mount
  useEffect(() => {
    const loadedPages = loadPagesFromStorage()
    setPages(loadedPages)
    setFilteredPages(loadedPages)
    setIsLoaded(true)
  }, [])

  // Filter pages when search term or status filter changes
  useEffect(() => {
    let filtered = pages

    if (searchTerm) {
      filtered = filtered.filter(page => 
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(page => page.status === statusFilter)
    }

    setFilteredPages(filtered)
  }, [pages, searchTerm, statusFilter])

  const handleDeletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const updatedPages = pages.filter(page => page.id !== pageId)
      setPages(updatedPages)
      savePagesToStorage(updatedPages)
    }
  }

  const handleDuplicatePage = (page: any) => {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedPages = [...pages, newPage]
    setPages(updatedPages)
    savePagesToStorage(updatedPages)
  }

  const handleToggleStatus = (pageId: string) => {
    const updatedPages = pages.map(page => 
      page.id === pageId 
        ? { 
            ...page, 
            status: page.status === 'published' ? 'draft' : 'published',
            updatedAt: new Date().toISOString()
          }
        : page
    )
    setPages(updatedPages)
    savePagesToStorage(updatedPages)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Pages
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your website pages in one place
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                if (confirm('Are you sure you want to clear all pages? This will reset to default pages.')) {
                  setPages(defaultPages)
                  savePagesToStorage(defaultPages)
                }
              }}
            >
              Clear All
            </Button>
            <Button asChild>
              <Link href="/admin/pages/new">
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pages.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pages.filter(p => p.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pages.filter(p => p.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search pages by title or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pages Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
            <CardDescription>
              {filteredPages.length} of {pages.length} pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {page.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="px-2 py-1 bg-muted rounded text-sm">
                        /{page.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={page.status === 'published' ? 'default' : 'secondary'}
                        className={
                          page.status === 'published' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(page.updatedAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/builder?page=${page.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/${page.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicatePage(page)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeletePage(page.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(page.id)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Toggle Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 