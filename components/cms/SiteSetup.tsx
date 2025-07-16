'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Database, Upload, Plus, CheckCircle, AlertCircle } from 'lucide-react'
import { getCurrentSite, createSite, SiteConfig } from '@/lib/site-config'
import { migrateFromLocalStorage } from '@/lib/cms-data'

interface SiteSetupProps {
  onSiteConfigured: (site: SiteConfig) => void
}

export default function SiteSetup({ onSiteConfigured }: SiteSetupProps) {
  const [currentSite, setCurrentSite] = useState<SiteConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isMigrating, setIsMigrating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [migrationResults, setMigrationResults] = useState<{ pages: number, templates: number, navigation: number } | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    owner_email: ''
  })

  // Check if user has existing localStorage data
  const [hasLocalStorageData, setHasLocalStorageData] = useState(false)

  useEffect(() => {
    const checkExistingSite = async () => {
      try {
        const site = await getCurrentSite()
        if (site) {
          setCurrentSite(site)
          onSiteConfigured(site)
        }
      } catch (error) {
        console.error('Error checking current site:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Check for existing localStorage data
    const checkLocalStorage = () => {
      const hasPages = !!localStorage.getItem('cms_pages')
      const hasTemplates = !!localStorage.getItem('cms-templates')
      const hasNavigation = !!localStorage.getItem('cms_navigation')
      setHasLocalStorageData(hasPages || hasTemplates || hasNavigation)
    }

    checkExistingSite()
    checkLocalStorage()
  }, [onSiteConfigured])

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const site = await createSite({
        name: formData.name,
        domain: formData.domain,
        owner_email: formData.owner_email
      })

      if (site) {
        setCurrentSite(site)
        onSiteConfigured(site)
      } else {
        alert('Failed to create site. Please try again.')
      }
    } catch (error) {
      console.error('Error creating site:', error)
      alert('Error creating site. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleMigrateData = async () => {
    setIsMigrating(true)

    try {
      const results = await migrateFromLocalStorage()
      setMigrationResults(results)
      
      // Clear localStorage after successful migration
      localStorage.removeItem('cms_pages')
      localStorage.removeItem('cms-templates')
      localStorage.removeItem('cms_navigation')
      
      setHasLocalStorageData(false)
      
    } catch (error) {
      console.error('Error migrating data:', error)
      alert('Error migrating data. Please try again.')
    } finally {
      setIsMigrating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Database className="h-8 w-8 animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Checking site configuration...</p>
        </div>
      </div>
    )
  }

  if (currentSite) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Site Configured
            </CardTitle>
            <CardDescription>
              Your site is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Site Name</Label>
              <p className="text-sm text-muted-foreground">{currentSite.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Domain</Label>
              <p className="text-sm text-muted-foreground">{currentSite.domain}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge variant={currentSite.isActive ? "default" : "secondary"}>
                {currentSite.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Migration Section */}
            {hasLocalStorageData && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <h4 className="font-medium">Migrate Local Data</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We found existing data in your browser. Migrate it to your database?
                  </p>
                  <Button 
                    onClick={handleMigrateData} 
                    disabled={isMigrating}
                    className="w-full"
                  >
                    {isMigrating ? 'Migrating...' : 'Migrate Data to Database'}
                  </Button>
                </div>
              </>
            )}

            {/* Migration Results */}
            {migrationResults && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Successfully migrated: {migrationResults.pages} pages, {migrationResults.templates} templates, {migrationResults.navigation} navigation items
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Setup Required
          </CardTitle>
          <CardDescription>
            Create your first site to start using the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {hasLocalStorageData && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We found existing data in your browser that will be migrated after site creation.
              </AlertDescription>
            </Alert>
          )}

          {!showCreateForm ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                To continue using the CMS with database storage, you need to create a site.
              </p>
              <Button 
                onClick={() => setShowCreateForm(true)} 
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Site
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  type="text"
                  placeholder="My Awesome Website"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="mysite.com"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Owner Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mysite.com"
                  value={formData.owner_email}
                  onChange={(e) => setFormData({ ...formData, owner_email: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isCreating}
                  className="flex-1"
                >
                  {isCreating ? 'Creating...' : 'Create Site'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 