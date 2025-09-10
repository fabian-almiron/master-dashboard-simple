"use client"

import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart, Globe } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setEmailSubscribed(true)
      setEmail('')
      setTimeout(() => setEmailSubscribed(false), 3000)
    }
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog & Insights', href: '#blog' },
    { name: 'Contact Us', href: '#contact' }
  ]

  const services = [
    { name: 'Digital Strategy', href: '#strategy' },
    { name: 'Web Development', href: '#web-dev' },
    { name: 'Mobile Applications', href: '#mobile' },
    { name: 'Cloud Solutions', href: '#cloud' },
    { name: 'Data Analytics', href: '#analytics' },
    { name: 'Business Consulting', href: '#consulting' }
  ]

  return (
    <footer className="bg-white border-t border-theme-gray-200 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`pt-16 pb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-theme-primary-600 mb-4 tracking-tight">
                  ModernBiz
                </h3>
                <p className="text-theme-gray-600 leading-relaxed text-sm mb-6">
                  Empowering businesses with innovative digital solutions and professional excellence. We are your trusted partner for sustainable growth and success in the modern digital landscape, delivering results that matter for your organization.
                </p>
              </div>
              
              <div className="flex space-x-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`w-11 h-11 bg-theme-gray-100 ${color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg transform group`}
                    aria-label={label}
                    onMouseEnter={() => setHoveredLink(label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Icon className="w-5 h-5 text-theme-gray-600 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-theme-gray-900">Quick Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-theme-gray-600 hover:text-theme-primary-600 transition-all duration-300 flex items-center group text-sm"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <ArrowRight className={`w-4 h-4 mr-3 text-theme-primary-400 transition-transform duration-300 ${hoveredLink === link.name ? 'translate-x-1' : ''}`} />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-theme-gray-900">Our Expertise</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-theme-gray-600 hover:text-theme-primary-600 transition-all duration-300 flex items-center group text-sm"
                      onMouseEnter={() => setHoveredLink(service.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <ArrowRight className={`w-4 h-4 mr-3 text-theme-primary-400 transition-transform duration-300 ${hoveredLink === service.name ? 'translate-x-1' : ''}`} />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-theme-gray-900">Stay Connected</h4>
              
              <div className="bg-theme-gray-50 rounded-2xl p-6 mb-6 border border-theme-gray-100">
                <p className="text-sm text-theme-gray-600 mb-4">Subscribe to our newsletter for industry insights and updates</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    content="Enter your email address"
                    className="w-full px-4 py-3 bg-white border border-theme-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent text-theme-gray-900 content-theme-gray-400 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-theme-primary-600 hover:bg-theme-primary-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm"
                  >
                    {emailSubscribed ? 'Successfully Subscribed!' : 'Subscribe Now'}
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-theme-gray-600 group">
                  <div className="w-10 h-10 bg-theme-primary-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-theme-primary-200 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-theme-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-gray-900">Email Us</p>
                    <p className="text-sm">hello@modernbiz.com</p>
                  </div>
                </div>
                
                <div className="flex items-center text-theme-gray-600 group">
                  <div className="w-10 h-10 bg-theme-primary-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-theme-primary-200 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-theme-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-gray-900">Call Us</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start text-theme-gray-600 group">
                  <div className="w-10 h-10 bg-theme-primary-100 rounded-lg flex items-center justify-center mr-3 mt-1 group-hover:bg-theme-primary-200 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-theme-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-gray-900">Visit Us</p>
                    <p className="text-sm">123 Business Avenue, Suite 100<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-theme-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-theme-gray-500 text-sm">
              <span>© 2024 ModernBiz. Crafted with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
              <span>for our valued clients</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-theme-gray-500 hover:text-theme-primary-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#terms" className="text-theme-gray-500 hover:text-theme-primary-600 transition-colors duration-300">Terms of Service</a>
              <a href="#cookies" className="text-theme-gray-500 hover:text-theme-primary-600 transition-colors duration-300">Cookie Policy</a>
              <div className="flex items-center text-theme-gray-400">
                <Globe className="w-4 h-4 mr-1" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Professional Business Footer',
  description: 'Clean and professional footer with newsletter signup, contact information, social links, and trust-focused design elements',
  category: 'content-blocks',
  icon: 'Mail'
}


export default Footer;