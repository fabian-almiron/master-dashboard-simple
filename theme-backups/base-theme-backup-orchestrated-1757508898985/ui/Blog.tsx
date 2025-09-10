"use client"

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, ArrowRight, Bookmark, Share2, Eye, MessageCircle } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const blogPosts = [
    {
      id: 1,
      title: "Building Trust Through Transparent Communication",
      excerpt: "Discover how clear, honest communication forms the foundation of lasting business relationships and drives sustainable growth in today's competitive landscape. Learn practical strategies for implementing transparency in your organization and creating meaningful connections with clients.",
      category: "Business Strategy",
      author: "Sarah Mitchell",
      date: "March 15, 2024",
      readTime: "8 min read",
      views: 2847,
      comments: 23,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center",
      featured: true
    },
    {
      id: 2,
      title: "The Future of Professional Services",
      excerpt: "Explore emerging trends and technologies that are reshaping how professional services are delivered, from AI integration to remote collaboration tools. Understand the implications for your business strategy and prepare for the digital transformation ahead.",
      category: "Technology",
      author: "David Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      views: 1923,
      comments: 18,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center",
      featured: false
    },
    {
      id: 3,
      title: "Creating Exceptional Client Experiences",
      excerpt: "Learn proven strategies for delivering outstanding service that exceeds expectations and builds long-term client loyalty in competitive markets. Discover the key touchpoints that matter most to your clients and how to optimize every interaction.",
      category: "Client Relations",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "10 min read",
      views: 3156,
      comments: 31,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop&crop=center",
      featured: false
    },
    {
      id: 4,
      title: "Digital Transformation Best Practices",
      excerpt: "Navigate the complexities of digital transformation with practical insights and proven methodologies that ensure successful implementation. Avoid common pitfalls and accelerate your digital journey with strategic planning and execution.",
      category: "Technology",
      author: "Michael Thompson",
      date: "March 8, 2024",
      readTime: "12 min read",
      views: 2674,
      comments: 27,
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=center",
      featured: false
    },
    {
      id: 5,
      title: "Leadership in Times of Change",
      excerpt: "Effective leadership strategies for guiding teams through uncertainty and driving innovation while maintaining organizational stability. Build resilience and adaptability in your leadership approach to navigate complex business challenges.",
      category: "Leadership",
      author: "Jennifer Adams",
      date: "March 5, 2024",
      readTime: "9 min read",
      views: 2198,
      comments: 19,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center",
      featured: false
    },
    {
      id: 6,
      title: "Sustainable Business Growth Strategies",
      excerpt: "Explore sustainable approaches to business expansion that balance profitability with environmental responsibility and social impact. Create lasting value for all stakeholders while driving growth and maintaining competitive advantage in evolving markets.",
      category: "Business Strategy",
      author: "Robert Kim",
      date: "March 3, 2024",
      readTime: "7 min read",
      views: 1845,
      comments: 15,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop&crop=center",
      featured: false
    }
  ]

  const categories = ['all', 'Business Strategy', 'Technology', 'Client Relations', 'Leadership']

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleShare = (post: typeof blogPosts[0]) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
    }
  }

  const handlePostClick = (postId: number) => {
    console.log(`Navigate to article ${postId}`)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-primary-50/20 to-theme-gray-50/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-theme-primary-100 to-theme-primary-50 text-theme-primary-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
              <MessageCircle className="w-4 h-4" />
              Professional Insights & Industry Expertise
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-gray-900 mb-8 leading-tight">
              Knowledge Hub
            </h1>
            <p className="text-xl sm:text-2xl text-theme-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Expert perspectives on business strategy, technology, and leadership to help you navigate the modern professional landscape with confidence and clarity. Stay ahead with actionable insights from industry leaders and thought pioneers.
            </p>
            
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  content="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-2 border-theme-gray-200 focus:border-theme-primary-500 focus:outline-none text-theme-gray-700 shadow-lg backdrop-blur-sm bg-white/80"
                  aria-label="Search articles"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-theme-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white shadow-theme-primary-500/25'
                      : 'bg-white/80 text-theme-gray-700 hover:bg-theme-primary-50 hover:text-theme-primary-600 border border-theme-gray-200 hover:border-theme-primary-300'
                  }`}
                  aria-label={`Filter by ${category}`}
                >
                  {category === 'all' ? 'All Articles' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div 
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02] bg-white"
              onMouseEnter={() => setHoveredPost(featuredPost.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => handlePostClick(featuredPost.id)}
            >
              <div className="aspect-[21/9] relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-gray-900/90 via-theme-gray-900/40 to-transparent"></div>
                <div className="absolute top-8 left-8">
                  <span className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
                    Featured Article
                  </span>
                </div>
                <div className="absolute top-8 right-8 flex gap-4">
                  <button 
                    className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookmark(featuredPost.id)
                    }}
                    aria-label="Bookmark featured article"
                  >
                    <Bookmark className={`w-6 h-6 ${bookmarkedPosts.has(featuredPost.id) ? 'text-theme-primary-400 fill-current' : 'text-white'}`} />
                  </button>
                  <button 
                    className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(featuredPost)
                    }}
                    aria-label="Share featured article"
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <div className="max-w-5xl">
                  <div className="flex items-center gap-8 mb-6 text-white/80">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-semibold">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-4xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <button className="flex items-center gap-4 bg-white text-theme-gray-900 px-10 py-5 rounded-full font-bold hover:bg-theme-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                      Read Full Article
                      <ArrowRight className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-8 text-white/70">
                      <div className="flex items-center gap-3">
                        <Eye className="w-6 h-6" />
                        <span className="font-semibold text-lg">{featuredPost.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-semibold text-lg">{featuredPost.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                onClick={() => handlePostClick(post.id)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-theme-gray-100 hover:border-theme-primary-200 backdrop-blur-sm">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBookmark(post.id)
                        }}
                        aria-label="Bookmark article"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'text-theme-primary-500 fill-current' : 'text-theme-gray-700'}`} />
                      </button>
                      <button 
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(post)
                        }}
                        aria-label="Share article"
                      >
                        <Share2 className="w-4 h-4 text-theme-gray-700" />
                      </button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-6 mb-4 text-theme-gray-500 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-semibold">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-theme-gray-900 mb-4 leading-tight group-hover:text-theme-primary-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-theme-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-theme-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-6 text-theme-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="font-semibold">{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-semibold">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-20">
            <button 
              className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 hover:from-theme-primary-600 hover:to-theme-primary-700 text-white px-16 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm"
              onClick={() => console.log('Load more articles')}
              aria-label="Load more articles"
            >
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Professional Blog Component',
  description: 'Comprehensive blog component with featured articles, category filtering, search functionality, interactive elements, and modern design',
  category: 'content-blocks',
  icon: 'ArrowRight'
}


export default Blog;