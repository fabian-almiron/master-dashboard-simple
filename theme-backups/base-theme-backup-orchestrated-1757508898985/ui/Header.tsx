"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X, Search, User } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { 
      name: 'Services', 
      hasDropdown: true,
      items: ['Consulting', 'Implementation', 'Support', 'Training']
    },
    { 
      name: 'Solutions', 
      hasDropdown: true,
      items: ['Enterprise', 'Small Business', 'Startups', 'Non-Profit']
    },
    { name: 'About', hasDropdown: false },
    { name: 'Resources', hasDropdown: false },
    { name: 'Contact', hasDropdown: false }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-theme-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105">
                <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-theme-primary-600 to-theme-primary-800 bg-clip-text text-transparent">
                ModernBiz
              </h1>
              <p className="text-xs text-theme-gray-500 font-medium tracking-wide">
                PROFESSIONAL SOLUTIONS
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 px-4 py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-theme-gray-50">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-theme-gray-100 py-2 transform opacity-100 scale-100 transition-all duration-300">
                    {item.items?.map((subItem) => (
                      <button
                        key={subItem}
                        className="block w-full text-left px-4 py-3 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-50 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-300"
              aria-label="Search"
              onClick={() => console.log('Search clicked')}
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              className="relative p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-300"
              aria-label="Notifications"
              onClick={() => console.log('Notifications clicked')}
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            </button>

            <div className="hidden sm:flex items-center space-x-3">
              <button 
                className="px-6 py-2 text-theme-primary-600 hover:text-theme-primary-700 font-medium transition-colors duration-300"
                onClick={() => console.log('Sign in clicked')}
              >
                Sign In
              </button>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 hover:from-theme-primary-600 hover:to-theme-primary-700 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => console.log('Get started clicked')}
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-theme-gray-200">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className="block w-full text-left px-4 py-3 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-theme-gray-200 space-y-2">
              <button 
                className="block w-full text-left px-4 py-3 text-theme-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </button>
              <button 
                className="block w-full text-left px-4 py-3 bg-theme-primary-500 text-white rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-theme-primary-50 to-orange-50 border-b border-theme-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center space-x-8 text-sm text-theme-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 Support Available</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2 h-2 bg-theme-primary-500 rounded-full"></div>
              <span>Trusted by 10,000+ Businesses</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Emergency Response Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Professional Business Header',
  description: 'Modern header component with trust indicators, responsive navigation, and professional design elements',
  category: 'content-blocks',
  icon: 'Menu'
}


export default Header;