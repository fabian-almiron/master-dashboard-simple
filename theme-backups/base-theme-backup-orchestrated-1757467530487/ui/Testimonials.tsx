import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Inc",
      content: "The attention to detail and user experience is exceptional. Our team productivity increased by 40% after implementing this solution.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Design Studio Pro",
      content: "Beautiful, intuitive, and powerful. This has transformed how we approach our creative workflow and client presentations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      featured: false
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "CEO",
      company: "StartupVision",
      content: "From day one, this solution exceeded our expectations. The ROI was immediate and the support team is outstanding.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      featured: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "Operations Lead",
      company: "Global Dynamics",
      content: "Seamless integration and incredible performance. Our operational efficiency has never been better.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      featured: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "BrandForward",
      content: "The analytics and insights provided have revolutionized our marketing strategy. Highly recommended for any growing business.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      featured: false
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-primary-100 rounded-2xl mb-6">
            <Quote className="w-8 h-8 text-theme-primary-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Discover why thousands of professionals trust us to deliver exceptional results
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16 relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-full -translate-y-16 translate-x-16 opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-theme-secondary-100 to-theme-secondary-200 rounded-full translate-y-12 -translate-x-12 opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-theme-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-theme-primary-500 rounded-full flex items-center justify-center">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-theme-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-theme-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>

              <blockquote className="text-2xl md:text-3xl font-medium text-theme-gray-800 leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 rounded-full bg-theme-gray-100 hover:bg-theme-gray-200 transition-colors duration-200"
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4 text-theme-gray-600" />
                    ) : (
                      <Play className="w-4 h-4 text-theme-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-theme-gray-100 hover:bg-theme-primary-100 transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4 text-theme-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-theme-gray-100 hover:bg-theme-primary-100 transition-colors duration-200"
                  >
                    <ChevronRight className="w-4 h-4 text-theme-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                hoveredCard === testimonial.id ? 'ring-2 ring-theme-primary-200' : ''
              }`}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-theme-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-theme-