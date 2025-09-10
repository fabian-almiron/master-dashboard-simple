import React from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative bg-gradient-to-r from-purple-50 via-green-50 to-orange-50 backdrop-blur-sm border-b border-purple-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #e879f9 0%, #84cc16 50%, #fb923c 100%)',
                }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-60"
                style={{
                  background: 'linear-gradient(45deg, #fbbf24, #f472b6)',
                }}
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 via-green-600 to-orange-500 bg-clip-text text-transparent">
                WellnessTree
              </h1>
              <p className="text-xs text-theme-gray-500 hidden sm:block">Nurturing your mental wellness</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-theme-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-green-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a 
              href="#services" 
              className="text-theme-gray-700 hover:text-green-600 transition-colors duration-300 font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a 
              href="#about" 
              className="text-theme-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a 
              href="#resources" 
              className="text-theme-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium relative group"
            >
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-green-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <button 
              className="px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #22c55e 50%, #f97316 100%)',
              }}
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-purple-100/30 hover:bg-white/70 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-theme-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-theme-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-purple-100/30 p-4 space-y-3">
              <a 
                href="#home" 
                className="block py-2 px-4 text-theme-gray-700 hover:text-purple-600 hover:bg-purple-50/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#services" 
                className="block py-2 px-4 text-theme-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="block py-2 px-4 text-theme-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#resources" 
                className="block py-2 px-4 text-theme-gray-700 hover:text-purple-600 hover:bg-purple-50/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
              <button 
                className="w-full mt-3 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #22c55e 50%, #f97316 100%)',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </header>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'WellnessTree Mindful Header',
  description: 'A calming header with soft gradients, organic elements, and mindfulness-inspired design for mental wellness platforms',
  category: 'layout',
  icon: 'Leaf',
};

export default Header;