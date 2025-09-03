'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getTemplateById, getTemplateBlocks } from '@/lib/cms-data'
import { getComponent, renderComponent } from '@/lib/dynamic-theme-import'
import { TemplateBlock } from '@/lib/supabase'

// Component to handle async dynamic component rendering
function DynamicComponentRenderer({ block }: { block: TemplateBlock }) {
  const [component, setComponent] = useState<React.ReactNode>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const Component = await getComponent(block.component_type)
        if (!Component) {
          setError(`Component "${block.component_type}" not found`)
          return
        }

        const renderedComponent = await renderComponent(block.component_type, block.props || {})
        setComponent(renderedComponent)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load component')
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [block.component_type, block.props])

  if (loading) {
    return (
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Block indicator */}
      <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {block.component_type}
      </div>
      
      {/* Component */}
      <div className="border-2 border-transparent group-hover:border-blue-200 rounded-lg transition-colors">
        {component}
      </div>
    </div>
  )
}

export default function TemplatePreviewPage() {
  const params = useParams()
  const templateId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [template, setTemplate] = useState<any>(null)
  const [blocks, setBlocks] = useState<TemplateBlock[]>([])

  useEffect(() => {
    loadTemplate()
  }, [templateId])

  const loadTemplate = async () => {
    try {
      setLoading(true)
      const templateData = await getTemplateById(templateId)
      if (!templateData) {
        alert('Template not found')
        return
      }

      setTemplate(templateData)
      const templateBlocks = await getTemplateBlocks(templateId)
      setBlocks(templateBlocks)
    } catch (error) {
      console.error('Error loading template:', error)
      alert('Failed to load template')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template not found</h1>
          <p className="text-gray-600">The template you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Template Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
          <p className="text-gray-600">Template Preview - {template.type} template</p>
        </div>
      </div>

      {/* Template Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {blocks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Empty Template</h2>
            <p className="text-gray-600">This template doesn't have any blocks yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blocks
              .sort((a, b) => a.order_index - b.order_index)
              .map((block) => {
                if (!block.is_visible) return null
                
                return (
                  <DynamicComponentRenderer 
                    key={block.id} 
                    block={block} 
                  />
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
