'use client'

import { useEffect, useState } from 'react'
import { PageBlock, Template, TemplateAssignment } from '@/lib/cms-types'
import { renderComponent } from '@/lib/component-registry'

interface PageRendererProps {
  blocks: PageBlock[]
  pageId?: string
  className?: string
}

export default function PageRenderer({ blocks, pageId, className = '' }: PageRendererProps) {
  const [headerTemplate, setHeaderTemplate] = useState<Template | null>(null)
  const [footerTemplate, setFooterTemplate] = useState<Template | null>(null)

  // Load templates if pageId is provided
  useEffect(() => {
    if (!pageId) return

    // Load templates from localStorage
    const savedTemplates = localStorage.getItem('cms-templates')
    if (!savedTemplates) return

    const templates: Template[] = JSON.parse(savedTemplates)
    
    // Load template assignments (for now using default templates)
    // In the future, this could check specific page assignments
    const defaultHeaderTemplate = templates.find(t => t.type === 'header' && t.isDefault)
    const defaultFooterTemplate = templates.find(t => t.type === 'footer' && t.isDefault)
    
    setHeaderTemplate(defaultHeaderTemplate || null)
    setFooterTemplate(defaultFooterTemplate || null)
  }, [pageId])

  // Sort blocks by order and filter visible ones
  const visibleBlocks = blocks
    .filter(block => block.isVisible !== false)
    .sort((a, b) => a.order - b.order)

  // Render template blocks
  const renderTemplateBlocks = (template: Template) => {
    const templateBlocks = template.blocks
      .filter(block => block.isVisible !== false)
      .sort((a, b) => a.order - b.order)

    return templateBlocks.map((block) => (
      <div key={`template-${template.id}-${block.id}`}>
        {renderComponent(block.type, block.props)}
      </div>
    ))
  }

  return (
    <div className={className}>
      {/* Render Header Template */}
      {headerTemplate && (
        <header>
          {renderTemplateBlocks(headerTemplate)}
        </header>
      )}

      {/* Render Page Content */}
      <main>
        {visibleBlocks.map((block) => (
          <div key={block.id}>
            {renderComponent(block.type, block.props)}
          </div>
        ))}
      </main>

      {/* Render Footer Template */}
      {footerTemplate && (
        <footer>
          {renderTemplateBlocks(footerTemplate)}
        </footer>
      )}
    </div>
  )
} 