"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Star, Zap, Shield, Layers, ArrowRight, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Optimized for speed with advanced caching and modern architecture that delivers exceptional user experiences.",
      highlight: "99.9% Uptime",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols with end-to-end encryption and compliance with industry standards.",
      highlight: "SOC 2 Certified",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Layers,
      title: "Modular Architecture",
      description: "Flexible, scalable design system that adapts to your needs and grows with your business.",
      highlight: "Infinitely Scalable",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Sparkles,
      title: "Smart Automation",
      description: "AI-powered workflows that streamline operations and eliminate repetitive tasks automatically.",
      highlight: "80% Time Saved",
      color: "from-purple-400 to-pink-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-theme-gray-50 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-100 rounded-full text-theme-primary-600 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Premium Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            Built for Modern
            <span className="block bg-gradient-to-r from-theme-primary-600 to-theme-primary-400 bg-clip-text text-transparent">
              Professional Excellence
            </span>
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of innovation and reliability with features designed 
            to elevate your business operations to new heights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === activeFeature;
              
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-theme-primary-200 shadow-xl shadow-theme-primary-100/50 scale-105' 
                      : 'bg-white/50 border-theme-gray-200 hover:border-theme-primary-200 hover:shadow-lg'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-10"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`
                      }}
                    />
                  )}
                  
                  <div className="relative flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-theme-gray-900">
                          {feature.title}
                        </h3>
                        <span className="px-3 py-1 bg-theme-primary-100 text-theme-primary-600 text-xs font-semibold rounded-full">
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-theme-gray-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-theme-primary-600 font-medium group-hover:gap-3 gap-2 transition-all">
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Display */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-theme-gray-900 to-theme-gray-800 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-theme-gray-700 rounded-lg px-4 py-2">
                  <div className="text-theme-gray-300 text-sm">base-theme.app</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = index === activeFeature;
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                        isActive 
                          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                          : 'opacity-40'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{feature.title}</div>
                        <div className="text-theme-gray-400 text-sm">{feature.highlight}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-8 flex gap-2">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                      index === activeFeature ? 'bg-theme-primary-400' : 'bg-theme-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 pt-12 border-t border-theme-gray-200">
          {[
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "< 100ms", label: "Response Time" },
            { value: "50K+", label: "Active Users" },
            { value: "24/7", label: "Expert Support" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${600 + index * 100}ms`
              }}
            >
              <div className="text-3xl font-bold text-theme-gray-900 mb-2 group-hover:text-theme-primary-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-theme-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Interactive Features Showcase',
  description: 'Dynamic features section with auto-rotating highlights, interactive cards, and professional stats display',
  category: 'content-blocks',
  icon: 'Zap',
};

export default Features;