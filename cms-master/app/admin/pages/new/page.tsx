'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentSite, createPage, getTemplatesBySite } from '@/lib/cms-data'
import { slugify } from '@/lib/utils'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Template } from '@/lib/supabase'

export default function NewPagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
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
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const site = await getCurrentSite()
      if (site) {
        const templatesData = await getTemplatesBySite(site.id)
        setTemplates(templatesData)
      }
    } catch (error) {
      console.error('Error loading templates:', error)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const site = await getCurrentSite()
      if (!site) {
        alert('No active site found')
        return
      }

      const pageData = {
        site_id: site.id,
        title: formData.title,
        slug: formData.slug,
        status: formData.status,
        theme_id: 'base-theme', // Use base-theme as default
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description,
        header_template_id: formData.header_template_id || undefined,
        footer_template_id: formData.footer_template_id || undefined,
        page_template_id: formData.page_template_id || undefined,
      }

      const newPage = await createPage(pageData)
      if (newPage) {
        router.push(`/admin/pages/${newPage.id}/edit`)
      } else {
        alert('Failed to create page. Please try again.')
      }
    } catch (error) {
      console.error('Error creating page:', error)
      alert('Failed to create page. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getTemplatesByType = (type: string) => {
    return templates.filter(template => template.type === type)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/pages" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Pages
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Page</h1>
          <p className="text-gray-600">Add a new page to your site.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter page title..."
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
                  placeholder="page-url-slug"
                />
                <p className="text-xs text-gray-400 mt-1">
                  URL: yoursite.com/{formData.slug || 'page-url-slug'}
                </p>
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

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading || !formData.title.trim()}>
            {loading ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Page
              </>
            )}
          </Button>
          
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/pages">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
