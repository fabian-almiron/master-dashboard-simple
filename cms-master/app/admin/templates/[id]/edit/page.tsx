'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { 
  getCurrentSite, 
  getTemplateById, 
  updateTemplate, 
  getTemplateBlocks,
  createTemplateBlock,
  updateTemplateBlock,
  deleteTemplateBlock,
  getSiteSetting
} from '@/lib/cms-data'
import { getAvailableThemes, getThemeMetadata } from '@/lib/theme-loader'
import { CMSBlock } from '@/lib/cms-types'
import { TemplateBlock } from '@/lib/supabase'
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react'
import Link from 'next/link'

export default function EditTemplatePage() {
  const router = useRouter()
  const params = useParams()
  const templateId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [template, setTemplate] = useState<any>(null)
  const [blocks, setBlocks] = useState<CMSBlock[]>([])
  const [availableThemes, setAvailableThemes] = useState<{id: string, name: string}[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'page' as 'header' | 'footer' | 'page',
    theme_id: 'base-theme',
    is_default: false,
  })

  useEffect(() => {
    loadTemplate()
  }, [templateId])

  const loadTemplate = async () => {
    try {
      setLoading(true)
      const site = await getCurrentSite()
      if (!site) {
        alert('No active site found')
        router.push('/admin')
        return
      }

      const templateData = await getTemplateById(templateId)
      if (!templateData) {
        alert('Template not found')
        router.push('/admin/templates')
        return
      }

      setTemplate(templateData)
      setFormData({
        name: templateData.name,
        type: templateData.type,
        theme_id: templateData.theme_id,
        is_default: templateData.is_default,
      })

      // Load template blocks
      const templateBlocks = await getTemplateBlocks(templateId)
      const cmsBlocks: CMSBlock[] = templateBlocks.map((block: TemplateBlock) => ({
        id: block.id,
        type: block.component_type,
        props: block.props || {},
        order: block.order_index,
        isVisible: block.is_visible,
      }))
      setBlocks(cmsBlocks)

      // Load available themes
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
          themes.push({
            id: themeId,
            name: themeId.charAt(0).toUpperCase() + themeId.slice(1)
          })
        }
      }
      
      setAvailableThemes(themes)
    } catch (error) {
      console.error('Error loading template:', error)
      alert('Failed to load template')
    } finally {
      setLoading(false)
    }
  }

  const handleBlocksChange = async (newBlocks: CMSBlock[]) => {
    setBlocks(newBlocks)
    
    // Save blocks to database
    try {
      const site = await getCurrentSite()
      if (!site) return

      // Get existing blocks
      const existingBlocks = await getTemplateBlocks(templateId)
      const existingBlockIds = new Set(existingBlocks.map(b => b.id))
      const newBlockIds = new Set(newBlocks.map(b => b.id))

      // Delete blocks that no longer exist
      for (const existingBlock of existingBlocks) {
        if (!newBlockIds.has(existingBlock.id)) {
          await deleteTemplateBlock(existingBlock.id)
        }
      }

      // Create or update blocks
      for (const block of newBlocks) {
        const blockData = {
          template_id: templateId,
          component_type: block.type,
          props: block.props,
          order_index: block.order,
          is_visible: block.isVisible,
        }

        if (existingBlockIds.has(block.id)) {
          // Update existing block
          await updateTemplateBlock(block.id, blockData)
        } else {
          // Create new block
          await createTemplateBlock({
            ...blockData,
            site_id: site.id,
          })
        }
      }
    } catch (error) {
      console.error('Error saving blocks:', error)
      alert('Failed to save template blocks')
    }
  }

  const handleSaveTemplate = async () => {
    setSaving(true)
    try {
      const success = await updateTemplate(templateId, {
        name: formData.name,
        type: formData.type,
        theme_id: formData.theme_id,
        is_default: formData.is_default,
      })

      if (success) {
        alert('Template saved successfully!')
        setTemplate({ ...template, ...formData })
      } else {
        alert('Failed to save template. Please try again.')
      }
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Failed to save template. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Template not found</h3>
          <p className="text-gray-600 mb-4">The template you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/templates">Back to Templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/admin/templates" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Templates
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Template</h1>
              <p className="text-gray-600">{template.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            
            <Button variant="outline" asChild>
              <Link href={`/admin/templates/${templateId}/preview`} target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
            
            <Button 
              onClick={handleSaveTemplate}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
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
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Page Builder */}
      <div className="flex-1 overflow-hidden">
        <PageBuilder
          initialBlocks={blocks}
          onBlocksChange={handleBlocksChange}
        />
      </div>
    </div>
  )
}
