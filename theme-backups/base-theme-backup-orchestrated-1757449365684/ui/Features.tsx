"use client"

import React from 'react';
import { Zap, Shield, Cpu, Gamepad2, Wifi, Target } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const TechPanelsFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Latency Engine',
      description: 'Experience lightning-fast response times with our proprietary gaming infrastructure, delivering sub-millisecond precision for competitive advantage.',
      color: 'from-cyan-400 to-blue-500',
      shadowColor: 'shadow-cyan-500/20',
      borderColor: 'border-cyan-400/30'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Military-grade encryption and anti-cheat protection for secure gaming',
      color: 'from-emerald-400 to-teal-500',
      shadowColor: 'shadow-emerald-500/20',
      borderColor: 'border-emerald-400/30'
    },
    {
      icon: Cpu,
      title: 'Neural Processing',
      description: 'AI-powered optimization that adapts to your gaming patterns',
      color: 'from-purple-400 to-pink-500',
      shadowColor: 'shadow-purple-500/20',
      borderColor: 'border-purple-400/30'
    },
    {
      icon: Gamepad2,
      title: 'Immersive Controls',
      description: 'Haptic feedback and gesture recognition for next-gen gaming',
      color: 'from-orange-400 to-red-500',
      shadowColor: 'shadow-orange-500/20',
      borderColor: 'border-orange-400/30'
    },
    {
      icon: Wifi,
      title: 'Quantum Network',
      description: 'Zero-latency connection with our distributed edge infrastructure',
      color: 'from-indigo-400 to-blue-600',
      shadowColor: 'shadow-indigo-500/20',
      borderColor: 'border-indigo-400/30'
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Machine learning algorithms for enhanced accuracy and performance',
      color: 'from-rose-400 to-pink-500',
      shadowColor: 'shadow-rose-500/20',
      borderColor: 'border-rose-400/30'
    }
  ];

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-theme-gray-900 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-theme-primary-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-theme-primary-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Next-Gen Gaming Architecture
              </h2>
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent blur-sm opacity-50">
                Next-Gen Gaming Architecture
              </div>
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-theme-primary-500 to-cyan-400 mx-auto mb-8 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Tech panel container */}
                <div className={`
                  relative h-full p-8 rounded-2xl border-2 ${feature.borderColor}
                  bg-gradient-to-br from-theme-gray-800/80 to-theme-gray-900/80
                  backdrop-blur-sm ${feature.shadowColor} shadow-2xl
                  transform transition-all duration-500 hover:scale-105
                  hover:rotate-1 hover:-translate-y-2
                  before:absolute before:inset-0 before:rounded-2xl
                  before:bg-gradient-to-br before:${feature.color} before:opacity-0
                  before:transition-opacity before:duration-500
                  hover:before:opacity-10
                  overflow-hidden
                `}>
                  
                  {/* Holographic corner accent */}
                  <div className={`
                    absolute top-0 right-0 w-16 h-16
                    bg-gradient-to-bl ${feature.color} opacity-20
                    transform rotate-45 translate-x-8 -translate-y-8
                    group-hover:opacity-40 transition-opacity duration-500
                  `} />
                  
                  {/* Animated border glow */}
                  <div className={`
                    absolute inset-0 rounded-2xl border-2 ${feature.borderColor}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    animate-pulse
                  `} />
                  
                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className={`
                      inline-flex p-4 rounded-xl
                      bg-gradient-to-br ${feature.color} ${feature.shadowColor} shadow-lg
                      transform group-hover:scale-110 group-hover:rotate-12
                      transition-all duration-500
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Icon glow effect */}
                    <div className={`
                      absolute inset-0 inline-flex p-4 rounded-xl
                      bg-gradient-to-br ${feature.color} opacity-0
                      group-hover:opacity-30 blur-xl
                      transition-opacity duration-500
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-theme-gray-300 leading-relaxed group-hover:text-theme-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Tech lines decoration */}
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-theme-primary-500/30 to-transparent" />
                  <div className="absolute bottom-2 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Tech Panels Features',
  description: 'Gaming-inspired features with animated tech panels and holographic effects',
  category: 'content-blocks',
  icon: 'Cpu',
};

export default TechPanelsFeatures;