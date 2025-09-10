import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-theme-gray-50 to-theme-gray-100">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-theme-primary-100 text-theme-primary-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-theme-primary-500 rounded-full mr-2"></span>
            Welcome to Base Theme
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Build Beautiful
            <span className="block text-theme-primary-600">Experiences</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-theme-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create stunning websites with our flexible design system. Clean, modern, and built for performance.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="inline-flex items-center px-8 py-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="inline-flex items-center px-8 py-4 bg-white hover:bg-theme-gray-50 text-theme-gray-700 font-semibold rounded-lg border border-theme-gray-200 transition-colors duration-200">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Responsive Design', 'TypeScript Ready', 'Tailwind CSS', 'Component Library'].map((feature) => (
              <span 
                key={feature}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm text-theme-gray-700 text-sm font-medium rounded-full border border-theme-gray-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Minimal Hero Section',
  description: 'Clean and modern hero section with gradient background, feature badges, and dual CTA buttons',
  category: 'layout',
  icon: 'Zap',
};

export default Hero;