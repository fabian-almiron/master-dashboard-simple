import Link from 'next/link'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getCurrentSite, getSiteSettings, getPageById, getPageBlocks, getTemplateById, getTemplateBlocks, getNavigationItems } from '@/lib/cms-data'
import { renderComponent } from '@/lib/dynamic-theme-import'
import { PageRenderer } from '@/components/frontend/page-renderer'
import { ThemeTest } from '@/components/theme-test'
import { ThemeDebug } from '@/components/theme-debug'
import { Template, TemplateBlock } from '@/lib/supabase'
import { ArrowRight, Database, Layout, Palette, Settings } from 'lucide-react'

// Force dynamic rendering for multi-tenant site detection
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const urlSearchParams = await searchParams
  const headersList = await headers()
  
  try {
    // Get current site with domain and URL-based selection
    console.log('🌐 Homepage: URL params:', urlSearchParams)
    console.log('🌐 Homepage: Headers host:', headersList.get('host'))
    
    const site = await getCurrentSite(urlSearchParams, headersList)
    console.log('🌐 Homepage: Current site detected:', site ? { id: site.id, name: site.name, domain: site.domain } : 'NOT FOUND')
    
    if (!site) {
      return notFound()
    }

    // Check if a homepage is set
    const siteSettings = await getSiteSettings(site.id)
    console.log('🏠 All site settings:', siteSettings.map(s => ({ key: s.key, value: s.value })))
    
    const homepageSetting = siteSettings.find(setting => setting.key === 'homepage_page_id')
    console.log('🏠 Homepage setting found:', homepageSetting)
    
    if (homepageSetting && homepageSetting.value) {
      // Get the homepage page
      const page = await getPageById(homepageSetting.value)
      console.log('🏠 Homepage page found:', page ? { id: page.id, title: page.title, slug: page.slug, status: page.status } : 'NOT FOUND')
      
      if (page && page.status === 'published') {
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
      }
    }

    // Default welcome page (when no homepage is set)
    console.log('🏠 No valid homepage found, showing default welcome page')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
                {/* Theme Test Component - Remove this after testing */}
      <div className="mb-8">
        <ThemeTest />
      </div>
      
      {/* Theme Debug Component - Remove this after testing */}
      <div className="mb-8">
        <ThemeDebug />
      </div>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              CMS TailWinds
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A powerful multi-tenant Content Management System with drag-and-drop page builder, 
              template system, and automatic theme detection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Admin Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/preview"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Preview Site
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Database className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multi-Tenant Database</h3>
              <p className="text-gray-600">Built on Supabase with row-level security for complete data isolation.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Layout className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drag & Drop Builder</h3>
              <p className="text-gray-600">Intuitive page builder with pre-built components from your theme.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Palette className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Theme System</h3>
              <p className="text-gray-600">Drop in new themes and they're automatically detected and registered.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Settings className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Template Management</h3>
              <p className="text-gray-600">WordPress-like header, footer, and page templates for complete control.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🏗️ Page Management</h3>
                <p className="text-gray-600 mb-4">Create, edit, and manage pages with full CRUD operations and status control.</p>
                
                <h3 className="font-semibold mb-2">🎨 Template System</h3>
                <p className="text-gray-600 mb-4">Create reusable header, footer, and page templates that can be assigned to any page.</p>
                
                <h3 className="font-semibold mb-2">🧩 Component Library</h3>
                <p className="text-gray-600">Drag and drop components from your active theme into pages with live preview.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Navigation Builder</h3>
                <p className="text-gray-600 mb-4">Visual navigation management with internal page linking and external URL support.</p>
                
                <h3 className="font-semibold mb-2">⚙️ Site Settings</h3>
                <p className="text-gray-600 mb-4">Comprehensive site configuration with theme-specific settings.</p>
                
                <h3 className="font-semibold mb-2">📊 Dashboard Analytics</h3>
                <p className="text-gray-600">Overview of site statistics, recent activity, and quick actions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering homepage:', error)
    return notFound()
  }
}
