"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X, Search, Home, User, ChevronDown, Bell } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timer)
    }
  }, [])

  const services = [
    { name: 'Emergency Repair', availability: '24/7 Available', urgency: 'high' },
    { name: 'AC Installation', availability: 'Same Day Service', urgency: 'medium' },
    { name: 'Heating Systems', availability: 'Next Day Install', urgency: 'medium' },
    { name: 'Maintenance Plans', availability: 'Flexible Scheduling', urgency: 'low' }
  ]

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+1-800-JUST-AIR'
  }

  const isBusinessHours = () => {
    const hour = currentTime.getHours()
    const day = currentTime.getDay()
    return day >= 1 && day <= 5 && hour >= 7 && hour < 19
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-theme-gray-200/30' 
          : 'bg-gradient-to-br from-white via-theme-gray-50/90 to-theme-primary-50/40'
      }`}
      role="banner"
    >
      <div className="bg-gradient-to-r from-theme-primary-700 via-theme-primary-600 to-theme-primary-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">Licensed & Bonded Since 1995</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>5-Year Parts & Labor Warranty</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>EPA Certified Technicians</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:flex items-center space-x-2">
              {isBusinessHours() ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Open Now - Call Today</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span>24/7 Emergency Available</span>
                </>
              )}
            </span>
            <div className="font-mono text-xs bg-white/20 px-2 py-1 rounded">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-primary-500 to-theme-primary-700 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='shine' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffffff;stop-opacity:0.4' /%3E%3Cstop offset='100%25' style='stop-color:%23ffffff;stop-opacity:0.1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23shine)' /%3E%3Cpath d='M20 30h60v40H20z' fill='%23ffffff' opacity='0.3'/%3E%3Cpath d='M30 20v60M50 20v60M70 20v60' stroke='%23ffffff' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`
                }}
              >
                <Home className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                ★
              </div>
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-black bg-gradient-to-r from-theme-primary-700 to-theme-primary-600 bg-clip-text text-transparent">
                  JustRight
                </h1>
                <div className="flex flex-col">
                  <span className="text-xl font-light text-theme-gray-700">Air</span>
                  <div className="flex items-center space-x-1 -mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    ))}
                    <span className="text-xs text-theme-gray-500 ml-1">4.9★</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-theme-gray-600 font-medium mt-1">Premium HVAC Excellence</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a 
              href="/" 
              className="text-theme-gray-700 hover:text-theme-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group"
            >
              Home
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 font-semibold transition-all duration-300 group"
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-96 bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-theme-gray-100/50 p-6 opacity-100 scale-100 transition-all duration-500"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href={`/services/${service.name.toLowerCase().replace(' ', '-')}`}
                        className="group flex items-center justify-between p-4 rounded-2xl hover:bg-theme-primary-50 transition-all duration-300 hover:scale-102"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            service.urgency === 'high' ? 'bg-red-100 text-red-600' :
                            service.urgency === 'medium' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          } group-hover:scale-110 transition-transform duration-300`}>
                            <Home className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-theme-gray-800 group-hover:text-theme-primary-600 transition-colors duration-200">
                              {service.name}
                            </h3>
                            <p className="text-xs text-theme-gray-500">{service.availability}</p>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-theme-gray-400 transform -rotate-90 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-theme-gray-100 mt-4 pt-4 flex items-center justify-center space-x-6 text-sm text-theme-gray-600">
                    <span>✓ Free Estimates</span>
                    <span>✓ Upfront Pricing</span>
                    <span>✓ No Hidden Fees</span>
                  </div>
                </div>
              )}
            </div>

            <a 
              href="/about" 
              className="text-theme-gray-700 hover:text-theme-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group"
            >
              About
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-theme-gray-100 hover:bg-theme-primary-100 hover:scale-110 transition-all duration-300 group"
              aria-label="Search services"
            >
              <Search className="w-5 h-5 text-theme-gray-600 group-hover:text-theme-primary-600 transition-colors duration-200" />
            </button>

            <button
              onClick={handleEmergencyCall}
              className="relative hidden sm:flex items-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden group"
              aria-label="Emergency service call"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Bell className="w-4 h-4 animate-pulse relative z-10" />
              <div className="flex flex-col items-start relative z-10">
                <span className="text-xs opacity-90 leading-none">Emergency</span>
                <span className="text-sm font-black leading-none">(800) JUST-AIR</span>
              </div>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-theme-primary-500 hover:bg-theme-primary-600 text-white transition-all duration-300 hover:scale-110"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/98 backdrop-blur-xl rounded-2xl mx-4 mb-4 p-6 shadow-xl border border-theme-gray-100">
            <div className="space-y-4">
              <a href="/" className="block text-theme-gray-700 hover:text-theme-primary-600 font-semibold py-3 border-b border-theme-gray-100 transition-colors duration-200">
                Home
              </a>
              <div className="space-y-3">
                <p className="text-theme-gray-900 font-bold text-lg">Our Services</p>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href={`/services/${service.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center justify-between text-theme-gray-600 hover:text-theme-primary-600 py-3 border-b border-theme-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          service.urgency === 'high' ? 'bg-red-100 text-red-600' :
                          service.urgency === 'medium' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <Home className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-medium">{service.name}</span>
                          <p className="text-xs text-theme-gray-500">{service.availability}</p>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-theme-gray-400 transform -rotate-90" />
                    </a>
                  ))}
                </div>
              </div>
              <a href="/about" className="block text-theme-gray-700 hover:text-theme-primary-600 font-semibold py-3 border-b border-theme-gray-100 transition-colors duration-200">
                About Us
              </a>
              <button
                onClick={handleEmergencyCall}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold mt-4 hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Bell className="w-5 h-5" />
                <span>Emergency: (800) JUST-AIR</span>
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
  name: 'JustRightAir Professional Trust Header',
  description: 'Clean professional header with trust indicators, service navigation, and emergency contact emphasis for HVAC business',
  category: 'content-blocks',
  icon: 'Home'
}


export default Header;