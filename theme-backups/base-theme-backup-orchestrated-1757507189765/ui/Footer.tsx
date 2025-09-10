"use client"

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight, Heart } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Footer: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [emailHovered, setEmailHovered] = useState(false)

  const services = [
    { name: 'Air Conditioning Repair', icon: '❄️', emergency: true },
    { name: 'Heating System Service', icon: '🔥', emergency: true },
    { name: 'Plumbing Solutions', icon: '🔧', emergency: false },
    { name: 'Emergency HVAC', icon: '🚨', emergency: true }
  ]

  const locations = [
    'Downtown District', 'Riverside Area', 'Northside Community', 
    'Westfield Zone', 'Eastgate Region', 'Southpark Vicinity'
  ]

  return (
    <footer className="relative bg-gradient-to-br from-theme-gray-900 via-theme-primary-900 to-theme-gray-800 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-4 px-6 text-center relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold text-theme-gray-900">24/7 Emergency Service Available</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5 text-theme-gray-900" />
            <span className="text-xl font-bold text-theme-gray-900">(555) 123-HVAC</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-theme-primary-400 to-blue-400 bg-clip-text text-transparent mb-4">
                JustRightAir
              </h3>
              <p className="text-theme-gray-300 leading-relaxed mb-6">
                Your trusted local HVAC and plumbing experts serving the community with reliable, professional service for over 15 years. Licensed, insured, and committed to your comfort.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-theme-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  Licensed & Insured
                </div>
                <div className="bg-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  15+ Years Experience
                </div>
                <div className="bg-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  24/7 Emergency
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-theme-primary-400" />
                  <span className="text-theme-gray-300">(555) 123-HVAC</span>
                </div>
                <div 
                  className="flex items-center space-x-3 cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                >
                  <Mail className={`w-5 h-5 transition-colors duration-300 ${emailHovered ? 'text-orange-400' : 'text-theme-primary-400'}`} />
                  <span className={`transition-colors duration-300 ${emailHovered ? 'text-orange-400' : 'text-theme-gray-300'}`}>
                    service@justrightair.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-theme-primary-400" />
                  <span className="text-theme-gray-300">Serving Greater Metro Area</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-theme-primary-400 to-orange-400 rounded-full" />
            </h4>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group cursor-pointer transition-all duration-300 transform hover:translate-x-2"
                  onMouseEnter={() => setHoveredService(service.name)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-theme-primary-800/30">
                    <span className="text-xl">{service.icon}</span>
                    <span className={`transition-colors duration-300 ${hoveredService === service.name ? 'text-orange-400' : 'text-theme-gray-300'}`}>
                      {service.name}
                    </span>
                    {service.emergency && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        24/7
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="mt-6 flex items-center space-x-2 text-theme-primary-400 hover:text-orange-400 transition-colors duration-300 group"
              onClick={() => window.location.href = '/services'}
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Service Areas
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="text-theme-gray-300 hover:text-white transition-colors duration-300 cursor-pointer py-1 hover:pl-2 transition-all duration-300"
                >
                  {location}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-theme-primary-800/50 to-blue-800/50 rounded-lg border border-theme-primary-700/30">
              <p className="text-sm text-theme-gray-300 mb-2">Not in your area?</p>
              <p className="text-theme-primary-400 font-medium">Call us - we may still be able to help!</p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" />
            </h4>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <p className="text-theme-gray-300 mb-4">Get maintenance tips and seasonal offers</p>
              <form className="space-y-3">
                <input
                  type="email"
                  content="Your email address"
                  className="w-full px-4 py-3 bg-theme-gray-800 border border-theme-gray-700 rounded-lg text-white content-theme-gray-400 focus:outline-none focus:border-theme-primary-400 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-theme-primary-500 to-blue-500 hover:from-theme-primary-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Subscribe for Tips & Offers
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-theme-gray-300 mb-4">Follow us for updates</p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: 'hover:text-blue-400' },
                  { icon: Twitter, color: 'hover:text-blue-300' },
                  { icon: Instagram, color: 'hover:text-pink-400' },
                  { icon: Youtube, color: 'hover:text-red-400' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`p-3 bg-theme-gray-800 rounded-lg text-theme-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-theme-gray-700`}
                    aria-label={`Follow us on social media`}
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-theme-gray-700 bg-theme-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-theme-gray-400">
              <span>© 2024 JustRightAir. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with care for our community</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-theme-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-theme-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/warranty" className="text-theme-gray-400 hover:text-white transition-colors duration-300">
                Warranty Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Professional HVAC Footer',
  description: 'Comprehensive footer component with emergency contact, service areas, newsletter signup, and trust-building elements for HVAC service providers',
  category: 'content-blocks',
  icon: 'Phone'
}


export default Footer;