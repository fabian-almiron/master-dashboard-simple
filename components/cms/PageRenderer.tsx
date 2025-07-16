'use client'

import { useEffect, useState } from 'react'
import { PageBlock, Template, TemplateAssignment } from '@/lib/cms-types'
import { useThemeComponents, useCurrentTheme } from '@/lib/theme-context'
import { getThemeTemplate, getDefaultThemeTemplate } from '@/lib/theme-utils'

interface PageRendererProps {
  blocks: PageBlock[]
  pageId?: string
  className?: string
  headerTemplateId?: string
  footerTemplateId?: string
  pageTemplateId?: string
  isTemplatePreview?: boolean
  templateType?: 'header' | 'footer' | 'page' | 'post'
}

export default function PageRenderer({ 
  blocks, 
  pageId, 
  className = '',
  headerTemplateId,
  footerTemplateId,
  pageTemplateId,
  isTemplatePreview = false,
  templateType
}: PageRendererProps) {
  const [headerTemplate, setHeaderTemplate] = useState<Template | null>(null)
  const [footerTemplate, setFooterTemplate] = useState<Template | null>(null)
  const [pageTemplate, setPageTemplate] = useState<Template | null>(null)
  const { renderComponent } = useThemeComponents()
  const currentTheme = useCurrentTheme()

  // Load theme-specific templates
  useEffect(() => {
    if (!currentTheme) return

    // Use specific template IDs if provided, otherwise use defaults
    let headerTemplateToUse: Template | null = null
    let footerTemplateToUse: Template | null = null
    let pageTemplateToUse: Template | null = null

    if (headerTemplateId) {
      headerTemplateToUse = getThemeTemplate(currentTheme.id, headerTemplateId)
    } else {
      headerTemplateToUse = getDefaultThemeTemplate(currentTheme.id, 'header')
    }

    if (footerTemplateId) {
      footerTemplateToUse = getThemeTemplate(currentTheme.id, footerTemplateId)
    } else {
      footerTemplateToUse = getDefaultThemeTemplate(currentTheme.id, 'footer')
    }

    if (pageTemplateId) {
      pageTemplateToUse = getThemeTemplate(currentTheme.id, pageTemplateId)
    } else {
      pageTemplateToUse = getDefaultThemeTemplate(currentTheme.id, 'page')
    }

    setHeaderTemplate(headerTemplateToUse)
    setFooterTemplate(footerTemplateToUse)
    setPageTemplate(pageTemplateToUse)
  }, [currentTheme, headerTemplateId, footerTemplateId, pageTemplateId])

  // Sort blocks by order and filter visible ones
  const visibleBlocks = (blocks || [])
    .filter(block => block.isVisible !== false)
    .sort((a, b) => a.order - b.order)

  // For template preview mode, render template directly with placeholder content
  if (isTemplatePreview) {
    return (
      <div className={className}>
        <div className="p-8 bg-muted/50 rounded-lg border-2 border-dashed">
          <h3 className="text-lg font-semibold mb-4">
            {templateType ? `${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Template Preview` : 'Template Preview'}
          </h3>
          <div className="space-y-4">
            {visibleBlocks.map((block) => {
              if (block.type === 'DNDArea') {
                return (
                  <div key={block.id} className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="text-center">
                      <h4 className="font-medium text-blue-900 mb-2">Dynamic Content Area</h4>
                      <p className="text-sm text-blue-700">
                        This is where page content will be inserted when this template is used.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 bg-blue-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-blue-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-blue-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  </div>
                )
              }
              
              return (
                <div key={block.id}>
                  {renderComponent(block.type, block.props)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Function to render template blocks
  const renderTemplateBlocks = (template: Template, insertPageContent: boolean) => {
    const templateBlocks = template.blocks
      .filter(block => block.isVisible !== false)
      .sort((a, b) => a.order - b.order)

    return templateBlocks.map((block) => {
      // If this is a DND area and we should insert page content, render page blocks instead
      if (block.type === 'DNDArea' && insertPageContent) {
        return (
          <div key={`dnd-content-${template.id}-${block.id}`} className="dnd-content-area">
            {visibleBlocks.map((pageBlock) => (
              <div key={pageBlock.id}>
                {renderComponent(pageBlock.type, pageBlock.props)}
              </div>
            ))}
          </div>
        )
      }
      
      // Regular template block
      return (
        <div key={`template-${template.id}-${block.id}`}>
          {renderComponent(block.type, block.props)}
        </div>
      )
    })
  }

  // Check if template has DND area
  const templateHasDNDArea = (template: Template) => {
    return template.blocks.some(block => block.type === 'DNDArea')
  }

  if (!currentTheme) {
    return (
      <div className={className}>
        <div className="p-8 text-center text-muted-foreground">
          <p>Loading theme...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Render Header Template */}
      {headerTemplate && (
        <header>
          {renderTemplateBlocks(headerTemplate, templateHasDNDArea(headerTemplate))}
        </header>
      )}

      {/* Render Page Content with Page Template */}
      <main>
        {pageTemplate && templateHasDNDArea(pageTemplate) ? (
          // Use page template and replace DND area with page content
          renderTemplateBlocks(pageTemplate, true)
        ) : (
          // No page template or no DND area, render page content directly
          visibleBlocks.map((block) => (
            <div key={block.id}>
              {renderComponent(block.type, block.props)}
            </div>
          ))
        )}
      </main>

      {/* Render Footer Template */}
      {footerTemplate && (
        <footer>
          {renderTemplateBlocks(footerTemplate, templateHasDNDArea(footerTemplate))}
        </footer>
      )}
    </div>
  )
} 