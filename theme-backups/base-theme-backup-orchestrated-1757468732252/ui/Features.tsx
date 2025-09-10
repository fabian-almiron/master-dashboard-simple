import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Grid, Zap, Shield, Layers, ArrowRight, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Grid,
      title: "Modular Architecture",
      description: "Built with flexibility in mind, our modular system adapts to your unique business requirements with seamless integration capabilities.",
      highlight: "99% Uptime"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Experience blazing-fast load times and optimized workflows that keep your team productive and your customers engaged.",
      highlight: "3x Faster"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your data with advanced encryption, compliance standards, and continuous monitoring.",
      highlight: "SOC 2 Certified"
    },
    {
      icon: Layers,
      title: "Scalable Solutions",
      description: "Grow without limits. Our infrastructure scales automatically to handle increased demand while maintaining peak performance.",
      highlight: "Auto-Scale"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-theme-gray-50 via-white to-theme-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-theme-primary-100 rounded-full blur-xl opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-theme-secondary-100 rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-50 rounded-full text-theme-primary-600 text-sm font-medium mb-6 border border-theme-primary-100">
            <Sparkles className="w-4 h-4" />
            Innovation Highlights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Built for the
            <span className="relative inline-block ml-3">
              <span className="relative z-10 text-theme-primary-600">Future</span>
              <div className="absolute inset-0 bg-theme-primary-100 transform rotate-2 rounded-lg -z-10" />
            </span>
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our innovative platform transforms the way modern businesses operate, 
            with cutting-edge features designed for tomorrow's challenges.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-theme-gray-100 hover:shadow-xl hover:border-theme-primary-200 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-50/0 to-theme-primary-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Highlight */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-theme-primary-100 rounded-xl flex items-center justify-center group-hover:bg-theme-primary-200 transition-colors duration-300">
                      <feature.icon className="w-7 h-7 text-theme-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-theme-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 bg-theme-secondary-100 text-theme-secondary-700 text-xs font-semibold rounded-full">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-8 h-8 bg-theme-gray-100 rounded-full flex items-center justify-center group-hover:bg-theme-primary-500 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-theme-gray-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-theme-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 h-1 bg-theme-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-theme-primary-500 to-theme-secondary-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                    style={{ transitionDelay: '200ms' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary-200 group cursor-pointer">
            Explore All Features
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Modern Features Showcase',
  description: 'An innovative features section with animated cards, gradient overlays, and interactive hover effects',
  category: 'content-blocks',
  icon: 'Grid',
};

export default Features;