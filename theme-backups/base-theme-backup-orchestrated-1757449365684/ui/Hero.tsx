import React from 'react';
import { Play, Zap, Users, Trophy } from 'lucide-react';

export const metadata = {
  type: 'Hero',
  name: 'Cyberpunk Gaming Hero',
  description: 'Futuristic cyberpunk hero with neon grids and holographic effects',
  category: 'layout',
  icon: 'Zap',
};

const CyberpunkHero = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridPulse 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-theme-primary-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Neon Accent Lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-theme-primary-400 to-transparent opacity-60" />
      <div className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-400 to-transparent opacity-60" />
      
      {/* Vertical Accent */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-40" />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Holographic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-gradient-to-r from-theme-primary-500/20 to-purple-500/20 border border-theme-primary-400/30 rounded-full backdrop-blur-sm">
            <Zap className="w-4 h-4 text-theme-primary-400" />
            <span className="text-sm font-medium text-theme-primary-300 uppercase tracking-wider">
              Next-Gen Gaming
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-400 via-purple-400 to-pink-400 animate-pulse">
              Enter the Digital Battlefield
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-theme-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Next-Gen Gaming Experience Awaits
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-theme-primary-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <Play className="w-5 h-5" />
                Jack In Now
              </div>
            </button>
            
            <button className="px-8 py-4 bg-transparent border-2 border-theme-primary-400/50 text-theme-primary-300 font-bold rounded-lg hover:bg-theme-primary-400/10 hover:border-theme-primary-400 transition-all duration-300 backdrop-blur-sm">
              Explore Arsenal
            </button>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Active Players", value: "2M+" },
              { icon: Trophy, label: "Tournaments", value: "500+" },
              { icon: Zap, label: "Matches Daily", value: "50K+" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-500/10 to-purple-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-6 bg-theme-gray-900/50 border border-theme-primary-400/20 rounded-lg backdrop-blur-sm hover:border-theme-primary-400/40 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-theme-primary-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-theme-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-theme-primary-400/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-400/30" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-theme-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default CyberpunkHero;