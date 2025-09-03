import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getPageBySlug, getPageBlocks, getTemplateById, getTemplateBlocks, getCurrentSite, getNavigationItems, getSiteSettings } from '@/lib/cms-data'

import { PageRenderer } from '@/components/frontend/page-renderer'
import { Template, TemplateBlock } from '@/lib/supabase'

// Force dynamic rendering for multi-tenant site detection
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const urlSearchParams = await searchParams
  const headersList = await headers()
  
  try {
    // Log environment for debugging
    console.log('🔍 [DynamicPage] Environment check:', {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      slug,
      searchParams: urlSearchParams,
      host: headersList.get('host')
    })
    
    // Get current site with domain and URL-based selection
    const site = await getCurrentSite(urlSearchParams, headersList)
    if (!site) {
      console.error('❌ [DynamicPage] No site found for slug:', slug)
      return notFound()
    }
    
    console.log('✅ [DynamicPage] Using site:', { name: site.name, id: site.id })

    // Get page by slug
    const page = await getPageBySlug(slug, site.id)
    if (!page || page.status !== 'published') {
      return notFound()
    }

    // Get page blocks
    const pageBlocks = await getPageBlocks(page.id)

    // Get template if page has one
    let template: Template | null = null
    let templateBlocks: TemplateBlock[] = []
    
    if (page.page_template_id) {
      template = await getTemplateById(page.page_template_id)
      if (template) {
        templateBlocks = await getTemplateBlocks(template.id)
      }
    }

    // Get navigation and settings for the frontend layout
    const navigationItems = await getNavigationItems(site.id)
    const siteSettings = await getSiteSettings(site.id)

    return (
      <PageRenderer
        page={page}
        pageBlocks={pageBlocks}
        template={template}
        templateBlocks={templateBlocks}
        site={site}
        navigationItems={navigationItems}
        siteSettings={siteSettings}
      />
    )
  } catch (error) {
    console.error('❌ [DynamicPage] Error rendering page:', {
      error: error instanceof Error ? error.message : error,
      slug,
      stack: error instanceof Error ? error.stack : undefined
    })
    return notFound()
  }
}

// Generate static params for known pages
export async function generateStaticParams() {
  try {
    const site = await getCurrentSite()
    if (!site) return []

    // This would need to be implemented to get all published pages
    // For now, we'll rely on dynamic rendering
    return []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
