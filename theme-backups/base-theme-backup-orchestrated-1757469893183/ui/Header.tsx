"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Header: React.FC = () => {
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

  const navigationItems = [
    {
      name: 'Solutions',
      hasDropdown: true,
      items: ['Enterprise', 'Small Business', 'Startups', 'Consulting']
    },
    {
      name: 'Products',
      hasDropdown: true,
      items: ['Platform', 'Analytics', 'Integration', 'Security']
    },
    {
      name: 'Resources',
      hasDropdown: true,
      items: ['Documentation', 'Case Studies', 'Blog', 'Support']
    },
    {
      name: 'About',
      hasDropdown: false
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-theme-gray-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z'/%3E%3C/svg%3E")`
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-theme-gray-900 tracking-tight">
                Base Theme
              </h1>
              <p className="text-xs text-theme-gray-500 -mt-1">Modern Business</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 font-medium transition-colors duration-200 py-2">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-theme-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 transition-colors duration-150"
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
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-theme-gray-500 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-theme-gray-500 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-theme-primary-500 rounded-full"></span>
            </button>
            <div className="w-px h-6 bg-theme-gray-300"></div>
            <button className="flex items-center space-x-2 px-4 py-2 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </button>
            <button className="px-6 py-2 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-theme-gray-200 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <button className="w-full flex items-center justify-between px-4 py-3 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-lg transition-all duration-200">
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                  {item.hasDropdown && (
                    <div className="ml-4 space-y-1">
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 text-sm text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-lg transition-all duration-200"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-theme-gray-200 space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-lg transition-all duration-200">
                <User className="w-5 h-5" />
                <span className="font-medium">Account</span>
              </button>
              <button className="w-full px-4 py-3 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-medium rounded-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Professional Navigation Header',
  description: 'Modern header with glassmorphism effects, dropdown navigation, and responsive design',
  category: 'layout',
  icon: 'Menu',
};

export default Header;