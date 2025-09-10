"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Grid, Layout, Plus, Edit, Settings } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Dndarea: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dropZones, setDropZones] = useState<{ [key: string]: string[] }>({
    'hvac-zone': ['Temperature Control', 'Air Quality'],
    'plumbing-zone': ['Water Systems', 'Drainage'],
    'emergency-zone': []
  })
  const [isDragOver, setIsDragOver] = useState<string | null>(null)
  const dragCounter = useRef(0)

  const serviceItems = [
    { id: 'heating', name: 'Heating Systems', icon: Grid, category: 'hvac' },
    { id: 'cooling', name: 'Cooling Solutions', icon: Layout, category: 'hvac' },
    { id: 'pipes', name: 'Pipe Installation', icon: Settings, category: 'plumbing' },
    { id: 'repairs', name: 'Emergency Repairs', icon: Edit, category: 'emergency' },
    { id: 'maintenance', name: 'Maintenance Plans', icon: Move, category: 'hvac' },
    { id: 'inspection', name: 'System Inspection', icon: Plus, category: 'plumbing' }
  ]

  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', itemId)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
    dragCounter.current++
    setIsDragOver(zoneId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragOver(null)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
    dragCounter.current = 0
    setIsDragOver(null)
    
    const itemId = e.dataTransfer.getData('text/plain')
    const item = serviceItems.find(item => item.id === itemId)
    
    if (item && draggedItem) {
      setDropZones(prev => ({
        ...prev,
        [zoneId]: [...prev[zoneId], item.name]
      }))
    }
    
    setDraggedItem(null)
  }, [draggedItem, serviceItems])

  const removeFromZone = useCallback((zoneId: string, itemIndex: number) => {
    setDropZones(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter((_, index) => index !== itemIndex)
    }))
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-theme-primary-50 via-white to-theme-gray-50 p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Service Planning Hub
          </h1>
          <p className="text-xl md:text-2xl text-theme-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Drag and drop services to organize your HVAC and plumbing project requirements. Our professional team will customize solutions based on your specific needs and local expertise.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-semibold">24/7 Emergency Service Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-theme-gray-900 mb-6 flex items-center">
              <Grid className="w-6 h-6 mr-3 text-theme-primary-500" />
              Available Services
            </h3>
            <div className="space-y-4">
              {serviceItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className={`p-4 rounded-xl border-2 cursor-move transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    item.category === 'hvac' 
                      ? 'bg-gradient-to-r from-theme-primary-100 to-theme-primary-50 border-theme-primary-200 hover:border-theme-primary-300' 
                      : item.category === 'plumbing'
                      ? 'bg-gradient-to-r from-amber-100 to-orange-50 border-amber-200 hover:border-amber-300'
                      : 'bg-gradient-to-r from-red-100 to-orange-50 border-red-200 hover:border-red-300'
                  } ${draggedItem === item.id ? 'opacity-50 scale-95' : ''}`}
                  role="button"
                  aria-label={`Drag ${item.name} service`}
                >
                  <div className="flex items-center">
                    <item.icon className={`w-5 h-5 mr-3 ${
                      item.category === 'hvac' ? 'text-theme-primary-600' : 
                      item.category === 'plumbing' ? 'text-amber-600' : 'text-red-600'
                    }`} />
                    <span className="font-semibold text-theme-gray-800">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, 'hvac-zone')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'hvac-zone')}
              className={`p-6 rounded-2xl border-3 border-dashed min-h-80 transition-all duration-300 ${
                isDragOver === 'hvac-zone'
                  ? 'border-theme-primary-400 bg-theme-primary-50 shadow-xl scale-105'
                  : 'border-theme-primary-200 bg-gradient-to-br from-theme-primary-50 to-white hover:border-theme-primary-300 hover:shadow-lg'
              }`}
              role="region"
              aria-label="HVAC Services Drop Zone"
            >
              <div className="flex items-center mb-6">
                <Layout className="w-7 h-7 mr-3 text-theme-primary-600" />
                <h4 className="text-xl font-bold text-theme-gray-900">HVAC Services</h4>
              </div>
              <div className="space-y-3">
                {dropZones['hvac-zone'].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-theme-primary-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-theme-gray-800 font-medium">{item}</span>
                    <button
                      onClick={() => removeFromZone('hvac-zone', index)}
                      className="text-theme-primary-500 hover:text-theme-primary-700 transition-colors duration-200"
                      aria-label={`Remove ${item}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {dropZones['hvac-zone'].length === 0 && (
                  <p className="text-theme-gray-500 text-center py-8 italic">
                    Drop HVAC services here to build your cooling and heating solution
                  </p>
                )}
              </div>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, 'plumbing-zone')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'plumbing-zone')}
              className={`p-6 rounded-2xl border-3 border-dashed min-h-80 transition-all duration-300 ${
                isDragOver === 'plumbing-zone'
                  ? 'border-amber-400 bg-amber-50 shadow-xl scale-105'
                  : 'border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-300 hover:shadow-lg'
              }`}
              role="region"
              aria-label="Plumbing Services Drop Zone"
            >
              <div className="flex items-center mb-6">
                <Settings className="w-7 h-7 mr-3 text-amber-600" />
                <h4 className="text-xl font-bold text-theme-gray-900">Plumbing Services</h4>
              </div>
              <div className="space-y-3">
                {dropZones['plumbing-zone'].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-theme-gray-800 font-medium">{item}</span>
                    <button
                      onClick={() => removeFromZone('plumbing-zone', index)}
                      className="text-amber-500 hover:text-amber-700 transition-colors duration-200"
                      aria-label={`Remove ${item}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {dropZones['plumbing-zone'].length === 0 && (
                  <p className="text-theme-gray-500 text-center py-8 italic">
                    Drop plumbing services here to plan your water system needs
                  </p>
                )}
              </div>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, 'emergency-zone')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'emergency-zone')}
              className={`p-6 rounded-2xl border-3 border-dashed min-h-80 transition-all duration-300 ${
                isDragOver === 'emergency-zone'
                  ? 'border-red-400 bg-red-50 shadow-xl scale-105'
                  : 'border-red-200 bg-gradient-to-br from-red-50 to-white hover:border-red-300 hover:shadow-lg'
              }`}
              role="region"
              aria-label="Emergency Services Drop Zone"
            >
              <div className="flex items-center mb-6">
                <Move className="w-7 h-7 mr-3 text-red-600" />
                <h4 className="text-xl font-bold text-theme-gray-900">Priority Services</h4>
              </div>
              <div className="space-y-3">
                {dropZones['emergency-zone'].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-red-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-theme-gray-800 font-medium">{item}</span>
                    <button
                      onClick={() => removeFromZone('emergency-zone', index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      aria-label={`Remove ${item}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {dropZones['emergency-zone'].length === 0 && (
                  <p className="text-theme-gray-500 text-center py-8 italic">
                    Drop urgent services here for immediate attention and priority scheduling
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              const totalServices = Object.values(dropZones).flat().length
              if (totalServices > 0) {
                alert(`Great! You've planned ${totalServices} services. Our team will contact you within 24 hours to discuss your project.`)
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 hover:from-theme-primary-700 hover:to-theme-primary-800 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            aria-label="Get professional quote for selected services"
          >
            <Plus className="w-6 h-6 mr-3" />
            Get Professional Quote
          </button>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Service Planning Drag & Drop Area',
  description: 'Interactive drag and drop interface for organizing HVAC and plumbing services with professional styling and emergency service highlighting',
  category: 'content-blocks',
  icon: 'Grid'
}


export default Dndarea;