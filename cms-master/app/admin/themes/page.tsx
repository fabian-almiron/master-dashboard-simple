'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Download, Eye, Check, Settings, RefreshCw, AlertTriangle, Search, FileSearch, Wrench, Layout, Database } from 'lucide-react'
import { getCurrentSite, setSiteSetting, getSiteSetting } from '@/lib/cms-data'
import { 
  getAvailableThemes, 
  updateKnownThemes,
  getThemeMetadata, 
  getThemeComponents, 
  validateTheme,
  clearThemeCache 
} from '@/lib/theme-loader'

interface ThemeInfo {
  id: string
  name: string
  description: string
  author: string
  version: string
  components: any[]
  preview?: string
  isActive?: boolean
  isValid?: boolean
  validationErrors?: string[]
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<ThemeInfo[]>([])
  const [activeTheme, setActiveTheme] = useState<string>('default')
  const [loading, setLoading] = useState(true)
  const [activatingTheme, setActivatingTheme] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [discoveringComponents, setDiscoveringComponents] = useState<string | null>(null)
  const [componentStats, setComponentStats] = useState<{[themeId: string]: any}>({})
  const [showComponentDiscovery, setShowComponentDiscovery] = useState(false)
  const [generatingTemplates, setGeneratingTemplates] = useState<string | null>(null)
  const [regeneratingTemplates, setRegeneratingTemplates] = useState(false)
  const [showTemplateGeneration, setShowTemplateGeneration] = useState(false)

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      setLoading(true)
      
      // Get current site
      const currentSite = await getCurrentSite()
      if (!currentSite) {
        console.error('No current site found')
        return
      }

      // Load active theme from database
      const activeThemeSetting = await getSiteSetting(currentSite.id, 'active_theme')
      const currentActiveTheme = activeThemeSetting?.value || 'base-theme'
      setActiveTheme(currentActiveTheme)
      
