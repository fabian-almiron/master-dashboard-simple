import React, { useState } from 'react';
import { Play, Star, Trophy, Zap, Gamepad2, Users } from 'lucide-react';

export const metadata = {
  type: 'Game_grid',
  name: 'Holographic Cards Grid',
  description: 'Interactive holographic game cards with prismatic effects and 3D animations',
  category: 'content-blocks',
  icon: 'Gamepad2',
};

interface GameCard {
  id: number;
  title: string;
  genre: string;
  rating: number;
  players: string;
  status: 'new' | 'popular' | 'featured';
  image: string;
}

const gameCards: GameCard[] = [
  { id: 1, title: 'Cyber Revolution', genre: 'Action RPG', rating: 4.8, players: '1-4', status: 'featured', image: '/api/placeholder/300/200' },
  { id: 2, title: 'Neon Racers', genre: 'Racing', rating: 4.6, players: '1-8', status: 'popular', image: '/api/placeholder/300/200' },
  { id: 3, title: 'Quantum Wars', genre: 'Strategy', rating: 4.9, players: '2-6', status: 'new', image: '/api/placeholder/300/200' },
  { id: 4, title: 'Digital Realm', genre: 'Adventure', rating: 4.7, players: '1-2', status: 'popular', image: '/api/placeholder/300/200' },
  { id: 5, title: 'Holo Fighter', genre: 'Fighting', rating: 4.5, players: '1-2', status: 'featured', image: '/api/placeholder/300/200' },
  { id: 6, title: 'Space Odyssey', genre: 'Simulation', rating: 4.8, players: '1-∞', status: 'new', image: '/api/placeholder/300/200' },
];

const HolographicCardsGrid: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'from-emerald-400 to-teal-400';
      case 'popular': return 'from-purple-400 to-pink-400';
      case 'featured': return 'from-yellow-400 to-orange-400';
      default: return 'from-blue-400 to-cyan-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Zap className="w-3 h-3" />;
      case 'popular': return <Trophy className="w-3 h-3" />;
      case 'featured': return <Star className="w-3 h-3" />;
      default: return <Play className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mb-6">
          <div className="bg-slate-900 rounded-xl px-8 py-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Next-Gen Gaming Excellence
            </h1>
          </div>
        </div>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Immersive experiences that redefine digital entertainment
        </p>
      </div>

      {/* Holographic Game Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {gameCards.map((game) => (
          <div
            key={game.id}
            className="group relative"
            onMouseEnter={() => setHoveredCard(game.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Holographic Border Effect */}
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-pulse ${
              hoveredCard === game.id ? 'opacity-100 blur-none' : ''
            }`} />
            
            {/* Main Card */}
            <div className={`relative bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-500 transform ${
              hoveredCard === game.id ? 'scale-105 -translate-y-2' : 'hover:scale-102'
            }`}>
              
              {/* Prismatic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              
              {/* Game Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(game.status)} text-white text-sm font-semibold flex items-center gap-1 shadow-lg`}>
                  {getStatusIcon(game.status)}
                  {game.status.toUpperCase()}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{game.rating}</span>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {game.title}
                </h3>
                
                <p className="text-slate-400 mb-4 font-medium">{game.genre}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{game.players} Players</span>
                  </div>
                </div>
                
                {/* Play Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-2 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  PLAY NOW
                </button>
              </div>
              
              {/* Bottom Glow Effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicCardsGrid;