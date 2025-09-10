"use client"

import React, { useState } from 'react'
import { Check, Shield, Zap, Target, Award, Star } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Features: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols to protect your most sensitive business data with complete peace of mind.",
      benefits: ["256-bit encryption", "SOC 2 compliance", "Multi-factor authentication"]
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized infrastructure delivering sub-second response times and 99.9% uptime for uninterrupted productivity.",
      benefits: ["Sub-second response", "99.9% uptime SLA", "Global CDN network"]
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Advanced analytics and reporting tools that provide actionable insights to drive strategic business decisions.",
      benefits: ["Real-time dashboards", "Custom reporting", "Predictive analytics"]
    },
    {
      icon: Award,
      title: "Premium Support",
      description: "Dedicated account management and 24/7 expert support to ensure your success every step of the way.",
      benefits: ["24/7 expert support", "Dedicated account manager", "Priority response"]
    },
    {
      icon: Star,
      title: "Seamless Integration",
      description: "Connect with your existing tools and workflows through our comprehensive API and pre-built integrations.",
      benefits: ["REST API access", "Pre-built connectors", "Custom webhooks"]
    },
    {
      icon: Check,
      title: "Scalable Architecture",
      description: "Built to grow with your business, from startup to enterprise, without compromising performance or reliability.",
      benefits: ["Auto-scaling infrastructure", "Unlimited users", "Enterprise-grade reliability"]
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
      {/* Elegant background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full border border-amber-200/50 mb-6">
            <Star className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Premium Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight">
            Crafted for
            <span className="relative inline-block ml-3">
              <span className="relative z-10 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Excellence
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-amber-200 to-amber-100 rounded-full transform -rotate-1 opacity-60" />
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the sophisticated features that set us apart. Every detail meticulously designed 
            to elevate your business operations and deliver exceptional results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredFeature === index
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`
                  relative p-8 lg:p-10 bg-white rounded-2xl border transition-all duration-500 ease-out
                  ${isHovered 
                    ? 'border-amber-200 shadow-2xl shadow-amber-100/50 transform -translate-y-2' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl'
                  }
                `}>
                  {/* Gradient overlay on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl 
                    transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`
                      inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-500
                      ${isHovered 
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white transform rotate-3 scale-110' 
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-amber-900 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div 
                          key={benefitIndex}
                          className="flex items-center gap-3"
                        >
                          <div className={`
                            flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300
                            ${isHovered 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-slate-200 text-slate-600'
                            }
                          `}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`
                    absolute top-0 right-0 w-20 h-20 transition-all duration-500
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full opacity-20" />
                    <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full opacity-30" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <span className="font-semibold text-lg">Experience Premium Features</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Luxury Features Showcase',
  description: 'Sophisticated features component with warm gold accents and elegant hover interactions',
  category: 'content-blocks',
  icon: 'Star'
}

export default Features