"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, User, ArrowRight, Bookmark, Share2, Eye, MessageCircle } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', label: 'All Articles', count: 28 },
    { id: 'maintenance', label: 'Maintenance', count: 10 },
    { id: 'efficiency', label: 'Energy Solutions', count: 8 },
    { id: 'air-quality', label: 'Air Quality', count: 6 },
    { id: 'installation', label: 'Installation', count: 4 }
  ]

  const featuredArticles = [
    {
      id: 1,
      title: "Smart HVAC Systems: The Future of Home Climate Control",
      excerpt: "Discover how intelligent heating and cooling systems are revolutionizing energy efficiency and comfort in modern homes through advanced automation and AI-driven optimization.",
      author: "Dr. Sarah Mitchell",
      date: "2024-01-22",
      readTime: "12 min",
      category: "efficiency",
      views: 3247,
      comments: 58,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: "Indoor Air Quality Revolution: Breathing Better at Home",
      excerpt: "Explore cutting-edge air purification technologies and ventilation strategies that create healthier indoor environments for your family's wellbeing.",
      author: "Michael Rodriguez",
      date: "2024-01-20",
      readTime: "9 min",
      category: "air-quality",
      views: 2156,
      comments: 34,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      featured: true,
      trending: false
    },
    {
      id: 3,
      title: "Preventive Maintenance: Your HVAC System's Best Friend",
      excerpt: "Learn professional maintenance techniques that extend equipment lifespan, optimize performance, and prevent costly emergency repairs before they happen.",
      author: "Jennifer Chen",
      date: "2024-01-18",
      readTime: "8 min",
      category: "maintenance",
      views: 4123,
      comments: 72,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
      featured: true,
      trending: true
    }
  ]

  const recentArticles = [
    {
      id: 4,
      title: "Seasonal HVAC Optimization: Year-Round Comfort Guide",
      excerpt: "Master seasonal system adjustments and maintenance schedules for optimal performance throughout changing weather conditions.",
      author: "David Thompson",
      date: "2024-01-15",
      readTime: "6 min",
      category: "maintenance",
      views: 1789,
      comments: 28,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Heat Pump Technology: Modern Heating Solutions",
      excerpt: "Compare advanced heat pump systems with traditional HVAC solutions and discover the benefits of modern heating technology.",
      author: "Lisa Park",
      date: "2024-01-12",
      readTime: "11 min",
      category: "installation",
      views: 2567,
      comments: 41,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Emergency HVAC Troubleshooting: Quick Solutions",
      excerpt: "Essential troubleshooting steps every homeowner should know when facing heating or cooling system emergencies.",
      author: "Robert Kim",
      date: "2024-01-10",
      readTime: "5 min",
      category: "maintenance",
      views: 1923,
      comments: 22,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
    }
  ]

  const allArticles = [...featuredArticles, ...recentArticles]
  const filteredArticles = activeFilter === 'all' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeFilter)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrolled = scrollContainerRef.current.scrollTop
        const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight
        const progress = (scrolled / maxScroll) * 100
        setReadingProgress(Math.min(progress, 100))
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-1 bg-theme-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-theme-primary-600 to-theme-primary-500 transition-all duration-500"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 w-72 h-72 bg-gradient-to-br from-theme-primary-100/40 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-24 w-96 h-96 bg-gradient-to-tr from-theme-primary-50/60 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-50 rounded-full text-theme-primary-600 font-medium text-sm mb-6">
            <div className="w-2 h-2 bg-theme-primary-500 rounded-full animate-pulse" />
            HVAC Knowledge Hub
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-theme-primary-900 mb-6">
            Expert Insights for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-600 to-theme-primary-500">
              Perfect Climate
            </span>
          </h1>
          
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover professional HVAC strategies, maintenance secrets, and cutting-edge technologies from certified experts who understand your comfort needs.
          </p>

          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              content="Search expert articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-theme-gray-50 border-2 border-transparent rounded-2xl focus:border-theme-primary-300 focus:bg-white focus:outline-none transition-all duration-300 text-theme-gray-800 shadow-lg"
              aria-label="Search blog articles"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-theme-primary-500 rounded-xl hover:bg-theme-primary-600 transition-colors duration-200">
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category.id
                  ? 'bg-theme-primary-500 text-white shadow-xl scale-105'
                  : 'bg-white text-theme-gray-700 hover:bg-theme-primary-50 shadow-md hover:shadow-lg'
              }`}
              aria-label={`Filter articles by ${category.label}`}
            >
              <span className="relative z-10">{category.label}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeFilter === category.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-theme-gray-100 text-theme-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-theme-primary-900">Featured Articles</h2>
              <div className="hidden sm:flex items-center gap-2 text-theme-gray-500">
                <div className="w-8 h-px bg-theme-gray-300" />
                <span className="text-sm font-medium">Trending Now</span>
              </div>
            </div>

            <div className="space-y-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`grid ${index === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-5'} gap-0`}>
                    <div className={`${index === 0 ? 'lg:col-span-3' : 'lg:col-span-2'} relative overflow-hidden`}>
                      <div className="h-64 lg:h-80 relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        
                        <div className="absolute top-4 left-4 flex gap-2">
                          {article.trending && (
                            <div className="px-3 py-1 bg-theme-primary-500 text-white text-xs font-bold rounded-full">
                              TRENDING
                            </div>
                          )}
                        </div>

                        <div className="absolute top-4 right-4 flex gap-2">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                            <Bookmark className="w-4 h-4 text-theme-primary-500" />
                          </button>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                            <Share2 className="w-4 h-4 text-theme-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`${index === 0 ? 'lg:col-span-2' : 'lg:col-span-3'} p-8 flex flex-col justify-center`}>
                      <div className="flex items-center gap-4 mb-4 text-sm text-theme-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-theme-primary-900 mb-4 line-clamp-2 group-hover:text-theme-primary-600 transition-colors duration-200">
                        {article.title}
                      </h3>
                      
                      <p className="text-theme-gray-600 mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-theme-gray-900">{article.author}</div>
                            <div className="text-sm text-theme-gray-500 flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {article.views.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {article.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="flex items-center gap-2 text-theme-primary-500 hover:text-theme-primary-600 font-semibold transition-all duration-200 group">
                          Read Article
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-theme-primary-50 to-white rounded-3xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-theme-primary-900 mb-6">Stay Updated</h3>
                <p className="text-theme-gray-600 mb-6">
                  Get expert HVAC insights delivered to your inbox. Join thousands of professionals and homeowners.
                </p>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    content="Your email address"
                    className="w-full px-4 py-3 rounded-xl border border-theme-gray-200 focus:border-theme-primary-300 focus:outline-none transition-colors duration-200"
                    aria-label="Email address for newsletter"
                  />
                  <button className="w-full py-3 bg-theme-primary-500 hover:bg-theme-primary-600 text-white font-semibold rounded-xl transition-colors duration-200">
                    Subscribe Now
                  </button>
                </div>
                
                <p className="text-xs text-theme-gray-500 mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="font-bold text-theme-primary-900 mb-4">Popular Topics</h4>
                <div className="space-y-2">
                  {['Energy Efficiency', 'Preventive Maintenance', 'Air Quality', 'Smart Systems', 'Installation Tips'].map((topic) => (
                    <button
                      key={topic}
                      className="block w-full text-left px-3 py-2 text-theme-gray-600 hover:text-theme-primary-600 hover:bg-theme-primary-50 rounded-lg transition-colors duration-200"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-theme-primary-900 mb-8">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-theme-primary-500 text-white text-xs font-semibold rounded-full">
                      {article.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-xs text-theme-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-theme-primary-900 mb-3 line-clamp-2 group-hover:text-theme-primary-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-theme-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-theme-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-theme-primary-600" />
                      </div>
                      <span className="text-xs text-theme-gray-600">{article.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-theme-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {article.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Professional HVAC Knowledge Hub',
  description: 'Clean and professional blog component featuring expert HVAC insights with modern design and engaging interactions',
  category: 'content-blocks',
  icon: 'MessageCircle'
}


export default Blog;