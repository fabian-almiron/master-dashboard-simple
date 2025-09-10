"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Star, MessageCircle, Users, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Homeowner",
      location: "Austin, TX",
      rating: 5,
      text: "JustRightAir transformed our home comfort completely. Their technicians arrived on time, diagnosed our HVAC issues quickly, and provided a solution that's been working flawlessly for over a year. The warranty coverage gives us incredible peace of mind.",
      service: "Complete HVAC Installation",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      accent: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Business Owner",
      location: "Dallas, TX",
      rating: 5,
      text: "When our restaurant's AC failed during peak summer, JustRightAir's emergency service saved us. They had us back up and running within hours. Their professionalism and expertise are unmatched in the industry.",
      service: "Emergency AC Repair",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      accent: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      name: "Jennifer Chen",
      role: "Property Manager",
      location: "Houston, TX",
      rating: 5,
      text: "Managing multiple properties means I need reliable HVAC partners. JustRightAir has consistently delivered quality service across all our locations. Their maintenance programs keep our systems running efficiently year-round.",
      service: "Commercial Maintenance",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      accent: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Facility Director",
      location: "San Antonio, TX",
      rating: 5,
      text: "The energy efficiency improvements JustRightAir implemented have reduced our utility costs by 30%. Their team's attention to detail and commitment to customer satisfaction is exceptional.",
      service: "Energy Efficiency Upgrade",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      accent: "from-violet-500 to-purple-600"
    }
  ]

  const metrics = [
    { icon: Users, value: "2,500+", label: "Happy Customers", color: "text-blue-600" },
    { icon: Award, value: "15+", label: "Years Experience", color: "text-emerald-600" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-600" },
    { icon: Heart, value: "98%", label: "Satisfaction Rate", color: "text-red-600" }
  ]

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, testimonials.length])

  const handleNavigation = (index: number) => {
    setIsPlaying(false)
    setActiveIndex(index)
    setTimeout(() => setIsPlaying(true), 4000)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e5e7eb' stroke-width='1'%3E%3Cpath d='M60 20L100 60L60 100L20 60z' opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='15' opacity='0.3'/%3E%3Cpath d='M30 30L90 30L90 90L30 90z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Asymmetric Header Design */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-theme-primary-200 text-theme-primary-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <MessageCircle className="w-5 h-5" />
              Customer Stories
              <div className="w-2 h-2 bg-theme-primary-500 rounded-full animate-pulse" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-theme-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-theme-primary-600 to-theme-primary-800 bg-clip-text text-transparent">
                Trusted
              </span>
              <br />
              <span className="text-theme-gray-800">by Thousands</span>
            </h2>
            
            <p className="text-xl text-theme-gray-600 leading-relaxed font-light max-w-2xl">
              Real experiences from real customers who chose JustRightAir for their comfort needs. Professional service, guaranteed results.
            </p>
          </div>

          {/* Floating Metrics Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-xl border border-theme-gray-100 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${hoveredMetric === index ? 'from-theme-primary-50 to-transparent opacity-100' : 'opacity-0'} rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-theme-gray-100 to-theme-gray-200 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    
                    <div className={`text-2xl font-black text-theme-gray-900 mb-1 group-hover:${metric.color} transition-colors duration-300`}>
                      {metric.value}
                    </div>
                    
                    <div className="text-xs font-semibold text-theme-gray-600 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal Split Testimonial Layout */}
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-2xl border border-theme-gray-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
            {/* Diagonal Accent */}
            <div className={`h-1 bg-gradient-to-r ${testimonials[activeIndex].accent}`} />
            
            <div className="relative">
              <div className="grid lg:grid-cols-5 gap-0 min-h-[500px]">
                {/* Customer Profile - Diagonal Design */}
                <div className="lg:col-span-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50" />
                  <div 
                    className="absolute top-0 right-0 w-20 h-full bg-white"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%)'
                    }}
                  />
                  
                  <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center items-center text-center h-full">
                    <div className="relative mb-8">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 p-1">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-theme-gray-900 mb-2">
                      {testimonials[activeIndex].name}
                    </h3>
                    
                    <p className="text-theme-gray-600 font-medium mb-1">
                      {testimonials[activeIndex].role}
                    </p>
                    
                    <p className="text-theme-gray-500 text-sm mb-6">
                      {testimonials[activeIndex].location}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${testimonials[activeIndex].accent} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                      <Award className="w-4 h-4" />
                      {testimonials[activeIndex].service}
                    </div>
                  </div>
                </div>

                {/* Testimonial Content - Modern Typography */}
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="relative">
                    <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${testimonials[activeIndex].accent} rounded-full opacity-10`} />
                    <div className="text-5xl text-theme-primary-300 font-serif leading-none mb-6">"</div>
                    
                    <blockquote className="text-xl lg:text-2xl text-theme-gray-800 leading-relaxed font-light mb-6 relative z-10">
                      {testimonials[activeIndex].text}
                    </blockquote>
                    
                    <div className="text-5xl text-theme-primary-300 font-serif leading-none text-right">"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={() => handleNavigation((activeIndex - 1 + testimonials.length) % testimonials.length)}
              className="group flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm border border-theme-gray-200 rounded-full shadow-lg hover:shadow-xl hover:border-theme-primary-300 hover:bg-theme-primary-50 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7 text-theme-gray-600 group-hover:text-theme-primary-600 transition-colors duration-300" />
            </button>

            {/* Unique Progress Navigation */}
            <div className="flex items-center gap-6">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => handleNavigation(index)}
                  className={`relative group transition-all duration-500 ${
                    index === activeIndex ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div className={`w-12 h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? `bg-gradient-to-r ${testimonial.accent} shadow-lg`
                      : 'bg-theme-gray-300 group-hover:bg-theme-primary-300'
                  }`} />
                  
                  {index === activeIndex && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-theme-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap">
                      {testimonial.name}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavigation((activeIndex + 1) % testimonials.length)}
              className="group flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm border border-theme-gray-200 rounded-full shadow-lg hover:shadow-xl hover:border-theme-primary-300 hover:bg-theme-primary-50 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7 text-theme-gray-600 group-hover:text-theme-primary-600 transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Asymmetric CTA Section */}
        <div className="mt-24">
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-theme-primary-600 via-theme-primary-500 to-theme-primary-700 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="lg:col-span-2 p-8 lg:p-12 text-white">
                  <h3 className="text-3xl lg:text-4xl font-black mb-6">
                    Join Our Satisfied Customers
                  </h3>
                  
                  <p className="text-xl text-theme-primary-100 mb-8 leading-relaxed">
                    Experience the JustRightAir difference. Professional service, guaranteed results, and customer satisfaction that speaks for itself.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="group bg-white text-theme-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-theme-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                        Get Free Quote
                      </span>
                    </button>
                    
                    <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-theme-primary-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                        Call Now
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="lg:col-span-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-400/20 to-transparent" />
                  <div className="p-8 lg:p-12 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Heart className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">98%</div>
                      <div className="text-theme-primary-100 text-sm font-medium">Customer Satisfaction</div>
                    </div>
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
  type: 'Testimonials',
  name: 'Diagonal Split Testimonials',
  description: 'Modern testimonials component featuring asymmetric design, diagonal layouts, and immersive customer story presentation with advanced animations',
  category: 'content-blocks',
  icon: 'MessageCircle'
}


export default Testimonials;