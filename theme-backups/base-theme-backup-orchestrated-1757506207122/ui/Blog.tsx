"use client";

import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Bookmark, Share2, Eye, MessageCircle } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Blog: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Sophisticated Business Strategy",
      excerpt: "Discover how luxury brands create lasting impressions through strategic positioning and refined customer experiences that transcend traditional marketing approaches.",
      author: "Alexandra Sterling",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      views: 2847,
      comments: 23
    },
    {
      id: 2,
      title: "Elevating Professional Excellence",
      excerpt: "Transform your business approach with time-tested principles of excellence that distinguish industry leaders from their competitors in today's dynamic market.",
      author: "Marcus Blackwood",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      views: 1923,
      comments: 18
    },
    {
      id: 3,
      title: "Premium Client Relationships",
      excerpt: "Master the delicate balance of professional service delivery while building meaningful connections that drive long-term business success and client loyalty.",
      author: "Victoria Chen",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Client Relations",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      views: 3156,
      comments: 31
    }
  ];

  const featuredPost = {
    id: 4,
    title: "The Future of Luxury Business Innovation",
    excerpt: "An in-depth exploration of how traditional luxury principles are evolving to meet modern business challenges while maintaining their timeless appeal and sophisticated edge.",
    author: "Jonathan Ashworth",
    date: "March 18, 2024",
    readTime: "12 min read",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
    views: 4521,
    comments: 47
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-theme-gray-50 to-white relative overflow-hidden">
      {/* Elegant background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-3 rounded-full border border-yellow-200/50 mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-700 font-medium text-sm tracking-wide">INSIGHTS & EXPERTISE</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-serif text-theme-gray-900 mb-6 leading-tight">
            Professional
            <span className="block text-transparent bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text">
              Insights
            </span>
          </h2>
          
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover sophisticated strategies and refined approaches that elevate professional excellence 
            in today's dynamic business landscape.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div 
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="lg:flex">
              <div className="lg:w-1/2 relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-80 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {featuredPost.category}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(featuredPost.id)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group/bookmark"
                >
                  <Bookmark 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      bookmarkedPosts.has(featuredPost.id) 
                        ? 'text-yellow-600 fill-yellow-600' 
                        : 'text-gray-600 group-hover/bookmark:text-yellow-600'
                    }`}
                  />
                </button>
              </div>

              <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-6 text-sm text-theme-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-serif text-theme-gray-900 mb-6 leading-tight group-hover:text-yellow-700 transition-colors duration-300">
                  {featuredPost.title}
                </h3>

                <p className="text-lg text-theme-gray-600 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <button className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Read Article
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-6 text-sm text-theme-gray-500">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{featuredPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{featuredPost.comments}</span>
                    </div>
                    <button className="flex items-center gap-2 hover:text-yellow-600 transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-300 group/bookmark"
                >
                  <Bookmark 
                    className={`w-4 h-4 transition-colors duration-300 ${
                      bookmarkedPosts.has(post.id) 
                        ? 'text-yellow-600 fill-yellow-600' 
                        : 'text-gray-600 group-hover/bookmark:text-yellow-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-theme-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-theme-gray-900 mb-4 leading-tight group-hover:text-yellow-700 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-theme-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <button className="group/btn inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-4 text-xs text-theme-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-theme-gray-900 to-gray-800 text-white px-10 py-5 rounded-full font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
            View All Articles
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Luxury Blog Grid',
  description: 'Sophisticated blog component with featured post, elegant cards, and premium interactions',
  category: 'content-blocks',
  icon: 'MessageCircle',
};

export default Blog;