"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, Award, Star, Users, Zap, Play } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Hero: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeService, setActiveService] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    { name: "Sarah Johnson", rating: 5, text: "Emergency repair at 2AM - they were here in 90 minutes!", location: "Downtown" },
    { name: "Mike Chen", rating: 5, text: "New system installation was flawless. Lifetime warranty included!", location: "Westside" },
    { name: "Lisa Rodriguez", rating: 5, text: "Annual maintenance keeps our bills low. Highly recommend!", location: "Northgate" }
  ]

  const services = [
    { title: "Emergency Repair", time: "&lt; 2 Hours", icon: Zap, color: "theme-red-500" },
    { title: "New Installation", time: "Same Day", icon: Shield, color: "theme-blue-500" },
    { title: "Maintenance", time: "Scheduled", icon: Award, color: "theme-green-500" },
    { title: "Inspection", time: "Quick Visit", icon: Award, color: "theme-orange-500" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    
    if (heroRef.current) observer.observe(heroRef.current)
    
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 3500)

    const serviceTimer = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length)
    }, 2800)

    return () => {
      observer.disconnect()
      clearInterval(testimonialTimer)
      clearInterval(serviceTimer)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+15555878247'
  }

  const handleScheduleService = () => {
    const contactSection = document.getElementById('contact-section')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-white via-theme-gray-50 to-theme-blue-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-theme-blue-400 rounded-full opacity-30"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
              transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 15 - 7}px)`,
              transition: 'transform 0.6s ease-out',
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-32 h-32 border-2 border-theme-orange-200 rounded-full opacity-40"
          style={{
            transform: `rotate(${mousePosition.x * 45}deg) scale(${1 + mousePosition.y * 0.2})`,
            transition: 'transform 0.8s ease-out'
          }}
        />
        <div 
          className="absolute bottom-32 left-16 w-24 h-24 bg-theme-blue-100 rounded-lg opacity-30"
          style={{
            transform: `rotate(${mousePosition.y * -30}deg) translateX(${mousePosition.x * 10}px)`,
            transition: 'transform 0.7s ease-out'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="pt-8 pb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-red-500 to-theme-red-600 rounded-2xl blur-sm opacity-80" />
            <div className="relative bg-theme-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center space-x-3 text-center">
                <Zap className="w-5 h-5 animate-pulse" />
                <span className="font-bold text-lg">24/7 EMERGENCY HVAC SERVICE</span>
                <div className="hidden sm:flex items-center space-x-2 ml-4">
                  <span className="text-theme-red-100">Call Now:</span>
                  <span className="font-black text-xl">(555) 587-8247</span>
                </div>
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start min-h-[75vh] py-8">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className={`transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center bg-white shadow-lg border border-theme-blue-100 text-theme-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Shield className="w-4 h-4 mr-2" />
                Licensed & Insured Since 2008
                <div className="ml-3 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-theme-orange-400 text-theme-orange-400" />
                  ))}
                </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6">
                <div className="relative inline-block">
                  <span className="text-theme-gray-900">Just</span>
                  <span className="text-theme-blue-600">Right</span>
                  <div className="absolute -top-2 -right-8 w-6 h-6 bg-theme-orange-500 rounded-full animate-pulse" />
                </div>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-theme-orange-500 via-theme-red-500 to-theme-orange-600 bg-clip-text text-transparent">
                    Air Solutions
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-theme-orange-500 to-theme-red-500 rounded-full" />
                </span>
              </h1>
              
              <p className="text-2xl text-theme-gray-700 leading-relaxed max-w-2xl font-medium">
                Your trusted HVAC partner delivering comfort, reliability, and peace of mind to homes across the city. 
                <span className="text-theme-blue-600 font-semibold"> Experience the difference quality makes.</span>
              </p>
            </div>

            {/* Interactive Service Carousel */}
            <div className="bg-white rounded-3xl shadow-2xl border border-theme-gray-100 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-theme-gray-900">Our Expert Services</h3>
                <div className="flex space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveService(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeService === index ? 'bg-theme-blue-500 scale-125' : 'bg-theme-gray-300 hover:bg-theme-gray-400'
                      }`}
                      aria-label={`Select service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative overflow-hidden h-32">
                {services.map((service, index) => {
                  const IconComponent = service.icon
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 transform ${
                        activeService === index 
                          ? 'translate-x-0 opacity-100 scale-100' 
                          : index < activeService 
                            ? '-translate-x-full opacity-0 scale-95' 
                            : 'translate-x-full opacity-0 scale-95'
                      }`}
                    >
                      <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-theme-gray-50 to-white border border-theme-gray-100">
                        <div className={`p-4 rounded-2xl bg-${service.color} text-white shadow-lg`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-theme-gray-900 mb-1">{service.title}</h4>
                          <p className="text-theme-gray-600 text-lg">Response Time: <span className="font-semibold text-theme-blue-600">{service.time}</span></p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-theme-green-600">✓</div>
                          <div className="text-sm text-theme-gray-500">Available</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={handleEmergencyCall}
                className="group relative bg-gradient-to-r from-theme-blue-600 to-theme-blue-700 hover:from-theme-blue-700 hover:to-theme-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center overflow-hidden"
                aria-label="Call for emergency service"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Call (555) 587-8247
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleScheduleService}
                className="bg-white hover:bg-theme-gray-50 text-theme-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 border-3 border-theme-gray-200 hover:border-theme-blue-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Schedule Service
              </button>
            </div>
          </div>

          {/* Right Column - Trust Elements */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Trust Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-blue-500 to-theme-blue-700 rounded-3xl blur-lg opacity-20" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-theme-gray-100 transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-theme-blue-500 to-theme-blue-600 rounded-full mb-6 shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-theme-gray-900 mb-2">Lifetime Warranty</h3>
                  <p className="text-theme-gray-600 text-lg">On all new system installations</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-theme-orange-50 to-theme-orange-100 rounded-xl border border-theme-orange-200">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-theme-orange-500 mr-4" />
                      <span className="text-theme-gray-800 font-semibold">Customer Rating</span>
                    </div>
                    <span className="text-2xl font-black text-theme-gray-900">4.9/5.0</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-theme-green-50 to-theme-green-100 rounded-xl border border-theme-green-200">
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-theme-green-500 mr-4" />
                      <span className="text-theme-gray-800 font-semibold">Happy Customers</span>
                    </div>
                    <span className="text-2xl font-black text-theme-gray-900">15,000+</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-theme-blue-50 to-theme-blue-100 rounded-xl border border-theme-blue-200">
                    <div className="flex items-center">
                      <Zap className="w-6 h-6 text-theme-blue-500 mr-4" />
                      <span className="text-theme-gray-800 font-semibold">Avg Response</span>
                    </div>
                    <span className="text-2xl font-black text-theme-gray-900">&lt; 90 Min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Testimonial Rotator */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-theme-gray-100">
              <h4 className="text-lg font-bold text-theme-gray-900 mb-4">What Customers Say</h4>
              <div className="relative overflow-hidden h-24">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      currentTestimonial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex space-x-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-theme-orange-400 text-theme-orange-400" />
                        ))}
                      </div>
                      <p className="text-theme-gray-700 font-medium">"{testimonial.text}"</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-theme-gray-900">{testimonial.name}</span>
                        <span className="text-theme-gray-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Achievement Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-theme-green-500 to-theme-green-600 text-white p-6 rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-black">A+</div>
                  <div className="text-sm opacity-90">BBB Rating</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-theme-orange-500 to-theme-orange-600 text-white p-6 rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-black">15+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="pb-16 pt-8">
          <div className="bg-white rounded-3xl shadow-xl border border-theme-gray-100 p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-theme-blue-600 mb-2">100%</div>
                <div className="text-theme-gray-600 font-semibold">Satisfaction Guaranteed</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-theme-green-600 mb-2">24/7</div>
                <div className="text-theme-gray-600 font-semibold">Emergency Service</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-theme-orange-600 mb-2">Same</div>
                <div className="text-theme-gray-600 font-semibold">Day Installation</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-theme-red-600 mb-2">Free</div>
                <div className="text-theme-gray-600 font-semibold">Detailed Estimates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'JustRight Air Premium Hero',
  description: 'Advanced HVAC hero with interactive service carousel, live testimonials, and dynamic trust indicators',
  category: 'content-blocks',
  icon: 'Shield'
}


export default Hero;