"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Shield, Zap, Award, Users, CheckCircle, Star, Target, Heart, Settings } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const handleScroll = () => {
      if (progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Advanced Security Protocol",
      description: "Military-grade encryption with multi-layer authentication systems protecting your data with unprecedented security measures and real-time threat detection.",
      metric: "99.9%",
      label: "Security Rating",
      color: "theme-blue-600",
      gradient: "from-theme-blue-500 to-theme-blue-700"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Optimized processing engines delivering microsecond response times with intelligent caching and predictive algorithms for seamless user experiences.",
      metric: "0.2ms",
      label: "Response Time",
      color: "theme-purple-600",
      gradient: "from-theme-purple-500 to-theme-purple-700"
    },
    {
      icon: Target,
      title: "Precision Analytics Engine",
      description: "AI-powered insights with machine learning algorithms that analyze complex data patterns to deliver actionable intelligence for strategic decision making.",
      metric: "96%",
      label: "Accuracy Rate",
      color: "theme-green-600",
      gradient: "from-theme-green-500 to-theme-green-700"
    },
    {
      icon: Heart,
      title: "Intuitive User Experience",
      description: "Human-centered design philosophy with extensive user research creating effortless interactions that feel natural and responsive across all touchpoints.",
      metric: "4.8/5",
      label: "User Rating",
      color: "theme-red-600",
      gradient: "from-theme-red-500 to-theme-red-700"
    }
  ]

  const trustMetrics = [
    { icon: Award, value: "15+", label: "Years Excellence", color: "theme-yellow-600" },
    { icon: Users, value: "2M+", label: "Active Users", color: "theme-blue-600" },
    { icon: Star, value: "5-Star", label: "Service Rating", color: "theme-purple-600" },
    { icon: Settings, value: "24/7", label: "Support Available", color: "theme-green-600" }
  ]

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-theme-gray-50 via-white to-theme-blue-50"></div>
      
      <div 
        ref={progressRef}
        className="absolute top-0 left-0 w-full h-2 bg-theme-gray-200"
      >
        <div 
          className="h-full bg-gradient-to-r from-theme-blue-500 to-theme-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 bg-theme-blue-50 border border-theme-blue-200 rounded-full px-6 py-3 mb-8">
            <div className="w-3 h-3 bg-theme-blue-500 rounded-full animate-pulse"></div>
            <span className="text-theme-blue-700 font-semibold">Revolutionary Platform</span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black mb-8">
            <span className="block text-theme-gray-900 mb-2">Next-Generation</span>
            <span className="block bg-gradient-to-r from-theme-blue-600 via-theme-purple-600 to-theme-green-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="text-xl text-theme-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience cutting-edge technology designed to transform your workflow with intelligent automation, 
            advanced security, and seamless integration capabilities that adapt to your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className={`space-y-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
                  activeFeature === index 
                    ? `border-${feature.color} bg-gradient-to-br from-white to-theme-gray-50 shadow-2xl shadow-${feature.color}/20` 
                    : 'border-theme-gray-200 bg-white hover:border-theme-gray-300 hover:shadow-lg'
                }`}
                onClick={() => handleFeatureClick(index)}
                onMouseEnter={() => setActiveFeature(index)}
                role="button"
                aria-label={`Explore ${feature.title} feature`}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white transform transition-all duration-300 ${activeFeature === index ? 'scale-110 rotate-3' : 'group-hover:scale-105'}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-2xl font-bold transition-colors ${activeFeature === index ? `text-${feature.color}` : 'text-theme-gray-900 group-hover:text-theme-blue-700'}`}>
                        {feature.title}
                      </h3>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${activeFeature === index ? `text-${feature.color}` : 'text-theme-gray-700'}`}>
                          {feature.metric}
                        </div>
                        <div className="text-sm text-theme-gray-500 font-medium">
                          {feature.label}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-theme-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500 ${activeFeature === index ? 'w-20' : 'w-12 group-hover:w-16'}`}></div>
                      <CheckCircle className={`w-5 h-5 transition-all duration-300 ${activeFeature === index ? `text-${feature.color} opacity-100` : 'text-theme-gray-400 opacity-0 group-hover:opacity-100'}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`relative transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="sticky top-24">
              <div className="relative bg-gradient-to-br from-theme-gray-900 to-theme-blue-900 rounded-3xl p-12 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-blue-600/20 to-theme-purple-600/20"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-theme-blue-400/30 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${features[activeFeature].gradient} mb-6 transform transition-all duration-500`}>
                      {React.createElement(features[activeFeature].icon, { className: "w-12 h-12" })}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{features[activeFeature].title}</h3>
                    <p className="text-theme-gray-300 text-lg leading-relaxed">
                      {features[activeFeature].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {trustMetrics.map((metric, index) => (
                      <div key={index} className="text-center group">
                        <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${metric.color} to-${metric.color}/80 rounded-xl mb-3 transform transition-transform duration-300 group-hover:scale-110`}>
                          <metric.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-2xl font-black mb-1">{metric.value}</div>
                        <div className="text-theme-gray-400 text-sm font-medium">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-r from-theme-blue-50 to-theme-purple-50 rounded-3xl p-12 border border-theme-blue-200 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-theme-gray-900 mb-6">
              Trusted by Industry Leaders Worldwide
            </h3>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              <span className="ml-4 text-3xl font-bold text-theme-gray-700">4.9/5</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-theme-blue-200">
              <Shield className="w-5 h-5 text-theme-blue-600" />
              <span className="text-theme-gray-700 font-semibold">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-theme-green-200">
              <Award className="w-5 h-5 text-theme-green-600" />
              <span className="text-theme-gray-700 font-semibold">ISO Certified</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-theme-purple-200">
              <Target className="w-5 h-5 text-theme-purple-600" />
              <span className="text-theme-gray-700 font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Interactive Features Showcase',
  description: 'Dynamic features component with scroll-based animations, interactive feature selection, and modern design elements',
  category: 'content-blocks',
  icon: 'Target'
}


export default Features;