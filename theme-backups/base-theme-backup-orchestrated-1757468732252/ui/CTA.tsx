import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Cta: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-50/20 via-transparent to-theme-secondary-50/20" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary-100 border border-theme-primary-200 text-theme-primary-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Ready to Transform Your Business
            </div>
            
            {/* Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-theme-gray-900 leading-tight">
                Take Your Business to the
                <span className="relative inline-block ml-3">
                  <span className="relative z-10 text-theme-primary-600">Next Level</span>
                  <div className="absolute inset-0 bg-theme-primary-100 transform rotate-1 rounded-lg -z-10" />
                </span>
              </h2>
              
              <p className="text-xl text-theme-gray-600 leading-relaxed">
                Join thousands of professionals who have already transformed their workflow with our innovative solutions. Start your journey today and experience the difference.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary-600">10K+</div>
                <div className="text-sm text-theme-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary-600">99.9%</div>
                <div className="text-sm text-theme-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary-600">24/7</div>
                <div className="text-sm text-theme-gray-500">Support</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-theme-primary-600 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-theme-primary-700 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-600 to-theme-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="px-8 py-4 border-2 border-theme-gray-300 text-theme-gray-700 rounded-xl font-semibold text-lg transition-all duration-300 hover:border-theme-primary-300 hover:text-theme-primary-600 hover:bg-theme-primary-50">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Visual Side */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-theme-gray-100">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-theme-primary-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Zap className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-theme-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              {/* Card Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-theme-primary-100 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-theme-primary-500 rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-gray-900">Professional Dashboard</h3>
                    <p className="text-theme-gray-500 text-sm">Complete business overview</p>
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-theme-gray-600">Performance</span>
                      <span className="text-theme-primary-600 font-medium">92%</span>
                    </div>
                    <div className="w-full bg-theme-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '92%'}} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-theme-gray-600">Efficiency</span>
                      <span className="text-theme-secondary-600 font-medium">87%</span>
                    </div>
                    <div className="w-full bg-theme-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-theme-secondary-500 to-theme-secondary-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '87%'}} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-theme-gray-600">Growth</span>
                      <span className="text-theme-accent-600 font-medium">95%</span>
                    </div>
                    <div className="w-full bg-theme-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-theme-accent-500 to-theme-accent-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '95%'}} />
                    </div>
                  </div>
                </div>
                
                {/* Mini Chart */}
                <div className="pt-4">
                  <div className="flex items-end justify-between h-16 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-theme-primary-500 to-theme-primary-300 rounded-t-sm flex-1 transition-all duration-500 ease-out"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-200/30 to-theme-secondary-200/30 rounded-2xl blur-xl -z-10 scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Cta',
  name: 'Professional CTA Section',
  description: 'Modern call-to-action section with interactive dashboard preview and animated elements',
  category: 'content-blocks',
  icon: 'Zap',
};

export default Cta;