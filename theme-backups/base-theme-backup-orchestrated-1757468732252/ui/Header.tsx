import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Solutions', hasDropdown: true },
    { name: 'Products', hasDropdown: true },
    { name: 'Resources', hasDropdown: false },
    { name: 'About', hasDropdown: false },
    { name: 'Contact', hasDropdown: false },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .header-animate { animation: slideDown 0.6s ease-out; }
        .nav-item { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .nav-item:hover { transform: translateY(-2px); }
        .glass-effect { backdrop-filter: blur(20px); }
        .notification-pulse { animation: pulse 2s infinite; }
        
        .mobile-menu {
          animation: fadeIn 0.3s ease-out;
          backdrop-filter: blur(20px);
        }
        
        .gradient-border {
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
          height: 1px;
        }
      `}</style>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 header-animate ${
        isScrolled 
          ? 'glass-effect bg-white/80 shadow-lg border-b border-theme-gray-200' 
          : 'bg-transparent'
      }`}>
        {/* Top notification bar */}
        <div className="bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white py-2 px-4 text-center text-sm">
          <span className="inline-flex items-center gap-2">
            <Bell className="w-4 h-4 notification-pulse" />
            New product launch - Experience the future of business solutions
            <button className="underline hover:no-underline ml-2">Learn More</button>
          </span>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-theme-primary-500 to-theme-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-theme-primary-500 to-theme-primary-700 rounded-lg blur opacity-30"></div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-theme-gray-900 to-theme-gray-700 bg-clip-text text-transparent">
                Base Theme
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="nav-item flex items-center gap-1 text-theme-gray-700 hover:text-theme-primary-600 font-medium py-2">
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  </button>
                  
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-theme-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-4 space-y-3">
                        <a href="#" className="block p-3 rounded-lg hover:bg-theme-gray-50 transition-colors">
                          <div className="font-medium text-theme-gray-900">Enterprise Solutions</div>
                          <div className="text-sm text-theme-gray-600">Scalable business tools</div>
                        </a>
                        <a href="#" className="block p-3 rounded-lg hover:bg-theme-gray-50 transition-colors">
                          <div className="font-medium text-theme-gray-900">Analytics Platform</div>
                          <div className="text-sm text-theme-gray-600">Data-driven insights</div>
                        </a>
                        <a href="#" className="block p-3 rounded-lg hover:bg-theme-gray-50 transition-colors">
                          <div className="font-medium text-theme-gray-900">Integration Hub</div>
                          <div className="text-sm text-theme-gray-600">Connect your tools</div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200">
                <Search className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <button className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-theme-primary-500 rounded-full"></div>
              </div>

              <div className="w-px h-6 bg-theme-gray-300"></div>

              <button className="flex items-center gap-2 px-4 py-2 text-theme-gray-700 hover:text-theme-primary-600 rounded-lg hover:bg-theme-gray-100 transition-all duration-200">
                <User className="w-5 h-5" />
                <span className="font-medium">Account</span>
              </button>

              <button className="bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu bg-white/95 border-t border-theme-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="block px-4 py-3 text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-lg font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              <div className="gradient-border my-4"></div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-theme-gray-700 hover:bg-theme-gray-50 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                  Account
                </button>
                
                <button className="w-full bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white px-4 py-3 rounded-lg font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Modern Business Header',
  description: 'Professional header with glassmorphism effects, dropdown navigation, and mobile responsiveness',
  category: 'layout',
  icon: 'Layout',
};

export default Header;