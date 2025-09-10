import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { ArrowRight, Play, Star, Users, Award, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 to-theme-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-theme-primary-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-theme-primary-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Innovative Solutions</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
              Transform Your 
              <span className="bg-gradient-to-r from-theme-primary-600 to-purple-600 bg-clip-text text-transparent"> Digital Future</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-theme-gray-600 mb-8 leading-relaxed max-w-2xl">
              Unlock unprecedented growth with our cutting-edge platform designed to revolutionize 
              how you connect, create, and scale your business in the modern digital landscape.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-theme-primary-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-sm text-theme-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.9</span>
                  </div>
                  <span className="text-xs">2,500+ reviews</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-theme-gray-600">
                <Users className="w-4 h-4 text-theme-primary-500" />
                <span>50,000+ active users</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-theme-gray-600">
                <Award className="w-4 h-4 text-theme-primary-500" />
                <span>Industry leader</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-theme-primary-500 text-white px-8 py-4 rounded-lg hover:bg-theme-primary-600 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className="group bg-white text-theme-gray-700 px-8 py-4 rounded-lg border border-theme-gray-300 hover:border-theme-primary-300 hover:text-theme-primary-600 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Additional Info */}
            <p className="text-sm text-theme-gray-500 mt-6">
              ✨ No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Dashboard Mockup */}
              <div className="bg-gradient-to-br from-theme-gray-50 to-white rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-theme-primary-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-theme-gray-900">Dashboard</h3>
                      <p className="text-sm text-theme-gray-500">Analytics Overview</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-theme-gray-900">$24.5K</div>
                    <div className="text-sm text-theme-gray-500">Revenue</div>
                    <div className="text-xs text-green-600 mt-1">↗ +12.5%</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-theme-gray-900">1,429</div>
                    <div className="text-sm text-theme-gray-500">Users</div>
                    <div className="text-xs text-green-600 mt-1">↗ +8.2%</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gradient-to-r from-theme-primary-100 to-purple-100 rounded-lg h-32 flex items-end justify-between p-4">
                  <div className="w-4 bg-theme-primary-400 rounded-t" style={{height: '60%'}}></div>
                  <div className="w-4 bg-theme-primary-500 rounded-t" style={{height: '80%'}}></div>
                  <div className="w-4 bg-theme-primary-400 rounded-t" style={{height: '45%'}}></div>
                  <div className="w-4 bg-theme-primary-600 rounded-t" style={{height: '90%'}}></div>
                  <div className="w-4 bg-theme-primary-500 rounded-t" style={{height: '70%'}}></div>
                  <div className="w-4 bg-theme-primary-400 rounded-t" style={{height: '55%'}}></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Award className="w-6 h-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Star className="w-6 h-6" />
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-400/20 to-purple-400/20 rounded-3xl blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-white">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Modern Hero Section',
  description: 'Dynamic hero section with animated elements, trust indicators, and interactive dashboard mockup',
  category: 'content-blocks',
  icon: 'Zap',
};

export default Hero;