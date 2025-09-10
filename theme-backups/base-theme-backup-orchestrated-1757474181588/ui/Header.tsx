"use client"

import React, { useState, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Menu, X, Search, User, ChevronDown, Bell } from 'lucide-react'

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

  const navItems = [
    { name: 'Solutions', hasDropdown: true },
    { name: 'Products', hasDropdown: true },
    { name: 'Resources', hasDropdown: false },
    { name: 'About', hasDropdown: false },
    { name: 'Contact', hasDropdown: false }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-theme-primary-100/20' 
          : 'bg-gradient-to-r from-white/60 via-theme-primary-50/40 to-theme-secondary-50/40 backdrop-blur-sm'
      }`}
      style={{
        backgroundImage: isScrolled 
          ? 'none'
          : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6f3ff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Organic floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(168, 162, 255, 0.3) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-8 right-1/4 w-16 h-16 rounded-full opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(134, 239, 172, 0.4) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute -top-2 right-12 w-20 h-20 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(254, 215, 170, 0.5) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #a8a2ff 0%, #86efac 50%, #fed7aa 100%)',
                boxShadow: '0 8px 32px rgba(168, 162, 255, 0.2)'
              }}
            >
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif text-theme-gray-800 font-semibold tracking-tight">
                Echo Smart
              </h1>
              <p className="text-xs text-theme-gray-500 -mt-1">Modern Business</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 transition-all duration-300 py-2 px-3 rounded-xl hover:bg-white/50 backdrop-blur-sm">
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {item.hasDropdown && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-theme-gray-800">Smart Solutions</h3>
                        <p className="text-sm text-theme-gray-600">AI-powered business tools</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-theme-gray-800">Analytics</h3>
                        <p className="text-sm text-theme-gray-600">Data-driven insights</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-theme-gray-800">Automation</h3>
                        <p className="text-sm text-theme-gray-600">Streamline workflows</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 rounded-xl text-theme-gray-600 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl text-theme-gray-600 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-theme-primary-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-xl text-theme-gray-600 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300">
              <User className="w-5 h-5" />
            </button>
            <button 
              className="px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #a8a2ff 0%, #86efac 100%)',
                boxShadow: '0 4px 20px rgba(168, 162, 255, 0.3)'
              }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-theme-gray-600 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="w-full text-left py-3 px-4 rounded-xl text-theme-gray-700 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-theme-gray-200 space-y-3">
                <button className="w-full py-3 px-4 rounded-xl text-theme-gray-600 hover:text-theme-primary-600 hover:bg-white/50 transition-all duration-300 flex items-center space-x-3">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #a8a2ff 0%, #86efac 100%)',
                    boxShadow: '0 4px 20px rgba(168, 162, 255, 0.3)'
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </header>
  )
}

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Wellness Minimalism Header',
  description: 'Dreamy gradient header with organic floating elements and therapeutic color psychology',
  category: 'layout',
  icon: 'Navigation',
}

export default Header