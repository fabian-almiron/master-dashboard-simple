'use client'

import { useState, useEffect } from 'react'
import { ComponentPalette } from './component-palette'
import { PageCanvas } from './page-canvas'
import { BlockEditor } from './block-editor'
import { ComponentInfo, CMSBlock } from '@/lib/cms-types'
import { generateId } from '@/lib/utils'
import { useTheme } from '@/hooks/use-theme'

interface PageBuilderProps {
  initialBlocks?: CMSBlock[]
  onBlocksChange: (blocks: CMSBlock[]) => void
}

export function PageBuilder({ initialBlocks = [], onBlocksChange }: PageBuilderProps) {
  const { components, loading: themeLoading, error: themeError, renderComponent, getComponentInfo } = useTheme()
  const [blocks, setBlocks] = useState<CMSBlock[]>(initialBlocks)
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [editingBlock, setEditingBlock] = useState<CMSBlock | null>(null)
  const [editingComponentInfo, setEditingComponentInfo] = useState<ComponentInfo | null>(null)

  useEffect(() => {
    setBlocks(initialBlocks)
  }, [initialBlocks])

  const handleBlocksChange = (newBlocks: CMSBlock[]) => {
    setBlocks(newBlocks)
    onBlocksChange(newBlocks)
  }

  const handleComponentDragStart = (component: ComponentInfo) => {
    setSelectedComponent(component)
  }

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()
    
    if (selectedComponent) {
      const newBlock: CMSBlock = {
        id: generateId(),
        type: selectedComponent.type,
        props: getDefaultProps(selectedComponent.type),
        order: blocks.length,
        isVisible: true,
      }
      
      const updatedBlocks = [...blocks, newBlock]
      handleBlocksChange(updatedBlocks)
      setSelectedComponent(null)
    }
  }

  const handleBlockEdit = async (block: CMSBlock) => {
    setEditingBlock(block)
    const componentInfo = await getComponentInfo(block.type)
    setEditingComponentInfo(componentInfo || null)
  }

  const handleBlockSave = (updatedBlock: CMSBlock) => {
    const updatedBlocks = blocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    )
    handleBlocksChange(updatedBlocks)
  }

  const getDefaultProps = (componentType: string): Record<string, any> => {
    // Return default props based on component type
    const defaults: Record<string, Record<string, any>> = {
      Hero: {
        title: 'Welcome to Our Site',
        subtitle: 'This is a hero section',
        buttonText: 'Get Started',
        buttonUrl: '#',
      },
      Features: {
        title: 'Our Features',
        description: 'Here are some amazing features',
      },
      CTA: {
        title: 'Ready to Get Started?',
        description: 'Join thousands of satisfied customers',
        buttonText: 'Sign Up Now',
        buttonUrl: '#',
      },
      Testimonials: {
        title: 'What Our Customers Say',
      },
      Pricing: {
        title: 'Choose Your Plan',
      },
      Blog: {
        title: 'Latest Articles',
      },
      Header: {
        siteName: 'Your Site',
      },
      Footer: {
        copyright: '© 2024 Your Company. All rights reserved.',
      },
    }
    
    return defaults[componentType] || {}
  }

  if (themeLoading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading theme components...</p>
        </div>
      </div>
    )
  }

  if (themeError) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading theme: {themeError}</p>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Component Palette */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <ComponentPalette
            components={components}
            onDragStart={handleComponentDragStart}
          />
        </div>
      </div>

      {/* Page Canvas */}
      <div className="flex-1 overflow-y-auto">
        <div 
          className="p-6"
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <PageCanvas
            blocks={blocks}
            onBlocksChange={handleBlocksChange}
            onBlockEdit={handleBlockEdit}
            renderComponent={renderComponent}
          />
        </div>
      </div>

      {/* Block Editor Modal */}
      {editingBlock && (
        <BlockEditor
          block={editingBlock}
          componentInfo={editingComponentInfo}
          onSave={handleBlockSave}
          onClose={() => {
            setEditingBlock(null)
            setEditingComponentInfo(null)
          }}
        />
      )}
    </div>
  )
}
