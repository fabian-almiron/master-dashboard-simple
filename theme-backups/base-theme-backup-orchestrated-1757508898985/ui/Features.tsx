"use client"

import React, { useState, useEffect } from 'react'
import { Check, Shield, Zap, Target, Award, Users, Star, Heart } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols protect your data with multi-layer authentication and real-time threat monitoring for complete peace of mind.",
      metrics: "99.9% Security Rating",
      benefits: ["256-bit SSL encryption", "Multi-factor authentication", "24/7 security monitoring", "Compliance certified"]
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized infrastructure delivers blazing-fast response times with guaranteed uptime and global CDN distribution for seamless user experiences.",
      metrics: "Sub-second Response",
      benefits: ["Global edge network", "99.9% uptime SLA", "Auto-scaling infrastructure", "Performance optimization"]
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Advanced analytics engine provides actionable insights with real-time reporting and predictive intelligence capabilities for data-driven decisions.",
      metrics: "Real-time Insights",
      benefits: ["Live dashboards", "Predictive analytics", "Custom reporting", "Data visualization"]
    },
    {
      icon: Award,
      title: "Premium Support",
      description: "Dedicated support team available around the clock with expert consultation and priority response for all your critical business needs.",
      metrics: "24/7 Expert Support",
      benefits: ["Priority response", "Dedicated account manager", "Expert consultation", "Training resources"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration tools enable teams to work together efficiently with role-based permissions and automated workflow management.",
      metrics: "Unlimited Team Size",
      benefits: ["Role-based access", "Workflow automation", "Team synchronization", "Project management"]
    },
    {
      icon: Star,
      title: "Quality Excellence",
      description: "Rigorous quality control processes ensure consistent excellence with automated testing and continuous improvement protocols for superior results.",
      metrics: "Zero-defect Quality",
      benefits: ["Automated testing", "Quality metrics", "Continuous improvement", "Performance monitoring"]
    }
  ]

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO", company: "TechCorp", rating: 5 },
    { name: "Michael Chen", role: "Director", company: "InnovateLab", rating: 5 },
    { name: "Emily Rodriguez", role: "VP Operations", company: "GrowthCo", rating: 5 }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-primary-50 to-theme-gray-50 py-20 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-theme-primary-100 to-theme-primary-200 rounded-full mb-8 shadow-lg">
            <Award className="w-6 h-6 text-theme-primary-600 mr-3" />
            <span className="text-theme-primary-700 font-bold text-lg">Premium Business Features</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-gray-900 mb-8 leading-tight">
            Built for Modern
            <span className="block bg-gradient-to-r from-theme-primary-500 to-theme-primary-700 bg-clip-text text-transparent">
              Business Excellence
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-theme-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience the perfect blend of innovation and reliability with our comprehensive suite of professional-grade features designed to elevate your business operations to unprecedented heights of success and efficiency.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex items-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-theme-gray-200">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-theme-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-theme-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl border-2 border-theme-gray-200 p-8 hover:border-theme-primary-400 transition-all duration-700 hover:shadow-2xl hover:shadow-theme-primary-200 transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                role="article"
                aria-label={`Feature: ${feature.title}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-50 via-transparent to-theme-primary-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-2xl group-hover:from-theme-primary-500 group-hover:to-theme-primary-600 group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <IconComponent className="w-10 h-10 text-theme-primary-600 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-theme-primary-600 bg-theme-primary-100 px-3 py-1 rounded-full">
                        {feature.metrics}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-theme-gray-900 mb-6 group-hover:text-theme-primary-700 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  
                  <p className="text-theme-gray-600 mb-8 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  <div className={`space-y-4 transition-all duration-700 ${activeFeature === index ? 'opacity-100 max-h-96' : 'opacity-80 max-h-48 overflow-hidden'}`}>
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-theme-gray-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-theme-primary-400 via-theme-primary-500 to-theme-primary-600 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-br from-white to-theme-gray-50 rounded-3xl p-12 lg:p-16 shadow-2xl border border-theme-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <span className="text-lg font-semibold text-theme-gray-700">Trusted by 50,000+ businesses worldwide</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-theme-gray-900 mb-6">
              Ready to Transform Your Business Operations?
            </h3>
            
            <p className="text-xl text-theme-gray-600 mb-10 max-w-3xl leading-relaxed">
              Join thousands of satisfied customers who trust our platform to deliver exceptional results and drive sustainable growth through innovative technology solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => setActiveFeature(-1)}
                onMouseEnter={() => setActiveFeature(-1)}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 hover:from-theme-primary-600 hover:to-theme-primary-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                aria-label="Start your free trial today"
              >
                <Target className="w-6 h-6 mr-3" />
                Start Free Trial
              </button>
              
              <button 
                onClick={() => setActiveFeature(-2)}
                className="inline-flex items-center px-10 py-5 bg-white hover:bg-theme-gray-50 text-theme-primary-600 font-bold rounded-2xl shadow-lg hover:shadow-xl border-2 border-theme-primary-200 hover:border-theme-primary-400 transform hover:scale-105 transition-all duration-300"
                aria-label="Schedule a demo"
              >
                <Users className="w-6 h-6 mr-3" />
                Schedule Demo
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
  name: 'Professional Features Showcase',
  description: 'Premium features component with interactive hover effects, trust-focused design, comprehensive feature presentation, and customer testimonials',
  category: 'content-blocks',
  icon: 'Award'
}


export default Features;