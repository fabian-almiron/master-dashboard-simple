"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Users, Heart, Share2, Zap, Music, Headphones, Radio, Mic, TrendingUp } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Features: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setAudioLevel(Math.random() * 100);
      } else {
        setAudioLevel(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const features = [
    {
      icon: Music,
      title: "Discover Weekly",
      description: "AI-powered personalized playlists that learn your taste and introduce you to new music every week",
      color: "from-purple-500 to-pink-500",
      accent: "#E91E63"
    },
    {
      icon: Users,
      title: "Social Playlists",
      description: "Create collaborative playlists with friends, share your musical discoveries, and build communities around music",
      color: "from-blue-500 to-cyan-500",
      accent: "#00BCD4"
    },
    {
      icon: Headphones,
      title: "Hi-Fi Audio",
      description: "Experience lossless audio quality with spatial audio support for an immersive listening experience",
      color: "from-green-500 to-emerald-500",
      accent: "#1DB954"
    },
    {
      icon: Radio,
      title: "Live Radio",
      description: "Tune into live radio stations worldwide, discover local music scenes, and connect with global communities",
      color: "from-orange-500 to-red-500",
      accent: "#FF5722"
    },
    {
      icon: Mic,
      title: "Podcast Studio",
      description: "Create, edit, and publish podcasts directly from the platform with professional-grade tools",
      color: "from-indigo-500 to-purple-500",
      accent: "#673AB7"
    },
    {
      icon: TrendingUp,
      title: "Music Analytics",
      description: "Deep insights into your listening habits, mood analysis, and personalized music recommendations",
      color: "from-teal-500 to-green-500",
      accent: "#009688"
    }
  ];

  const visualizerBars = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="bg-gradient-to-t from-theme-primary-500 to-theme-primary-300 rounded-full transition-all duration-100"
      style={{
        height: isPlaying ? `${Math.random() * 60 + 20}%` : '20%',
        width: '3px',
        animationDelay: `${i * 50}ms`
      }}
    />
  ));

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #1DB954 0%, transparent 50%), radial-gradient(circle at 80% 20%, #E91E63 0%, transparent 50%), radial-gradient(circle at 40% 80%, #00BCD4 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Audio Visualizer Background */}
      <div className="absolute top-0 left-0 w-full h-2 flex items-end justify-center gap-1 px-8">
        {visualizerBars}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-theme-primary-500 to-theme-primary-400 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-black text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Music Features
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the power of music with cutting-edge features designed to enhance your listening experience
          </p>
        </div>

        {/* Interactive Music Player */}
        <div className="mb-16 flex justify-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-gradient-to-r from-theme-primary-500 to-theme-primary-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shadow-theme-primary-500/30"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="text-white font-bold mb-1">Now Playing: Spotify Features Demo</div>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-theme-primary-500 to-theme-primary-300 transition-all duration-300"
                    style={{ width: isPlaying ? `${audioLevel}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-4 rounded-full transition-colors duration-200 ${
                        i < audioLevel / 20 ? 'bg-theme-primary-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = currentFeature === index;
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setCurrentFeature(index)}
              >
                {/* Card */}
                <div className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 transition-all duration-500 hover:scale-105 hover:border-theme-primary-500/50 ${isActive ? 'ring-2 ring-theme-primary-500/30' : ''}`}>
                  
                  {/* Animated Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      style={{ boxShadow: `0 10px 30px ${feature.accent}30` }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Audio Reactive Ring */}
                    {isPlaying && isActive && (
                      <div 
                        className="absolute inset-0 rounded-2xl border-2 animate-pulse"
                        style={{ 
                          borderColor: feature.accent,
                          transform: `scale(${1 + audioLevel / 500})`
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-theme-primary-500 to-theme-primary-400 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-theme-primary-500/30 transition-all duration-300">
                      Try Now
                    </button>
                    <button className="p-2 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-colors duration-300">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-colors duration-300">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Music Wave Animation */}
                  {isPlaying && isActive && (
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-theme-primary-500 to-theme-primary-300 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 150}ms`,
                            animationDuration: '0.8s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-theme-primary-500 to-theme-primary-400 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-theme-primary-500/30 cursor-pointer">
            <Music className="w-6 h-6" />
            Start Your Musical Journey
            <div className="flex gap-1 ml-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-4 bg-white/60 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Music Features Showcase',
  description: 'Interactive music-centric features component with audio-reactive animations and Spotify-inspired design',
  category: 'content-blocks',
  icon: 'Music',
};

export default Features;