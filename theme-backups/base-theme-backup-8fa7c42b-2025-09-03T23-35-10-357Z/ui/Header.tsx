"use client"

import React, { useState } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Menu, X, Zap } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Header',
  description: 'Site navigation and branding header',
  category: 'layout',
  icon: 'Navigation',
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-gradient-to-r from-theme-primary-900 to-theme-primary-700 sticky top-0 z-50 shadow-lg">
      <div className="theme-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-theme-primary-600" />
              </div>
              <span className="text-xl font-bold text-white">TruKraft</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">Home</a>
            <a href="/about" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">About</a>
            <a href="/services" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">Services</a>
            <a href="/contact" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">Contact</a>
          </nav>
          <div className="hidden md:flex">
            <button className="px-6 py-3 bg-white text-theme-primary-700 rounded-lg font-medium hover:bg-theme-gray-100 transition-all shadow-md">
              Get Started
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <a href="/" className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded">Home</a>
              <a href="/about" className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded">About</a>
              <a href="/services" className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded">Services</a>
              <a href="/contact" className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded">Contact</a>
              <button className="w-full mt-4 px-6 py-3 bg-white text-theme-primary-700 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}