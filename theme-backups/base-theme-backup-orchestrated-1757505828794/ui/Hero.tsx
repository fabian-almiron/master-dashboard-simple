"use client"

import React, { useState, useEffect } from 'react'
import { ArrowRight, Play, Star, Award } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const LuxuryHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: Award, text: "Premium Excellence" },
    { icon: Star, text: "Luxury Experience" },
    { icon: Play, text: "Innovation Forward" }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-gray-900 via-theme-gray-800 to-theme-gray-900 overflow-hidden">
      {/* Luxury Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Golden Accent Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-yellow-500/15 to-yellow-300/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium tracking-wide">Premium Business Solutions</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-serif text-theme-gray-100 leading-tight">
                Elevate Your
                <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Business Excellence
                </span>
              </h1>
              
              <p className="text-xl text-theme-gray-300 leading-relaxed max-w-2xl font-light">
                Transform your professional journey with sophisticated solutions designed for discerning leaders who demand nothing less than perfection.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 ${
                      activeFeature === index 
                        ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 scale-105' 
                        : 'bg-theme-gray-800/50 border border-theme-gray-700/50 hover:border-yellow-400/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${
                      activeFeature === index ? 'text-yellow-400' : 'text-theme-gray-400'
                    }`} />
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activeFeature === index ? 'text-yellow-400' : 'text-theme-gray-300'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-theme-gray-900 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group px-8 py-4 border-2 border-yellow-400/30 text-yellow-400 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-yellow-400/10 hover:border-yellow-400/50 hover:scale-105">
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-theme-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-theme-gray-400">Premium Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">99.9%</div>
                <div className="text-sm text-theme-gray-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-theme-gray-400">Premium Support</div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            {/* Main Visual Container */}
            <div className="relative">
              
              {/* Premium Card Stack */}
              <div className="relative w-full max-w-lg mx-auto">
                
                {/* Background Cards */}
                <div className="absolute top-4 left-4 w-full h-96 bg-gradient-to-br from-theme-gray-800 to-theme-gray-900 rounded-2xl border border-theme-gray-700/50 transform rotate-3" />
                <div className="absolute top-2 left-2 w-full h-96 bg-gradient-to-br from-theme-gray-700 to-theme-gray-800 rounded-2xl border border-theme-gray-600/50 transform rotate-1" />
                
                {/* Main Card */}
                <div className="relative w-full h-96 bg-gradient-to-br from-theme-gray-800 via-theme-gray-700 to-theme-gray-800 rounded-2xl border border-yellow-400/30 backdrop-blur-sm overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="p-8 border-b border-yellow-400/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-theme-gray-900" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-theme-gray-100">Premium Suite</h3>
                          <p className="text-sm text-theme-gray-400">Professional Edition</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">$299</div>
                        <div className="text-sm text-theme-gray-400">/month</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8 space-y-4">
                    {[
                      "Advanced Analytics Dashboard",
                      "24/7 Premium Support",
                      "Custom Integration Suite",
                      "Enterprise Security"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="text-theme-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                  
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-8 -right-8 bg-gradient-to-br from-theme-gray-800 to-theme-gray-900 border border-yellow-400/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">98%</div>
                  <div className="text-xs text-theme-gray-400">Success Rate</div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-theme-gray-800 to-theme-gray-900 border border-yellow-400/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">2.5k+</div>
                  <div className="text-xs text-theme-gray-400">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Luxury Business Hero',
  description: 'Sophisticated hero section with warm gold accents, premium visual hierarchy, and elegant micro-interactions for luxury business applications',
  category: 'content-blocks',
  icon: 'Award'
}

export default LuxuryHero;
