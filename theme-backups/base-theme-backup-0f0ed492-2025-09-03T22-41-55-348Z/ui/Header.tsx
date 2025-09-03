"use client"

import React, { useState } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Menu, X } from 'lucide-react'

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
    <header className="w-full bg-white border-b border-theme-gray-200 sticky top-0 z-50">
      <div className="theme-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 bg-theme-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="ml-2 text-xl font-bold text-theme-gray-900">TechVision AI</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="/services" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Services
            </a>
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-theme-primary-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-theme-primary-600 focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-primary-500"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-theme-gray-200 bg-white">
              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-md"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-md"
              >
                About
              </a>
              <a
                href="/services"
                className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-md"
              >
                Services
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-theme-gray-700 hover:text-theme-primary-600 hover:bg-theme-gray-50 rounded-md"
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <button className="w-full inline-flex h-9 items-center justify-center rounded-md bg-theme-primary-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-theme-primary-600">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
