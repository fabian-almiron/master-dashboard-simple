"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Star, Zap } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Cta: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-yellow-400 font-medium tracking-wider text-sm uppercase">Premium Experience</span>
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Elevate Your
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Business Excellence
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Join the elite circle of professionals who demand nothing less than extraordinary results. 
            Experience the pinnacle of business sophistication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Star, title: "Premium Quality", desc: "Uncompromising excellence in every detail" },
            { icon: Zap, title: "Instant Results", desc: "Immediate impact on your business metrics" },
            { icon: ArrowRight, title: "Forward Thinking", desc: "Stay ahead with cutting-edge solutions" }
          ].map((feature, index) => (
            <div key={index} className="group text-center p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div 
            ref={ctaRef}
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && (
              <div 
                className="absolute pointer-events-none w-32 h-32 rounded-full opacity-20 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                  left: mousePosition.x - 64,
                  top: mousePosition.y - 64,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
            
            <button className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center gap-3">
                <span className="tracking-wide">Begin Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            </button>
          </div>
          
          <p className="mt-8 text-slate-400 text-sm">
            Join over 10,000+ professionals who trust our premium solutions
          </p>
          
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-slate-300 font-medium">4.9/5 Excellence Rating</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-full blur-3xl" />
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Luxury CTA',
  description: 'Sophisticated call-to-action with warm gold accents and premium interactions',
  category: 'content-blocks',
  icon: 'ArrowRight'
}

export default Cta;