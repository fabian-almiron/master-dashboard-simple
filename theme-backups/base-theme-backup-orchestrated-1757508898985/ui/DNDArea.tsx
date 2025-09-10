"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Grid, Layout, Plus, Edit, Settings } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Dndarea: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dropZones, setDropZones] = useState([
    { id: 'zone-1', items: ['item-1', 'item-2'], title: 'Active Projects', color: 'from-blue-50 to-indigo-50' },
    { id: 'zone-2', items: ['item-3'], title: 'In Review', color: 'from-yellow-50 to-orange-50' },
    { id: 'zone-3', items: [], title: 'Completed', color: 'from-green-50 to-emerald-50' }
  ])
  const [isGridView, setIsGridView] = useState(true)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const dragCounter = useRef(0)

  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', itemId)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetZoneId: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('text/plain')
    
    if (itemId && draggedItem) {
      setDropZones(prev => {
        const newZones = prev.map(zone => ({
          ...zone,
          items: zone.items.filter(item => item !== itemId)
        }))
        
        const targetZone = newZones.find(zone => zone.id === targetZoneId)
        if (targetZone && !targetZone.items.includes(itemId)) {
          targetZone.items.push(itemId)
        }
        
        return newZones
      })
    }
    
    setDraggedItem(null)
    setHoveredZone(null)
    dragCounter.current = 0
  }, [draggedItem])

  const handleDragEnter = useCallback((e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
    dragCounter.current++
    setHoveredZone(zoneId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setHoveredZone(null)
    }
  }, [])

  const getItemContent = (itemId: string) => {
    const items = {
      'item-1': { title: 'Enterprise Website Redesign', type: 'Design', priority: 'High', progress: 75, assignee: 'Sarah Chen' },
      'item-2': { title: 'Mobile App Development', type: 'Development', priority: 'Medium', progress: 45, assignee: 'Marcus Johnson' },
      'item-3': { title: 'Brand Guidelines Update', type: 'Strategy', priority: 'Low', progress: 90, assignee: 'Elena Rodriguez' }
    }
    return items[itemId as keyof typeof items] || { title: 'Unknown Item', type: 'General', priority: 'Low', progress: 0, assignee: 'Unassigned' }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-theme-gray-100 text-theme-gray-800 border-theme-gray-200'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-theme-primary-500'
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-gray-50 to-theme-primary-50 p-6 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-gray-900 mb-3 bg-gradient-to-r from-theme-primary-600 to-theme-primary-800 bg-clip-text text-transparent">
                Project Management Hub
              </h1>
              <p className="text-lg sm:text-xl text-theme-gray-700 leading-relaxed max-w-2xl">
                Organize your workflow with our intuitive drag-and-drop interface. Move projects seamlessly between stages and maintain complete visibility over your professional pipeline with real-time progress tracking and team collaboration features.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-theme-gray-200 rounded-lg hover:bg-theme-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Toggle view mode"
              >
                {isGridView ? <Layout className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                <span className="text-sm font-medium text-theme-gray-700">
                  {isGridView ? 'List View' : 'Grid View'}
                </span>
              </button>
              
              <button
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-lg hover:from-theme-primary-600 hover:to-theme-primary-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label="Add new project"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Project</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 overflow-hidden hover:shadow-lg ${
                hoveredZone === zone.id && draggedItem 
                  ? 'border-theme-primary-400 shadow-lg scale-105' 
                  : 'border-theme-gray-200 hover:border-theme-primary-200'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              onDragEnter={(e) => handleDragEnter(e, zone.id)}
              onDragLeave={handleDragLeave}
            >
              <div className={`p-4 sm:p-6 border-b border-theme-gray-100 bg-gradient-to-r ${zone.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-theme-gray-900">{zone.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-theme-gray-600 bg-white px-3 py-1 rounded-full font-medium shadow-sm">
                      {zone.items.length}
                    </span>
                    <Settings className="w-4 h-4 text-theme-gray-400 hover:text-theme-gray-600 cursor-pointer transition-colors hover:rotate-90 duration-300" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 min-h-[300px] space-y-4">
                {zone.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-theme-gray-100 to-theme-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                      <Plus className="w-8 h-8 text-theme-gray-400" />
                    </div>
                    <p className="text-sm text-theme-gray-500 font-medium">Drop items here or add new ones</p>
                    <p className="text-xs text-theme-gray-400 mt-1">Drag projects from other columns to organize your workflow</p>
                  </div>
                ) : (
                  zone.items.map((itemId) => {
                    const item = getItemContent(itemId)
                    return (
                      <div
                        key={itemId}
                        draggable
                        onDragStart={(e) => handleDragStart(e, itemId)}
                        className={`p-4 bg-white border border-theme-gray-200 rounded-lg cursor-move hover:shadow-lg transition-all duration-300 group backdrop-blur-sm ${
                          draggedItem === itemId ? 'opacity-50 scale-95 rotate-2' : 'hover:scale-102 hover:-translate-y-1'
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Drag ${item.title}`}
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-theme-gray-900 group-hover:text-theme-primary-600 transition-colors leading-tight">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Move className="w-4 h-4 text-theme-gray-400" />
                            <Edit className="w-4 h-4 text-theme-gray-400 hover:text-theme-primary-500 cursor-pointer" />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-theme-gray-600">Progress</span>
                            <span className="text-xs font-bold text-theme-gray-800">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-theme-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.progress)}`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-theme-gray-600 bg-theme-gray-100 px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded border ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                          <div className="text-xs text-theme-gray-500 font-medium">
                            {item.assignee}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 p-6 bg-white rounded-xl border border-theme-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-theme-gray-900 mb-2">Workflow Analytics Dashboard</h3>
              <p className="text-sm text-theme-gray-600">Real-time insights into your project progress and team productivity metrics</p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-theme-primary-600 to-theme-primary-800 bg-clip-text text-transparent">
                  {dropZones.reduce((acc, zone) => acc + zone.items.length, 0)}
                </div>
                <div className="text-xs text-theme-gray-500 font-medium">Total Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {dropZones.find(z => z.id === 'zone-3')?.items.length || 0}
                </div>
                <div className="text-xs text-theme-gray-500 font-medium">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {dropZones.find(z => z.id === 'zone-2')?.items.length || 0}
                </div>
                <div className="text-xs text-theme-gray-500 font-medium">In Review</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {dropZones.find(z => z.id === 'zone-1')?.items.length || 0}
                </div>
                <div className="text-xs text-theme-gray-500 font-medium">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Professional Drag & Drop Area',
  description: 'Advanced drag-and-drop project management interface with kanban-style workflow organization, progress tracking, and real-time analytics dashboard',
  category: 'content-blocks',
  icon: 'Grid'
}


export default Dndarea;