"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Grid, Layout, Plus, Edit, Settings, Move } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const DndArea: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [items, setItems] = useState([
    { id: '1', type: 'text', content: 'Premium Content Block', position: { x: 50, y: 50 } },
    { id: '2', type: 'image', content: 'Luxury Image Gallery', position: { x: 200, y: 120 } },
    { id: '3', type: 'form', content: 'Elegant Contact Form', position: { x: 100, y: 200 } }
  ])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setIsDragging(true)
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', itemId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setDraggedItem(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const itemId = e.dataTransfer.getData('text/plain')

    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, position: { x: Math.max(0, x - 75), y: Math.max(0, y - 25) } }
        : item
    ))
    setIsDragging(false)
    setDraggedItem(null)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const addNewItem = useCallback(() => {
    const newItem = {
      id: Date.now().toString(),
      type: 'new',
      content: 'New Luxury Element',
      position: { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 }
    }
    setItems(prev => [...prev, newItem])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif text-stone-800 mb-4 tracking-tight">
            Luxury Design Studio
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            Craft sophisticated layouts with our premium drag-and-drop interface
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 p-6">
            <div className="flex items-center gap-6">
              <button
                onClick={addNewItem}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Element</span>
              </button>
              
              <div className="flex items-center gap-3 text-stone-600">
                <Grid className="w-5 h-5 text-amber-600" />
                <span className="font-medium">Grid View</span>
              </div>
              
              <div className="flex items-center gap-3 text-stone-600">
                <Layout className="w-5 h-5 text-amber-600" />
                <span className="font-medium">Layout</span>
              </div>
              
              <div className="flex items-center gap-3 text-stone-600">
                <Settings className="w-5 h-5 text-amber-600" />
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div 
          ref={containerRef}
          className={`relative min-h-[600px] bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-amber-400 bg-amber-50/50 shadow-2xl' 
              : 'border-stone-300 hover:border-amber-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* Drop Zone Indicator */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-amber-100/90 backdrop-blur-sm border-2 border-amber-400 rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <Move className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <p className="text-xl font-serif text-amber-800">Drop your element here</p>
                  <p className="text-amber-700 font-light">Position it anywhere on the canvas</p>
                </div>
              </div>
            </div>
          )}

          {/* Draggable Items */}
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              className={`absolute cursor-move group transition-all duration-300 ${
                draggedItem === item.id ? 'opacity-50 scale-95' : 'hover:scale-105'
              }`}
              style={{
                left: item.position.x,
                top: item.position.y,
                transform: draggedItem === item.id ? 'rotate(5deg)' : 'rotate(0deg)'
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 p-6 min-w-[200px] hover:shadow-2xl transition-all duration-300 group-hover:border-amber-400/70">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {item.type === 'text' && <Edit className="w-4 h-4 text-amber-600" />}
                    {item.type === 'image' && <Layout className="w-4 h-4 text-amber-600" />}
                    {item.type === 'form' && <Grid className="w-4 h-4 text-amber-600" />}
                    {item.type === 'new' && <Plus className="w-4 h-4 text-amber-600" />}
                    <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <Move className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="font-serif text-lg text-stone-800 mb-2">
                  {item.content}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Premium Component</span>
                </div>
                
                {/* Luxury accent line */}
                <div className="mt-4 h-0.5 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full"></div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {items.length === 0 && !isDragging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Layout className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-2xl font-serif text-stone-700 mb-3">
                  Your Canvas Awaits
                </h3>
                <p className="text-stone-500 font-light leading-relaxed">
                  Begin crafting your luxury experience by adding premium elements to the canvas
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="mt-8 flex justify-between items-center text-sm text-stone-500">
          <div className="flex items-center gap-4">
            <span>Elements: {items.length}</span>
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span>Canvas: Active</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Auto-save enabled</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Luxury Drag & Drop Canvas',
  description: 'Sophisticated drag-and-drop interface with premium styling and elegant interactions',
  category: 'layout',
  icon: 'Move'
}

export default DndArea;
