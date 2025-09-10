"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X, User, Search } from 'lucide-react'
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

  const services = [
    { name: 'Air Conditioning', href: '/ac-services' },
    { name: 'Heating Systems', href: '/heating' },
    { name: 'Plumbing Repair', href: '/plumbing' },
    { name: 'Emergency Service', href: '/emergency' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-theme-gray-200' 
        : 'bg-gradient-to-r from-theme-primary-600/10 to-theme-primary-500/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-theme-primary-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white animate-bounce"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-theme-primary-600 to-theme-primary-800 bg-clip-text text-transparent">
                JustRightAir
              </h1>
              <p className="text-xs text-theme-gray-600 font-medium">Professional HVAC & Plumbing</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors duration-200 group">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-theme-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {services.map((service, index) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="flex items-center px-4 py-3 text-theme-gray-700 hover:bg-theme-primary-50 hover:text-theme-primary-700 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-theme-primary-400 rounded-full mr-3 group-hover:bg-theme-primary-600 transition-colors duration-200"></div>
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors duration-200 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Emergency Contact */}
            <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-2 rounded-full border border-orange-200">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-xs text-orange-700 font-semibold">24/7 Emergency</p>
                <p className="text-sm font-bold text-orange-800">(555) 123-4567</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <button 
                className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-all duration-200 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* CTA Button */}
            <button 
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-theme-primary-600 hover:to-theme-primary-700"
              onClick={() => window.location.href = '/quote'}
            >
              Get Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-theme-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              <a href="/" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium">Home</a>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-theme-gray-900">Services</p>
                {services.map((service) => (
                  <a key={service.name} href={service.href} className="block py-1 pl-4 text-theme-gray-600 hover:text-theme-primary-600">
                    {service.name}
                  </a>
                ))}
              </div>
              <a href="/about" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium">About</a>
              <a href="/contact" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium">Contact</a>
              
              <div className="pt-4 border-t border-theme-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-semibold text-red-600">24/7 Emergency</p>
                    <p className="font-bold text-theme-gray-900">(555) 123-4567</p>
                  </div>
                  <button className="px-4 py-2 bg-theme-primary-500 text-white font-semibold rounded-lg">
                    Get Quote
                  </button>
                </div>
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
  name: 'Professional HVAC Header',
  description: 'Modern header component for HVAC and plumbing services with trust-building elements, emergency contact prominence, and professional service provider aesthetic',
  category: 'content-blocks',
  icon: 'Menu'
}


export default Header;