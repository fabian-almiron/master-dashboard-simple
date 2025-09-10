"use client"

import React, { useState, useEffect } from 'react'
import { ArrowRight, Shield, Users, Award, Star } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: Shield, title: "Trusted Security", description: "Enterprise-grade protection for your business" },
    { icon: Users, title: "Expert Team", description: "Professional excellence in every project" },
    { icon: Award, title: "Proven Results", description: "Measurable success and sustainable growth" }
  ]

  const stats = [
    { value: "10,000+", label: "Satisfied Clients" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Expert Support" },
    { value: "50+", label: "Countries Served" }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-primary-25 to-theme-gray-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003d82' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-theme-primary-200 to-theme-primary-300 rounded-full opacity-20 blur-xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-theme-primary-300 to-theme-primary-400 rounded-full opacity-10 blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-theme-primary-200 shadow-lg">
              <Trophy className="w-4 h-4 text-theme-primary-600 mr-2" />
              <span className="text-sm font-semibold text-theme-primary-700">Industry Leading Solutions</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-gray-900 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-theme-primary-600 via-theme-primary-700 to-theme-primary-800 bg-clip-text text-transparent">
                Excellence
              </span>
              <span className="block text-theme-gray-800">Delivered</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-theme-gray-600 leading-relaxed max-w-2xl">
              Transform your business with our comprehensive suite of professional services. We deliver innovative solutions that drive measurable results and sustainable growth for modern enterprises across all industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setIsVisible(!isVisible)}
                onMouseEnter={() => setHoveredButton('primary')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative px-8 py-4 bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 hover:from-theme-primary-700 hover:to-theme-primary-800 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-theme-primary-200 overflow-hidden"
                aria-label="Get started with our professional services"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center font-semibold text-lg">
                  Get Started Today
                  <ArrowRight className={`w-5 h-5 ml-2 transform transition-all duration-300 ${hoveredButton === 'primary' ? 'translate-x-2 scale-110' : ''}`} />
                </span>
              </button>
              
              <button 
                onClick={() => setActiveFeature((prev) => (prev + 1) % 3)}
                onMouseEnter={() => setHoveredButton('secondary')}
                onMouseLeave={() => setHoveredButton(null)}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-theme-gray-300 hover:border-theme-primary-500 text-theme-gray-700 hover:text-theme-primary-600 rounded-xl transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-theme-gray-200 hover:bg-white"
                aria-label="Learn more about our professional approach"
              >
                <span className="font-semibold text-lg">Learn More</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 bg-gradient-to-br from-theme-primary-400 to-theme-primary-600 rounded-full border-2 border-white shadow-md transform hover:scale-110 transition-transform duration-200 cursor-pointer"
                      onClick={() => setActiveFeature(i % 3)}
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-theme-gray-600 mt-1">Trusted by 10,000+ professionals worldwide</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-theme-gray-200 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveFeature(index % 3)}
                >
                  <div className="text-2xl font-bold text-theme-primary-600">{stat.value}</div>
                  <div className="text-sm text-theme-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-1200 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-white/90 to-theme-primary-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-2xl shadow-lg transform rotate-12 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div 
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      onMouseEnter={() => setActiveFeature(index)}
                      className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                        activeFeature === index 
                          ? 'bg-white shadow-xl border-2 border-theme-primary-200 scale-105' 
                          : 'bg-white/70 hover:bg-white hover:shadow-lg border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          activeFeature === index 
                            ? 'bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 text-theme-primary-600 shadow-md' 
                            : 'bg-theme-gray-100 text-theme-gray-600 hover:bg-theme-primary-50'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-theme-gray-900">{feature.title}</h3>
                          <p className="text-theme-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-3xl opacity-30 blur-sm" />
          </div>
        </div>
        
        <div className="mt-20 lg:mt-32">
          <p className="text-center text-theme-gray-500 mb-8 text-lg">Trusted by leading organizations worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="text-center group cursor-pointer"
                onClick={() => setActiveFeature(i % 3)}
              >
                <div className="h-12 bg-gradient-to-r from-theme-gray-300 to-theme-gray-400 rounded-lg mb-3 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <p className="text-sm text-theme-gray-500 group-hover:text-theme-gray-700 transition-colors duration-300">Trusted Partner</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Professional Excellence Hero',
  description: 'Modern hero component with trust-focused design, interactive features, and professional aesthetic with advanced animations',
  category: 'content-blocks',
  icon: 'ArrowRight'
}


export default Hero;