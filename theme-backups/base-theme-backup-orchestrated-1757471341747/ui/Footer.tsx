"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Heart, 
  Share2, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Users,
  Headphones,
  Radio,
  Mic2
} from 'lucide-react';

const Footer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isLiked, setIsLiked] = useState(false);
  const audioVisualizerRef = useRef<HTMLDivElement>(null);

  // Simulate audio visualization
  useEffect(() => {
    if (isPlaying && audioVisualizerRef.current) {
      const bars = audioVisualizerRef.current.children;
      const interval = setInterval(() => {
        Array.from(bars).forEach((bar: any) => {
          const height = Math.random() * 100 + 20;
          bar.style.height = `${height}%`;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Simulate progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 180);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const quickLinks = [
    { title: 'Company', links: ['About', 'Jobs', 'For the Record'] },
    { title: 'Communities', links: ['For Artists', 'Developers', 'Advertising', 'Investors'] },
    { title: 'Useful Links', links: ['Support', 'Web Player', 'Free Mobile App'] }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231DB954' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent" />

      {/* Music Player Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              {/* Now Playing Info */}
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-br from-theme-primary-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Discover Weekly</h3>
                  <p className="text-gray-400">Your personal music mix</p>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isLiked ? 'text-theme-primary-500 scale-110' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Player Controls */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-theme-primary-500 hover:bg-theme-primary-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Audio Visualizer */}
              <div className="flex items-center space-x-6 flex-1 justify-center">
                <div ref={audioVisualizerRef} className="flex items-end space-x-1 h-8">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-theme-primary-500 to-purple-400 rounded-full transition-all duration-150"
                      style={{ height: isPlaying ? '20%' : '10%' }}
                    />
                  ))}
                </div>
              </div>

              {/* Volume & Share */}
              <div className="flex items-center space-x-4 flex-1 justify-end">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-theme-primary-500 transition-all duration-300"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-theme-primary-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center space-x-3">
              <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-theme-primary-500 to-purple-400 transition-all duration-1000"
                  style={{ width: `${(currentTime / 180) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-10">3:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-theme-primary-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">MusicApp</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Music for everyone. Discover, stream, and share the music you love with millions of tracks at your fingertips.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-theme-primary-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                {section.title}
                <div className="ml-2 w-2 h-2 bg-theme-primary-500 rounded-full animate-pulse" />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-theme-primary-500 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stats Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Users className="w-5 h-5 text-theme-primary-500" />
                <div>
                  <div className="text-white font-semibold">456M+</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Headphones className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-white font-semibold">100M+</div>
                  <div className="text-xs text-gray-400">Songs</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Radio className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-semibold">5M+</div>
                  <div className="text-xs text-gray-400">Podcasts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-theme-primary-500 transition-colors">Legal</a>
              <a href="#" className="hover:text-theme-primary-500 transition-colors">Privacy Center</a>
              <a href="#" className="hover:text-theme-primary-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-theme-primary-500 transition-colors">Cookies</a>
              <a href="#" className="hover:text-theme-primary-500 transition-colors">About Ads</a>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 MusicApp Inc.</span>
              <div className="flex items-center space-x-2">
                <Mic2 className="w-4 h-4 text-theme-primary-500" />
                <span className="text-theme-primary-500">Made with ♪ for music lovers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Modern Footer',
  description: 'Interactive footer with integrated music player, audio visualizer, and social features',
  category: 'layout',
  icon: 'Music',
};

export default Footer;