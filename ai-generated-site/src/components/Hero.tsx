import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  // Component data - will be populated by AI
  const data = {
    headline: "Build the Future",
    description: "Revolutionary technology that scales with your ambitions. Join thousands of innovators who trust our platform to power their success.",
    primaryCta: { text: "Start Building", href: "/signup" },
    secondaryCta: { text: "Watch Demo", href: "/demo" }
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {data.headline}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={data.primaryCta.href}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all inline-flex items-center justify-center"
            >
              {data.primaryCta.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            {data.secondaryCta && (
              <Link
                href={data.secondaryCta.href}
                className="border border-gray-400 text-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                <Play className="mr-2 h-5 w-5" />
                {data.secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}