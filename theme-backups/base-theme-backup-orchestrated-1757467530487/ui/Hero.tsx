import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { ArrowRight, Play, Sparkles, Zap, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 to-theme-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary-500), var(--theme-primary-300))',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-32 right-16 w-24 h-24 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary-400), var(--theme-primary-600))',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-10"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary-300), var(--theme-primary-500))',
            animation: 'float 7s ease-in-out infinite'
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary-100 text-theme-primary-700 text-sm font-medium border border-theme-primary-200 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Modern Business Solutions
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-gray-900 leading-tight">
                  Build Your
                  <span className="block text-theme-primary-600 relative">
                    Future Today
                    <div 
                      className="absolute -bottom-2 left-0 h-1 bg-theme-primary-400 rounded-full"
                      style={{
                        width: '100%',
                        animation: 'expandWidth 2s ease-out 0.5s both'
                      }}
                    />
                  </span>
                </h1>
                <p className="text-xl text-theme-gray-600 leading-relaxed max-w-lg">
                  Empower your business with innovative solutions designed for the modern professional. 
                  Experience seamless integration and exceptional results.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-theme-gray-50 text-theme-gray-900 font-semibold rounded-xl border-2 border-theme-gray-200 hover:border-theme-primary-300 transition-all duration-300">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-theme-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-primary-600">99%</div>
                  <div className="text-sm text-theme-gray-600">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-primary-600">24/7</div>
                  <div className="text-sm text-theme-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-primary-600">10k+</div>
                  <div className="text-sm text-theme-gray-600">Users</div>
                </div>
              </div>
            </div>

            {/* Visual Section */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-theme-gray-200">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-theme-primary-100 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-theme-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-theme-gray-900">Dashboard</h3>
                      <p className="text-sm text-theme-gray-600">Real-time insights</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-theme-primary-500 rounded-full animate-pulse" />
                </div>

                {/* Progress Bars */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-theme-gray-700">Performance</span>
                      <span className="text-theme-primary-600 font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-theme-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-theme-primary-500 rounded-full"
                        style={{
                          width: '92%',
                          animation: 'fillProgress 2s ease-out 1s both'
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-theme-gray-700">Efficiency</span>
                      <span className="text-theme-primary-600 font-medium">87%</span>
                    </div>
                    <div className="h-2 bg-theme-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-theme-primary-400 rounded-full"
                        style={{
                          width: '87%',
                          animation: 'fillProgress 2s ease-out 1.2s both'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Icons */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-theme-gray-50 rounded-xl hover:bg-theme-primary-50 transition-colors duration-300 cursor-pointer group">
                    <Zap className="w-8 h-8 text-theme-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs text-theme-gray-700">Fast</span>
                  </div>
                  <div className="text-center p-4 bg-theme-gray-50 rounded-xl hover:bg-theme-primary-50 transition-colors duration-300 cursor-pointer group">
                    <Target className="w-8 h-8 text-theme-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs text-theme-gray-700">Precise</span>
                  </div>
                  <div className="text-center p-4 bg-theme-gray-50 rounded-xl hover:bg-theme-primary-50 transition-colors duration-300 cursor-pointer group">
                    <Sparkles className="w-8 h-8 text-theme-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs text-theme-gray-700">Smart</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div 
                className="absolute -top-4 -right-4 w-16 h-16 bg-theme-primary-500 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ animation: 'bounce 2s infinite' }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-theme-gray-200"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                <div className="w-3 h-3 bg-theme-primary-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes expandWidth {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: var(--target-width); }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%,