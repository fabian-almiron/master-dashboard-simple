"use client"

import React, { useState, useEffect } from 'react'
import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: "Alexandra Chen",
      role: "CEO, TechVision",
      company: "Fortune 500 Technology",
      content: "The level of sophistication and attention to detail exceeded our highest expectations. This partnership has transformed our business operations completely.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Managing Director",
      company: "Global Investments",
      content: "Exceptional service delivery with unmatched professionalism. The results speak for themselves - we've seen unprecedented growth and efficiency.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Sophia Williams",
      role: "VP of Operations",
      company: "Premium Consulting",
      content: "A truly premium experience from start to finish. The strategic insights and execution quality have set a new standard for our industry partnerships.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
      {/* Elegant Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full border border-amber-200/50 mb-6">
            <MessageCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Client Testimonials</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight">
            Trusted by Industry
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
              Leaders Worldwide
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover why premium organizations choose us as their trusted partner for exceptional results and unparalleled service excellence.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-400/20 to-slate-600/20 rounded-full blur-2xl" />
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>

            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              {/* Rating Stars */}
              <div className="flex justify-center mb-8 pt-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-500 fill-current mx-1" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-center mb-12">
                <p className="text-2xl lg:text-3xl font-serif text-slate-800 leading-relaxed mb-8 italic">
                  "{currentTestimonial.content}"
                </p>
              </blockquote>

              {/* Client Information */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
                
                <div className="text-center lg:text-left">
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-amber-700 font-medium mb-1">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="group p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(index)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 w-8'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="group p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-8 font-medium">Trusted by 500+ premium organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Enterprise Solutions', 'Global Consulting', 'Premium Services', 'Strategic Partners'].map((company, index) => (
              <div key={index} className="px-6 py-3 bg-white/50 rounded-lg border border-slate-200/50">
                <span className="text-slate-700 font-medium">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Luxury Testimonials Carousel',
  description: 'Sophisticated testimonials component with elegant carousel, premium styling, and warm gold accents',
  category: 'content-blocks',
  icon: 'MessageCircle',
}

export default Testimonials