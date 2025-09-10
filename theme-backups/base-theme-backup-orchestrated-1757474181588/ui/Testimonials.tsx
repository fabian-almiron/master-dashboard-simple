"use client"

import React, { useState, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Solutions",
      content: "Echo Smart has transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 40%.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Creative Director",
      company: "Design Studio Pro",
      content: "The seamless integration and beautiful design make Echo Smart our go-to platform. It's like having a creative partner that understands our workflow.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Operations Lead",
      company: "Growth Dynamics",
      content: "What impressed us most is how Echo Smart adapts to our unique processes. The customization options are endless, yet everything remains simple to use.",
      rating: 5,
      avatar: "ET"
    },
    {
      name: "David Park",
      role: "Startup Founder",
      company: "Innovation Labs",
      content: "Echo Smart helped us scale from a small team to 50+ employees without losing our collaborative spirit. The platform grows with you.",
      rating: 5,
      avatar: "DP"
    }
  ]

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [])

  const organicBlobStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23f3e8ff' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.2C89.6,15.9,86.6,31.8,79.1,45.2C71.6,58.6,59.6,69.5,45.8,76.8C32,84.1,16,87.8,-0.1,87.9C-16.2,88,-32.4,84.5,-46.3,77.2C-60.2,69.9,-71.8,58.8,-79.6,45.4C-87.4,32,-91.4,16.3,-91.2,0.4C-91,-15.5,-86.6,-31,-78.4,-44.2C-70.2,-57.4,-58.2,-68.3,-44.5,-75.6C-30.8,-82.9,-15.4,-86.6,0.2,-87C15.8,-87.4,31.6,-84.5,44.7,-76.4Z' transform='translate(100 100)'/%3E%3C/svg%3E")`
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #ecfdf5 25%, #fef3e2 50%, #f8fafc 75%, #f3e8ff 100%)'
        }}
      />
      
      <div 
        className="absolute top-20 left-10 w-64 h-64 opacity-20"
        style={organicBlobStyle}
      />
      
      <div 
        className="absolute bottom-20 right-10 w-48 h-48 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2365a30d' d='M39.3,-65.8C50.7,-58.2,59.4,-45.4,65.8,-31.4C72.2,-17.4,76.3,-2.2,75.9,13.2C75.5,28.6,70.6,44.2,61.4,56.8C52.2,69.4,38.7,79,23.8,82.9C8.9,86.8,-7.4,85,-22.9,79.7C-38.4,74.4,-53.1,65.6,-63.2,53.2C-73.3,40.8,-78.8,24.8,-79.7,8.4C-80.6,-8,-77,-24.8,-69.1,-38.4C-61.2,-52,-49,-62.4,-35.8,-69.2C-22.6,-76,-11.3,-79.2,1.8,-82.1C14.9,-85,29.8,-87.6,39.3,-65.8Z' transform='translate(100 100)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-green-200 mb-6">
            <MessageCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Echo Smart is transforming businesses and empowering teams worldwide
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center">
            <div 
              className={`max-w-4xl transition-all duration-600 ease-out ${
                isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              <div 
                className="relative p-12 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)'
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 font-serif leading-relaxed text-center mb-8">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7 0%, #65a30d 100%)'
                    }}
                  >
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentIndex) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 600)
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 w-8'
                  : 'bg-gray-300 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Wellness Testimonials Carousel',
  description: 'Zen-inspired testimonials component with organic shapes, dreamy gradients, and gentle animations',
  category: 'content-blocks',
  icon: 'Quote',
}

export default Testimonials