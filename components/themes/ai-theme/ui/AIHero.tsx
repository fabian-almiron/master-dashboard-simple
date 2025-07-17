import type { ComponentInfo } from "@/lib/cms-types"
import { Button } from "@/components/ui/button"
import { Play, Mic, Zap } from "lucide-react"

export const metadata: ComponentInfo = {
  type: "AIHero",
  name: "AI Voice Hero",
  description: "Hero section showcasing AI voice technology with call-to-action",
  category: "content-blocks",
  icon: "Mic",
}

export default function AIHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Zap className="w-8 h-8 text-purple-400 opacity-60" />
        </div>
        <div className="absolute top-32 right-16 animate-bounce">
          <Mic className="w-6 h-6 text-blue-400 opacity-60" />
        </div>
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
            <Zap className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Next-Gen AI Voice Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Transform Your Voice
            <br />
            <span className="text-purple-400">Into Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of AI-powered voice synthesis. Create, customize, and deploy 
            ultra-realistic voice models with cutting-edge neural technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <Play className="w-5 h-5 mr-2" />
              Try Demo
            </Button>
            <Button variant="outline" size="lg" className="border-purple-400/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent">
              <Mic className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-purple-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-400">Voice Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{'<'}1s</div>
              <div className="text-gray-400">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-400">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
