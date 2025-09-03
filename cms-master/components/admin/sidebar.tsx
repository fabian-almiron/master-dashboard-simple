'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FileText, 
  Layout, 
  Palette, 
  Navigation, 
  Settings,
  Zap,
  Globe,
  BarChart3
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'Pages',
    href: '/admin/pages',
    icon: FileText,
  },
  {
    name: 'Templates',
    href: '/admin/templates',
    icon: Layout,
  },
  {
    name: 'Themes',
    href: '/admin/themes',
    icon: Palette,
  },
  {
    name: 'Navigation',
    href: '/admin/navigation',
    icon: Navigation,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col admin-sidebar">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold text-white">CMS Admin</span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col px-6 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-x-3 rounded-md p-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
