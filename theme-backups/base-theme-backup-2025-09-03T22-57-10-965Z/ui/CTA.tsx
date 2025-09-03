import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { ArrowRight, Star } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'CTA',
  name: 'Call to Action',
  description: 'Compelling call-to-action section to drive conversions',
  category: 'content-blocks',
  icon: 'ArrowRight',
}

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-primary-600">
      <div className="theme-container">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            Ready to Transform Your Website?
          </h2>
          <p className="mx-auto max-w-[600px] text-theme-primary-100 md:text-xl mb-8 leading-relaxed">
            Join thousands of satisfied users who have already upgraded their online presence 
            with our professional theme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-theme-primary-600 shadow-lg transition-all hover:bg-theme-gray-50 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-theme-primary-600">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-theme-primary-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-theme-primary-600">
              View Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-theme-primary-500">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-theme-primary-100">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">30-day money back guarantee</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
