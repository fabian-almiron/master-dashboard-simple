'use client'

import { useDraggable } from '@dnd-kit/core'
import { componentInfo } from '@/lib/component-registry'
import { ComponentInfo, ComponentType } from '@/lib/cms-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  Star, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  ArrowRight,
  Grip
} from 'lucide-react'

const iconMap = {
  Zap,
  Star,
  MessageSquare,
  DollarSign,
  FileText,
  ArrowRight,
  Grip,
}

interface DraggableComponentProps {
  component: ComponentInfo
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `new-${component.type}`,
    data: {
      type: component.type,
      isNewComponent: true,
    },
  })

  const Icon = iconMap[component.icon as keyof typeof iconMap] || Grip

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-grab hover:shadow-md transition-shadow select-none ${
        isDragging ? 'rotate-2 shadow-lg opacity-50' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="p-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm">{component.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <CardDescription className="text-xs">
          {component.description}
        </CardDescription>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs bg-muted rounded-md capitalize">
            {component.category}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ComponentPalette() {
  const contentComponents = componentInfo.filter(c => c.category === 'content')
  const marketingComponents = componentInfo.filter(c => c.category === 'marketing')
  const layoutComponents = componentInfo.filter(c => c.category === 'layout')

  return (
    <div className="w-80 bg-background border-r h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        
        {contentComponents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Content
            </h3>
            <div className="space-y-3">
              {contentComponents.map((component) => (
                <DraggableComponent key={component.type} component={component} />
              ))}
            </div>
          </div>
        )}

        {marketingComponents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Marketing
            </h3>
            <div className="space-y-3">
              {marketingComponents.map((component) => (
                <DraggableComponent key={component.type} component={component} />
              ))}
            </div>
          </div>
        )}

        {layoutComponents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Layout
            </h3>
            <div className="space-y-3">
              {layoutComponents.map((component) => (
                <DraggableComponent key={component.type} component={component} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 