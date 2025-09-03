'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  getCurrentSite, 
  getSiteSettings, 
  setSiteSetting, 
  updatePage,
  getPagesBySite
} from '@/lib/cms-data'
import { Site, SiteSetting, Page } from '@/lib/supabase'
import { Save, Globe, Settings as SettingsIcon, Home, Plus } from 'lucide-react'
import SiteSelector from '@/components/admin/site-selector'

export default function SettingsPage() {
  const [site, setSite] = useState<Site | null>(null)
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const currentSite = await getCurrentSite()
      if (currentSite) {
        setSite(currentSite)
        
        // Load pages for homepage selection
        const pagesData = await getPagesBySite(currentSite.id)
        setPages(pagesData.filter(page => page.status === 'published'))
        
        const siteSettings = await getSiteSettings(currentSite.id)
        const settingsMap = siteSettings.reduce((acc, setting) => {
          acc[setting.key] = setting.value
          return acc
        }, {} as Record<string, any>)
        
        // Set default values
        setSettings({
          site_title: settingsMap.site_title || currentSite.name || '',
          site_description: settingsMap.site_description || '',
          site_logo: settingsMap.site_logo || '',
          contact_email: settingsMap.contact_email || currentSite.owner_email || '',
          homepage_page_id: settingsMap.homepage_page_id || '',
          social_facebook: settingsMap.social_facebook || '',
          social_twitter: settingsMap.social_twitter || '',
          social_instagram: settingsMap.social_instagram || '',
          social_linkedin: settingsMap.social_linkedin || '',
          analytics_google: settingsMap.analytics_google || '',
          seo_meta_title: settingsMap.seo_meta_title || '',
          seo_meta_description: settingsMap.seo_meta_description || '',
          footer_copyright: settingsMap.footer_copyright || `© ${new Date().getFullYear()} ${currentSite.name}. All rights reserved.`,
          ...settingsMap
        })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = async () => {
    if (!site) return

    setSaving(true)
    try {
      // Save all settings to database
      for (const [key, value] of Object.entries(settings)) {
        await setSiteSetting(site.id, key, value)
      }
      
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your site settings and preferences.</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Site Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Site Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Switch Site
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Select which site you want to manage. This will switch the entire admin interface to manage the selected site's content.
                </p>
                <div className="flex justify-start">
                  <SiteSelector />
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Site Management
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Create new sites, manage existing ones, or view all sites in your organization.
                </p>
                <div className="flex gap-3">
                  <Button 
                    asChild 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Link href="/admin/sites">
                      <Globe className="h-4 w-4" />
                      Manage All Sites
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Link href="/admin/sites/new">
                      <Plus className="h-4 w-4" />
                      Create New Site
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="admin-field">
                <label className="admin-label">
                  Site Title
                </label>
                <input
                  type="text"
                  value={settings.site_title || ''}
                  onChange={(e) => handleSettingChange('site_title', e.target.value)}
                  className="admin-input"
                  placeholder="Your Site Title"
                />
              </div>
              
              <div className="admin-field">
                <label className="admin-label">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                  className="admin-input"
                  placeholder="contact@yoursite.com"
                />
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Site Description
              </label>
              <textarea
                rows={3}
                value={settings.site_description || ''}
                onChange={(e) => handleSettingChange('site_description', e.target.value)}
                className="admin-textarea"
                placeholder="A brief description of your site..."
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Site Logo URL
              </label>
              <input
                type="url"
                value={settings.site_logo || ''}
                onChange={(e) => handleSettingChange('site_logo', e.target.value)}
                className="admin-input"
                placeholder="https://yoursite.com/logo.png"
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Homepage
              </label>
              <select
                value={settings.homepage_page_id || ''}
                onChange={(e) => handleSettingChange('homepage_page_id', e.target.value)}
                className="admin-select"
              >
                <option value="">Select a page for homepage...</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.title} ({page.slug})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Choose which page to display when visitors visit your site's root URL (/{settings.homepage_page_id ? 'redirects to selected page' : 'shows default welcome page'})
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="admin-field">
                <label className="admin-label">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.social_facebook || ''}
                  onChange={(e) => handleSettingChange('social_facebook', e.target.value)}
                  className="admin-input"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div className="admin-field">
                <label className="admin-label">
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.social_twitter || ''}
                  onChange={(e) => handleSettingChange('social_twitter', e.target.value)}
                  className="admin-input"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              
              <div className="admin-field">
                <label className="admin-label">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.social_instagram || ''}
                  onChange={(e) => handleSettingChange('social_instagram', e.target.value)}
                  className="admin-input"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
              
              <div className="admin-field">
                <label className="admin-label">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.social_linkedin || ''}
                  onChange={(e) => handleSettingChange('social_linkedin', e.target.value)}
                  className="admin-input"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="admin-field">
              <label className="admin-label">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.seo_meta_title || ''}
                onChange={(e) => handleSettingChange('seo_meta_title', e.target.value)}
                className="admin-input"
                placeholder="Default title for search engines"
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.seo_meta_description || ''}
                onChange={(e) => handleSettingChange('seo_meta_description', e.target.value)}
                className="admin-textarea"
                placeholder="Default description for search engines..."
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.analytics_google || ''}
                onChange={(e) => handleSettingChange('analytics_google', e.target.value)}
                className="admin-input"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>



        {/* Footer Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Footer Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="admin-field">
              <label className="admin-label">
                Copyright Text
              </label>
              <input
                type="text"
                value={settings.footer_copyright || ''}
                onChange={(e) => handleSettingChange('footer_copyright', e.target.value)}
                className="admin-input"
                placeholder="© 2024 Your Company. All rights reserved."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
