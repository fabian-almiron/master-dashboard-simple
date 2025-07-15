'use client'

import { useEffect, useState, use } from 'react'
import { notFound } from 'next/navigation'
import { PageBlock } from '@/lib/cms-types'
import PageRenderer from '@/components/cms/PageRenderer'

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

interface DynamicPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DynamicPage({ params }: DynamicPageProps) {
  const [page, setPage] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  
  // Unwrap the params Promise
  const resolvedParams = use(params)

  useEffect(() => {
    // Load page from localStorage
    const pages = loadPagesFromStorage()
    const foundPage = pages.find((p: any) => p.slug === resolvedParams.slug)
    
    if (!foundPage) {
      setNotFoundFlag(true)
      setIsLoading(false)
      return
    }

    // Check if page is published
    if (foundPage.status !== 'published') {
      setNotFoundFlag(true)
      setIsLoading(false)
      return
    }

    setPage(foundPage)
    setIsLoading(false)
  }, [resolvedParams.slug])

  // Set document title when page loads
  useEffect(() => {
    if (page?.title) {
      document.title = page.title
    }
  }, [page])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    )
  }

  // Show 404 if page not found or not published
  if (notFoundFlag) {
    notFound()
  }

  // Get page blocks
  const blocks: PageBlock[] = page?.blocks || []

  return (
    <div className="min-h-screen">
      {/* Render Page with Templates */}
      {blocks.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            <p className="text-muted-foreground">
              This page is under construction.
            </p>
          </div>
        </div>
      ) : (
        <PageRenderer 
          blocks={blocks} 
          pageId={page.id}
          className="w-full"
        />
      )}
    </div>
  )
}

 