"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Heart, Shield, Zap, Moon, Star } from 'lucide-react'

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: Star,
      title: "Intelligent Automation",
      description: "Streamline your workflow with AI-powered automation that learns and adapts to your business needs.",
      color: "from-purple-200 to-pink-200",
      accent: "bg-purple-100"
    },
    {
      icon: Heart,
      title: "Wellness-Focused Design",
      description: "Built with mindfulness principles to reduce stress and promote healthy work-life balance.",
      color: "from-rose-200 to-orange-200",
      accent: "bg-rose-100"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols to keep your data safe and compliant.",
      color: "from-green-200 to-teal-200",
      accent: "bg-green-100"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized for speed with sub-second response times and seamless user experiences.",
      color: "from-yellow-200 to-amber-200",
      accent: "bg-yellow-100"
    },
    {
      icon: Shield,
      title: "Sustainable Technology",
      description: "Carbon-neutral infrastructure with eco-friendly practices built into every feature.",
      color: "from-emerald-200 to-green-200",
      accent: "bg-emerald-100"
    },
    {
      icon: Moon,
      title: "Mindful Analytics",
      description: "Gentle insights that inform without overwhelming, promoting thoughtful decision-making.",
      color: "from-indigo-200 to-purple-200",
      accent: "bg-indigo-100"
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }}
      >
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-100 mb-6">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700">Features</span>
          </div>
          
          <h2 className="text-5xl font-serif text-gray-800 mb-6 leading-tight">
            Thoughtfully Crafted
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              for Your Wellbeing
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience technology that nurtures productivity while honoring your need for balance and mindful growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = activeFeature === index
              
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 ${
                    isActive 
                      ? 'bg-white/80 border-purple-200 shadow-2xl shadow-purple-100/50' 
                      : 'bg-white/40 border-white/30 hover:bg-white/60'
                  }`}>
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-2xl transition-all duration-500 ${
                        isActive ? feature.accent : 'bg-white/60'
                      }`}>
                        <Icon className={`w-8 h-8 transition-all duration-500 ${
                          isActive ? 'text-purple-600 scale-110' : 'text-gray-500'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-serif mb-3 transition-all duration-300 ${
                          isActive ? 'text-gray-800' : 'text-gray-600'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`text-lg leading-relaxed transition-all duration-300 ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div 
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-10 transition-opacity duration-500`}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 opacity-20 animate-pulse" />
              
              <div className={`absolute inset-8 rounded-full bg-gradient-to-r ${features[activeFeature].color} opacity-30 transition-all duration-1000 animate-pulse`} />
              
              <div className="absolute inset-16 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center transition-all duration-500">
                {React.createElement(features[activeFeature].icon, {
                  className: "w-24 h-24 text-purple-600 transition-all duration-500"
                })}
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 animate-bounce" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-bounce delay-300" />
              <div className="absolute top-1/4 -left-8 w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-teal-400 animate-bounce delay-700" />
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-40 animate-pulse"
                  style={{
                    top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                    left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    animationDelay: `${i * 200}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-purple-200 hover:bg-purple-300'
                }`}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Wellness Features Showcase',
  description: 'Interactive features component with mindful design, organic animations, and therapeutic color palette',
  category: 'content-blocks',
  icon: 'Star',
}

export default Features