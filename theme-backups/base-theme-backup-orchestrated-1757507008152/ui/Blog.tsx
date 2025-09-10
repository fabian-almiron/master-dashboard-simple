"use client"

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, ArrowRight, Bookmark, Share2, Eye, MessageCircle } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set())

  const blogPosts = [
    {
      id: 1,
      title: "Essential HVAC Maintenance Tips for Homeowners",
      excerpt: "Keep your heating and cooling systems running efficiently year-round with these professional maintenance strategies that can save you thousands in repairs.",
      category: "hvac",
      author: "Mike Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      views: 1247,
      comments: 23,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Emergency Plumbing: When to Call the Professionals",
      excerpt: "Learn to identify serious plumbing emergencies that require immediate professional attention versus issues you can temporarily manage yourself.",
      category: "plumbing",
      author: "Sarah Davis",
      date: "2024-01-12",
      readTime: "7 min read",
      views: 892,
      comments: 15,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Smart Thermostat Installation: Complete Guide",
      excerpt: "Upgrade your home's efficiency with smart thermostat technology. Our comprehensive guide covers installation, setup, and optimization tips.",
      category: "hvac",
      author: "Tom Wilson",
      date: "2024-01-10",
      readTime: "6 min read",
      views: 1156,
      comments: 31,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Water Heater Efficiency: Gas vs Electric Comparison",
      excerpt: "Compare the long-term costs, efficiency ratings, and environmental impact of gas versus electric water heating systems for your home.",
      category: "plumbing",
      author: "Lisa Chen",
      date: "2024-01-08",
      readTime: "8 min read",
      views: 743,
      comments: 19,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Seasonal HVAC Preparation Checklist",
      excerpt: "Prepare your heating and cooling systems for seasonal transitions with our comprehensive maintenance checklist designed by certified technicians.",
      category: "hvac",
      author: "David Rodriguez",
      date: "2024-01-05",
      readTime: "4 min read",
      views: 2103,
      comments: 42,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
      featured: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', color: 'theme-primary-500' },
    { id: 'hvac', name: 'HVAC Services', color: 'theme-primary-600' },
    { id: 'plumbing', name: 'Plumbing', color: 'theme-gray-600' }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const toggleBookmark = (postId: number) => {
    const newBookmarks = new Set(bookmarkedPosts)
    if (newBookmarks.has(postId)) {
      newBookmarks.delete(postId)
    } else {
      newBookmarks.add(postId)
    }
    setBookmarkedPosts(newBookmarks)
  }

  const featuredPost = blogPosts.find(post => post.featured && post.id === 1)
  const regularPosts = filteredPosts.filter(post => !post.featured || post.id !== 1)

  return (
    <section className="min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-theme-primary-100 text-theme-primary-700 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Expert Insights & Tips
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Professional Service
            <span className="block text-theme-primary-600">Knowledge Hub</span>
          </h1>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with expert advice, maintenance tips, and industry insights from our certified technicians. 
            Your trusted resource for HVAC and plumbing knowledge.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? `bg-${category.color} text-white shadow-lg`
                  : 'bg-white text-theme-gray-600 hover:bg-theme-gray-100 border border-theme-gray-200'
              }`}
              aria-label={`Filter by ${category.name}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-theme-primary-100 text-theme-primary-700 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-theme-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-theme-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-theme-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-theme-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {featuredPost.views}
                      </div>
                    </div>
                    <button 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      aria-label={`Read ${featuredPost.title}`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      bookmarkedPosts.has(post.id)
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/80 text-theme-gray-600 hover:bg-orange-500 hover:text-white'
                    }`}
                    aria-label={`Bookmark ${post.title}`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                    post.category === 'hvac' 
                      ? 'bg-theme-primary-500 text-white' 
                      : 'bg-theme-gray-600 text-white'
                  }`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-theme-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-theme-gray-900 mb-3 leading-tight hover:text-theme-primary-600 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-theme-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-theme-gray-100">
                  <div className="flex items-center gap-4 text-sm text-theme-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 text-theme-gray-400 hover:text-theme-primary-500 transition-colors duration-300"
                      aria-label={`Share ${post.title}`}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 transform ${
                        hoveredPost === post.id
                          ? 'bg-theme-primary-500 text-white scale-105'
                          : 'bg-theme-gray-100 text-theme-gray-700 hover:bg-theme-primary-100'
                      }`}
                      aria-label={`Read ${post.title}`}
                    >
                      Read
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-xl font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Load More Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Professional Service Blog',
  description: 'Comprehensive blog component featuring HVAC and plumbing expertise with interactive filtering, bookmarking, and professional design elements',
  category: 'content-blocks',
  icon: 'MessageCircle'
}


export default Blog;