      // First, try to get discovered themes from server
      try {
        const response = await fetch('/api/discover-themes')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.themes) {
            updateKnownThemes(data.themes)
            console.log('🔍 Updated themes from server discovery:', data.themes)
          }
        }
      } catch (error) {
        console.warn('Failed to fetch themes from server, using known themes:', error)
      }
      
      // Get available themes (either from server discovery or known themes)
      const availableThemeIds = await getAvailableThemes()
      console.log('🔍 Available themes:', availableThemeIds)
      
      const availableThemes: ThemeInfo[] = []
      
      // Load metadata and components for each available theme
      for (const themeId of availableThemeIds) {
        try {
          console.log(`📦 Loading theme: ${themeId}`)
          
          // Get theme metadata
          const metadata = await getThemeMetadata(themeId)
          
          // Get theme components
          const components = await getThemeComponents(themeId)
          
          // Validate theme structure
          const validation = await validateTheme(themeId)
          
          const themeInfo: ThemeInfo = {
            id: themeId,
            name: metadata.name,
            description: metadata.description,
            author: metadata.author,
            version: metadata.version,
            components: components,
            isActive: currentActiveTheme === themeId,
            isValid: validation.valid,
            validationErrors: validation.errors
          }
          
          availableThemes.push(themeInfo)
          
          if (validation.valid) {
            console.log(`✅ Theme "${themeId}" loaded successfully with ${components.length} components`)
          } else {
            console.warn(`⚠️  Theme "${themeId}" has validation errors:`, validation.errors)
          }
          
        } catch (error) {
          console.error(`❌ Failed to load theme "${themeId}":`, error)
          
          // Add theme with error state
          availableThemes.push({
            id: themeId,
            name: themeId.charAt(0).toUpperCase() + themeId.slice(1),
            description: 'Failed to load theme',
            author: 'Unknown',
            version: '0.0.0',
            components: [],
            isActive: currentActiveTheme === themeId,
            isValid: false,
            validationErrors: [`Failed to load: ${error}`]
          })
        }
      }
      
      // Sort themes: valid first, then by name
      availableThemes.sort((a, b) => {
        if (a.isValid !== b.isValid) {
          return a.isValid ? -1 : 1
        }
        return a.name.localeCompare(b.name)
      })
      
      setThemes(availableThemes)
      console.log(`🎨 Loaded ${availableThemes.length} themes total`)
      
    } catch (error) {
      console.error('Error loading themes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActivateTheme = async (themeId: string) => {
    try {
      setActivatingTheme(themeId)
      
      // Check if theme is valid before activating
      const theme = themes.find(t => t.id === themeId)
      if (!theme?.isValid) {
        alert(`Cannot activate theme "${theme?.name}": Theme has validation errors. Please fix the issues first.`)
        return
      }
      
      // Ask user if they want to update existing pages
      const updatePages = confirm(
        `Do you want to update all existing pages to use the new theme's default templates (Header, Footer, Page Layout)?\n\n` +
        `Choose "OK" to automatically update all pages, or "Cancel" to only change the theme for new pages.`
      )
      
      // Use the new switch theme API
      const response = await fetch('/api/switch-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themeId,
          updateExistingPages: updatePages
        })
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to switch theme')
      }

      // Update local state
      setActiveTheme(themeId)
      setThemes(themes.map(theme => ({
        ...theme,
        isActive: theme.id === themeId
      })))
      
      let message = `Theme "${themes.find(t => t.id === themeId)?.name}" activated successfully! The page builder will now use the new theme components.`
      
      if (updatePages && data.updatedPages > 0) {
        message += `\n\n✅ Updated ${data.updatedPages} existing pages to use the new theme's templates.`
      }
      
      if (data.errors && data.errors.length > 0) {
        message += `\n\n⚠️ Some issues occurred:\n${data.errors.join('\n')}`
      }
      
      alert(message)
      
    } catch (error) {
      console.error('Error activating theme:', error)
      alert('Failed to activate theme. Please try again.')
    } finally {
      setActivatingTheme(null)
    }
  }

  const handleRefreshThemes = async () => {
    try {
      setRefreshing(true)
      clearThemeCache()
      await loadThemes()
    } catch (error) {
      console.error('Error refreshing themes:', error)
      alert('Failed to refresh themes. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleForceRefreshAndRegenerate = async () => {
    try {
      setRefreshing(true)
      
      // Clear all caches
      clearThemeCache()
      
      // Regenerate auto-register for all themes
      const regeneratePromises = themes.map(async (theme) => {
        try {
          const response = await fetch('/api/regenerate-components', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ themeId: theme.id, action: 'regenerate' })
          })
          const data = await response.json()
          if (data.success) {
            console.log(`✅ Regenerated ${theme.name}`)
          } else {
            console.warn(`⚠️ Failed to regenerate ${theme.name}:`, data.error)
          }
        } catch (error) {
          console.error(`❌ Error regenerating ${theme.name}:`, error)
        }
      })
      
      await Promise.all(regeneratePromises)
      
      // Reload themes
      await loadThemes()
      
      alert('✅ All themes have been refreshed and regenerated! The system should now be using the latest theme configurations.')
      
    } catch (error) {
      console.error('Error force refreshing themes:', error)
      alert('Failed to force refresh themes. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }

  const getCategoryCount = (components: any[], category: string) => {
    return components.filter(comp => comp.category === category).length
  }

  const handleDiscoverComponents = async (themeId: string) => {
    try {
      setDiscoveringComponents(themeId)
      
      // Get component stats
      const response = await fetch(`/api/regenerate-components?themeId=${themeId}`)
      const data = await response.json()
      
      if (data.success && data.stats) {
        setComponentStats(prev => ({
          ...prev,
          [themeId]: data.stats
        }))
        
        if (!showComponentDiscovery) {
          setShowComponentDiscovery(true)
        }
      } else {
        alert('Failed to discover components: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error discovering components:', error)
      alert('Failed to discover components. Please try again.')
    } finally {
      setDiscoveringComponents(null)
    }
  }

  const handleRegenerateAutoRegister = async (themeId: string) => {
    try {
      setDiscoveringComponents(themeId)
      
      const response = await fetch('/api/regenerate-components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themeId,
          action: 'regenerate'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`Successfully regenerated auto-register.tsx for "${themeId}"!\n\n${data.message}`)
        
        // Refresh themes to get updated component list
        await loadThemes()
        
        // Refresh component stats
        await handleDiscoverComponents(themeId)
      } else {
        alert('Failed to regenerate auto-register.tsx: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error regenerating auto-register:', error)
      alert('Failed to regenerate auto-register.tsx. Please try again.')
    } finally {
      setDiscoveringComponents(null)
    }
  }

  const handleGenerateTemplates = async (themeId: string) => {
    try {
      setGeneratingTemplates(themeId)
      
      const response = await fetch('/api/auto-generate-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themeId,
          action: 'generate'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`Successfully generated templates for "${themeId}"!\n\n${data.message}`)
      } else {
        alert('Failed to generate templates: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error generating templates:', error)
      alert('Failed to generate templates. Please try again.')
    } finally {
      setGeneratingTemplates(null)
    }
  }

  const handleGenerateAllTemplates = async () => {
    try {
      setGeneratingTemplates('all')
      
      const response = await fetch('/api/auto-generate-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate-all'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`Successfully processed all themes!\n\n${data.message}`)
      } else {
        alert('Template generation had issues: ' + (data.message || 'Some themes may have failed'))
      }
    } catch (error) {
      console.error('Error generating all templates:', error)
      alert('Failed to generate templates. Please try again.')
    } finally {
      setGeneratingTemplates(null)
    }
  }

  const handleRegenerateActiveThemeTemplates = async () => {
    if (!confirm('This will delete all existing templates for the active theme and create fresh ones. Continue?')) {
      return
    }
    
    try {
      setRegeneratingTemplates(true)
      
      const response = await fetch('/api/regenerate-theme-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forceRegenerate: true
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`Successfully regenerated templates for active theme: ${data.theme}\n\nCreated:\n- ${data.templatesCreated} templates\n- ${data.blocksCreated} blocks`)
      } else {
        alert(`Failed to regenerate templates: ${data.error}`)
      }
      
    } catch (error) {
      console.error('Error regenerating active theme templates:', error)
      alert('Failed to regenerate active theme templates')
    } finally {
      setRegeneratingTemplates(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 themes-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Themes</h1>
          <p className="text-gray-600">
            Manage and switch between different themes for your site. Themes are automatically discovered from the <code className="bg-gray-100 px-1 rounded">/themes</code> directory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefreshThemes}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Themes'}
          </Button>
          <Button 
            variant="outline"
            onClick={handleForceRefreshAndRegenerate}
            disabled={refreshing}
            className="flex items-center gap-2 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <Wrench className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Regenerating...' : 'Force Refresh & Regenerate'}
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Install Theme
          </Button>
        </div>
      </div>

      {/* Component Discovery */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Component Auto-Discovery
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComponentDiscovery(!showComponentDiscovery)}
            >
              {showComponentDiscovery ? 'Hide' : 'Show'} Discovery Panel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Automatically discover and register UI components in your themes. This system scans the theme's 
            <code className="bg-gray-100 px-1 rounded mx-1">/ui</code> directory and generates the 
            <code className="bg-gray-100 px-1 rounded mx-1">auto-register.tsx</code> file with all discovered components.
          </p>
          
          {showComponentDiscovery && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div key={`discovery-${theme.id}`} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{theme.name}</h4>
                      <span className="text-xs text-gray-500">ID: {theme.id}</span>
                    </div>
                    
                    {componentStats[theme.id] && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="font-medium text-blue-800">
                              {componentStats[theme.id].totalComponents}
                            </div>
                            <div className="text-blue-600">Total Found</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <div className="font-medium text-green-800">
                              {componentStats[theme.id].registrableComponents}
                            </div>
                            <div className="text-green-600">With Metadata</div>
                          </div>
                        </div>
                        
                        {componentStats[theme.id].errors && componentStats[theme.id].errors.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded p-2">
                            <div className="text-xs text-red-700">
                              {componentStats[theme.id].errors.join(', ')}
                            </div>
                          </div>
                        )}
                        
                        {componentStats[theme.id].components && componentStats[theme.id].components.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-700 mb-1">Components:</div>
                            <div className="flex flex-wrap gap-1">
                              {componentStats[theme.id].components.slice(0, 4).map((comp: any, idx: number) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                    comp.hasMetadata 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {comp.name}
                                  {comp.hasMetadata && <Check className="h-3 w-3 ml-1" />}
                                </span>
                              ))}
                              {componentStats[theme.id].components.length > 4 && (
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                                  +{componentStats[theme.id].components.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDiscoverComponents(theme.id)}
                        disabled={discoveringComponents === theme.id}
                        className="flex-1"
                      >
                        {discoveringComponents === theme.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                            Scanning...
                          </>
                        ) : (
                          <>
                            <FileSearch className="h-3 w-3 mr-1" />
                            Discover
                          </>
                        )}
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleRegenerateAutoRegister(theme.id)}
                        disabled={discoveringComponents === theme.id}
                        className="flex-1"
                      >
                        {discoveringComponents === theme.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <Wrench className="h-3 w-3 mr-1" />
                            Regenerate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">How It Works:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li><strong>Discover:</strong> Scans the theme's UI directory for component files (.tsx)</li>
                  <li><strong>Analyze:</strong> Checks each component for exported metadata</li>
                  <li><strong>Regenerate:</strong> Updates auto-register.tsx with all discovered components</li>
                  <li><strong>Auto-Import:</strong> Components are automatically available in the page builder</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Template Auto-Generation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Template Auto-Generation
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateGeneration(!showTemplateGeneration)}
              >
                {showTemplateGeneration ? 'Hide' : 'Show'} Template Panel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleGenerateAllTemplates}
                disabled={generatingTemplates === 'all'}
              >
                {generatingTemplates === 'all' ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Generating All...
                  </>
                ) : (
                  <>
                    <Database className="h-3 w-3 mr-1" />
                    Generate All
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRegenerateActiveThemeTemplates}
                disabled={regeneratingTemplates}
              >
                {regeneratingTemplates ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Regenerate Active Theme
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Automatically generate default templates (Header, Footer, Page) with theme components. Each theme gets templates with its own Header, Footer, and DNDArea components pre-configured.
          </p>
          
          {showTemplateGeneration && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div key={`template-${theme.id}`} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{theme.name}</h4>
                      <span className="text-xs text-gray-500">Theme: {theme.id}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs">
                        <div className="font-medium text-gray-700 mb-1">Required Components:</div>
                        <div className="flex flex-wrap gap-1">
                          {['Header', 'Footer', 'DNDArea'].map((reqComp) => {
                            const hasComponent = theme.components.some(c => c.type === reqComp)
                            return (
                              <span
                                key={reqComp}
                                className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                  hasComponent 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {reqComp}
                                {hasComponent ? <Check className="h-3 w-3 ml-1" /> : <AlertTriangle className="h-3 w-3 ml-1" />}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleGenerateTemplates(theme.id)}
                        disabled={generatingTemplates === theme.id || !theme.components.some(c => ['Header', 'Footer', 'DNDArea'].includes(c.type))}
                        className="flex-1"
                      >
                        {generatingTemplates === theme.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Layout className="h-3 w-3 mr-1" />
                            Generate Templates
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Template Generation Process:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li><strong>Header Template:</strong> Creates template with theme's Header component</li>
                  <li><strong>Footer Template:</strong> Creates template with theme's Footer component</li>
                  <li><strong>Page Template:</strong> Creates template with theme's DNDArea component for content injection</li>
                  <li><strong>Database Storage:</strong> Templates and blocks are saved to database for immediate use</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Theme Info */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Check className="h-5 w-5" />
            Active Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-900">
                {themes.find(t => t.isActive)?.name || 'Default Theme'}
              </h3>
              <p className="text-sm text-green-700">
                Currently powering your site's design and components
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.id} className={`transition-all duration-200 ${
            theme.isActive 
              ? 'ring-2 ring-green-500 shadow-lg' 
              : theme.isValid === false
              ? 'ring-2 ring-red-300 hover:shadow-lg'
              : 'hover:shadow-lg'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className={`h-5 w-5 ${theme.isValid === false ? 'text-red-600' : 'text-blue-600'}`} />
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {theme.isValid === false && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Invalid
                    </span>
                  )}
                  {theme.isActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{theme.description}</p>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div>Author: {theme.author}</div>
                <div>Version: {theme.version}</div>
              </div>

              {/* Component Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-medium text-blue-800">
                    {getCategoryCount(theme.components, 'content-blocks')}
                  </div>
                  <div className="text-blue-600">Content Blocks</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="font-medium text-green-800">
                    {getCategoryCount(theme.components, 'layout')}
                  </div>
                  <div className="text-green-600">Layout</div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="font-medium text-purple-800">
                    {getCategoryCount(theme.components, 'ui-primitives')}
                  </div>
                  <div className="text-purple-600">UI Components</div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="font-medium text-orange-800">
                    {theme.components.length}
                  </div>
                  <div className="text-orange-600">Total</div>
                </div>
              </div>

              {/* Validation Errors */}
              {theme.isValid === false && theme.validationErrors && theme.validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Validation Errors:
                  </h4>
                  <ul className="text-xs text-red-700 space-y-1">
                    {theme.validationErrors.map((error, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Available Components */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Available Components:
                </h4>
                {theme.components.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {theme.components.slice(0, 6).map((component, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        {component.name}
                      </span>
                    ))}
                    {theme.components.length > 6 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        +{theme.components.length - 6} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No components available</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  // onClick={() => handlePreviewTheme(theme.id)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                
                {!theme.isActive ? (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleActivateTheme(theme.id)}
                    disabled={activatingTheme === theme.id || theme.isValid === false}
                    variant={theme.isValid === false ? "secondary" : "default"}
                  >
                    {activatingTheme === theme.id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        Activating...
                      </>
                    ) : theme.isValid === false ? (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Fix Errors
                      </>
                    ) : (
                      'Activate'
                    )}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1"
                    disabled
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installation Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Installing New Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            To add a new theme to your CMS:
          </div>
          
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              Create a new folder in your project's themes directory (e.g., <code className="bg-gray-100 px-1 rounded">/themes/my-theme</code>)
            </li>
            <li>
              Structure it like the <code className="bg-gray-100 px-1 rounded">/themes/default</code> theme with:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">ui/</code> folder for components</li>
                <li><code className="bg-gray-100 px-1 rounded">auto-register.tsx</code> for component registry</li>
                <li><code className="bg-gray-100 px-1 rounded">tailwind.config.ts</code> for styling</li>
                <li><code className="bg-gray-100 px-1 rounded">styles.css</code> for custom styles</li>
                <li><code className="bg-gray-100 px-1 rounded">main.js</code> for JavaScript functionality</li>
              </ul>
            </li>
            <li>
              Each component should export a <code className="bg-gray-100 px-1 rounded">metadata</code> object with type, name, description, category, and icon
            </li>
            <li>
              Restart your development server to auto-detect the new theme
            </li>
          </ol>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-1">
              Pro Tip
            </div>
            <div className="text-sm text-blue-700">
              Copy the <code className="bg-blue-100 px-1 rounded">/themes/default</code> theme as a starting point and modify the components to match your design requirements.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
