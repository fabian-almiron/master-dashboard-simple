'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentSite, getTemplatesBySite, deleteTemplate } from '@/lib/cms-data'
import { formatDateTime } from '@/lib/utils'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Layout,
  Navigation as HeaderIcon,
  FileText,
  Layers
} from 'lucide-react'
import { Template } from '@/lib/supabase'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'header' | 'footer' | 'page'>('all')

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      const site = await getCurrentSite()
      if (site) {
        const templatesData = await getTemplatesBySite(site.id)
        setTemplates(templatesData)
      }
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTemplate = async (templateId: string, templateName: string) => {
    if (confirm(`Are you sure you want to delete "${templateName}"? This action cannot be undone.`)) {
      const success = await deleteTemplate(templateId)
      if (success) {
        setTemplates(templates.filter(template => template.id !== templateId))
      } else {
        alert('Failed to delete template. Please try again.')
      }
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || template.type === typeFilter
    return matchesSearch && matchesType
  })

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'header':
        return HeaderIcon
      case 'footer':
        return Layers
      case 'page':
        return FileText
      default:
        return Layout
    }
  }

  const getTemplateColor = (type: string) => {
    switch (type) {
      case 'header':
        return 'bg-blue-100 text-blue-800'
      case 'footer':
        return 'bg-green-100 text-green-800'
      case 'page':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600">Manage your site's reusable templates.</p>
        </div>
        <Button asChild>
          <Link href="/admin/templates/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      {/* Template Type Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HeaderIcon className="h-4 w-4 text-blue-600" />
              Header Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.type === 'header').length}
            </div>
            <p className="text-xs text-gray-600">Site navigation headers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4 text-green-600" />
              Footer Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.type === 'footer').length}
            </div>
            <p className="text-xs text-gray-600">Site footer layouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              Page Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.type === 'page').length}
            </div>
            <p className="text-xs text-gray-600">Page layout templates</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'header' | 'footer' | 'page')}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="header">Header</option>
                <option value="footer">Footer</option>
                <option value="page">Page</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'Template' : 'Templates'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || typeFilter !== 'all' ? 'No templates found' : 'No templates yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || typeFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first template to get started'
                }
              </p>
              {!searchTerm && typeFilter === 'all' && (
                <Button asChild>
                  <Link href="/admin/templates/new">Create your first template</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTemplates.map((template) => {
                const Icon = getTemplateIcon(template.type)
                return (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{template.name}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTemplateColor(template.type)}`}>
                            {template.type}
                          </span>
                          {template.is_default && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Theme: {template.theme_id}</span>
                          <span>•</span>
                          <span>Created {formatDateTime(template.created_at)}</span>
                          <span>•</span>
                          <span>Modified {formatDateTime(template.updated_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/templates/${template.id}/preview`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/templates/${template.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id, template.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
