import React from 'react';
import { Menu, X, ChevronDown, Search, User, Bell } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { 
      label: 'Solutions', 
      hasDropdown: true,
      items: ['Enterprise', 'Small Business', 'Startups', 'Consulting']
    },
    { 
      label: 'Products', 
      hasDropdown: true,
      items: ['Platform', 'Analytics', 'Integration', 'Security']
    },
    { label: 'Pricing', hasDropdown: false },
    { label: 'Resources', hasDropdown: true, items: ['Documentation', 'Blog', 'Case Studies', 'Support'] },
    { label: 'Company', hasDropdown: true, items: ['About', 'Careers', 'Contact', 'Press'] }
  ];

  return (
    <>
      <style jsx>{`
        .header-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--theme-primary-500), var(--theme-primary-600));
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-item:hover::after {
          width: 100%;
        }
        
        .dropdown-enter {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        
        .dropdown-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu-slide {
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu-slide.open {
          transform: translateX(0);
        }
        
        .logo-glow {
          filter: drop-shadow(0 0 20px rgba(var(--theme-primary-500-rgb), 0.3));
        }
        
        .search-glow:focus-within {
          box-shadow: 0 0 0 2px rgba(var(--theme-primary-500-rgb), 0.2);
        }
        
        .notification-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 border-b border-theme-gray-200 header-blur' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div 
                className="logo-glow"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="url(#gradient)"/>
                      <path d="M12 20L18 26L28 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:rgb(59, 130, 246)"/>
                          <stop offset="100%" style="stop-color:rgb(147, 51, 234)"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  `)}")`
                }}
                className="w-10 h-10 bg-no-repeat bg-center bg-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-theme-gray-900">Base Theme</h1>
                <p className="text-xs text-theme-gray-500 -mt-1">Modern Business</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="nav-item flex items-center space-x-1 text-theme-gray-700 hover:text-theme-primary-600 font-medium py-2">
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-theme-gray-100 py-2 dropdown-enter dropdown-enter-active">
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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative search-glow rounded-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 bg-theme-gray-50 border border-theme-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-theme-primary-500 rounded-full notification-pulse"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-theme-gray-50 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-theme-gray-700">Account</span>
              </button>

              {/* CTA Button */}
              <button className="hidden sm:block px-6 py-2 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-lg font-medium hover:from-theme-primary-600 hover:to-theme-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden mobile-menu-slide ${isMenuOpen ? 'open' : ''} fixed top-16 right-0 w-80 h-screen bg-white shadow-2xl border-l border-theme-gray-200`}>
          <div className="p-6 space-y-6">
            
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-theme-gray-50 border border-theme-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-theme-primary-300 transition-all duration-200"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <button className="flex items-center justify-between w-full text-left text-theme-gray-700 hover:text-theme-primary-600 font-medium py-2">
                    <span>{item.label}</span>