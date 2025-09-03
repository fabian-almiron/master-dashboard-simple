'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentSite, createTemplate, getSiteSetting } from '@/lib/cms-data'
import { getAvailableThemes, getThemeMetadata } from '@/lib/theme-loader'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewTemplatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [availableThemes, setAvailableThemes] = useState<{id: string, name: string}[]>([])
  const [formData, setFormData] = useState({
    name: '',
    type: 'page' as 'header' | 'footer' | 'page',
    theme_id: 'base-theme',
    is_default: false,
  })

  useEffect(() => {
    loadAvailableThemes()
  }, [])

  const loadAvailableThemes = async () => {
    try {
      const themeIds = await getAvailableThemes()
      const themes = []
      
      for (const themeId of themeIds) {
        try {
          const metadata = await getThemeMetadata(themeId)
          themes.push({
            id: themeId,
            name: (metadata as any)?.themeName || themeId.charAt(0).toUpperCase() + themeId.slice(1)
          })
        } catch (error) {
          // Fallback for themes without metadata
          themes.push({
            id: themeId,
            name: themeId.charAt(0).toUpperCase() + themeId.slice(1)
          })
        }
      }
      
      setAvailableThemes(themes)
      
      // Set active theme as default
      const site = await getCurrentSite()
      if (site) {
        const activeThemeSetting = await getSiteSetting(site.id, 'active_theme')
        const activeTheme = activeThemeSetting?.value || 'base-theme'
        setFormData(prev => ({ ...prev, theme_id: activeTheme }))
      }
    } catch (error) {
      console.error('Error loading themes:', error)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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

      const newTemplate = await createTemplate({
        site_id: site.id,
        name: formData.name,
        type: formData.type,
        theme_id: formData.theme_id,
        is_default: formData.is_default,
      })

      if (newTemplate) {
        router.push(`/admin/templates/${newTemplate.id}/edit`)
      } else {
        alert('Failed to create template. Please try again.')
      }
    } catch (error) {
      console.error('Error creating template:', error)
      alert('Failed to create template. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/templates" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Template</h1>
          <p className="text-gray-600">Add a new reusable template to your site.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="admin-input"
                placeholder="Enter template name..."
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Template Type *
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="admin-select"
              >
                <option value="page">Page Template</option>
                <option value="header">Header Template</option>
                <option value="footer">Footer Template</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {formData.type === 'page' && 'Full page layout templates'}
                {formData.type === 'header' && 'Site navigation and branding'}
                {formData.type === 'footer' && 'Site footer content and links'}
              </p>
            </div>

            <div>
              <label htmlFor="theme_id" className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                id="theme_id"
                value={formData.theme_id}
                onChange={(e) => handleInputChange('theme_id', e.target.value)}
                className="admin-select"
              >
                {availableThemes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={formData.is_default}
                onChange={(e) => handleInputChange('is_default', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                Set as default template for this type
              </label>
              <p className="text-xs text-gray-500 ml-2">
                (Will be used when no specific template is selected)
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading || !formData.name.trim()}>
            {loading ? (
              <>Creating...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Template
              </>
            )}
          </Button>
          
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/templates">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Template Type Information */}
      <Card>
        <CardHeader>
          <CardTitle>Template Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="font-medium mb-1">Page Templates</h3>
              <p className="text-sm text-gray-600">
                Define the overall layout and structure for your pages. Can include areas for dynamic content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-medium mb-1">Header Templates</h3>
              <p className="text-sm text-gray-600">
                Control the site navigation, branding, and top-level elements that appear on every page.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🦶</div>
              <h3 className="font-medium mb-1">Footer Templates</h3>
              <p className="text-sm text-gray-600">
                Manage footer content, links, copyright information, and bottom-page elements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
