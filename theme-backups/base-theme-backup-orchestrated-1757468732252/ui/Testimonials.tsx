"use client"

import React, { useState, useEffect } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Star, Quote, ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  featured: boolean;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO",
      company: "TechFlow Solutions",
      content: "This platform has transformed how we approach our business operations. The intuitive design and powerful features have increased our productivity by 300%.",
      rating: 5,
      avatar: "SC",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Innovation Labs",
      content: "Outstanding service and exceptional results. The team's attention to detail and commitment to excellence is unmatched in the industry.",
      rating: 5,
      avatar: "MR",
      featured: false
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Director of Operations",
      company: "Global Dynamics",
      content: "We've seen remarkable improvements in efficiency and team collaboration. The implementation was seamless and the support team is incredibly responsive.",
      rating: 5,
      avatar: "EW",
      featured: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "NextGen Systems",
      content: "The technical capabilities and scalability of this solution exceeded our expectations. It's been a game-changer for our development workflow.",
      rating: 5,
      avatar: "DK",
      featured: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Creative Agency",
      content: "Professional, reliable, and innovative. This partnership has helped us deliver exceptional results to our clients consistently.",
      rating: 5,
      avatar: "LT",
      featured: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-theme-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-theme-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-100 text-theme-primary-700 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Client Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Discover why thousands of professionals trust us to deliver exceptional results
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-theme-primary-500" />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-theme-gray-50 transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-theme-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-theme-gray-50 transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-5 h-5 text-theme-gray-600" />
            </button>

            {/* Testimonial Content */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[activeIndex].rating)}
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-medium text-theme-gray-900 mb-8 leading-relaxed">
                "{testimonials[activeIndex].content}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[activeIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-theme-gray-900 text-lg">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-theme-gray-600">
                    {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-theme-primary-500 w-8'
                    : 'bg-theme-gray-300 hover:bg-theme-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.filter(t => t.featured).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-theme-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <Quote className="w-6 h-6 text-theme-primary-300" />
              </div>
              
              <p className="text-theme-gray-700 mb-6 leading-relaxed">
                "{testimonial.content.substring(0, 120)}..."
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-theme-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-theme-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10,000+', label: 'Happy Clients' },
            { number: '99.9%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support Available' },
            { number: '5 Years', label: 'Industry Experience' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-theme-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-theme-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Interactive Testimonials Carousel',
  description: 'Modern testimonials section with carousel, grid layout, and client statistics',
  category: 'content-blocks',
  icon: 'Quote',
};

export default Testimonials;