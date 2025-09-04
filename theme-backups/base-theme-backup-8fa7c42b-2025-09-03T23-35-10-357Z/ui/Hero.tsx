import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Hero',
  name: 'Hero Section',
  description: 'Main landing section with headline and CTA',
  category: 'content-blocks',
  icon: 'Zap',
}

export default function Hero() {
  return (
    <section className="w-full py-20 lg:py-32 bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50">
      <div className="theme-container">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10,000+ customers
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-theme-gray-900 leading-tight max-w-4xl mx-auto">
              Automate. Scale. Deploy.
            </h1>
            <p className="text-xl text-theme-gray-600 leading-relaxed max-w-2xl mx-auto">
              Revolutionary AI automation platform that transforms your development workflow. Build faster, ship better, scale infinitely.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-theme-primary-500 text-white rounded-xl font-semibold hover:bg-theme-primary-600 transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-theme-gray-200 text-theme-gray-900 rounded-xl font-semibold hover:bg-theme-gray-50 transition-all">
              View Demo
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-theme-gray-100">
              <Users className="h-8 w-8 text-theme-primary-500 mb-4" />
              <h3 className="font-semibold text-theme-gray-900 mb-2">10,000+ Users</h3>
              <p className="text-theme-gray-600 text-sm">Trusted by professionals worldwide</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-theme-gray-100">
              <Zap className="h-8 w-8 text-theme-primary-500 mb-4" />
              <h3 className="font-semibold text-theme-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-theme-gray-600 text-sm">Built for speed and performance</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-theme-gray-100">
              <Star className="h-8 w-8 text-theme-primary-500 mb-4" />
              <h3 className="font-semibold text-theme-gray-900 mb-2">5-Star Rated</h3>
              <p className="text-theme-gray-600 text-sm">Loved by our community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}