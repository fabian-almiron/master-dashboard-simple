'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { 
  getPageById, 
  updatePage, 
  getPageBlocks, 
  createPageBlock, 
  updatePageBlock, 
  deletePageBlock,
  reorderPageBlocks,
  getTemplatesBySite,
  getCurrentSite,
  getSiteSetting
} from '@/lib/cms-data'
import { slugify } from '@/lib/utils'
import { CMSBlock } from '@/lib/cms-types'
import { Page, Template } from '@/lib/supabase'
import { ArrowLeft, Save, Eye } from 'lucide-react'

interface EditPagePageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditPagePage({ params }: EditPagePageProps) {
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then(({ id: pageId }) => {
      setId(pageId)
    })
  }, [params])
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [activeTheme, setActiveTheme] = useState<string>('default')
  const [blocks, setBlocks] = useState<CMSBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'builder' | 'settings'>('builder')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft' as 'draft' | 'published',
    meta_title: '',
    meta_description: '',
    header_template_id: '',
    footer_template_id: '',
    page_template_id: '',
  })

  useEffect(() => {
    if (id) {
      loadPageData()
    }
  }, [id])

  const loadPageData = async () => {
    try {
      setLoading(true)
      
      // Load page data
      const pageData = await getPageById(id)
      if (!pageData) {
        router.push('/admin/pages')
        return
      }
      
      setPage(pageData)
      setFormData({
        title: pageData.title,
        slug: pageData.slug,
        status: pageData.status,
        meta_title: pageData.meta_title || '',
        meta_description: pageData.meta_description || '',
        header_template_id: pageData.header_template_id || '',
        footer_template_id: pageData.footer_template_id || '',
        page_template_id: pageData.page_template_id || '',
      })

      // Load page blocks
      const pageBlocks = await getPageBlocks(id)
      const cmsBlocks: CMSBlock[] = pageBlocks.map(block => ({
        id: block.id,
        type: block.component_type,
        props: block.props || {},
        order: block.order_index,
        isVisible: block.is_visible,
      }))
      setBlocks(cmsBlocks)

      // Load templates and active theme
      const site = await getCurrentSite()
      if (site) {
        const templatesData = await getTemplatesBySite(site.id)
        setTemplates(templatesData)
        
        // Get active theme
        const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
        const currentActiveTheme = activeThemeSetting?.value || 'base-theme'
        setActiveTheme(currentActiveTheme)
      }
    } catch (error) {
      console.error('Error loading page data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      
      // Auto-generate slug from title
      if (field === 'title') {
        updated.slug = slugify(value)
      }
      
      return updated
    })
  }

  const handleSavePage = async () => {
    if (!page) return
    
    setSaving(true)
    try {
      // Update page metadata
      const updatedPage = await updatePage(page.id, {
        title: formData.title,
        slug: formData.slug,
        status: formData.status,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description,
        header_template_id: formData.header_template_id || undefined,
        footer_template_id: formData.footer_template_id || undefined,
        page_template_id: formData.page_template_id || undefined,
      })

      if (updatedPage) {
        setPage(updatedPage)
        // Page blocks are saved automatically through handleBlocksChange
        alert('Page saved successfully!')
      } else {
        alert('Failed to save page. Please try again.')
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Failed to save page. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleBlocksChange = async (newBlocks: CMSBlock[]) => {
    setBlocks(newBlocks)
    
    if (!page) return

    try {
      // Get current blocks from database
      const currentBlocks = await getPageBlocks(page.id)
      const currentBlockIds = currentBlocks.map(block => block.id)
      const newBlockIds = newBlocks.map(block => block.id)

      // Delete removed blocks
      const blocksToDelete = currentBlockIds.filter(id => !newBlockIds.includes(id))
      for (const blockId of blocksToDelete) {
        await deletePageBlock(blockId)
      }

      // Update or create blocks
      for (const block of newBlocks) {
        const existingBlock = currentBlocks.find(cb => cb.id === block.id)
        
        if (existingBlock) {
          // Update existing block
          await updatePageBlock(block.id, {
            component_type: block.type,
            order_index: block.order,
            props: block.props,
            is_visible: block.isVisible,
          })
        } else {
          // Create new block
          await createPageBlock({
            site_id: page.site_id,
            page_id: page.id,
            component_type: block.type,
            order_index: block.order,
            props: block.props,
            is_visible: block.isVisible,
          })
        }
      }
    } catch (error) {
      console.error('Error saving blocks:', error)
    }
  }

  const getTemplatesByType = (type: string) => {
    // Filter templates by type and prioritize active theme templates
    const typeTemplates = templates.filter(template => template.type === type)
    
    // Separate active theme templates from others
    const activeThemeTemplates = typeTemplates.filter(template => template.theme_id === activeTheme)
    const otherTemplates = typeTemplates.filter(template => template.theme_id !== activeTheme)
    
    // Return active theme templates first, then others
    return [...activeThemeTemplates, ...otherTemplates]
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/admin/pages">Back to Pages</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/pages" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Pages
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Page</h1>
            <p className="text-gray-600">{page.title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={`/preview/${page.slug}`} target="_blank" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Link>
          </Button>
          
          <Button onClick={handleSavePage} disabled={saving}>
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Page
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('builder')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'builder'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Page Builder
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Page Settings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'builder' ? (
        <div className="bg-white rounded-lg border">
          <PageBuilder
            initialBlocks={blocks}
            onBlocksChange={handleBlocksChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="admin-field">
                  <label htmlFor="title" className="admin-label required">
                    Page Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="admin-input"
                  />
                </div>
                
                <div className="admin-field">
                  <label htmlFor="slug" className="admin-label required">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    required
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-field">
                <label htmlFor="status" className="admin-label">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="admin-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="admin-field">
                  <label htmlFor="header_template" className="admin-label">
                    Header Template
                  </label>
                  <select
                    id="header_template"
                    value={formData.header_template_id}
                    onChange={(e) => handleInputChange('header_template_id', e.target.value)}
                    className="admin-select"
                  >
                    <option value="">Default Header</option>
                    {getTemplatesByType('header').map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="admin-field">
                  <label htmlFor="footer_template" className="admin-label">
                    Footer Template
                  </label>
                  <select
                    id="footer_template"
                    value={formData.footer_template_id}
                    onChange={(e) => handleInputChange('footer_template_id', e.target.value)}
                    className="admin-select"
                  >
                    <option value="">Default Footer</option>
                    {getTemplatesByType('footer').map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="admin-field">
                  <label htmlFor="page_template" className="admin-label">
                    Page Template
                  </label>
                  <select
                    id="page_template"
                    value={formData.page_template_id}
                    onChange={(e) => handleInputChange('page_template_id', e.target.value)}
                    className="admin-select"
                  >
                    <option value="">Default Page</option>
                    {getTemplatesByType('page').map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="admin-field">
                <label htmlFor="meta_title" className="admin-label">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => handleInputChange('meta_title', e.target.value)}
                  className="admin-input"
                  placeholder="Leave empty to use page title"
                />
              </div>
              
              <div className="admin-field">
                <label htmlFor="meta_description" className="admin-label">
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  rows={3}
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  className="admin-textarea"
                  placeholder="Brief description for search engines..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
