"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X, Search, User, ChevronDown, Bell } from 'lucide-react'
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
      items: ['Consulting', 'Strategy', 'Implementation', 'Support']
    },
    { 
      name: 'Solutions', 
      hasDropdown: true,
      items: ['Enterprise', 'Small Business', 'Startups', 'Non-Profit']
    },
    { name: 'About', hasDropdown: false },
    { name: 'Contact', hasDropdown: false }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100' 
          : 'bg-transparent'
      }`}
      style={{
        backgroundImage: isScrolled ? 'none' : `linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.08) 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div 
              className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg flex items-center justify-center group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)`
              }}
            >
              <div className="w-6 h-6 bg-white rounded-md transform group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-serif font-bold text-theme-gray-900 tracking-tight">
                Luxe<span className="text-amber-600">Pro</span>
              </h1>
              <p className="text-xs text-theme-gray-600 font-medium tracking-wider uppercase">
                Premium Business Solutions
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-theme-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 py-2">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-amber-100 py-2 transition-all duration-300 ${
                    activeDropdown === item.name 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 translate-y-2 invisible'
                  }`}>
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-3 text-theme-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 font-medium"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-theme-gray-100 hover:bg-amber-50 text-theme-gray-600 hover:text-amber-600 transition-all duration-300 group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-theme-gray-100 hover:bg-amber-50 text-theme-gray-600 hover:text-amber-600 transition-all duration-300 group relative">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
            </button>

            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 transition-all duration-300 group shadow-lg">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-theme-gray-100 hover:bg-amber-50 text-theme-gray-600 hover:text-amber-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-amber-100 mt-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <a
                    href="#"
                    className="block px-4 py-3 text-theme-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                  {item.hasDropdown && item.items && (
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 text-sm text-theme-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3 mt-6 px-4">
              <button className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-lg">
                Get Started
              </button>
              <button className="px-4 py-3 border border-amber-200 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors duration-300">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Luxury Business Header',
  description: 'Sophisticated header with warm gold accents, elegant navigation, and premium micro-interactions',
  category: 'layout',
  icon: 'Menu'
}

export default Header