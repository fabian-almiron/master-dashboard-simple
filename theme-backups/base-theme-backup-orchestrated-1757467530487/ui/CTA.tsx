import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Cta: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-theme-primary-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-theme-accent-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Main content container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-theme-gray-200/50 shadow-2xl shadow-theme-gray-900/5 p-12 md:p-16 text-center relative overflow-hidden">
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-50/50 to-theme-accent-50/30 rounded-3xl" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon cluster */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="p-3 bg-theme-primary-100 rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Sparkles className="w-6 h-6 text-theme-primary-600" />
                </div>
                <div className="p-3 bg-theme-accent-100 rounded-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 delay-100">
                  <Zap className="w-6 h-6 text-theme-accent-600" />
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
                Ready to Transform
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-600 to-theme-accent-600">
                  Your Business?
                </span>
              </h2>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-theme-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who have already elevated their success with our innovative solutions
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Primary CTA */}
                <button className="group relative px-8 py-4 bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 text-white font-semibold rounded-2xl shadow-lg shadow-theme-primary-600/25 hover:shadow-xl hover:shadow-theme-primary-600/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-700 to-theme-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* Secondary CTA */}
                <button className="group px-8 py-4 bg-white border-2 border-theme-gray-200 text-theme-gray-700 font-semibold rounded-2xl hover:border-theme-primary-300 hover:bg-theme-primary-50 transform hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center gap-3">
                    Learn More
                    <div className="w-2 h-2 bg-theme-primary-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  </span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-16 pt-8 border-t border-theme-gray-200/50">
                <p className="text-sm text-theme-gray-500 mb-6">Trusted by industry leaders</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-24 h-8 bg-theme-gray-300 rounded-lg animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-theme-accent-400 to-theme-accent-600 rounded-full opacity-10 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-theme-primary-400 to-theme-primary-600 rounded-full opacity-10 blur-xl" />
          </div>

          {/* Floating action cards */}
          <div className="absolute -top-6 -left-6 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl shadow-theme-gray-900/10 p-4 border border-theme-gray-100 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="w-12 h-12 bg-theme-primary-100 rounded-xl flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-theme-primary-600" />
              </div>
              <p className="text-sm font-medium text-theme-gray-700">Innovation</p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl shadow-theme-gray-900/10 p-4 border border-theme-gray-100 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="w-12 h-12 bg-theme-accent-100 rounded-xl flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-theme-accent-600" />
              </div>
              <p className="text-sm font-medium text-theme-gray-700">Performance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Premium Glassmorphism CTA',
  description: 'Modern call-to-action section with glassmorphism effects, floating elements, and premium animations',
  category: 'content-blocks',
  icon: 'Zap',
};

export default Cta;