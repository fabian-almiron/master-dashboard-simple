'use client'

import { useEffect, useState, use } from 'react'
import { notFound } from 'next/navigation'
import { PageBlock } from '@/lib/cms-types'
import PageRenderer from '@/components/cms/PageRenderer'
import { loadPagesFromDatabase } from '@/lib/cms-data'

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
    // Load page from database with proper site detection
    const loadPage = async () => {
      try {
        // Wait for site detection to complete
        const { getCurrentSite } = await import('@/lib/site-config')
        const site = await getCurrentSite()
        
        if (!site) {
          console.log('⚠️ No site detected, page will not load')
          setNotFoundFlag(true)
          setIsLoading(false)
          return
        }

        console.log('✅ Site detected, loading pages for:', site.domain)
        const pages = await loadPagesFromDatabase()
        const foundPage = pages.find((p: any) => p.slug === resolvedParams.slug)
        
        if (!foundPage) {
          console.log('❌ Page not found:', resolvedParams.slug)
          setNotFoundFlag(true)
          setIsLoading(false)
          return
        }

        // Check if page is published
        if (foundPage.status !== 'published') {
          console.log('❌ Page not published:', resolvedParams.slug)
          setNotFoundFlag(true)
          setIsLoading(false)
          return
        }

        console.log('✅ Page loaded:', foundPage.title)
        setPage(foundPage)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading page from database:', error)
        setNotFoundFlag(true)
        setIsLoading(false)
      }
    }

    loadPage()
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
    <div className="flex min-h-screen flex-col">
      {/* Render Page with Templates */}
      {blocks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
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
          headerTemplateId={page.headerTemplateId}
          footerTemplateId={page.footerTemplateId}
          pageTemplateId={page.pageTemplateId}
          className="flex-1"
        />
      )}
    </div>
  )
}

 