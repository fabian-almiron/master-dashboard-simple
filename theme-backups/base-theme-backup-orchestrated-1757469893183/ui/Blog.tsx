"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Calendar, Clock, User, ArrowRight, Search, Filter, Tag, Eye, Heart, Share2, BookOpen, TrendingUp, Star } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  image: string
  views: number
  likes: number
  featured: boolean
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'Development']

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Modern Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.',
      content: 'Full article content...',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        role: 'Senior Developer'
      },
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      category: 'Technology',
      tags: ['React', 'TypeScript', 'Web Development'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      views: 2847,
      likes: 156,
      featured: true
    },
    {
      id: '2',
      title: 'Building Scalable Design Systems',
      excerpt: 'A comprehensive guide to creating and maintaining design systems that scale across teams and products.',
      content: 'Full article content...',
      author: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'Design Lead'
      },
      publishedAt: '2024-01-12',
      readTime: '12 min read',
      category: 'Design',
      tags: ['Design Systems', 'UI/UX', 'Figma'],
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
      views: 1923,
      likes: 89,
      featured: false
    },
    {
      id: '3',
      title: 'AI-Powered Marketing Strategies',
      excerpt: 'How artificial intelligence is revolutionizing marketing campaigns and customer engagement strategies.',
      content: 'Full article content...',
      author: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        role: 'Marketing Director'
      },
      publishedAt: '2024-01-10',
      readTime: '6 min read',
      category: 'Marketing',
      tags: ['AI', 'Marketing', 'Analytics'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      views: 3156,
      likes: 203,
      featured: true
    },
    {
      id: '4',
      title: 'Remote Team Collaboration Best Practices',
      excerpt: 'Essential strategies and tools for building effective remote teams and maintaining productivity.',
      content: 'Full article content...',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'Team Lead'
      },
      publishedAt: '2024-01-08',
      readTime: '10 min read',
      category: 'Business',
      tags: ['Remote Work', 'Collaboration', 'Productivity'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      views: 1654,
      likes: 127,
      featured: false
    },
    {
      id: '5',
      title: 'Advanced React Performance Optimization',
      excerpt: 'Deep dive into React performance optimization techniques, from memoization to code splitting.',
      content: 'Full article content...',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        role: 'Frontend Architect'
      },
      publishedAt: '2024-01-05',
      readTime: '15 min read',
      category: 'Development',
      tags: ['React', 'Performance', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      views: 2234,
      likes: 178,
      featured: false
    },
    {
      id: '6',
      title: 'The Psychology of User Interface Design',
      excerpt: 'Understanding how psychological principles can improve user experience and interface design decisions.',
      content: 'Full article content...',
      author: {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
        role: 'UX Researcher'
      },
      publishedAt: '2024-01-03',
      readTime: '9 min read',
      category: 'Design',
      tags: ['Psychology', 'UX', 'Design'],
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
      views: 1876,
      likes: 145,
      featured: true
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <section className="py-20 bg-gradient-to-br from-theme-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-100 text-theme-primary-700 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Latest Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            Discover Our
            <span className="text-theme-primary-600 ml-3">Blog</span>
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with expert insights, industry trends, and practical guides from our team of professionals.
          </p>
        </div>

        {/* Featured Posts Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-theme-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-theme-primary-600" />
              Featured Articles
            </h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-theme-primary-600" />
              <span className="text-theme-gray-600 font-medium">Trending Now</span>
            </div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-theme-primary-600 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-theme-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-theme-gray-900 mb-2 line-clamp-2 group-hover:text-theme-primary-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-theme-gray-600 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-theme-gray-900">{post.author.name}</p>
                        <p className="text-xs text-theme-gray-500">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-theme-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(post.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(post.likes)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-theme-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-theme-gray-500" />
                <span className="text-sm font-medium text-theme-gray-700">Filter by:</span>
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-theme-primary-600 text-white shadow-lg'
                        : 'bg-theme-gray-100 text-theme-gray-600 hover:bg-theme-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex bg-theme-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-theme-gray-200'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                    <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                    <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                    <div className={`rounded-sm ${viewMode === 'grid' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-theme-gray-200'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className={`h-1 rounded-sm ${viewMode === 'list' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                    <div className={`h-1 rounded-sm ${viewMode === 'list' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                    <div className={`h-1 rounded-sm ${viewMode === 'list' ? 'bg-theme-primary-600' : 'bg-theme-gray-400'}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-theme-primary-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-4 mb-3 text-sm text-theme-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className={`font-bold text-theme-gray-900 mb-3 line-clamp-2 group-hover:text-theme-primary-600 transition-colors ${
                  viewMode === 'list' ? 'text-xl' : 'text-lg'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-theme-gray-600 mb-4 ${
                  viewMode === 'list' ? 'line-clamp-3' : 'text-sm line-clamp-2'
                }`}>
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-theme-gray-100 text-theme-gray-600 text-xs rounded-md hover:bg-theme-primary-100 hover:text-theme-primary-700 transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-theme-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-theme-gray-900">{post.author.name}</p>
                      <p className="text-xs text-theme-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-theme-gray-500">
                    <span className="flex items-center gap-1 hover:text-theme-primary-600 transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" />
                      {formatNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      {formatNumber(post.likes)}
                    </span>
                    <button className="flex items-center gap-1 hover:text-theme-primary-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-theme-primary-600 text-white font-semibold rounded-xl hover:bg-theme-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Load More Articles
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Modern Blog Component',
  description: 'A comprehensive blog component with featured posts, search, filtering, and multiple view modes',
  category: 'content-blocks',
  icon: 'BookOpen',
}

export default Blog