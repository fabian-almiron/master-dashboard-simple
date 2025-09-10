"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Shield, CheckCircle, Zap, Users, Award, Star } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured Professionals",
      description: "All our HVAC and plumbing technicians are fully licensed, bonded, and insured for your complete peace of mind and protection.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Zap,
      title: "24/7 Emergency Service",
      description: "When your heating, cooling, or plumbing systems fail, we're here around the clock to restore comfort to your home or business.",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: Award,
      title: "Satisfaction Guarantee",
      description: "We stand behind our work with a comprehensive satisfaction guarantee and industry-leading warranties on all services and installations.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Local Community Experts",
      description: "As your trusted local service provider, we understand the unique climate challenges and building codes in our community.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Upfront Pricing",
      description: "No surprises or hidden fees. We provide detailed estimates before any work begins, ensuring complete transparency in all our services.",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      icon: Star,
      title: "Premium Quality Parts",
      description: "We use only the highest quality, energy-efficient equipment and parts from trusted manufacturers to ensure lasting performance.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-theme-primary-100 rounded-full text-theme-primary-700 font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Why Choose Just Right Air
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Professional Service You Can
            <span className="block bg-gradient-to-r from-theme-primary-600 to-blue-600 bg-clip-text text-transparent">
              Trust Completely
            </span>
          </h2>
          
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that comes with choosing a local, family-owned business committed to excellence, reliability, and your complete satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-theme-gray-900 mb-4 group-hover:text-theme-primary-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-theme-gray-600 leading-relaxed group-hover:text-theme-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-theme-primary-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <CheckCircle className="w-4 h-4 text-theme-primary-600" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-theme-primary-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Professional Service?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover why homeowners and businesses trust Just Right Air for all their HVAC and plumbing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-8 py-4 bg-white text-theme-primary-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                onClick={() = aria-label="Action button"> window.location.href = 'tel:555-123-4567'}
              >
                <Zap className="w-5 h-5 mr-2" />
                Call Now: (555) 123-4567
              </button>
              
              <button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-theme-primary-600 transition-all duration-300 flex items-center"
                onClick={() = aria-label="Action button"> window.location.href = '#contact'}
              >
                <Award className="w-5 h-5 mr-2" />
                Get Free Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Professional HVAC Features',
  description: 'Comprehensive features showcase for HVAC and plumbing services with trust-building elements and professional design',
  category: 'content-blocks',
  icon: 'Shield'
}


export default Features;