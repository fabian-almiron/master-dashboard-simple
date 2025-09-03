'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { ComponentInfo, CMSBlock } from '@/lib/cms-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  Trash2, 
  Edit, 
  Grip, 
  Plus, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface PageCanvasProps {
  blocks: CMSBlock[]
  onBlocksChange: (blocks: CMSBlock[]) => void
  onBlockEdit: (block: CMSBlock) => Promise<void>
  renderComponent: (type: string, props: Record<string, any>) => Promise<React.ReactNode>
}

// Async component renderer
function AsyncComponentRenderer({ 
  type, 
  props, 
  renderComponent 
}: { 
  type: string
  props: Record<string, any>
  renderComponent: (type: string, props: Record<string, any>) => Promise<React.ReactNode>
}) {
  const [component, setComponent] = useState<React.ReactNode>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)
        const rendered = await renderComponent(type, props)
        setComponent(rendered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render component')
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [type, props, renderComponent])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        Error rendering {type}: {error}
      </div>
    )
  }

  return <>{component}</>
}

export function PageCanvas({ 
  blocks, 
  onBlocksChange, 
  onBlockEdit, 
  renderComponent 
}: PageCanvasProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order indices
    const updatedBlocks = items.map((block, index) => ({
      ...block,
      order: index
    }))

    onBlocksChange(updatedBlocks)
  }

  const handleDeleteBlock = (blockId: string) => {
    if (confirm('Are you sure you want to delete this block?')) {
      const updatedBlocks = blocks
        .filter(block => block.id !== blockId)
        .map((block, index) => ({ ...block, order: index }))
      onBlocksChange(updatedBlocks)
      if (selectedBlockId === blockId) {
        setSelectedBlockId(null)
      }
    }
  }

  const handleToggleVisibility = (blockId: string) => {
    const updatedBlocks = blocks.map(block =>
      block.id === blockId 
        ? { ...block, isVisible: !block.isVisible }
        : block
    )
    onBlocksChange(updatedBlocks)
  }

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(block => block.id === blockId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= blocks.length) return

    const items = Array.from(blocks)
    const [movedItem] = items.splice(currentIndex, 1)
    items.splice(newIndex, 0, movedItem)

    const updatedBlocks = items.map((block, index) => ({
      ...block,
      order: index
    }))

    onBlocksChange(updatedBlocks)
  }

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Page Content</h3>
        <div className="text-sm text-gray-600">
          {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable 
          droppableId="page-canvas"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
          mode="standard"
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "min-h-96 border-2 border-dashed rounded-lg p-4 transition-colors",
                snapshot.isDraggingOver 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-gray-300"
              )}
            >
              {sortedBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Start Building Your Page
                  </h4>
                  <p className="text-gray-600">
                    Drag components from the palette on the left to build your page
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedBlocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "relative group",
                            snapshot.isDragging && "opacity-50",
                            selectedBlockId === block.id && "ring-2 ring-blue-500 ring-offset-2",
                            !block.isVisible && "opacity-60"
                          )}
                          onClick={() => setSelectedBlockId(block.id)}
                        >
                          {/* Block Controls */}
                          <div className="absolute -top-2 left-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center bg-white border rounded-md shadow-sm">
                              <div
                                {...provided.dragHandleProps}
                                className="p-1 hover:bg-gray-100 cursor-grab active:cursor-grabbing"
                              >
                                <Grip className="h-4 w-4 text-gray-400" />
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onBlockEdit(block)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleVisibility(block.id)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                {block.isVisible ? 
                                  <Eye className="h-3 w-3" /> : 
                                  <EyeOff className="h-3 w-3" />
                                }
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMoveBlock(block.id, 'up')
                                }}
                                disabled={index === 0}
                                className="h-8 w-8 p-0"
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMoveBlock(block.id, 'down')
                                }}
                                disabled={index === sortedBlocks.length - 1}
                                className="h-8 w-8 p-0"
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteBlock(block.id)
                                }}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Block Content */}
                          <Card className={cn(
                            "transition-all duration-200",
                            selectedBlockId === block.id && "shadow-lg",
                            !block.isVisible && "bg-gray-100"
                          )}>
                            <CardContent className="p-4">
                              <div className="mb-2 text-xs text-gray-500 font-medium">
                                {block.type}
                                {!block.isVisible && ' (Hidden)'}
                              </div>
                              <div className="pointer-events-none">
                                <AsyncComponentRenderer
                                  type={block.type}
                                  props={block.props}
                                  renderComponent={renderComponent}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
