"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { BookOpen, Calendar, User, ArrowRight, Heart, MessageCircle, Share2, Clock } from 'lucide-react'

const Blog: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (floatingRef.current) {
        const rect = floatingRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
        floatingRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const blogPosts = [
    {
      id: 1,
      title: "Mindful Technology: Finding Balance in a Digital World",
      excerpt: "Discover how to create harmony between technology and wellness in your daily life through mindful practices and intentional design.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "wellness",
      image: "/api/placeholder/400/250",
      likes: 42,
      comments: 8
    },
    {
      id: 2,
      title: "The Art of Gentle Productivity",
      excerpt: "Explore sustainable approaches to productivity that honor your natural rhythms and promote long-term well-being.",
      author: "Marcus Rivera",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "productivity",
      image: "/api/placeholder/400/250",
      likes: 38,
      comments: 12
    },
    {
      id: 3,
      title: "Creating Calm Spaces in Busy Lives",
      excerpt: "Transform your environment into a sanctuary of peace with simple, intentional design choices that nurture tranquility.",
      author: "Emma Thompson",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "design",
      image: "/api/placeholder/400/250",
      likes: 56,
      comments: 15
    },
    {
      id: 4,
      title: "Digital Minimalism for Modern Professionals",
      excerpt: "Learn to streamline your digital life while maintaining professional excellence through thoughtful technology choices.",
      author: "David Park",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "technology",
      image: "/api/placeholder/400/250",
      likes: 29,
      comments: 6
    }
  ]

  const categories = [
    { id: 'all', label: 'All Stories', color: 'from-purple-200 to-pink-200' },
    { id: 'wellness', label: 'Wellness', color: 'from-green-200 to-emerald-200' },
    { id: 'productivity', label: 'Productivity', color: 'from-blue-200 to-cyan-200' },
    { id: 'design', label: 'Design', color: 'from-orange-200 to-peach-200' },
    { id: 'technology', label: 'Technology', color: 'from-purple-200 to-indigo-200' }
  ]

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div 
        ref={floatingRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Organic Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-800 mb-6 leading-tight">
            Mindful
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover stories that inspire balance, creativity, and mindful living in our modern world
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-gray-800 shadow-lg transform scale-105`
                  : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                hoveredCard === post.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{post.comments}</span>
                    </button>
                    <button className="hover:text-green-500 transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span>Explore More Stories</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Mindful Blog Grid',
  description: 'A serene blog component with organic shapes, dreamy gradients, and wellness-focused design',
  category: 'content-blocks',
  icon: 'BookOpen',
}

export default Blog