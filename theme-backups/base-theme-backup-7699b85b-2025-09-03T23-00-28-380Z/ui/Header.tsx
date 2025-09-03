"use client"

import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Header',
  description: 'Site navigation and branding header',
  category: 'layout',
  icon: 'Navigation',
}

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-theme-gray-200 sticky top-0 z-50">
      <div className="theme-container">
        <div className="py-6 text-center">
          <div className="mb-4">
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold text-theme-gray-900">Pixel Perfect Creative</span>
            </a>
          </div>
          <nav className="flex items-center justify-center space-x-8 mb-4">
            <a href="/" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="/about" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium">About</a>
            <a href="/services" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium">Services</a>
            <a href="/contact" className="text-theme-gray-700 hover:text-theme-primary-600 px-3 py-2 text-sm font-medium">Contact</a>
          </nav>
          <div>
            <button className="px-6 py-3 bg-theme-primary-500 text-white rounded-lg font-medium hover:bg-theme-primary-600 transition-all">
              Let's Create
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}