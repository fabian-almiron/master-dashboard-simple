"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Zap, Star, Send, Play, Download } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Cta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const rippleId = useRef(0)

  const features = [
    { icon: Zap, title: "Instant Response", desc: "24/7 emergency service" },
    { icon: Star, title: "Premium Quality", desc: "5-star rated technicians" },
    { icon: Download, title: "Free Estimates", desc: "No hidden costs ever" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [features.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const newRipple = {
      id: rippleId.current++,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e)
    setTimeout(() => {
      window.location.href = '/contact'
    }, 200)
  }

  const handleCallNow = () => {
    window.location.href = 'tel:+1-800-JUSTAIR'
  }

  const handleWatchDemo = () => {
    window.location.href = '/services'
  }

  return (
    <section 
      ref={ctaRef}
      className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-theme-primary-200 rounded-full transition-all duration-3000 ${isVisible ? 'opacity-40' : 'opacity-0'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                transform: isVisible ? 'scale(1)' : 'scale(0)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Floating Trust Badge */}
        <div className={`fixed top-8 right-8 z-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-theme-primary-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-theme-gray-700">Live Support Available</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                Trusted by 15,000+ Customers
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-theme-gray-900 leading-tight">
                Your Comfort
                <span className="block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-500 to-theme-primary-700">
                    Guaranteed
                  </span>
                  <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 rounded-full transform -skew-x-12" />
                </span>
              </h1>
              
              <p className="text-xl text-theme-gray-600 leading-relaxed max-w-lg">
                Experience premium HVAC service with certified technicians, transparent pricing, and 24/7 emergency support. Your satisfaction is our commitment.
              </p>
            </div>

            {/* Feature Carousel */}
            <div className="relative h-20 overflow-hidden rounded-2xl bg-gradient-to-r from-theme-primary-50 to-theme-primary-100 p-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center gap-4 p-6 transition-all duration-700 ${
                      activeFeature === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="w-12 h-12 bg-theme-primary-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-gray-900">{feature.title}</h3>
                      <p className="text-theme-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="group relative overflow-hidden bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                aria-label="Get started with JustRight Air service"
              >
                {ripples.map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping"
                    style={{
                      left: ripple.x - 10,
                      top: ripple.y - 10,
                      width: 20,
                      height: 20
                    }}
                  />
                ))}
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={handleCallNow}
                className="group bg-white border-2 border-theme-primary-200 hover:border-theme-primary-400 text-theme-primary-600 font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:bg-theme-primary-50"
                aria-label="Call JustRight Air now"
              >
                <Zap className="w-5 h-5" />
                Call (800) JUST-AIR
              </button>
            </div>
          </div>

          {/* Right Column - Interactive Card */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-theme-primary-100 hover:shadow-3xl transition-all duration-500 group">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-theme-primary-400 to-theme-primary-600 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-theme-primary-200 to-theme-primary-300 rounded-full opacity-30 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-theme-gray-900">Free Consultation</h3>
                  <p className="text-theme-gray-600">Get expert advice and detailed estimates for your HVAC needs</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-theme-primary-50 rounded-xl">
                    <div className="text-3xl font-black text-theme-primary-600 mb-1">24/7</div>
                    <div className="text-sm text-theme-gray-600">Emergency Service</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-3xl font-black text-green-600 mb-1">100%</div>
                    <div className="text-sm text-theme-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <div className="text-3xl font-black text-yellow-600 mb-1">15+</div>
                    <div className="text-sm text-theme-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-black text-purple-600 mb-1">5★</div>
                    <div className="text-sm text-theme-gray-600">Average Rating</div>
                  </div>
                </div>

                <button
                  onClick={handleWatchDemo}
                  className="w-full bg-gradient-to-r from-theme-gray-100 to-theme-gray-200 hover:from-theme-gray-200 hover:to-theme-gray-300 text-theme-gray-700 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  aria-label="Watch service demonstration"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Our Process
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-theme-primary-100 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-theme-primary-400 to-theme-primary-600 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-current" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-theme-gray-900">15,000+ Happy Customers</div>
                  <div className="text-sm text-theme-gray-600">Rated 4.9/5 stars across all platforms</div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="font-bold text-theme-primary-600">Licensed & Insured</div>
                <div className="text-sm text-theme-gray-600">Fully certified HVAC professionals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary-400 via-theme-primary-500 to-theme-primary-600" />
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Dynamic Trust-Focused CTA',
  description: 'Innovative call-to-action component featuring interactive elements, animated features carousel, ripple effects, and trust-building design elements for professional HVAC services',
  category: 'content-blocks',
  icon: 'ArrowRight'
}


export default Cta;