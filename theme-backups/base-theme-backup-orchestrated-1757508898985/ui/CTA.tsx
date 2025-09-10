"use client"

import React, { useState, useEffect } from 'react'
import { ArrowRight, Star, Zap, Send } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Cta: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [emailFocused, setEmailFocused] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companySize: ''
  })

  const features = [
    { icon: Star, text: "Premium Quality Service" },
    { icon: Zap, text: "Lightning Fast Results" },
    { icon: Send, text: "24/7 Professional Support" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003d82' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-theme-primary-50 to-blue-50 rounded-full border border-theme-primary-100">
                <Star className="w-4 h-4 text-theme-primary-500 mr-2" />
                <span className="text-sm font-medium text-theme-primary-700">Trusted by 10,000+ Professionals</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-theme-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-theme-primary-600 to-blue-600 bg-clip-text text-transparent">
                  Business Today
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-theme-gray-600 leading-relaxed max-w-2xl">
                Join thousands of professionals who have revolutionized their workflow with our cutting-edge solutions. Experience unparalleled efficiency and results that speak for themselves.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      activeFeature === index 
                        ? 'bg-gradient-to-r from-theme-primary-50 to-blue-50 border border-theme-primary-200 shadow-lg transform scale-105' 
                        : 'bg-theme-gray-50 border border-theme-gray-100'
                    }`}
                  >
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-theme-primary-500 text-white shadow-lg' 
                        : 'bg-white text-theme-primary-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`font-semibold transition-colors duration-300 ${
                      activeFeature === index ? 'text-theme-primary-700' : 'text-theme-gray-700'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-theme-primary-500 to-blue-500 rounded-3xl blur-xl opacity-20 animate-pulse" />
            
            <div className="relative bg-white rounded-3xl shadow-2xl border border-theme-gray-100 p-8 lg:p-12 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-theme-gray-900 mb-4">
                  Start Your Journey
                </h2>
                <p className="text-theme-gray-600 text-lg">
                  Get instant access to premium features and dedicated support
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      content="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-theme-gray-200 rounded-xl focus:border-theme-primary-500 focus:outline-none transition-all duration-300 text-lg"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      aria-label="Full Name Input"
                    />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      content="Professional Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 text-lg ${
                        emailFocused 
                          ? 'border-theme-primary-500 shadow-lg bg-theme-primary-50' 
                          : 'border-theme-gray-200'
                      }`}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      aria-label="Email Address Input"
                    />
                  </div>
                  
                  <div className="relative">
                    <select 
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-theme-gray-200 rounded-xl focus:border-theme-primary-500 focus:outline-none transition-all duration-300 text-lg appearance-none bg-white"
                      aria-label="Company Size Selection"
                    >
                      <option value="">Company Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 w-5 h-5 text-theme-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full bg-gradient-to-r from-theme-primary-500 to-blue-600 hover:from-theme-primary-600 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-lg relative overflow-hidden group"
                  aria-label="Get Started Button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center space-x-3">
                    <span>Get Started Now</span>
                    <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                  </div>
                </button>

                <div className="text-center pt-4">
                  <p className="text-sm text-theme-gray-500">
                    No credit card required • 14-day free trial • Cancel anytime
                  </p>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-theme-gray-100">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-primary-600">99.9%</div>
                    <div className="text-sm text-theme-gray-500">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-primary-600">24/7</div>
                    <div className="text-sm text-theme-gray-500">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-primary-600">10k+</div>
                    <div className="text-sm text-theme-gray-500">Users</div>
                  </div>
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
  type: 'Cta',
  name: 'Professional CTA Component',
  description: 'Modern call-to-action component with animated features, form integration, and trust-focused design elements',
  category: 'content-blocks',
  icon: 'ArrowRight'
}


export default Cta;