'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MapPin, Clock, Truck, HardHat } from 'lucide-react'

interface HeaderProps {
  logo: string
  navigation: Array<{ label: string; href: string }>
  ctaText: string
  ctaHref: string
  contactPhone: string
  serviceAreas: string
}

export default function Header({ logo, navigation, ctaText, ctaHref, contactPhone, serviceAreas }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Contact/Service Bar */}
      <div className="bg-orange-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-orange-800">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-medium">Call Today: {contactPhone}</span>
              </div>
              <div className="hidden md:flex items-center text-orange-700">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Serving: {serviceAreas}</span>
              </div>
            </div>
            <div className="flex items-center text-orange-800">
              <HardHat className="h-4 w-4 mr-2" />
              <span className="font-medium">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                {logo}
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={ctaHref}
                className="bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors flex items-center"
              >
                <Truck className="h-4 w-4 mr-2" />
                {ctaText}
              </Link>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={ctaHref}
                  className="bg-orange-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700 mt-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  {ctaText}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}