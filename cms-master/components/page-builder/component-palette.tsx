'use client'

import { ComponentInfo } from '@/lib/cms-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  Zap, 
  Star, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  Grip,
  Layout
} from 'lucide-react'

// Icon mapping for components
const iconMap = {
  Zap,
  Star,
  MessageSquare,
  DollarSign,
  FileText,
  ArrowRight,
  Grip,
  Layout,
}

interface ComponentPaletteProps {
  components: ComponentInfo[]
  onDragStart: (component: ComponentInfo) => void
}

export function ComponentPalette({ components, onDragStart }: ComponentPaletteProps) {
  const groupedComponents = components.reduce((groups, component) => {
    const category = component.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(component)
    return groups
  }, {} as Record<string, ComponentInfo[]>)

  const categoryNames = {
    'content-blocks': 'Content Blocks',
    'layout': 'Layout',
    'ui-primitives': 'UI Components',
    'page-templates': 'Page Templates',
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Grip
    return IconComponent
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Component Library</h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag components from here to build your page
        </p>
      </div>

      {Object.entries(groupedComponents).map(([category, components]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {categoryNames[category as keyof typeof categoryNames] || category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {components.map((component) => {
                const Icon = getIcon(component.icon)
                return (
                  <div
                    key={component.type}
                    draggable
                    onDragStart={() => onDragStart(component)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-md border cursor-grab",
                      "hover:bg-gray-50 hover:border-blue-300 transition-colors",
                      "active:cursor-grabbing"
                    )}
                  >
                    <Icon className="h-5 w-5 text-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {component.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {component.description}
                      </p>
                    </div>
                    <Grip className="h-4 w-4 text-gray-400" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {Object.keys(groupedComponents).length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Components Available</h3>
            <p className="text-gray-600">
              Make sure your theme has components with proper metadata exports.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
