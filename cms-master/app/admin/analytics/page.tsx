'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentSite } from '@/lib/cms-data'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  avgSessionDuration: string
  bounceRate: string
  topPages: Array<{
    path: string
    views: number
    title: string
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  deviceBreakdown: Array<{
    device: string
    percentage: number
    users: number
  }>
  weeklyViews: Array<{
    date: string
    views: number
    visitors: number
  }>
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [siteName, setSiteName] = useState<string>('')
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    loadAnalyticsData()
  }, [dateRange])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const site = await getCurrentSite()
      if (site) {
        setSiteName(site.name)
        
        // Simulate API call with placeholder data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setAnalyticsData({
          totalViews: 12847,
          uniqueVisitors: 8432,
          avgSessionDuration: '3m 24s',
          bounceRate: '42.8%',
          topPages: [
            { path: '/home', views: 4521, title: 'Home' },
            { path: '/about', views: 2847, title: 'About Us' },
            { path: '/services', views: 1923, title: 'Services' },
            { path: '/contact', views: 1456, title: 'Contact' },
            { path: '/blog', views: 1234, title: 'Blog' }
          ],
          trafficSources: [
            { source: 'Direct', visitors: 3456, percentage: 41 },
            { source: 'Google Search', visitors: 2789, percentage: 33 },
            { source: 'Social Media', visitors: 1234, percentage: 15 },
            { source: 'Referrals', visitors: 953, percentage: 11 }
          ],
          deviceBreakdown: [
            { device: 'Desktop', percentage: 58, users: 4890 },
            { device: 'Mobile', percentage: 35, users: 2951 },
            { device: 'Tablet', percentage: 7, users: 591 }
          ],
          weeklyViews: [
            { date: 'Mon', views: 1847, visitors: 1234 },
            { date: 'Tue', views: 2134, visitors: 1456 },
            { date: 'Wed', views: 1923, visitors: 1298 },
            { date: 'Thu', views: 2456, visitors: 1678 },
            { date: 'Fri', views: 2234, visitors: 1534 },
            { date: 'Sat', views: 1456, visitors: 987 },
            { date: 'Sun', views: 1234, visitors: 845 }
          ]
        })
      }
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-slate-100">Analytics</h1>
          <p className="text-slate-400">
            Track your site's performance and visitor insights for {siteName}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadAnalyticsData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{analyticsData?.totalViews.toLocaleString()}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{analyticsData?.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{analyticsData?.avgSessionDuration}</div>
            <p className="text-xs text-red-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 rotate-180" />
              -2.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Bounce Rate</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{analyticsData?.bounceRate}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 rotate-180" />
              -5.3% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Traffic Chart */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <BarChart3 className="h-5 w-5" />
              Weekly Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.weeklyViews.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-sm text-slate-400 font-medium">{day.date}</div>
                    <div className="flex-1">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(day.views / 2500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-200">{day.views.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{day.visitors} visitors</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Globe className="h-5 w-5" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-medium text-slate-300">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-200 truncate">{page.title}</div>
                      <div className="text-xs text-slate-400 font-mono truncate">{page.path}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium text-slate-200">{page.views.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <PieChart className="h-5 w-5" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-200 font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-200">{source.percentage}%</div>
                    <div className="text-xs text-slate-400">{source.visitors.toLocaleString()} visitors</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Activity className="h-5 w-5" />
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.deviceBreakdown.map((device) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{device.device}</span>
                    <span className="text-slate-300 font-medium">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-400">{device.users.toLocaleString()} users</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100">
            <Activity className="h-5 w-5" />
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">24</div>
              <div className="text-sm text-slate-400">Active Users</div>
              <div className="text-xs text-slate-500 mt-1">Right now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">156</div>
              <div className="text-sm text-slate-400">Page Views</div>
              <div className="text-xs text-slate-500 mt-1">Last hour</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">8</div>
              <div className="text-sm text-slate-400">New Sessions</div>
              <div className="text-xs text-slate-500 mt-1">Last 10 minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Setup */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100">
            <Calendar className="h-5 w-5" />
            Analytics Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-amber-300 mb-1">Google Analytics Integration</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Connect your Google Analytics account to get real analytics data instead of placeholder content.
                  </p>
                  <Button variant="outline" size="sm" className="text-amber-300 border-amber-500/30 hover:bg-amber-500/10">
                    Configure Analytics
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-blue-300 mb-1">Custom Event Tracking</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Set up custom events to track user interactions, form submissions, and conversions.
                  </p>
                  <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/30 hover:bg-blue-500/10">
                    Setup Events
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-emerald-300 mb-1">Performance Monitoring</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Monitor your site's loading speed, Core Web Vitals, and user experience metrics.
                  </p>
                  <Button variant="outline" size="sm" className="text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10">
                    View Performance
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Features */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-slate-100">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">A/B Testing</h4>
              <p className="text-sm text-slate-400">Test different page versions to optimize conversions.</p>
            </div>
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">Heat Maps</h4>
              <p className="text-sm text-slate-400">See where users click and how they interact with your pages.</p>
            </div>
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">Goal Tracking</h4>
              <p className="text-sm text-slate-400">Set up and track conversion goals and funnels.</p>
            </div>
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">User Recordings</h4>
              <p className="text-sm text-slate-400">Watch recordings of user sessions to understand behavior.</p>
            </div>
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">Custom Reports</h4>
              <p className="text-sm text-slate-400">Create custom analytics reports and dashboards.</p>
            </div>
            <div className="p-4 border border-slate-600 rounded-lg bg-slate-700/30">
              <h4 className="font-medium text-slate-200 mb-2">API Access</h4>
              <p className="text-sm text-slate-400">Export data via API for custom integrations.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
