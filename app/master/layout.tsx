'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Bell, 
  User,
  Menu,
  X,
  Globe,
  Sparkles
} from 'lucide-react'
import { type Notification } from '@/lib/master-supabase'

// Force dynamic rendering - don't pre-render during build (requires auth)
export const dynamic = 'force-dynamic'

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    loadNotifications()
    // Set up polling for notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/master/notifications?limit=10&unreadOnly=true')
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setNotifications(result.data)
          setUnreadCount(result.data.length)
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/master',
      icon: Globe,
      current: pathname === '/master'
    },
    {
      name: 'AI Playground',
      href: '/master/playground',
      icon: Sparkles,
      current: pathname === '/master/playground'
    },
    {
      name: 'Create Website',
      href: '/master/create',
      icon: Plus,
      current: pathname === '/master/create'
    },
    {
      name: 'All Instances',
      href: '/master/instances',
      icon: Globe,
      current: pathname.startsWith('/master/instances')
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-gray-800/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800/50">
          <div className="flex items-center">
            <div className="relative">
              <svg width="99" height="23" viewBox="0 0 99 23" className="text-blue-400">
                <path fillRule="evenodd" clipRule="evenodd" d="M93.5266 8.66132C94.2176 8.66132 94.8794 8.74702 95.511 8.91815C96.148 9.08928 96.7121 9.35469 97.2034 9.71405C97.7 10.0734 98.0911 10.536 98.3772 11.1008C98.6633 11.6598 98.8069 12.3301 98.8069 13.1115V21.9758H95.5354V20.1535H95.4378C95.238 20.5642 94.9707 20.9267 94.636 21.2404C94.3014 21.5483 93.8995 21.7912 93.4299 21.968C92.9603 22.1391 92.4174 22.2238 91.802 22.2238C91.0087 22.2238 90.3016 22.079 89.6809 21.7883C89.0601 21.4916 88.568 21.0549 88.2063 20.4787C87.8501 19.8969 87.6721 19.1719 87.6721 18.3049C87.6722 17.575 87.7994 16.9621 88.053 16.466C88.3067 15.9698 88.652 15.5701 89.0891 15.2678C89.5264 14.9654 90.0233 14.7372 90.5794 14.5832C91.1408 14.4292 91.7296 14.3207 92.345 14.258C93.0683 14.1781 93.6514 14.1038 94.094 14.0353C94.5366 13.9612 94.8582 13.8527 95.0579 13.7101C95.2573 13.5676 95.3566 13.3566 95.3567 13.0773V13.0256C95.3567 12.4837 95.1952 12.0644 94.8714 11.7678C94.5529 11.4712 94.0993 11.3225 93.511 11.3224C92.8902 11.3224 92.3957 11.468 92.0286 11.759C91.6616 12.0441 91.4189 12.4037 91.3001 12.8371L88.1096 12.5637C88.2715 11.7652 88.5899 11.0751 89.0647 10.4933C89.5398 9.90578 90.1532 9.45456 90.9036 9.14081C91.6592 8.82147 92.5336 8.66135 93.5266 8.66132ZM95.3811 15.884C95.2732 15.9581 95.1246 16.0264 94.9358 16.0891C94.7523 16.1461 94.5448 16.2008 94.3128 16.2521C94.0808 16.2977 93.8485 16.3402 93.6165 16.3801C93.3844 16.4143 93.1735 16.4453 92.9846 16.4738C92.5799 16.5365 92.2263 16.6368 91.9241 16.7736C91.6218 16.9105 91.3864 17.0964 91.219 17.3303C91.0518 17.5584 90.968 17.8436 90.968 18.1857C90.9681 18.6817 91.138 19.0611 91.4778 19.3234C91.8233 19.5801 92.2612 19.7082 92.7903 19.7082C93.2976 19.7082 93.7454 19.6028 94.134 19.3918C94.5227 19.175 94.8278 18.8838 95.0491 18.5187C95.2703 18.1537 95.3811 17.7405 95.3811 17.2785V15.884Z" fill="currentColor"/>
                <path d="M28.2327 19.0246C28.8947 19.908 28.7163 21.1617 27.8333 21.8244C26.9499 22.4869 25.6964 22.3078 25.0335 21.425L23.9387 19.966C24.0344 20.4526 23.8559 20.9737 23.4329 21.2912C22.844 21.7327 22.0086 21.6131 21.5667 21.0246L14.6331 11.7795L7.69948 21.0246C7.25779 21.6133 6.42227 21.7324 5.83327 21.2912C5.41 20.9737 5.2298 20.4527 5.32546 19.966L4.23268 21.425C3.57004 22.3081 2.31637 22.4864 1.43288 21.8244C0.54952 21.1616 0.37087 19.9081 1.03347 19.0246L14.6331 0.891785L28.2327 19.0246Z" fill="currentColor"/>
                <path d="M66.429 8.83319H68.7688V11.5715H66.429V17.9377C66.429 18.2741 66.4773 18.5366 66.5745 18.7248C66.6716 18.9071 66.8063 19.0354 66.9788 19.1096C67.1569 19.1837 67.3629 19.2209 67.595 19.2209C67.7568 19.2209 67.9185 19.2064 68.0803 19.1779C68.2423 19.1437 68.367 19.1179 68.4534 19.1008L68.9954 21.8137C68.8227 21.8707 68.5798 21.9358 68.2669 22.0099C67.9538 22.0898 67.5732 22.1383 67.1253 22.1555C66.294 22.1897 65.5649 22.0729 64.9387 21.8049C64.3179 21.5368 63.834 21.1206 63.4885 20.5558C63.1431 19.9911 62.9734 19.2775 62.9788 18.4162V11.5715H61.2786V8.83319H62.9788V5.68378H66.429V8.83319Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M52.6409 21.9758H48.8831L47.6555 17.9797H41.6673L40.4368 21.9758H36.68L42.4046 4.45135H46.9231L52.6409 21.9758ZM42.5579 15.0881H46.7669L44.7288 8.45624H44.5999L42.5579 15.0881Z" fill="currentColor"/>
                <path d="M58.7053 21.9758H55.2561V4.45135H58.7053V21.9758Z" fill="currentColor"/>
                <path d="M75.1497 21.9758H71.6995V8.83319H75.1497V21.9758Z" fill="currentColor"/>
                <path d="M85.0589 8.64471C85.2315 8.64471 85.4178 8.6561 85.6174 8.67889C85.817 8.7017 85.9927 8.73275 86.1438 8.77264V12.007C85.9819 11.9557 85.7578 11.9102 85.4719 11.8703C85.186 11.8304 84.9242 11.8107 84.6868 11.8107C84.1795 11.8107 83.7258 11.9276 83.3264 12.1613C82.9323 12.3895 82.6191 12.7096 82.387 13.1203C82.1603 13.531 82.0462 14.0041 82.0462 14.5402V21.9758H78.5969V8.83319H81.9417V11.1262H82.0706C82.2973 10.3104 82.6787 9.69396 83.2132 9.27753C83.7475 8.85564 84.3627 8.64474 85.0589 8.64471Z" fill="currentColor"/>
                <path d="M73.4329 3.45038C73.9456 3.45039 74.3827 3.63326 74.7444 3.99823C75.1115 4.35758 75.2951 4.78829 75.2952 5.29022C75.2952 5.79793 75.1115 6.2347 74.7444 6.59979C74.3828 6.95901 73.9456 7.13885 73.4329 7.13885C72.92 7.13885 72.4797 6.95918 72.1126 6.59979C71.7509 6.23472 71.5706 5.7979 71.5706 5.29022C71.5706 4.78835 71.751 4.35755 72.1126 3.99823C72.4797 3.63314 72.92 3.45038 73.4329 3.45038Z" fill="currentColor"/>
              </svg>
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-md"></div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                    ${item.current
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white border border-transparent hover:border-gray-700/50'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.current && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
                  )}
                  <Icon
                    className={`
                      mr-3 h-5 w-5 flex-shrink-0 relative z-10
                      ${item.current ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}
                    `}
                  />
                  <span className="relative z-10">{item.name}</span>
                  {item.current && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 px-3">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick Stats
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/40 rounded-lg border border-gray-700/50">
                <span className="text-gray-300 text-sm">Active Sites</span>
                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
                  --
                </Badge>
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/40 rounded-lg border border-gray-700/50">
                <span className="text-gray-300 text-sm">This Month</span>
                <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
                  --
                </Badge>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          {notifications.length > 0 && (
            <div className="mt-8 px-3">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Recent Alerts
              </h3>
              <div className="mt-4 space-y-2">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 text-xs bg-amber-500/10 border border-amber-500/30 rounded-lg backdrop-blur-sm"
                  >
                    <div className="font-medium text-amber-300">{notification.title}</div>
                    <div className="truncate text-amber-400/80 mt-1">{notification.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-800/50">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1">
                      <Badge 
                        className="h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 border-2 border-gray-900 animate-pulse"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    </div>
                  )}
                </Button>
              </div>

              {/* Activity */}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
              >
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
                  title="User profile"
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-950">
          <div className="min-h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 