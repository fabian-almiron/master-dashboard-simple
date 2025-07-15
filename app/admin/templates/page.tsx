'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Layout, 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  Star,
  Navigation,
  PanelBottom,
  FileText,
  BookOpen,
  Eye,
  Search
} from 'lucide-react'
import { Template, TemplateType } from '@/lib/cms-types'

const templateTypeConfig = {
  header: {
    icon: Navigation,
    label: 'Header',
    description: 'Header sections and navigation',
    color: 'bg-blue-500'
  },
  footer: {
    icon: PanelBottom, 
    label: 'Footer',
    description: 'Footer sections and links',
    color: 'bg-green-500'
  },
  page: {
    icon: FileText,
    label: 'Page',
    description: 'Full page layouts',
    color: 'bg-purple-500'
  },
  post: {
    icon: BookOpen,
    label: 'Post',
    description: 'Blog post layouts',
    color: 'bg-orange-500'
  }
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [activeTab, setActiveTab] = useState<TemplateType>('page')
  const [searchTerm, setSearchTerm] = useState('')

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('cms-templates')
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates))
    } else {
      // Initialize with some default templates
      const defaultTemplates: Template[] = [
        {
          id: '1',
          name: 'Default Header',
          type: 'header',
          description: 'Standard navigation header',
          blocks: [],
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2', 
          name: 'Default Footer',
          type: 'footer',
          description: 'Standard footer with links',
          blocks: [],
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Landing Page',
          type: 'page',
          description: 'Hero + Features + CTA layout',
          blocks: [],
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Blog Post',
          type: 'post', 
          description: 'Article layout with sidebar',
          blocks: [],
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setTemplates(defaultTemplates)
      localStorage.setItem('cms-templates', JSON.stringify(defaultTemplates))
    }
  }, [])

  // Save templates to localStorage
  const saveTemplates = (newTemplates: Template[]) => {
    setTemplates(newTemplates)
    localStorage.setItem('cms-templates', JSON.stringify(newTemplates))
  }

  // Filter templates by type and search
  const filteredTemplates = templates.filter(template => 
    template.type === activeTab &&
    (template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     template.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Get template stats
  const getTemplateStats = () => {
    return {
      total: templates.length,
      header: templates.filter(t => t.type === 'header').length,
      footer: templates.filter(t => t.type === 'footer').length,
      page: templates.filter(t => t.type === 'page').length,
      post: templates.filter(t => t.type === 'post').length,
      default: templates.filter(t => t.isDefault).length
    }
  }

  const stats = getTemplateStats()

  // Delete template
  const deleteTemplate = (templateId: string) => {
    const newTemplates = templates.filter(t => t.id !== templateId)
    saveTemplates(newTemplates)
  }

  // Duplicate template
  const duplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveTemplates([...templates, newTemplate])
  }

  // Set as default template
  const setAsDefault = (templateId: string, type: TemplateType) => {
    const newTemplates = templates.map(template => {
      if (template.type === type) {
        return { ...template, isDefault: template.id === templateId }
      }
      return template
    })
    saveTemplates(newTemplates)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Layout className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground mt-1">
              Manage page templates and layouts
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Templates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{stats.header}</div>
              <div className="text-sm text-muted-foreground">Headers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{stats.footer}</div>
              <div className="text-sm text-muted-foreground">Footers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">{stats.page}</div>
              <div className="text-sm text-muted-foreground">Pages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500">{stats.post}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button asChild className="lg:w-auto">
            <Link href="/admin/templates/new">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Link>
          </Button>
        </div>

        {/* Template Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TemplateType)}>
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(templateTypeConfig).map(([type, config]) => {
              const Icon = config.icon
              return (
                <TabsTrigger key={type} value={type} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{config.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {Object.entries(templateTypeConfig).map(([type, config]) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <config.icon className="h-5 w-5" />
                  {config.label} Templates
                </h3>
                <p className="text-muted-foreground text-sm">{config.description}</p>
              </div>

              {filteredTemplates.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <config.icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No {config.label} Templates</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first {config.label.toLowerCase()} template to get started.
                    </p>
                    <Button asChild>
                      <Link href="/admin/templates/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create {config.label} Template
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            {template.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        {template.description && (
                          <CardDescription className="text-sm">
                            {template.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-4">
                          {template.blocks.length} components • Created {new Date(template.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => duplicateTemplate(template)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!template.isDefault && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteTemplate(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        {!template.isDefault && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="w-full mt-2"
                            onClick={() => setAsDefault(template.id, template.type)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Set as Default
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Coming Soon Notice */}
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Template Builder Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-sm lg:text-base">
              Visual template builder with drag-and-drop components is in development. 
              For now, templates are managed through the page builder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 