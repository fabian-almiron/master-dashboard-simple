import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: 'DNDArea',
  name: 'Content Area',
  description: 'Dynamic content area for templates (Elementor-style)',
  category: 'layout',
  icon: 'Square',
}

interface DNDAreaProps {
  pageBlocks?: any[]
  isTemplateEdit?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  background?: string
}

export default function DNDArea({ 
  pageBlocks = [], 
  isTemplateEdit = false,
  padding = 'medium',
  background = ''
}: DNDAreaProps) {
  const paddingClass = {
    none: '',
    small: 'py-4',
    medium: 'py-8 md:py-12',
    large: 'py-12 md:py-24'
  }[padding]

  if (isTemplateEdit) {
    return (
      <div 
        className={`w-full ${paddingClass} ${background}`}
        style={background && !background.startsWith('bg-') ? { backgroundColor: background } : {}}
      >
        <div className="container mx-auto px-4">
          <div className="border-2 border-dashed border-theme-gray-300 rounded-lg p-8 text-center bg-theme-gray-50">
            <div className="text-theme-gray-600">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Page Content Area</h3>
              <p className="text-sm">This area will display the page's content blocks when the template is used.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pageBlocks || pageBlocks.length === 0) {
    return (
      <div className={`w-full ${paddingClass} ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-theme-gray-900 mb-4">No Content Available</h2>
            <p className="text-theme-gray-600">Add content blocks to this page to see them here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${paddingClass} ${background}`}>
      {/* Page blocks would be rendered here by the CMS */}
      <div className="container mx-auto px-4">
        {pageBlocks.map((block, index) => (
          <div key={block.id || index} className="mb-8">
            {/* Block content rendered by CMS */}
          </div>
        ))}
      </div>
    </div>
  )
}
