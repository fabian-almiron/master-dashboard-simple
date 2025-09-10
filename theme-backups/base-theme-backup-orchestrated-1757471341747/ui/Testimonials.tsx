"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Heart, Share2, Star, Music, Users, Headphones } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

interface Testimonial {
  id: string;
  name: string;
  username: string;
  avatar: string;
  content: string;
  rating: number;
  playlistName: string;
  trackCount: number;
  genre: string;
  isPlaying: boolean;
  audioWave: number[];
}

const Testimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioVisualizerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Alex Rivera',
      username: '@alexbeats',
      avatar: '/api/placeholder/60/60',
      content: 'Spotify has completely transformed how I discover music. The AI recommendations are spot-on, and I\'ve found my new favorite artists through Daily Mix.',
      rating: 5,
      playlistName: 'Indie Vibes 2024',
      trackCount: 127,
      genre: 'Indie Rock',
      isPlaying: false,
      audioWave: [0.3, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.3, 0.6]
    },
    {
      id: '2',
      name: 'Maya Chen',
      username: '@mayamusic',
      avatar: '/api/placeholder/60/60',
      content: 'The collaborative playlists feature has brought my friends and me closer together. We share music across continents and discover new sounds daily.',
      rating: 5,
      playlistName: 'Global Fusion Mix',
      trackCount: 89,
      genre: 'World Music',
      isPlaying: false,
      audioWave: [0.5, 0.8, 0.3, 0.9, 0.4, 0.7, 0.6, 0.8, 0.2, 0.5]
    },
    {
      id: '3',
      name: 'Jordan Smith',
      username: '@jordanvibes',
      avatar: '/api/placeholder/60/60',
      content: 'As a musician, Spotify for Artists has been invaluable. The analytics help me understand my audience, and the platform has grown my fanbase exponentially.',
      rating: 5,
      playlistName: 'Electronic Dreams',
      trackCount: 156,
      genre: 'Electronic',
      isPlaying: false,
      audioWave: [0.7, 0.4, 0.8, 0.5, 0.9, 0.3, 0.6, 0.7, 0.4, 0.8]
    }
  ];

  const [testimonialData, setTestimonialData] = useState(testimonials);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTestimonialData(prev => 
          prev.map(testimonial => ({
            ...testimonial,
            audioWave: testimonial.audioWave.map(() => Math.random())
          }))
        );
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = (testimonialId: string) => {
    setActiveTestimonial(testimonialId);
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  const renderAudioWave = (audioWave: number[], isActive: boolean) => {
    return (
      <div className="flex items-center space-x-1 h-8">
        {audioWave.map((height, index) => (
          <div
            key={index}
            className={`w-1 bg-gradient-to-t from-theme-primary-500 to-green-300 rounded-full transition-all duration-150 ${
              isActive && isPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              height: `${isActive && isPlaying ? height * 100 : 20}%`,
              minHeight: '4px'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231DB954' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-theme-primary-500 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-theme-primary-500 rounded-full mr-4">
              <Music className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              What Our <span className="text-theme-primary-500">Community</span> Says
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join millions of music lovers who have transformed their listening experience with Spotify
          </p>
          <div className="flex items-center justify-center mt-8 space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-theme-primary-500" />
              <span>500M+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-theme-primary-500" />
              <span>100M+ Songs</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonialData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                activeTestimonial === testimonial.id
                  ? 'border-theme-primary-500 shadow-2xl shadow-theme-primary-500/20'
                  : 'border-gray-700/50 hover:border-gray-600'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Playlist Info Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-theme-primary-500"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-theme-primary-500 text-sm">{testimonial.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePlay(testimonial.id)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === testimonial.id && isPlaying
                      ? 'bg-theme-primary-500 text-black'
                      : 'bg-gray-700 text-white hover:bg-theme-primary-500 hover:text-black'
                  }`}
                >
                  {activeTestimonial === testimonial.id && isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Audio Visualizer */}
              <div className="mb-6 p-4 bg-black/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.playlistName}</p>
                    <p className="text-gray-400 text-xs">{testimonial.trackCount} tracks • {testimonial.genre}</p>
                  </div>
                  <Volume2 className="w-4 h-4 text-theme-primary-500" />
                </div>
                {renderAudioWave(testimonial.audioWave, activeTestimonial === testimonial.id)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Rating and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-theme-primary-500 transition-colors duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-theme-primary-500/0 via-theme-primary-500/5 to-theme-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-theme-primary-500 to-green-400 rounded-full px-8 py-4 text-black font-semibold hover:shadow-2xl hover:shadow-theme-primary-500/30 transition-all duration-300 cursor-pointer">
            <Music className="w-5 h-5" />
            <span>Start Your Musical Journey</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Music-Centric Testimonials with Audio Visualizer',
  description: 'Interactive testimonials component featuring audio visualizers, playlist integration, and music-themed design elements',
  category: 'content-blocks',
  icon: 'Music',
};

export default Testimonials;