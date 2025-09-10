"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "This platform transformed our workflow completely. The intuitive design and powerful features helped us increase productivity by 300% within the first quarter.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "Innovation Labs",
    content: "Outstanding service and exceptional results. The team's attention to detail and commitment to excellence is unmatched in the industry.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Creative Director",
    company: "Design Studio Pro",
    content: "The level of customization and flexibility offered is incredible. We've been able to create exactly what we envisioned without any compromises.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "NextGen Ventures",
    content: "From concept to execution, everything exceeded our expectations. The ROI has been phenomenal and our customers love the new experience.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Director",
    company: "Global Enterprises",
    content: "Professional, reliable, and innovative. This solution has streamlined our operations and saved us countless hours every week.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Alex Johnson",
    role: "Tech Lead",
    company: "Digital Dynamics",
    content: "The technical excellence and user experience design are top-notch. Our development team was impressed with the clean architecture and performance.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
  }
]

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-theme-gray-300'
        }`}
      />
    ))
  }

  const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0]
  const gridTestimonials = testimonials.filter(t => !t.featured).slice(0, 4)

  return (
    <section className="py-24 bg-gradient-to-br from-theme-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Quote className="w-4 h-4" />
            Client Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about their experience working with us.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-theme-primary-500" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-theme-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-theme-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-theme-primary-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-theme-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-theme-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-theme-gray-600 hover:text-theme-primary-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-theme-primary-500 w-8'
                        : 'bg-theme-gray-300 hover:bg-theme-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-theme-gray-600 hover:text-theme-primary-600"
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-theme-gray-600 hover:text-theme-primary-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {gridTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 h-full ${
                hoveredCard === testimonial.id
                  ? 'shadow-2xl scale-105 -translate-y-2'
                  : 'hover:shadow-xl'
              }`}>
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-theme-primary-500 opacity-60" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <blockquote className="text-theme-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-theme-gray-100"
                  />
                  <div>
                    <div className="font-semibold text-theme-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-theme-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-theme-primary-500/5 to-transparent transition-opacity duration-300 ${
                  hoveredCard === testimonial.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="text-4xl font-bold text-theme-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-theme-gray-600">Happy Clients</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-theme-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-theme-gray-600">Satisfaction Rate</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-theme-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                4.9
              </div>
              <div className="text-theme-gray-600">Average Rating</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-theme-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-theme-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Advanced Testimonials Showcase',
  description: 'Interactive testimonials component with featured carousel, grid layout, and animated statistics',
  category: 'content-blocks',
  icon: 'Quote',
}