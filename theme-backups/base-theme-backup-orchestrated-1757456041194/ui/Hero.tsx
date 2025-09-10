import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-green-50 to-orange-50">
      {/* Organic Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c084fc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-50 animate-bounce" />
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-70" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-gray-800 leading-tight">
            Nurture Your
            <span className="block bg-gradient-to-r from-purple-400 via-green-400 to-orange-400 bg-clip-text text-transparent font-medium">
              Inner Wellness
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
            Discover a sanctuary for your mind and soul. WellnessTree offers gentle guidance, 
            mindful practices, and therapeutic resources to help you flourish.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              Begin Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-white/30 backdrop-blur-sm border border-white/50 text-gray-700 rounded-full font-medium transition-all duration-300 hover:bg-white/50 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Explore Resources
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Certified Wellness Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Evidence-Based Practices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <span>Mindful Community</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent" />
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Wellness Tree Hero',
  description: 'Soft minimalist hero section with organic elements, dreamy gradients, and mindfulness-inspired design for mental wellness',
  category: 'layout',
  icon: 'Sparkles',
};

export default Hero;