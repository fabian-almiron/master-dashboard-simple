"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight, Heart, Star, Zap } from 'lucide-react'

const Cta: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setFloatingElements(elements)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      })
    }
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6d7ff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-green-50/60 to-peach-50/80" />
      
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-200 to-green-200 opacity-40"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animation: `float ${3 + element.delay}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-100/50">
          <Star className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-600">Transform Your Business Today</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-800 mb-6 leading-tight">
          Ready to Experience
          <span className="block bg-gradient-to-r from-purple-400 via-green-400 to-peach-400 bg-clip-text text-transparent">
            Echo Smart?
          </span>
        </h2>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Join thousands of professionals who have transformed their workflow with our mindful approach to modern business solutions.
        </p>

        <div 
          ref={containerRef}
          className="relative inline-block"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="absolute inset-0 rounded-full opacity-20 transition-all duration-700"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(251, 146, 60, 0.1) 100%)`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: 'blur(20px)'
            }}
          />
          
          <button className="relative group px-12 py-6 bg-white/80 backdrop-blur-md rounded-full border border-purple-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-400 group-hover:text-peach-400 transition-colors duration-300" />
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  Start Your Journey
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
            
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/20 via-green-200/20 to-peach-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.1) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(251, 146, 60, 0.1) 100%)`
              }}
            />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span>Mindful Design</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <span>30-Day Free Trial</span>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <span>No Credit Card Required</span>
        </div>
      </div>

      
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Wellness CTA',
  description: 'Dreamy call-to-action with organic animations and therapeutic colors',
  category: 'content-blocks',
  icon: 'Star',
}

export default Cta