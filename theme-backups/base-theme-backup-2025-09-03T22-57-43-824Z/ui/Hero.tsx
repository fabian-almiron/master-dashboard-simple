import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight, Play } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Hero Section',
  description: 'Main landing section with headline and CTA',
  category: 'content-blocks',
  icon: 'Zap',
}

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-theme-gray-50">
      <div className="theme-container h-screen">
        <div className="grid lg:grid-cols-2 h-full">
          <div className="flex flex-col justify-center space-y-8 py-12">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-theme-gray-900 leading-tight">
                Next-Gen AI Solutions
              </h1>
              <p className="text-xl text-theme-gray-600 leading-relaxed max-w-lg">
                Harness the power of artificial intelligence with cutting-edge technology that pushes the boundaries of what's possible.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-theme-primary-500 text-white rounded-lg font-medium hover:bg-theme-primary-600 transition-all">
                Launch AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-theme-gray-200 text-theme-gray-900 rounded-lg font-medium hover:bg-theme-gray-50 transition-all">
                <Play className="mr-2 h-5 w-5" />
                Explore Tech
              </button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-theme-primary-100 to-theme-primary-200">
            <div className="w-96 h-96 bg-theme-primary-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}