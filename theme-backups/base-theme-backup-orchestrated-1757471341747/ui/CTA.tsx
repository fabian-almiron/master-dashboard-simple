"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Play, Pause, Volume2, Users, Headphones, Music } from 'lucide-react';

const SpotifyCta: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLDivElement>(null);

  const tracks = [
    { title: "Discover Weekly", artist: "Your personal mix", duration: "30 songs" },
    { title: "Today's Top Hits", artist: "The most played songs", duration: "50 songs" },
    { title: "RapCaviar", artist: "New music and deep cuts", duration: "75 songs" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #1DB954 0%, transparent 70%)',
            animationDuration: '3s'
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #1ed760 0%, transparent 70%)',
            animationDelay: '1.5s',
            animationDuration: '4s'
          }}
        />
      </div>

      {/* Audio Visualizer Bars */}
      <div className="absolute top-0 left-0 w-full h-2 flex space-x-1 opacity-60">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-theme-primary-500 to-green-300 transition-all duration-150"
            style={{
              height: isPlaying ? `${Math.random() * 100}%` : '2px',
              animationDelay: `${i * 10}ms`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center justify-center min-h-screen">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-theme-primary-500">
                  <Music className="w-8 h-8" />
                  <span className="text-lg font-semibold tracking-wide">SPOTIFY PREMIUM</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                  Music for
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-500 to-green-300">
                    everyone
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Millions of songs and podcasts. No ads. No limits. Just pure music discovery.
                </p>
              </div>

              {/* Stats */}
              <div className="flex space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">100M+</div>
                  <div className="text-sm text-gray-400">Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5M+</div>
                  <div className="text-sm text-gray-400">Podcasts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">180+</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="group relative px-8 py-4 bg-theme-primary-500 hover:bg-green-400 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <span className="text-lg">Get Premium Free</span>
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-theme-primary-500 ml-0.5" />
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-green-300 to-theme-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
                
                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>View Plans</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Interactive Music Player */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                
                {/* Now Playing Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-theme-primary-500 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Now Playing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <div className="w-20 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-theme-primary-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Album Art */}
                <div className="relative mb-6 group cursor-pointer" onClick={togglePlay}>
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-500 via-pink-500 to-theme-primary-500 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </div>
                    </div>
                    
                    {/* Audio Reactive Rings */}
                    {isPlaying && (
                      <>
                        <div 
                          className="absolute inset-4 border-2 border-white/30 rounded-2xl animate-pulse"
                          style={{ animationDuration: '2s' }}
                        />
                        <div 
                          className="absolute inset-8 border border-white/20 rounded-xl animate-pulse"
                          style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Track Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {tracks[currentTrack].title}
                  </h3>
                  <p className="text-gray-400 mb-2">{tracks[currentTrack].artist}</p>
                  <p className="text-sm text-theme-primary-500">{tracks[currentTrack].duration}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-theme-primary-500 rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? '45%' : '20%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1:23</span>
                    <span>3:45</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <button className="w-12 h-12 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors duration-200">
                    <div className="w-4 h-4 border-l-2 border-t-2 border-white transform rotate-45" />
                  </button>
                  
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-theme-primary-500 hover:bg-green-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-black" />
                    ) : (
                      <Play className="w-6 h-6 text-black ml-1" />
                    )}
                  </button>
                  
                  <button 
                    onClick={nextTrack}
                    className="w-12 h-12 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors duration-200"
                  >
                    <div className="w-4 h-4 border-r-2 border-t-2 border-white transform rotate-45" />
                  </button>
                </div>

                {/* Social Features */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Headphones className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-400">2.1M listeners</span>
                    </div>
                    <button className="text-theme-primary-500 hover:text-green-300 transition-colors duration-200 text-sm font-semibold">
                      Share Playlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-theme-primary-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-green-300 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Spotify Music CTA',
  description: 'Interactive music-centric CTA with audio-reactive elements and integrated player',
  category: 'content-blocks',
  icon: 'Music',
};

export default SpotifyCta;