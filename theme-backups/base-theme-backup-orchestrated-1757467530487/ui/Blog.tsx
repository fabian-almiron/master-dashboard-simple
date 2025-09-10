import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Calendar, Clock, ArrowRight, User, Tag, Search, Filter, Grid, List } from 'lucide-react';

const Blog: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Modern Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Technology',
      image: '/api/placeholder/600/400',
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable Design Systems',
      excerpt: 'A comprehensive guide to creating and maintaining design systems that grow with your organization and product needs.',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Design',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 3,
      title: 'User Experience in the Digital Age',
      excerpt: 'Understanding how user expectations have evolved and how to create experiences that truly resonate with modern audiences.',
      author: 'Emma Thompson',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'UX',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 4,
      title: 'The Art of Minimalist Design',
      excerpt: 'Discovering the principles behind effective minimalist design and how less can truly be more in digital experiences.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'Design',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 5,
      title: 'Performance Optimization Strategies',
      excerpt: 'Advanced techniques for optimizing web performance, from code splitting to image optimization and beyond.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '15 min read',
      category: 'Technology',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: 6,
      title: 'Accessibility in Modern Interfaces',
      excerpt: 'Creating inclusive digital experiences that work for everyone, with practical tips and implementation strategies.',
      author: 'James Wilson',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'UX',
      image: '/api/placeholder/600/400',
      featured: false
    }
  ];

  const categories = ['all', 'Technology', 'Design', 'UX'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className="py-20 bg-gradient-to-br from-theme-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Tag className="w-4 h-4" />
            Latest Insights
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-theme-gray-900 mb-6">
            Explore Our Blog
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insights, trends, and expert perspectives on design, technology, and user experience
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-theme-gray-200 rounded-xl focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-theme-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-theme-gray-200 rounded-lg focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-theme-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-theme-primary-600 shadow-sm' 
                      : 'text-theme-gray-500 hover:text-theme-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-theme-primary-600 shadow-sm' 
                      : 'text-theme-gray-500 hover:text-theme-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && !searchQuery && (
          <div className="mb-16">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-theme-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-theme-primary-100 text-theme-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center text-theme-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-theme-gray-900 mb-4 group-hover:text-theme-primary-600 transition-colors duration-200">
                      {featuredPost.title}
                    </h3>
                    <p className="text-theme-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-theme-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-theme-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-theme-gray-900">{featuredPost.author}</p>
                          <div className="flex items-center text-theme-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-theme-primary-600 font-medium group-hover:gap-3 transition-all duration-200">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'