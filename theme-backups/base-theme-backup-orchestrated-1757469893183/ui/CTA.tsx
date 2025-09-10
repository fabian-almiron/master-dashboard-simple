"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Cta: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered && ctaRef.current) {
      ctaRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (ctaRef.current) {
        ctaRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered]);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Sparkles className="w-6 h-6 text-theme-primary-400 opacity-60" />
      </div>
      <div className="absolute top-32 right-16 animate-pulse">
        <Zap className="w-8 h-8 text-theme-accent-500 opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
        <Target className="w-5 h-5 text-theme-primary-300 opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div 
          ref={ctaRef}
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Interactive glow effect */}
          {isHovered && (
            <div
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
          )}

          {/* Main CTA container */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-theme-gray-200 rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:bg-white/90">
            
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-theme-primary-500 via-theme-accent-500 to-theme-primary-600 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full bg-white rounded-3xl" />
            </div>

            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-theme-primary-100 to-theme-accent-100 text-theme-primary-700 px-6 py-2 rounded-full text-sm font-medium mb-8 transform transition-transform duration-300 hover:scale-105">
                <Sparkles className="w-4 h-4" />
                Ready to Transform Your Business?
              </div>

              {/* Main heading */}
              <h2 className="text-4xl md:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
                Start Your Journey
                <span className="block bg-gradient-to-r from-theme-primary-600 to-theme-accent-600 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-theme-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who have already transformed their workflow with our innovative solutions. Experience the difference quality makes.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Primary CTA */}
                <button className="group relative bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:from-theme-primary-700 hover:to-theme-primary-800 hover:shadow-xl hover:shadow-theme-primary-500/25 transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center gap-3">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>

                {/* Secondary CTA */}
                <button className="group border-2 border-theme-gray-300 text-theme-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-theme-primary-500 hover:text-theme-primary-600 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
                  <span className="flex items-center gap-3">
                    Learn More
                    <div className="w-5 h-5 rounded-full border-2 border-current transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-theme-gray-200">
                <p className="text-sm text-theme-gray-500 mb-4">Trusted by industry leaders</p>
                <div className="flex justify-center items-center gap-8 opacity-60">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-8 bg-theme-gray-300 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-theme-accent-400 to-theme-primary-500 rounded-full opacity-10 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-theme-primary-400 to-theme-accent-500 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '99.9%', label: 'Uptime Guarantee' },
            { number: '24/7', label: 'Expert Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="bg-white/60 backdrop-blur-sm border border-theme-gray-200 rounded-2xl p-6 transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:scale-105">
                <div className="text-3xl font-bold text-theme-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-theme-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Interactive Gradient CTA',
  description: 'Premium call-to-action section with interactive hover effects, animated elements, and trust indicators',
  category: 'content-blocks',
  icon: 'Target',
};

export default Cta;