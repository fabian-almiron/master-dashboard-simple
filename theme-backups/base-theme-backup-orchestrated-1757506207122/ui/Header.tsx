"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const ProfessionalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'HVAC Services', href: '/hvac' },
    { name: 'Plumbing Solutions', href: '/plumbing' },
    { name: 'Emergency Repairs', href: '/emergency' },
    { name: 'Maintenance Plans', href: '/maintenance' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-theme-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">24/7 Emergency Service</span>
            </div>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Licensed & Insured Professionals</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:555-0123" className="font-bold hover:text-theme-primary-200 transition-colors">
              (555) 123-HVAC
            </a>
            <Bell className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-theme-primary-500 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-theme-gray-900">ProService</h1>
              <p className="text-xs text-theme-gray-600 -mt-1">HVAC & Plumbing Experts</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors relative group">
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors group">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-theme-gray-200 py-2 animate-in slide-in-from-top-2 duration-200">
                  {services.map((service, index) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-3 text-theme-gray-700 hover:bg-theme-primary-50 hover:text-theme-primary-700 transition-colors group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.name}</span>
                        <div className="w-2 h-2 bg-theme-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors relative group">
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors relative group">
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-500 group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          {/* CTA Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-theme-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Available Now</span>
            </div>
            
            <button className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-theme-primary-600 hover:to-theme-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Quote
            </button>
            
            <button className="p-2.5 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-theme-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <a href="/" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors">
              Home
            </a>
            
            <div className="space-y-2">
              <div className="text-theme-gray-900 font-semibold py-2">Services</div>
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block py-2 pl-4 text-theme-gray-600 hover:text-theme-primary-600 transition-colors"
                >
                  {service.name}
                </a>
              ))}
            </div>
            
            <a href="/about" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors">
              About
            </a>
            
            <a href="/contact" className="block py-2 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors">
              Contact
            </a>
            
            <div className="pt-4 border-t border-theme-gray-200">
              <button className="w-full bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white py-3 rounded-lg font-semibold hover:from-theme-primary-600 hover:to-theme-primary-700 transition-all duration-200">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Professional Service Header',
  description: 'Modern header with emergency banner, service navigation, and trust-building elements for HVAC and plumbing businesses',
  category: 'layout',
  icon: 'Menu'
};

export default ProfessionalHeader;