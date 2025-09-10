"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Shield, Target, Users, Trophy, Settings } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const CyberpunkNavHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const navItems = [
    { name: 'Arena', icon: Target, href: '#arena' },
    { name: 'Tournaments', icon: Trophy, href: '#tournaments' },
    { name: 'Squads', icon: Users, href: '#squads' },
    { name: 'Arsenal', icon: Shield, href: '#arsenal' },
    { name: 'Settings', icon: Settings, href: '#settings' }
  ];

  return (
    <header className="relative bg-gray-900 border-b border-cyan-500/30 overflow-hidden">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-400 via-cyan-500 to-transparent animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400 animate-pulse"></div>

      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Glitch Effect */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center transform rotate-45">
                <Zap className="w-6 h-6 text-gray-900 transform -rotate-45" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg opacity-50 blur-sm animate-pulse"></div>
            </div>
            <div className="relative">
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${
                glitchActive ? 'animate-pulse' : ''
              }`}>
                NEXUS GAMING
              </h1>
              {glitchActive && (
                <>
                  <h1 className="absolute top-0 left-0 text-2xl font-bold text-cyan-400 opacity-70 transform translate-x-0.5 -translate-y-0.5">
                    NEXUS GAMING
                  </h1>
                  <h1 className="absolute top-0 left-0 text-2xl font-bold text-pink-400 opacity-70 transform -translate-x-0.5 translate-y-0.5">
                    NEXUS GAMING
                  </h1>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative px-4 py-2 text-theme-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center space-x-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-lg transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/30 rounded-lg transition-all duration-300"></div>
                  <IconComponent className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-medium">{item.name}</span>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="relative group px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">JACK IN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-theme-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? <X className="w-6 h-6 relative z-10" /> : <Menu className="w-6 h-6 relative z-10" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-l border-r border-b border-cyan-500/30">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-theme-gray-300 hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
              <div className="pt-4 border-t border-gray-700">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  JACK IN
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
    </header>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Cyberpunk Gaming Nav',
  description: 'Futuristic gaming header with neon glitch effects and animated circuit patterns',
  category: 'layout',
  icon: 'Zap',
};

export default CyberpunkNavHeader;