'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Component data - will be populated by AI
  const data = {
    headline: "Trusted by Industry Leaders",
    description: "See why top companies choose us as their trusted partner for growth and success.",
    testimonials: [
      {
        quote: "Working with this team has been transformational for our business. Their expertise and dedication to our success is unmatched in the industry.",
        author: "David Thompson",
        role: "Chief Technology Officer",
        company: "InnovateTech",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
      },
      {
        quote: "The results speak for themselves. We've achieved 150% growth year-over-year since partnering with them. Exceptional service and support.",
        author: "Lisa Martinez",
        role: "VP of Operations",
        company: "ScaleUp Ventures",
        rating: 5,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
      },
      {
        quote: "Professional, reliable, and innovative. They understood our vision and delivered beyond our expectations. Highly recommend their services.",
        author: "James Wilson",
        role: "Founder & CEO",
        company: "Future Solutions",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
      }
    ]
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>
        
        <div className="relative">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <div className="flex justify-center mb-6">
              {[...Array(data.testimonials[currentSlide].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed max-w-4xl mx-auto">
              "{data.testimonials[currentSlide].quote}"
            </p>
            <div className="flex items-center justify-center">
              <Image
                src={data.testimonials[currentSlide].image}
                alt={data.testimonials[currentSlide].author}
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 text-lg">
                  {data.testimonials[currentSlide].author}
                </h4>
                <p className="text-gray-600">{data.testimonials[currentSlide].role}</p>
                <p className="text-gray-500">{data.testimonials[currentSlide].company}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}