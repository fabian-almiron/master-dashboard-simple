"use client"

import React, { useState, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart, Globe } from 'lucide-react'

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const footerSections = [
    {
      title: "Services",
      links: ["Consulting", "Strategy", "Implementation", "Support", "Training"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners", "Contact"]
    },
    {
      title: "Resources",
      links: ["Blog", "Case Studies", "Whitepapers", "Webinars", "Documentation"]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Luxury Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Golden Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                  <Globe className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-2xl font-serif text-white">Excellence</h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                Delivering sophisticated solutions with uncompromising quality and elegance. 
                Your success is our commitment to excellence.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300 group">
                  <Mail className="w-5 h-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>contact@excellence.com</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300 group">
                  <Phone className="w-5 h-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300 group">
                  <MapPin className="w-5 h-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <div 
                  key={section.title}
                  className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  onMouseEnter={() => setHoveredSection(section.title)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <h4 className="text-xl font-serif text-white mb-6 relative">
                    {section.title}
                    <div className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 ${hoveredSection === section.title ? 'w-full' : 'w-8'}`} />
                  </h4>
                  
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          className="text-gray-300 hover:text-yellow-400 transition-all duration-300 group flex items-center text-lg font-light"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-yellow-400" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            <span className="text-gray-400 font-light">Follow us:</span>
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-12 group shadow-lg"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-gray-400 font-light">
            <span>© 2024 Excellence. Made with</span>
            <Heart className="w-4 h-4 mx-2 text-red-400 animate-pulse" />
            <span>in New York</span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 p-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl backdrop-blur-sm border border-gray-600/30">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-serif text-white mb-2">Stay Updated</h4>
            <p className="text-gray-300 font-light">Subscribe to our newsletter for the latest insights and updates</p>
          </div>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Luxury Business Footer',
  description: 'Sophisticated footer with warm gold accents, elegant typography, and premium visual hierarchy',
  category: 'layout',
  icon: 'Globe',
}

export default Footer