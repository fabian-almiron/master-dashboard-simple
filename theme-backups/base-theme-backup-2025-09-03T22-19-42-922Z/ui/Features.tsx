import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Zap, Shield, Smartphone, Palette, Code, Users } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Features',
  name: 'Features Section',
  description: 'Showcase key features and benefits',
  category: 'content-blocks',
  icon: 'Grid',
}

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal load times and smooth interactions.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and reliable infrastructure in mind.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive design that looks great on all devices and screen sizes.'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Easy to customize with CSS variables and modular component system.'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Clean code structure with TypeScript support and modern tooling.'
    },
    {
      icon: Users,
      title: 'User Focused',
      description: 'Designed with accessibility and user experience as top priorities.'
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="theme-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl">
            Everything you need to build a modern, professional website that stands out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="group p-6 rounded-lg border border-theme-gray-200 bg-white hover:border-theme-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-theme-primary-100 text-theme-primary-600 mb-4 group-hover:bg-theme-primary-500 group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-theme-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-theme-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-theme-gray-600 mb-6">
            Ready to get started with these amazing features?
          </p>
          <button className="inline-flex h-12 items-center justify-center rounded-md bg-theme-primary-500 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-theme-primary-600 hover:shadow-xl focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}
