'use client'

import { PageBlock } from '@/lib/cms-types'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Dynamically import PageBuilder to avoid SSR hydration issues
const PageBuilder = dynamic(() => import('@/components/cms/PageBuilder'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Page Builder...</p>
      </div>
    </div>
  )
})

// localStorage utilities
const STORAGE_KEY = 'cms_pages'

function loadPagesFromStorage() {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading pages from localStorage:', error)
    return []
  }
}

function savePagesToStorage(pages: any[]) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
  } catch (error) {
    console.error('Error saving pages to localStorage:', error)
  }
}

export default function PageBuilderPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Get page ID from URL params
  const pageId = searchParams.get('page')

  useEffect(() => {
    if (!pageId) {
      // Redirect to pages list if no page ID
      router.push('/admin/pages')
      return
    }

    // Load the specific page from localStorage
    const pages = loadPagesFromStorage()
    const page = pages.find((p: any) => p.id === pageId)
    
    if (!page) {
      console.error('Page not found:', pageId)
      router.push('/admin/pages')
      return
    }

    setCurrentPage(page)
    setIsLoading(false)
  }, [pageId, router])

  const handleSave = async (blocks: PageBlock[]) => {
    if (!currentPage) return

    setSaveStatus('saving')
    
    try {
      // Load all pages
      const pages = loadPagesFromStorage()
      
      // Update the current page with new blocks
      const updatedPages = pages.map((page: any) => 
        page.id === currentPage.id 
          ? { 
              ...page, 
              blocks: blocks,
              updatedAt: new Date().toISOString()
            }
          : page
      )
      
      // Save back to localStorage
      savePagesToStorage(updatedPages)
      
      // Update current page state
      setCurrentPage((prev: any) => ({ ...prev, blocks }))
      
      setSaveStatus('saved')
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000)
      
      console.log('Page saved successfully:', { pageId, blocksCount: blocks.length })
    } catch (error) {
      console.error('Error saving page:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    )
  }

  if (!currentPage) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Page not found</h2>
          <p className="text-muted-foreground mb-4">The page you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pages
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get initial blocks from the page (if any)
  const initialBlocks: PageBlock[] = currentPage.blocks || []

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/pages">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pages
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold">Page Builder</h1>
              <p className="text-sm text-muted-foreground">
                Editing: {currentPage.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && (
              <span className="text-sm text-muted-foreground">Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-sm text-green-600">Saved!</span>
            )}
            {saveStatus === 'error' && (
              <span className="text-sm text-red-600">Save failed</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Page Builder */}
      <div className="flex-1 overflow-hidden">
        <PageBuilder 
          initialBlocks={initialBlocks}
          onSave={handleSave}
          pageName={currentPage.title}
        />
      </div>
    </div>
  )
} 