'use client'

import { useState, useEffect } from 'react'
import { CMSBlock, ComponentInfo } from '@/lib/cms-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Save } from 'lucide-react'

interface BlockEditorProps {
  block: CMSBlock | null
  componentInfo: ComponentInfo | null
  onSave: (updatedBlock: CMSBlock) => void
  onClose: () => void
}

export function BlockEditor({ block, componentInfo, onSave, onClose }: BlockEditorProps) {
  const [props, setProps] = useState<Record<string, any>>({})

  useEffect(() => {
    if (block) {
      setProps(block.props || {})
    }
  }, [block])

  if (!block || !componentInfo) {
    return null
  }

  const handleSave = () => {
    const updatedBlock = {
      ...block,
      props
    }
    onSave(updatedBlock)
    onClose()
  }

  const handlePropChange = (key: string, value: any) => {
    setProps(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Define common props that most components might use
  const commonProps = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'buttonUrl', label: 'Button URL', type: 'text' },
    { key: 'imageUrl', label: 'Image URL', type: 'text' },
    { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
  ]

  const renderPropInput = (prop: { key: string; label: string; type: string }) => {
    const value = props[prop.key] || ''

    switch (prop.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handlePropChange(prop.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder={`Enter ${prop.label.toLowerCase()}...`}
          />
        )
      case 'text':
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(prop.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${prop.label.toLowerCase()}...`}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Edit {componentInfo.name}</h2>
            <p className="text-sm text-gray-600">{componentInfo.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Component Properties</h3>
              <div className="grid gap-4">
                {commonProps.map((prop) => (
                  <div key={prop.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {prop.label}
                    </label>
                    {renderPropInput(prop)}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom props that might be in the component */}
            {Object.keys(props).filter(key => !commonProps.some(p => p.key === key)).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={props[key] || ''}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* JSON Editor for advanced users */}
            <div>
              <h4 className="text-md font-medium mb-2">Advanced (JSON)</h4>
              <textarea
                value={JSON.stringify(props, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setProps(parsed)
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                rows={8}
                placeholder="Component props as JSON..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
