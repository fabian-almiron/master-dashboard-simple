import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Zap, ArrowRight } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Hero Section',
  description: 'Main landing section with headline and CTA',
  category: 'content-blocks',
  icon: 'Zap',
}

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-theme-gray-50 to-theme-primary-50">
      <div className="theme-container">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-theme-primary-200 bg-theme-primary-50 px-3 py-1 text-xs font-medium text-theme-primary-700 mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Base Theme
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-theme-gray-900">
              The Future of AI is Here
            </h1>
            <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl leading-relaxed">
              Transform your business with next-generation artificial intelligence solutions that learn, adapt, and evolve with your needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="inline-flex h-12 items-center justify-center rounded-md bg-theme-primary-500 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-theme-primary-600 hover:shadow-xl focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-md border border-theme-gray-200 bg-white px-8 py-3 text-sm font-medium text-theme-gray-900 shadow-sm transition-all hover:bg-theme-gray-50 hover:shadow-md focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
              Learn More
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-theme-gray-200">
            <p className="text-sm text-theme-gray-500 mb-4">Trusted by developers worldwide</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-theme-gray-400 font-semibold">React</div>
              <div className="text-theme-gray-400 font-semibold">Next.js</div>
              <div className="text-theme-gray-400 font-semibold">TypeScript</div>
              <div className="text-theme-gray-400 font-semibold">Tailwind CSS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
