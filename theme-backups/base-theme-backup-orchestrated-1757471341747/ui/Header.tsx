"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Menu, X, Play, Pause, SkipForward, SkipBack, Volume2, Search, User, Heart, Share2 } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(0.7);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Simulate audio reactive bars
  useEffect(() => {
    const generateAudioLevels = () => {
      const levels = Array.from({ length: 20 }, () => Math.random() * 100);
      setAudioLevels(levels);
    };

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        generateAudioLevels();
        setCurrentTime(prev => (prev + 0.1) % duration);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <header className="relative bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 50%, #1DB954 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, #1ed760 0%, transparent 50%), 
                        radial-gradient(circle at 40% 80%, #1aa34a 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Audio Reactive Bars Background */}
      <div className="absolute inset-0 flex items-end justify-center opacity-10">
        {audioLevels.map((level, index) => (
          <div
            key={index}
            className="bg-theme-primary-500 mx-0.5 transition-all duration-100 ease-out"
            style={{
              height: `${level}%`,
              width: '4px',
              transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.3)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-theme-primary-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full relative">
                  <div className="absolute inset-1 bg-theme-primary-500 rounded-full" />
                </div>
              </div>
              <span className="text-xl font-bold">Spotify</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#" className="text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Browse
            </a>
            <a href="#" className="text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Your Library
            </a>
            <a href="#" className="text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Playlists
            </a>
          </div>

          {/* Search and User */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-gray-400" />
              <input
                type="text"
                placeholder="Search for songs, artists..."
                className="bg-theme-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 transition-all duration-200"
              />
            </div>
            <button className="w-8 h-8 bg-theme-gray-700 rounded-full flex items-center justify-center hover:bg-theme-gray-600 transition-colors duration-200">
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-theme-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Integrated Music Player */}
        <div className="bg-theme-gray-900/80 backdrop-blur-md rounded-2xl p-4 mb-4 border border-theme-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded opacity-80" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Now Playing</h3>
                <p className="text-theme-gray-400 text-sm">Artist Name - Song Title</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-theme-gray-700 rounded-full transition-colors duration-200">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-theme-gray-700 rounded-full transition-colors duration-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center space-x-4 mb-3">
            <button className="p-2 hover:bg-theme-gray-700 rounded-full transition-colors duration-200">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-theme-primary-500 hover:bg-theme-primary-600 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button className="p-2 hover:bg-theme-gray-700 rounded-full transition-colors duration-200">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3 text-xs text-theme-gray-400">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 bg-theme-gray-700 rounded-full h-1 relative overflow-hidden">
              <div
                className="bg-theme-primary-500 h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  transform: `translateX(${progress - 10}%)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <div className="w-16 bg-theme-gray-700 rounded-full h-1">
                <div
                  className="bg-theme-primary-500 h-full rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-theme-gray-900/95 backdrop-blur-md rounded-2xl p-4 mb-4 border border-theme-gray-700">
            <div className="space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-theme-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-theme-primary-500"
                />
              </div>
              <a href="#" className="block text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium py-2">
                Home
              </a>
              <a href="#" className="block text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium py-2">
                Browse
              </a>
              <a href="#" className="block text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium py-2">
                Your Library
              </a>
              <a href="#" className="block text-theme-gray-300 hover:text-white transition-colors duration-200 font-medium py-2">
                Playlists
              </a>
              <div className="pt-4 border-t border-theme-gray-700">
                <button className="flex items-center space-x-2 text-theme-gray-300 hover:text-white transition-colors duration-200">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export const metadata: ComponentInfo = {
  type: 'Header',
  name: 'Spotify Music Header',
  description: 'Modern music-centric header with integrated audio player, reactive visualizations, and Spotify-inspired design',
  category: 'layout',
  icon: 'Music',
};

export default Header;