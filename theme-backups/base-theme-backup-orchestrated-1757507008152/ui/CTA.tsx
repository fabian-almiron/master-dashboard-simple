"use client"

import React, { useState, useEffect } from 'react'
import { ArrowRight, Star, Zap, Send } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Cta: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [activeService, setActiveService] = useState('hvac')
  const [pulseAnimation, setPulseAnimation] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 1000)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    {
      id: 'hvac',
      title: 'HVAC Services',
      description: 'Professional heating, ventilation, and air conditioning solutions',
      color: 'from-blue-500 to-blue-600',
      icon: Zap
    },
    {
      id: 'plumbing',
      title: 'Plumbing Services',
      description: 'Expert plumbing repairs and installations',
      color: 'from-orange-500 to-orange-600',
      icon: Star
    }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-primary-50 via-white to-theme-gray-100 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-3xl animate-pulse"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 blur-3xl animate-pulse"
          style={{
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-theme-primary-100 rounded-full text-theme-primary-700 font-semibold text-sm mb-6">
            <Star className="w-4 h-4 mr-2 text-orange-500" />
            Trusted Local Experts Since 2010
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-theme-gray-900 mb-8 leading-tight">
            Your Comfort is Our
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              Top Priority
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-theme-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience professional HVAC and plumbing services with guaranteed satisfaction. 
            Our certified technicians provide reliable solutions for your home and business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className={`relative p-8 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeService === service.id 
                    ? 'bg-white/90 shadow-2xl' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={() => setActiveService(service.id)}
                onMouseEnter={() => setActiveService(service.id)}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${service.color} shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-theme-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-theme-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-theme-gray-600 font-medium">4.9/5 Rating</span>
                  </div>
                  <ArrowRight className={`w-6 h-6 text-theme-primary-500 transition-transform duration-300 ${
                    activeService === service.id ? 'translate-x-2' : ''
                  }`} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-theme-primary-600 to-blue-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-3xl" />
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Join thousands of satisfied customers who trust Just Right Air for all their HVAC and plumbing needs. 
                  Get your free estimate today and experience the difference quality service makes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-blue-100">24/7 Emergency Service</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-blue-100">Licensed & Insured</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  className={`w-full px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xl rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/25 ${
                    pulseAnimation ? 'animate-pulse' : ''
                  }`}
                  onClick={() => setIsHovered(!isHovered)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  aria-label="Get free estimate"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Send className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    <span>Get Free Estimate</span>
                  </div>
                </button>
                
                <div className="text-center">
                  <p className="text-blue-200 text-lg font-semibold mb-2">
                    Or call us now for immediate service
                  </p>
                  <a 
                    href="tel:555-123-4567"
                    className="text-3xl font-bold text-orange-400 hover:text-orange-300 transition-colors duration-300"
                  >
                    (555) 123-HVAC
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-theme-primary-600 mb-2">500+</div>
            <p className="text-theme-gray-600 font-medium">Happy Customers</p>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-theme-primary-600 mb-2">15+</div>
            <p className="text-theme-gray-600 font-medium">Years Experience</p>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-theme-primary-600 mb-2">24/7</div>
            <p className="text-theme-gray-600 font-medium">Emergency Service</p>
          </div>
        </div>
      </div>

      
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Professional HVAC CTA Component',
  description: 'Innovative call-to-action component for HVAC and plumbing services with trust-building elements, service-specific iconography, and emergency contact prominence',
  category: 'content-blocks',
  icon: 'ArrowRight'
}


export default Cta;