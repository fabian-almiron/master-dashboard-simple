'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  getCurrentSite, 
  getNavigationItems, 
  createNavigationItem, 
  updateNavigationItem, 
  deleteNavigationItem,
  reorderNavigationItems,
  getPagesBySite 
} from '@/lib/cms-data'
import { NavigationItem, Page } from '@/lib/supabase'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Grip, 
  Eye, 
  EyeOff,
  ExternalLink,
  FileText,
  X,
  Save
} from 'lucide-react'

interface NavigationFormData {
  label: string
  type: 'internal' | 'external'
  href: string
  page_id: string
  is_visible: boolean
}

export default function NavigationPage() {
  const [navItems, setNavItems] = useState<NavigationItem[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<NavigationFormData>({
    label: '',
    type: 'internal',
    href: '',
    page_id: '',
    is_visible: true,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const site = await getCurrentSite()
      if (site) {
        const [navigationData, pagesData] = await Promise.all([
          getNavigationItems(site.id),
          getPagesBySite(site.id)
        ])

        setNavItems(navigationData)
        setPages(pagesData)
      }
    } catch (error) {
      console.error('Error loading navigation data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(navItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately
    setNavItems(items)

    // Update order indices in database
    const site = await getCurrentSite()
    if (site) {
      const orderUpdates = items.map((item, index) => ({
        id: item.id,
        order_index: index
      }))
      await reorderNavigationItems(site.id, orderUpdates)
    }
  }

  const resetForm = () => {
    setFormData({
      label: '',
      type: 'internal',
      href: '',
      page_id: '',
      is_visible: true,
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const site = await getCurrentSite()
    if (!site) return

    try {
      if (editingItem) {
        // Update existing item
        const updatedItem = await updateNavigationItem(editingItem.id, {
          label: formData.label,
          type: formData.type,
          href: formData.type === 'external' ? formData.href : undefined,
          page_id: formData.type === 'internal' ? formData.page_id : undefined,
          is_visible: formData.is_visible,
        })
        
        if (updatedItem) {
          setNavItems(navItems.map(item => 
            item.id === editingItem.id ? updatedItem : item
          ))
        }
      } else {
        // Create new item
        const newItem = await createNavigationItem({
          site_id: site.id,
          label: formData.label,
          type: formData.type,
          href: formData.type === 'external' ? formData.href : undefined,
          page_id: formData.type === 'internal' ? formData.page_id : undefined,
          order_index: navItems.length,
          is_visible: formData.is_visible,
        })
        
        if (newItem) {
          setNavItems([...navItems, newItem])
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving navigation item:', error)
      alert('Failed to save navigation item. Please try again.')
    }
  }

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item)
    setFormData({
      label: item.label,
      type: item.type,
      href: item.href || '',
      page_id: item.page_id || '',
      is_visible: item.is_visible,
    })
    setShowForm(true)
  }

  const handleDelete = async (itemId: string, label: string) => {
    if (confirm(`Are you sure you want to delete "${label}"?`)) {
      const success = await deleteNavigationItem(itemId)
      if (success) {
        setNavItems(navItems.filter(item => item.id !== itemId))
      } else {
        alert('Failed to delete navigation item. Please try again.')
      }
    }
  }

  const handleToggleVisibility = async (item: NavigationItem) => {
    const updatedItem = await updateNavigationItem(item.id, {
      is_visible: !item.is_visible
    })
    
    if (updatedItem) {
      setNavItems(navItems.map(navItem => 
        navItem.id === item.id ? updatedItem : navItem
      ))
    }
  }

  const getPageTitle = (pageId: string) => {
    const page = pages.find(p => p.id === pageId)
    return page ? page.title : 'Unknown Page'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-600">Manage your site's navigation menu.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Navigation Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable 
                droppableId="navigation" 
                isDropDisabled={false} 
                isCombineEnabled={false}
                ignoreContainerClipping={false}
                mode="standard"
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`nav-builder-container ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                  >
                    {navItems.length === 0 ? (
                      <div className="nav-empty-state">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>No menu items yet</p>
                        <p>Add your first menu item to get started</p>
                      </div>
                    ) : (
                      navItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`nav-item-card ${snapshot.isDragging ? 'dragging' : ''} ${!item.is_visible ? 'hidden' : ''}`}
                            >
                              <div className="nav-item-content">
                                <div
                                  {...provided.dragHandleProps}
                                  className="nav-drag-handle"
                                >
                                  <Grip className="h-4 w-4" />
                                </div>
                                
                                <div className="nav-item-text">
                                  <div className="flex items-center gap-2">
                                    <h4 className="nav-item-title">
                                      {item.label}
                                    </h4>
                                    {item.type === 'external' && (
                                      <ExternalLink className="h-3 w-3" style={{ color: '#94a3b8', opacity: '0.8' }} />
                                    )}
                                  </div>
                                  <p className="nav-item-description">
                                    {item.type === 'internal' 
                                      ? `Page: ${getPageTitle(item.page_id || '')}`
                                      : `URL: ${item.href}`
                                    }
                                  </p>
                                </div>
                              </div>
                              
                              <div className="nav-item-actions">
                                <button
                                  className="nav-action-btn"
                                  onClick={() => handleToggleVisibility(item)}
                                  title={item.is_visible ? 'Hide from navigation' : 'Show in navigation'}
                                >
                                  {item.is_visible ? 
                                    <Eye className="h-3 w-3" /> : 
                                    <EyeOff className="h-3 w-3" />
                                  }
                                </button>
                                
                                <button
                                  className="nav-action-btn"
                                  onClick={() => handleEdit(item)}
                                  title="Edit navigation item"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                
                                <button
                                  className="nav-action-btn delete"
                                  onClick={() => handleDelete(item.id, item.label)}
                                  title="Delete navigation item"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                        ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>

        {/* Add/Edit Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="admin-field">
                  <label className="admin-label required">
                    Label
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className="admin-input"
                    placeholder="Menu item label"
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type: e.target.value as 'internal' | 'external',
                      href: '',
                      page_id: ''
                    })}
                    className="admin-select"
                  >
                    <option value="internal">Internal Page</option>
                    <option value="external">External URL</option>
                  </select>
                </div>

                {formData.type === 'internal' ? (
                  <div className="admin-field">
                    <label className="admin-label required">
                      Page
                    </label>
                    <select
                      required
                      value={formData.page_id}
                      onChange={(e) => setFormData({ ...formData, page_id: e.target.value })}
                      className="admin-select"
                    >
                      <option value="">Select a page</option>
                      {pages.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.title} (/{page.slug})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="admin-field">
                    <label className="admin-label required">
                      URL
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.href}
                      onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                      className="admin-input"
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_visible"
                    checked={formData.is_visible}
                    onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_visible" className="ml-2 block text-sm text-gray-300">
                    Visible in navigation
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? 'Update' : 'Add'} Item
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Preview */}
        {!showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Navigation Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  How it appears on your site:
                </div>
                <nav className="flex flex-wrap gap-4">
                  {navItems.filter(item => item.is_visible).map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-1 bg-white border rounded-md text-sm text-gray-700"
                    >
                      {item.label}
                      {item.type === 'external' && (
                        <ExternalLink className="inline h-3 w-3 ml-1" />
                      )}
                    </span>
                  ))}
                  {navItems.filter(item => item.is_visible).length === 0 && (
                    <span className="text-gray-500 text-sm">No visible menu items</span>
                  )}
                </nav>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
