"use client"

import React, { useState, useEffect } from 'react'
import { ArrowRight, Shield, Star, Users, Play, Award } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    { name: 'HVAC Services', color: 'from-blue-500 to-blue-600', icon: Shield },
    { name: 'Plumbing Solutions', color: 'from-amber-600 to-orange-500', icon: Award },
    { name: 'Emergency Repairs', color: 'from-red-500 to-red-600', icon: Star }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-theme-primary-100 text-theme-primary-700 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Licensed & Insured Professionals
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-gray-900 leading-tight mb-6">
              Just Right
              <span className="block text-theme-primary-600">Air & Plumbing</span>
            </h1>
            
            <p className="text-xl text-theme-gray-600 leading-relaxed mb-8 max-w-2xl">
              Your trusted local experts for comprehensive HVAC and plumbing services. We deliver reliable solutions with a commitment to excellence, ensuring your home stays comfortable year-round with emergency support available 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => window.location.href = 'tel:555-0123'}
                onMouseEnter={() => setIsVisible(true)}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                aria-label="Call for emergency service"
              >
                <span className="flex items-center justify-center">
                  Emergency Service: (555) 123-4567
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white hover:bg-theme-gray-50 text-theme-gray-700 font-semibold rounded-xl border-2 border-theme-gray-200 hover:border-theme-primary-300 shadow-md transform transition-all duration-300 hover:scale-105"
                aria-label="View our services"
              >
                <span className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  View Services
                </span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-theme-primary-600 mb-1">15+</div>
                <div className="text-sm text-theme-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-theme-primary-600 mb-1">2.5k+</div>
                <div className="text-sm text-theme-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-theme-primary-600 mb-1">24/7</div>
                <div className="text-sm text-theme-gray-600">Emergency Support</div>
              </div>
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-theme-primary-200 to-blue-200 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
                <div className="space-y-6">
                  {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                      <div 
                        key={index}
                        className={`flex items-center p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                          activeService === index 
                            ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-lg scale-105' 
                            : 'bg-theme-gray-50 hover:bg-theme-gray-100 text-theme-gray-700'
                        }`}
                        onClick={() => setActiveService(index)}
                        onMouseEnter={() => setActiveService(index)}
                      >
                        <div className={`p-3 rounded-xl mr-4 ${
                          activeService === index ? 'bg-white/20' : 'bg-white shadow-md'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            activeService === index ? 'text-white' : 'text-theme-primary-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className={`text-sm ${
                            activeService === index ? 'text-white/80' : 'text-theme-gray-500'
                          }`}>
                            Professional & Reliable
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${
                                activeService === index ? 'text-yellow-300 fill-current' : 'text-yellow-400 fill-current'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-theme-primary-50 to-blue-50 rounded-2xl border border-theme-primary-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-theme-gray-900 mb-1">Local Experts</h4>
                      <p className="text-sm text-theme-gray-600">Serving the community with pride</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-theme-primary-600" />
                      <span className="text-sm font-medium text-theme-primary-700">Trusted Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Professional HVAC Hero',
  description: 'Trust-focused hero component for HVAC and plumbing services with emergency contact prominence and local credibility elements',
  category: 'content-blocks',
  icon: 'Shield'
}


export default Hero;