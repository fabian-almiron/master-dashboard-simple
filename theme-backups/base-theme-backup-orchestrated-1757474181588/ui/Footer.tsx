"use client"

import React, { useState, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-green-50 to-peach-50">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c084fc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-xl opacity-60 animate-pulse" />
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-lg opacity-50 animate-bounce" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-peach-200 to-yellow-200 rounded-full blur-md opacity-40" 
             style={{
               transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
               transition: 'transform 0.3s ease-out'
             }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group cursor-pointer">
              <h2 className="text-4xl font-serif text-theme-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                Echo Smart
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-32 transition-all duration-500" />
            </div>
            
            <p className="text-lg text-theme-gray-600 leading-relaxed max-w-md">
              Empowering modern businesses with intelligent solutions that harmonize technology and human potential for sustainable growth.
            </p>

            {/* Wellness Quote */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <p className="text-theme-gray-700 italic font-serif">
                "Innovation blooms where mindfulness meets technology"
              </p>
              <div className="flex items-center mt-3">
                <Heart className="w-4 h-4 text-pink-400 mr-2" />
                <span className="text-sm text-theme-gray-500">Echo Smart Philosophy</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-theme-gray-800 mb-6">Explore</h3>
            <nav className="space-y-4">
              {['Solutions', 'Services', 'About Us', 'Careers', 'Blog', 'Resources'].map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className="block text-theme-gray-600 hover:text-purple-600 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-theme-gray-800 mb-6">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-theme-gray-600 group-hover:text-purple-600 transition-colors duration-300">
                  hello@echosmart.com
                </span>
              </div>
              
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl group-hover:from-green-200 group-hover:to-blue-200 transition-all duration-300">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-theme-gray-600 group-hover:text-green-600 transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </div>
              
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-peach-100 to-yellow-100 rounded-xl group-hover:from-peach-200 group-hover:to-yellow-200 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-theme-gray-600 group-hover:text-orange-600 transition-colors duration-300">
                  San Francisco, CA
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-sm font-medium text-theme-gray-700 mb-4">Follow Our Journey</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: 'from-blue-400 to-blue-600' },
                  { icon: Twitter, color: 'from-sky-400 to-sky-600' },
                  { icon: Instagram, color: 'from-pink-400 to-purple-600' },
                  { icon: Linkedin, color: 'from-blue-600 to-indigo-600' }
                ].map(({ icon: Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 bg-gradient-to-r ${color} text-white rounded-xl hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-peach-50 rounded-3xl p-8 mb-12 border border-purple-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-theme-gray-800 mb-4">
              Mindful Updates & Insights
            </h3>
            <p className="text-theme-gray-600 mb-6">
              Receive thoughtfully curated content that nurtures both business growth and personal well-being
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-300"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-theme-gray-600">
                © 2024 Echo Smart. Crafted with mindfulness and care.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-theme-gray-500 hover:text-purple-600 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-theme-gray-500 hover:text-purple-600 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-theme-gray-500 hover:text-purple-600 transition-colors duration-300">
                  Accessibility
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-theme-gray-600">
              <span className="text-sm">Made with</span>
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              <span className="text-sm">for a better tomorrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  )
}

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Wellness Minimalist Footer',
  description: 'A tranquil footer with organic curves, dreamy gradients, and mindful interactions featuring floating animations and therapeutic color psychology',
  category: 'layout',
  icon: 'Heart',
}

export default Footer