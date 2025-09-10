"use client"

import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Search, Filter, Tag, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'Development'];

  const featuredPost = {
    id: 1,
    title: 'The Future of Digital Innovation: Trends Shaping Tomorrow',
    excerpt: 'Explore the cutting-edge technologies and methodologies that are revolutionizing how we approach digital transformation in the modern era.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Technology',
    image: '/api/placeholder/800/400',
    views: '2.4k',
    likes: '156',
    comments: '23'
  };

  const posts = [
    {
      id: 2,
      title: 'Building Scalable Design Systems',
      excerpt: 'Learn how to create and maintain design systems that grow with your organization.',
      author: 'Mike Chen',
      date: 'March 12, 2024',
      readTime: '6 min read',
      category: 'Design',
      image: '/api/placeholder/400/250',
      views: '1.8k',
      likes: '89',
      comments: '15'
    },
    {
      id: 3,
      title: 'Modern Marketing Strategies',
      excerpt: 'Discover the latest approaches to digital marketing that drive real results.',
      author: 'Emma Davis',
      date: 'March 10, 2024',
      readTime: '5 min read',
      category: 'Marketing',
      image: '/api/placeholder/400/250',
      views: '1.2k',
      likes: '67',
      comments: '12'
    },
    {
      id: 4,
      title: 'The Art of Clean Code',
      excerpt: 'Best practices for writing maintainable and efficient code that stands the test of time.',
      author: 'David Wilson',
      date: 'March 8, 2024',
      readTime: '7 min read',
      category: 'Development',
      image: '/api/placeholder/400/250',
      views: '2.1k',
      likes: '134',
      comments: '28'
    },
    {
      id: 5,
      title: 'Business Growth in the Digital Age',
      excerpt: 'Strategies for scaling your business using modern digital tools and methodologies.',
      author: 'Lisa Anderson',
      date: 'March 5, 2024',
      readTime: '9 min read',
      category: 'Business',
      image: '/api/placeholder/400/250',
      views: '1.6k',
      likes: '92',
      comments: '18'
    },
    {
      id: 6,
      title: 'User Experience Design Principles',
      excerpt: 'Essential UX principles that create meaningful and engaging user experiences.',
      author: 'Tom Rodriguez',
      date: 'March 3, 2024',
      readTime: '6 min read',
      category: 'Design',
      image: '/api/placeholder/400/250',
      views: '1.9k',
      likes: '108',
      comments: '21'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-gray-50 to-white">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-theme-gray-200">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
              Professional Insights
            </h1>
            <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto mb-8">
              Discover the latest trends, strategies, and innovations shaping the modern business landscape
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-theme-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-theme-primary-500 text-white shadow-lg'
                        : 'bg-white text-theme-gray-600 border border-theme-gray-300 hover:border-theme-primary-300 hover:text-theme-primary-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-5 h-5 text-theme-primary-500" />
            <span className="text-theme-primary-600 font-semibold">Featured Article</span>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-theme-primary-100 text-theme-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-theme-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                
                <p className="text-theme-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                {/* Author and Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-600 text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-500">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-500">{featuredPost.readTime}</span>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-500 text-sm">{featuredPost.views}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-500 text-sm">{featuredPost.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-theme-gray-400" />
                    <span className="text-theme-gray-500 text-sm">{featuredPost.comments}</span>
                  </div>
                </div>
                
                <button className="inline-flex items-center gap-2 bg-theme-primary-500 text-white px-6 py-3 rounded-lg hover:bg-theme-primary-600 transition-colors duration-200 font-medium">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-theme-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-theme-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-theme-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Author and Meta */}
                <div className="flex items-center gap-4 text-sm text-theme-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                {/* Engagement and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-theme-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  
                  <button className="text-theme-primary-600 hover:text-theme-primary-700 font-medium text-sm flex items-center gap-1 transition-colors duration-200">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-theme-gray-100 text-theme-gray-700 px-8 py-3 rounded-lg hover:bg-theme-gray-200 transition-colors duration-200 font-medium">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Professional Blog',
  description: 'Modern blog component with featured articles, category filtering, and engagement metrics',
  category: 'content-blocks',
  icon: 'FileText',
};

export default Blog;