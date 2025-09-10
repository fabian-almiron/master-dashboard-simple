import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { Grid, Zap, Shield, Layers, ArrowRight, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Grid,
      title: "Modular Architecture",
      description: "Built with flexibility in mind, our modular system adapts to any business requirement with seamless integration.",
      highlight: "99% Uptime"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized for speed and efficiency, delivering exceptional user experiences across all platforms and devices.",
      highlight: "3x Faster"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your data with advanced encryption and compliance standards.",
      highlight: "SOC 2 Certified"
    },
    {
      icon: Layers,
      title: "Scalable Solutions",
      description: "Grow without limits using our cloud-native infrastructure that scales automatically with your business needs.",
      highlight: "Auto-Scale"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-theme-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-theme-primary-100 rounded-full blur-xl opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-theme-primary-200 rounded-full blur-2xl opacity-40 animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-100 rounded-full text-theme-primary-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-theme-gray-900 mb-6">
            Built for Modern
            <span className="block text-theme-primary-600">Business Excellence</span>
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of innovation and reliability with our comprehensive suite of professional solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-theme-gray-100 hover:shadow-xl hover:border-theme-primary-200 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Highlight */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-theme-primary-100 rounded-xl flex items-center justify-center group-hover:bg-theme-primary-200 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-theme-primary-600" />
                  </div>
                  <div className="px-3 py-1 bg-theme-gray-100 rounded-full text-xs font-semibold text-theme-gray-700 group-hover:bg-theme-primary-100 group-hover:text-theme-primary-700 transition-colors duration-300">
                    {feature.highlight}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-theme-gray-900 mb-4 group-hover:text-theme-primary-900 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-theme-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-theme-primary-600 font-medium group-hover:text-theme-primary-700 transition-colors duration-300">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-theme-primary-200 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-white rounded-2xl shadow-lg border border-theme-gray-100">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-theme-gray-900 mb-2">
                Ready to get started?
              </h3>
              <p className="text-theme-gray-600">
                Join thousands of professionals who trust our platform.
              </p>
            </div>
            <button className="flex-shrink-0 px-8 py-3 bg-theme-primary-600 text-white rounded-xl font-semibold hover:bg-theme-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Modern Features Grid',
  description: 'Elegant features section with hover animations and modular design',
  category: 'content-blocks',
  icon: 'Grid',
};

export default Features;