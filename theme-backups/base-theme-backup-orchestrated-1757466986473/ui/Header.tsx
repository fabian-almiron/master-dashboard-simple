import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-theme-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-theme-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-theme-gray-900">Base Theme</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-theme-gray-200 py-1">
                  <a href="/services/web-design" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                    Web Design
                  </a>
                  <a href="/services/development" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                    Development
                  </a>
                  <a href="/services/consulting" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                    Consulting
                  </a>
                </div>
              )}
            </div>
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/get-started"
              className="bg-theme-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-theme-primary-600 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-theme-gray-700 hover:text-theme-primary-500 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-theme-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="/services" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-base font-medium">
                Contact
              </a>
              <div className="pt-2">
                <a
                  href="/get-started"
                  className="bg-theme-primary-500 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-theme-primary-600 transition-colors inline-block"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Clean Minimal Header',
  description: 'A clean, modern header with responsive navigation, dropdown menu, and CTA button',
  category: 'layout',
  icon: 'Layout',
};