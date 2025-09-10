"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight, Play, Sparkles, Zap, Shield, Target } from 'lucide-react'

const MinimalistHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Shield, text: 'Secure & Reliable' },
    { icon: Target, text: 'Precision Focused' }
  ]

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-gray-100 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-theme-primary-100 rounded-full opacity-20 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-theme-accent-100 rotate-45 opacity-15"
          style={{
            transform: `rotate(45deg) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
          }}
        />
        <div 
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-theme-primary-200 rounded-lg opacity-25"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              {/* Badge */}
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-theme-gray-200 rounded-full text-sm font-medium text-theme-gray-700 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Sparkles className="w-4 h-4 text-theme-primary-500" />
                Modern Business Solutions
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 
                  className={`text-5xl lg:text-7xl font-bold text-theme-gray-900 leading-tight transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  Build Your
                  <span className="block text-theme-primary-600 relative">
                    Future Today
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-theme-primary-500 to-theme-accent-500 rounded-full transform scale-x-0 animate-[scaleX_1s_ease-out_1.5s_forwards] origin-left" />
                  </span>
                </h1>
                
                <p 
                  className={`text-xl lg:text-2xl text-theme-gray-600 leading-relaxed max-w-lg transition-all duration-1000 delay-400 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  Professional solutions designed for modern businesses. Clean, efficient, and built to scale.
                </p>
              </div>

              {/* Feature Pills */}
              <div 
                className={`flex flex-wrap gap-3 transition-all duration-1000 delay-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-theme-gray-200 rounded-full text-sm font-medium text-theme-gray-700 hover:bg-white/80 hover:border-theme-primary-300 transition-all duration-300 cursor-default"
                  >
                    <feature.icon className="w-4 h-4 text-theme-primary-500" />
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary-500/25 hover:-translate-y-0.5">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-theme-gray-200 hover:border-theme-gray-300 text-theme-gray-700 font-semibold rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Visual Section */}
            <div className="relative">
              <div 
                className={`relative transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-sm border border-theme-gray-200 rounded-3xl p-8 shadow-2xl shadow-theme-gray-900/10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-theme-primary-500 rounded-full" />
                      <div className="w-3 h-3 bg-theme-accent-500 rounded-full" />
                      <div className="w-3 h-3 bg-theme-gray-300 rounded-full" />
                    </div>
                    <div className="text-sm text-theme-gray-500 font-mono">base-theme.com</div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-theme-primary-200 to-theme-primary-100 rounded-full w-3/4" />
                      <div className="h-4 bg-gradient-to-r from-theme-gray-200 to-theme-gray-100 rounded-full w-1/2" />
                      <div className="h-4 bg-gradient-to-r from-theme-accent-200 to-theme-accent-100 rounded-full w-2/3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gradient-to-br from-theme-primary-100 to-theme-primary-50 rounded-xl border border-theme-primary-200" />
                      <div className="h-20 bg-gradient-to-br from-theme-accent-100 to-theme-accent-50 rounded-xl border border-theme-accent-200" />
                    </div>

                    <div className="flex justify-center">
                      <div className="w-32 h-8 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-lg" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-2xl shadow-lg animate-bounce" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-theme-accent-500 to-theme-accent-600 rounded-xl shadow-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}

export default MinimalistHero

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Minimalist Hero',
  description: 'Clean and modern hero section with interactive elements and professional design',
  category: 'layout',
  icon: 'Sparkles',
}