"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Check, Music, Play, Users, Zap, Star, Headphones } from 'lucide-react';

const SpotifyPricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Spotify Free',
      price: 0,
      period: 'Forever',
      description: 'Listen with ads, limited skips',
      features: [
        'Shuffle play only',
        'Listen with ads',
        '6 skips per hour',
        'Basic audio quality',
        'Mobile, web, and desktop'
      ],
      color: 'from-gray-600 to-gray-800',
      accent: 'theme-gray-400',
      popular: false
    },
    {
      id: 'premium',
      name: 'Spotify Premium',
      price: 9.99,
      period: 'month',
      description: 'Ad-free music listening, offline, and on-demand',
      features: [
        'Ad-free music listening',
        'Play any song, any time',
        'Unlimited skips',
        'High quality audio',
        'Download music',
        'Listen offline'
      ],
      color: 'from-green-400 to-green-600',
      accent: '#1DB954',
      popular: true
    },
    {
      id: 'duo',
      name: 'Premium Duo',
      price: 12.99,
      period: 'month',
      description: 'Premium for 2 people living together',
      features: [
        'All Premium features',
        '2 Premium accounts',
        'Duo Mix playlist',
        'Ad-free music listening',
        'Download music',
        'Listen offline'
      ],
      color: 'from-purple-400 to-pink-500',
      accent: 'theme-purple-400',
      popular: false
    },
    {
      id: 'family',
      name: 'Premium Family',
      price: 15.99,
      period: 'month',
      description: 'Premium for up to 6 people living together',
      features: [
        'All Premium features',
        '6 Premium accounts',
        'Family Mix playlist',
        'Parental controls',
        'Individual profiles',
        'Block explicit music'
      ],
      color: 'from-orange-400 to-red-500',
      accent: 'theme-orange-400',
      popular: false
    }
  ];

  const AudioVisualizer = ({ level }: { level: number }) => (
    <div className="flex items-end space-x-1 h-8">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-t from-green-400 to-green-300 rounded-full transition-all duration-150"
          style={{
            width: '3px',
            height: `${Math.max(10, (level + i * 20) % 100)}%`,
            opacity: level > i * 15 ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #1DB954 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #1DB954 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Music className="w-12 h-12 text-green-400 animate-bounce" />
              <div className="absolute -top-2 -right-2">
                <AudioVisualizer level={audioLevel} />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            Choose Your
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent"> Sound</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Millions of songs, podcasts, and playlists. Find your perfect listening experience.
          </p>

          {/* Music Player Mock */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-full px-6 py-3 flex items-center space-x-4 border border-gray-700/50">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
              >
                <Play className="w-4 h-4 text-black ml-0.5" />
              </button>
              <div className="text-white text-sm">
                <div className="font-semibold">Currently Playing</div>
                <div className="text-gray-400">Your favorite tracks</div>
              </div>
              <AudioVisualizer level={audioLevel} />
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedPlan === plan.id ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`
                relative h-full bg-gradient-to-br ${plan.color} p-1 rounded-3xl
                ${selectedPlan === plan.id ? 'shadow-2xl shadow-green-500/20' : ''}
                group-hover:shadow-xl group-hover:shadow-green-500/10 transition-all duration-500
              `}>
                <div className="bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 h-full border border-gray-800/50">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      {plan.id === 'free' && <Headphones className="w-8 h-8 text-gray-400" />}
                      {plan.id === 'premium' && <Music className="w-8 h-8 text-green-400" />}
                      {plan.id === 'duo' && <Users className="w-8 h-8 text-purple-400" />}
                      {plan.id === 'family' && <Users className="w-8 h-8 text-orange-400" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-black text-white">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`
                      w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300
                      ${plan.id === 'free' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : selectedPlan === plan.id
                          ? 'bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/25'
                          : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                      }
                    `}
                  >
                    {plan.id === 'free' ? 'Get Spotify Free' : 'Get Premium'}
                  </button>

                  {/* Audio Reactive Element */}
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <Zap className="w-3 h-3" />
                      <span>High-quality streaming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Try Premium free for 1 month. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ No commitment</span>
            <span>✓ Cancel online anytime</span>
            <span>✓ Premium features included</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Spotify Music Pricing',
  description: 'Music-centric pricing component with audio-reactive elements and Spotify-inspired design',
  category: 'content-blocks',
  icon: 'Music',
};

export default SpotifyPricing;