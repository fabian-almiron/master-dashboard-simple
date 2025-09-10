"use client"

import React, { useState, useEffect } from 'react'
import { Star, MessageCircle, Users, Award, Heart } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechFlow Solutions",
      content: "Working with this team has been transformative for our business. Their professional approach and attention to detail exceeded all expectations. The results speak for themselves - we've seen a 40% increase in efficiency and our team productivity has soared to new heights.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      highlight: "40% efficiency increase"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Managing Director", 
      company: "Global Ventures Inc",
      content: "The level of expertise and dedication shown throughout our project was remarkable. They delivered beyond our expectations and provided ongoing support that has been invaluable to our continued success. Our revenue has grown by 65% since implementation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      highlight: "65% revenue growth"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Operations Manager",
      company: "Innovative Systems",
      content: "Their strategic approach and innovative solutions have revolutionized how we operate. The team's professionalism and commitment to excellence made this partnership truly exceptional. We've reduced operational costs by 30% while improving quality.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      highlight: "30% cost reduction"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Product Director",
      company: "NextGen Innovations",
      content: "The transformation they brought to our organization is nothing short of extraordinary. Their deep understanding of our industry and innovative problem-solving approach resulted in solutions that exceeded our wildest expectations and delivered measurable impact.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      highlight: "Extraordinary results"
    }
  ]

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients", color: "theme-primary-500" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "theme-yellow-500" },
    { icon: Award, value: "98%", label: "Success Rate", color: "theme-green-500" },
    { icon: Heart, value: "24/7", label: "Support", color: "theme-red-500" }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-gray-50 to-theme-primary-50 py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-full mb-8 shadow-lg">
            <MessageCircle className="w-10 h-10 text-theme-primary-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-theme-gray-900 mb-6 leading-tight">
            What Our <span className="text-theme-primary-600">Clients</span> Say
          </h2>
          <p className="text-xl sm:text-2xl text-theme-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover why industry leaders trust us to deliver exceptional results and drive their business forward with innovative solutions
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 border border-theme-gray-100 backdrop-blur-sm relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12L10 14L16 8' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
              }}
            />
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-400 to-theme-primary-600 rounded-full blur-lg opacity-20 scale-110 animate-pulse" />
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-xl ring-4 ring-white"
                  />
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-7 h-7 text-yellow-400 fill-current transform transition-transform duration-300 hover:scale-110" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl text-theme-gray-800 font-medium leading-relaxed mb-8 italic relative">
                  <span className="text-6xl text-theme-primary-200 absolute -top-4 -left-2 font-serif">"</span>
                  {testimonials[currentTestimonial].content}
                  <span className="text-6xl text-theme-primary-200 absolute -bottom-8 -right-2 font-serif">"</span>
                </blockquote>

                <div className="space-y-3">
                  <h4 className="text-2xl sm:text-3xl font-bold text-theme-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-lg text-theme-primary-600 font-semibold">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-base text-theme-gray-600 font-medium">
                    {testimonials[currentTestimonial].company}
                  </p>
                  <div className="inline-block bg-gradient-to-r from-theme-primary-100 to-theme-primary-200 px-4 py-2 rounded-full">
                    <span className="text-theme-primary-700 font-semibold text-sm">
                      {testimonials[currentTestimonial].highlight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-xl border border-theme-gray-200 hover:bg-theme-primary-50 hover:border-theme-primary-300 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7 text-theme-gray-700 group-hover:text-theme-primary-600 transition-colors duration-300" />
            </button>

            <div className="flex space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
                    index === currentTestimonial
                      ? 'bg-theme-primary-500 scale-125 shadow-lg'
                      : 'bg-theme-gray-300 hover:bg-theme-primary-300 hover:scale-110'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentTestimonial && (
                    <div className="absolute inset-0 bg-theme-primary-500 rounded-full animate-ping opacity-75" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-xl border border-theme-gray-200 hover:bg-theme-primary-50 hover:border-theme-primary-300 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7 text-theme-gray-700 group-hover:text-theme-primary-600 transition-colors duration-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-theme-gray-100 text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                  hoveredStat === index ? 'ring-2 ring-theme-primary-300' : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-full mb-4 shadow-lg">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-theme-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-theme-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Trusted by industry leaders worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Professional Testimonials Carousel',
  description: 'Interactive testimonials component with carousel functionality, client ratings, trust indicators, and engaging animations',
  category: 'content-blocks',
  icon: 'MessageCircle'
}


export default Testimonials;