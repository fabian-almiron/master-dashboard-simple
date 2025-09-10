import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-white border-b border-theme-gray-200 sticky top-0 z-50">
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
            
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-theme-gray-200">
                  <div className="py-1">
                    <a href="/products/web" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                      Web Solutions
                    </a>
                    <a href="/products/mobile" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                      Mobile Apps
                    </a>
                    <a href="/products/enterprise" className="block px-4 py-2 text-sm text-theme-gray-700 hover:bg-theme-gray-50 hover:text-theme-primary-500">
                      Enterprise
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-500 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/get-started"
              className="bg-theme-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-theme-primary-600 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-theme-gray-700 hover:text-theme-primary-500 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-theme-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-500 hover:bg-theme-gray-50 rounded-md">
                Home
              </a>
              <a href="/products" className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-500 hover:bg-theme-gray-50 rounded-md">
                Products
              </a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-500 hover:bg-theme-gray-50 rounded-md">
                About
              </a>
              <a href="/contact" className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-500 hover:bg-theme-gray-50 rounded-md">
                Contact
              </a>
              <div className="pt-4 pb-2">
                <a
                  href="/get-started"
                  className="block w-full text-center bg-theme-primary-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-theme-primary-600 transition-colors"
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

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Clean Navigation Header',
  description: 'Minimal header with logo, navigation menu, dropdown, and mobile responsive design',
  category: 'layout',
  icon: 'Menu',
};

export default Header;