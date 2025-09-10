"use client"

import React, { useState, useEffect } from 'react'
import { Star, MessageCircle, Users, Award } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Property Manager",
      company: "Downtown Apartments",
      content: "Just Right Air saved us during a summer heatwave when our main HVAC system failed. Their emergency response was incredible - they had a technician on-site within 2 hours and restored cooling to all 48 units by evening. Professional, efficient, and reasonably priced.",
      rating: 5,
      service: "Emergency HVAC Repair",
      location: "Downtown District"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      company: "Residential Customer",
      content: "The plumbing team at Just Right Air completely repiped our 1950s home. They were meticulous about protecting our hardwood floors, explained every step of the process, and finished ahead of schedule. The water pressure improvement is amazing!",
      rating: 5,
      service: "Complete Repiping",
      location: "Westside Neighborhood"
    },
    {
      id: 3,
      name: "Jennifer Rodriguez",
      role: "Restaurant Owner",
      company: "Bella Vista Bistro",
      content: "Our commercial kitchen's ventilation system needed urgent attention during peak season. Just Right Air's team worked around our operating hours and installed a new system that's whisper-quiet and incredibly efficient. Outstanding service!",
      rating: 5,
      service: "Commercial HVAC Installation",
      location: "Business District"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Facility Manager",
      company: "Tech Solutions Inc",
      content: "We've been using Just Right Air for our office building's HVAC maintenance for three years. Their preventive maintenance program has eliminated unexpected breakdowns and reduced our energy costs by 25%. Highly recommend their commercial services.",
      rating: 5,
      service: "Preventive Maintenance",
      location: "Corporate Campus"
    }
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

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 bg-gradient-to-br from-theme-primary-50 via-white to-theme-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-theme-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Customer Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
            What Our Customers
            <span className="block text-theme-primary-600">Are Saying</span>
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from real customers who trust Just Right Air for their HVAC and plumbing needs across the metro area
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-theme-primary-500 via-orange-400 to-theme-primary-600"></div>
            
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-orange-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-theme-gray-800 leading-relaxed mb-8 font-medium">
                  "{current.content}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-theme-gray-900">{current.name}</h4>
                    <p className="text-theme-gray-600">{current.role}</p>
                    <p className="text-theme-primary-600 font-medium">{current.company}</p>
                  </div>
                  
                  <div className="hidden sm:block w-px h-12 bg-theme-gray-200"></div>
                  
                  <div className="text-sm text-theme-gray-500">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">{current.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{current.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-64 flex lg:flex-col items-center gap-4">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 lg:w-16 lg:h-16 text-theme-primary-600" />
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-primary-600">
                    {currentTestimonial + 1}/{testimonials.length}
                  </div>
                  <div className="text-sm text-theme-gray-500">Customer Story</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className="flex items-center justify-center w-12 h-12 bg-white hover:bg-theme-primary-50 border-2 border-theme-gray-200 hover:border-theme-primary-300 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-theme-gray-600 group-hover:text-theme-primary-600 transition-colors" />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-theme-primary-500 scale-125'
                      : 'bg-theme-gray-300 hover:bg-theme-primary-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className="flex items-center justify-center w-12 h-12 bg-white hover:bg-theme-primary-50 border-2 border-theme-gray-200 hover:border-theme-primary-300 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-theme-gray-600 group-hover:text-theme-primary-600 transition-colors" />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-theme-primary-600">500+</div>
              <div className="text-sm text-theme-gray-600">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-theme-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">4.9</div>
              <div className="text-sm text-theme-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-theme-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-theme-primary-600">24/7</div>
              <div className="text-sm text-theme-gray-600">Emergency Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Professional Service Testimonials',
  description: 'Interactive testimonials component showcasing customer reviews with carousel functionality and trust indicators for HVAC and plumbing services',
  category: 'content-blocks',
  icon: 'Star'
}


export default Testimonials;