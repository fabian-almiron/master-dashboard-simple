"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Play, Pause, Heart, Share2, MessageCircle, Music, Calendar, User, ChevronRight, Volume2, SkipBack, SkipForward } from 'lucide-react';

const Blog: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Hip-Hop: From Streets to Streams",
      excerpt: "Exploring how hip-hop transformed from underground culture to the world's most popular genre, and how streaming changed everything.",
      author: "Marcus Johnson",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Genre Deep Dive",
      image: "/api/placeholder/400/250",
      audioPreview: "hip-hop-preview.mp3",
      likes: 2847,
      comments: 156,
      gradient: "from-purple-600 via-pink-600 to-red-600"
    },
    {
      id: 2,
      title: "AI in Music Production: The Future is Here",
      excerpt: "How artificial intelligence is revolutionizing music creation, from composition to mastering, and what it means for artists.",
      author: "Sarah Chen",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "Technology",
      image: "/api/placeholder/400/250",
      audioPreview: "ai-music-preview.mp3",
      likes: 1923,
      comments: 89,
      gradient: "from-cyan-500 via-blue-600 to-purple-600"
    },
    {
      id: 3,
      title: "Discovering Hidden Gems: Underground Artists to Watch",
      excerpt: "Our curated list of emerging artists who are about to break into the mainstream. Get ahead of the curve with these incredible talents.",
      author: "Alex Rivera",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      category: "Artist Spotlight",
      image: "/api/placeholder/400/250",
      audioPreview: "underground-preview.mp3",
      likes: 3156,
      comments: 234,
      gradient: "from-green-500 via-teal-600 to-blue-600"
    }
  ];

  const featuredPost = {
    id: 0,
    title: "Year in Music 2024: The Sounds That Defined Us",
    excerpt: "From viral TikTok hits to Grammy winners, explore the songs, artists, and moments that shaped our musical landscape this year.",
    author: "Editorial Team",
    date: "Dec 18, 2024",
    readTime: "15 min read",
    category: "Year End Special",
    image: "/api/placeholder/800/400",
    audioPreview: "year-review-preview.mp3",
    likes: 5432,
    comments: 387,
    gradient: "from-yellow-400 via-orange-500 to-red-600"
  };

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId && isPlaying) {
      setIsPlaying(false);
      setCurrentTrack(null);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack !== null) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            setCurrentTrack(null);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231DB954' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-theme-primary-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Music className="w-5 h-5 text-theme-primary-500" />
              <span className="text-theme-primary-500 font-semibold">Music Blog</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-theme-primary-500 to-white bg-clip-text text-transparent">
              Sound Stories
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dive deep into the world of music with exclusive interviews, industry insights, and the stories behind your favorite tracks.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative group cursor-pointer">
          <div className={`absolute inset-0 bg-gradient-to-r ${featuredPost.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 group-hover:border-theme-primary-500/50 transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-theme-primary-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    FEATURED
                  </span>
                  <span className="text-gray-400 text-sm">{featuredPost.category}</span>
                </div>
                
                <h2 className="text-4xl font-bold leading-tight group-hover:text-theme-primary-500 transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => togglePlay(featuredPost.id)}
                      className="flex items-center gap-2 bg-theme-primary-500 hover:bg-theme-primary-600 text-black px-4 py-2 rounded-full font-semibold transition-colors duration-200"
                    >
                      {currentTrack === featuredPost.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      Preview
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(featuredPost.id)}
                        className={`flex items-center gap-1 transition-colors duration-200 ${
                          likedPosts.has(featuredPost.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${likedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{featuredPost.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-gray-400 hover:text-theme-primary-500 transition-colors duration-200">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{featuredPost.comments}</span>
                      </button>
                      
                      <button className="text-gray-400 hover:text-theme-primary-500 transition-colors duration-200">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentTrack !== null && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => togglePlay(currentTrack)}
                className="bg-theme-primary-500 hover:bg-theme-primary-600 text-black p-2 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setCurrentTrack(Math.min(blogPosts.length - 1, currentTrack + 1))}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center gap-4">
              <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div
                  className="bg-theme-primary-500 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-400">{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <div className="w-20 bg-gray-700 rounded-full h-1">
                <div className="bg-theme-primary-500 h-1 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Latest Stories</h2>
          <button className="flex items-center gap-2 text-theme-primary-500 hover:text-theme-primary-400 transition-colors">
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-20 rounded-xl blur-lg transition-opacity duration-500`} />
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group-hover:border-theme-primary-500/50 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur-sm text-theme-primary-500 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <button
                      onClick={() => togglePlay(post.id)}
                      className="absolute bottom-4 right-4 bg-theme-primary-500/90 hover:bg-theme-primary-500 text-black p-2 rounded-full transition-colors duration-200"
                    >
                      {currentTrack === post.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-theme-primary-500 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-gray-400 hover:text-theme-primary-500 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      
                      <button className="text-gray-400 hover:text-theme-primary-500 transition-colors duration-200">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Music Blog with Audio Player',
  description: 'A dynamic music-themed blog component with integrated audio previews, social features, and Spotify-inspired design',
  category: 'content-blocks',
  icon: 'Music',
};

export default Blog;