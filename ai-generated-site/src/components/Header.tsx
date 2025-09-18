'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Calendar, Clock, Instagram, Facebook, Phone } from 'lucide-react'

interface HeaderProps {
  logo: string
  navigation: Array<{ label: string; href: string }>
  ctaText: string
  ctaHref: string
  socialLinks: Array<{ platform: string; href: string }>
  contactInfo: {
    phone: string
    hours: string
  }
}

export default function Header({ logo, navigation, ctaText, ctaHref, socialLinks, contactInfo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />
      case 'facebook': return <Facebook className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-rose-700">
                <Clock className="h-4 w-4 mr-2" />
                <span>{contactInfo.hours}</span>
              </div>
              <div className="flex items-center text-rose-700">
                <Phone className="h-4 w-4 mr-2" />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  className="text-rose-600 hover:text-rose-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
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
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={ctaHref}
                className="bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
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
                    className="text-gray-700 hover:text-rose-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={ctaHref}
                  className="bg-rose-600 text-white block px-3 py-2 rounded-full text-base font-medium hover:bg-rose-700 mt-4 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
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