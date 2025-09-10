"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Globe, Heart } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Footer: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleContactClick = (method: string) => {
    console.log(`Contact method selected: ${method}`)
  }

  const handleServiceClick = (service: string) => {
    console.log(`Service clicked: ${service}`)
  }

  const handleSocialClick = (platform: string) => {
    console.log(`Social platform: ${platform}`)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription')
  }

  return (
    <footer 
      ref={footerRef}
      className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 rounded-full opacity-20 animate-pulse"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-600 transform rotate-45 opacity-15"
        style={{ transform: `rotate(${45 + scrollY * 0.05}deg) translateY(${scrollY * -0.1}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-10"
        style={{ transform: `translateX(${scrollY * 0.08}px)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section with Diagonal Layout */}
        <div className={`transform transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-theme-primary-500 rounded-full opacity-20 animate-ping" />
              <h2 className="text-6xl lg:text-8xl font-black text-theme-gray-900 leading-none mb-6">
                Just<span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-500 to-theme-primary-700">Right</span>
                <span className="block text-4xl lg:text-6xl text-orange-500 font-light mt-4 transform -skew-x-6">Air Solutions</span>
              </h2>
              <p className="text-xl text-theme-gray-600 leading-relaxed font-medium max-w-lg">
                Where precision meets comfort. Licensed professionals delivering exceptional HVAC solutions with unwavering commitment to your satisfaction.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-theme-primary-500 via-theme-primary-600 to-theme-primary-700 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Phone className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">24/7 Emergency</h3>
                  <p className="text-theme-primary-100">Always here when you need us</p>
                </div>
                
                <button
                  onClick={() => handleContactClick('emergency')}
                  className="w-full bg-white text-theme-primary-600 font-bold text-2xl py-6 rounded-2xl hover:bg-theme-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg mb-6"
                  aria-label="Call emergency HVAC service"
                >
                  (555) 123-HVAC
                </button>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold">45min</p>
                    <p className="text-theme-primary-100 text-sm">Avg Response</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-theme-primary-100 text-sm">Availability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hexagonal Service Grid */}
        <div className="mb-24">
          <h3 className="text-4xl font-bold text-center text-theme-gray-900 mb-16">Our Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'AC Installation', icon: '❄️', color: 'from-blue-500 to-cyan-500', delay: '0ms' },
              { name: 'Heating Repair', icon: '🔥', color: 'from-orange-500 to-red-500', delay: '200ms' },
              { name: 'Air Quality', icon: '🌿', color: 'from-green-500 to-emerald-500', delay: '400ms' },
              { name: 'Maintenance', icon: '⚙️', color: 'from-purple-500 to-indigo-500', delay: '600ms' }
            ].map((service, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: service.delay }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <button
                  onClick={() => handleServiceClick(service.name)}
                  className={`w-full h-48 bg-gradient-to-br ${service.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 flex flex-col items-center justify-center group relative overflow-hidden`}
                  aria-label={`Learn about ${service.name} services`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-center relative z-10">{service.name}</h4>
                  <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty & Trust Section with Asymmetric Layout */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-theme-gray-900 via-theme-gray-800 to-theme-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-theme-primary-500 to-transparent rounded-full opacity-20" />
              
              <h3 className="text-4xl font-bold mb-8">Our Promise to You</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    5Y
                  </div>
                  <h4 className="font-bold text-lg mb-2">Equipment Warranty</h4>
                  <p className="text-theme-gray-300 text-sm">Comprehensive coverage on all installations</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2Y
                  </div>
                  <h4 className="font-bold text-lg mb-2">Labor Guarantee</h4>
                  <p className="text-theme-gray-300 text-sm">Quality workmanship protected</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">100% Satisfaction</h4>
                  <p className="text-theme-gray-300 text-sm">Your happiness guaranteed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-theme-primary-100 hover:border-theme-primary-300 transition-all duration-300">
              <h4 className="text-2xl font-bold text-theme-gray-900 mb-4">Get Connected</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  content="Your email address"
                  className="w-full px-6 py-4 bg-theme-gray-50 border-2 border-theme-gray-200 rounded-2xl focus:outline-none focus:border-theme-primary-500 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white font-bold py-4 rounded-2xl hover:from-theme-primary-600 hover:to-theme-primary-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 border-2 border-orange-200">
              <h4 className="text-xl font-bold text-theme-gray-900 mb-4">Follow Our Journey</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-500', platform: 'Facebook' },
                  { icon: Twitter, color: 'hover:bg-sky-500', platform: 'Twitter' },
                  { icon: Instagram, color: 'hover:bg-pink-500', platform: 'Instagram' },
                  { icon: Linkedin, color: 'hover:bg-blue-600', platform: 'LinkedIn' }
                ].map(({ icon: Icon, color, platform }, index) => (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(platform)}
                    className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center text-theme-gray-600 ${color} hover:text-white transition-all duration-300 hover:scale-110 transform shadow-md`}
                    aria-label={`Follow us on ${platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Strip with Curved Design */}
        <div className="relative mb-16">
          <div 
            className="bg-gradient-to-r from-theme-primary-500 via-theme-primary-600 to-theme-primary-500 rounded-3xl p-8 text-white shadow-2xl"
            style={{
              clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)'
            }}
          >
            <div className="grid md:grid-cols-3 gap-8 py-8">
              <button
                onClick={() => handleContactClick('phone')}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm"
                aria-label="Call for immediate service"
              >
                <Phone className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="text-center">
                  <p className="text-theme-primary-100 text-sm">Call Now</p>
                  <p className="font-bold text-xl">(555) 123-HVAC</p>
                </div>
              </button>
              
              <button
                onClick={() => handleContactClick('email')}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm"
                aria-label="Email us for quotes"
              >
                <Mail className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="text-center">
                  <p className="text-theme-primary-100 text-sm">Email Us</p>
                  <p className="font-bold text-xl">service@justrightair.com</p>
                </div>
              </button>
              
              <div className="flex flex-col items-center gap-4 p-6">
                <MapPin className="w-10 h-10 text-white" />
                <div className="text-center">
                  <p className="text-theme-primary-100 text-sm">Service Area</p>
                  <p className="font-bold text-xl">Greater Metro Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Legal */}
        <div className="border-t-2 border-theme-gray-200 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="text-theme-gray-700 font-semibold text-lg mb-2">
                © 2024 JustRightAir Solutions • Licensed & Insured HVAC Professionals
              </p>
              <p className="text-theme-gray-500">
                Proudly serving the community since 2010 • License #HVAC-2024-001 • Bonded & Insured
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-theme-gray-500">
              <span className="hover:text-theme-primary-600 cursor-pointer transition-colors duration-300">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-theme-primary-600 cursor-pointer transition-colors duration-300">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-theme-primary-600 cursor-pointer transition-colors duration-300">Careers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Dynamic Interactive HVAC Footer',
  description: 'Innovative footer with mouse-tracking effects, diagonal layouts, hexagonal service grid, and asymmetric design elements for modern HVAC business presentation',
  category: 'content-blocks',
  icon: 'Globe'
}


export default Footer;