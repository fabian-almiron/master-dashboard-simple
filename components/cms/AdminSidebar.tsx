'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard,
  FileText,
  Palette,
  Settings,
  Users,
  BarChart3,
  Home,
  Zap,
  Menu
} from 'lucide-react'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    title: 'Pages',
    href: '/admin/pages',
    icon: FileText,
    description: 'Manage all pages'
  },
  {
    title: 'Page Builder',
    href: '/admin/builder',
    icon: Palette,
    description: 'Drag & drop editor'
  },
  {
    title: 'Navigation',
    href: '/admin/navigation',
    icon: Menu,
    description: 'Manage navigation menus'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Page performance'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'CMS configuration'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-background border-r h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <div className="font-bold text-lg">StreamLine</div>
            <div className="text-xs text-muted-foreground">CMS Admin</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <Card 
                className={`p-3 transition-all cursor-pointer hover:shadow-sm ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className={`text-xs mt-1 ${
                      isActive 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t mt-auto">
        <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Quick Actions
        </div>
        <div className="space-y-2">
          <Button size="sm" className="w-full justify-start" asChild>
            <Link href="/admin/pages/new">
              <FileText className="h-4 w-4 mr-2" />
              New Page
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start" asChild>
            <Link href="/" target="_blank">
              <Home className="h-4 w-4 mr-2" />
              View Site
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 