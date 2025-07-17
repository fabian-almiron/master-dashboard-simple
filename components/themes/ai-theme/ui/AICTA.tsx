import type { ComponentInfo } from "@/lib/cms-types"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export const metadata: ComponentInfo = {
  type: "AICTA",
  name: "AI Voice CTA",
  description: "Call-to-action section for AI voice platform with gradient background",
  category: "content-blocks",
  icon: "Sparkles",
}

export default function AICTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-pulse">
        <Sparkles className="w-6 h-6 text-purple-400 opacity-60" />
      </div>
      <div className="absolute bottom-10 right-10 animate-bounce">
        <Zap className="w-8 h-8 text-blue-400 opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full border border-white/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 mr-2 text-purple-300" />
            <span className="text-white font-medium">Ready to Transform Your Voice?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Start Creating
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Amazing Voices Today
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators, businesses, and developers who are already using 
            our AI voice technology to bring their projects to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">14 Days</div>
              <div className="text-purple-200 text-sm">Free Trial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">No Setup</div>
              <div className="text-purple-200 text-sm">Required</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-200 text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Cancel</div>
              <div className="text-purple-200 text-sm">Anytime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
