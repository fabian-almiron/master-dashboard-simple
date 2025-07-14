'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export default function NewPagePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    isPublished: false
  })

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create new page object
      const newPage = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        status: formData.isPublished ? 'published' : 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Save to localStorage
      const existingPages = JSON.parse(localStorage.getItem('cms_pages') || '[]')
      const updatedPages = [newPage, ...existingPages]
      localStorage.setItem('cms_pages', JSON.stringify(updatedPages))
      
      console.log('Page created successfully:', newPage)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Redirect to page builder to start editing the new page
      router.push(`/admin/builder?page=${newPage.id}`)
    } catch (error) {
      console.error('Error creating page:', error)
      alert('Failed to create page. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pages
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Page</h1>
            <p className="text-muted-foreground mt-1">
              Set up your page details and start building
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Page Details</CardTitle>
                <CardDescription>
                  Configure the basic information for your new page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter page title..."
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be displayed in the browser tab and search results
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">yoursite.com/</span>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="page-url"
                        required
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Auto-generated from title, but you can customize it
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of this page..."
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">
                      Used for SEO meta description and internal reference
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label htmlFor="published">Publish Immediately</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this page visible to visitors right away
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isPublished: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button type="submit" disabled={isLoading || !formData.title.trim()}>
                      {isLoading ? (
                        <>Creating...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create & Build Page
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/admin/pages">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Create Page</div>
                    <div className="text-sm text-muted-foreground">
                      Fill out the form and create your page
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Design Layout</div>
                    <div className="text-sm text-muted-foreground">
                      Use the page builder to add components
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Publish</div>
                    <div className="text-sm text-muted-foreground">
                      Make your page live for visitors
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>SEO-friendly URLs:</strong> Keep slugs short, descriptive, and use hyphens instead of spaces
                </div>
                <div>
                  <strong>Page Titles:</strong> Make them clear and descriptive for better search rankings
                </div>
                <div>
                  <strong>Drafts:</strong> Start as a draft to build your page before publishing
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 