import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Settings, Globe, Database, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your CMS and website settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Site Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Settings
              </CardTitle>
              <CardDescription>
                Basic configuration for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="StreamLine" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="Streamline your workflow like never before" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://yoursite.com" />
              </div>
              <Button className="w-full">Save Site Settings</Button>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database
              </CardTitle>
              <CardDescription>
                Supabase connection and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Connection Status</Label>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Connected to Supabase</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project ID</Label>
                <Input value="your-supabase-project" disabled />
              </div>
              <div className="space-y-2">
                <Label>Tables</Label>
                <div className="text-sm text-muted-foreground">
                  • pages (4 records)<br />
                  • page_blocks (12 records)
                </div>
              </div>
              <Button variant="outline" className="w-full">Test Connection</Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your CMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-md border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-md"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-md"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-md"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Authentication and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>1 day</option>
                  <option>1 week</option>
                </select>
              </div>
              <Button variant="outline" className="w-full">Change Password</Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-6 lg:mt-8">
          <CardContent className="text-center py-8">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Advanced Settings Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-sm lg:text-base">
              We're working on additional configuration options including custom domains, 
              email settings, backup management, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 