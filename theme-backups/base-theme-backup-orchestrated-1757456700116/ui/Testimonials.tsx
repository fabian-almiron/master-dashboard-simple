import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Star, Quote } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Testimonials',
  name: 'Testimonials Section',
  description: 'Customer testimonials and reviews',
  category: 'content-blocks',
  icon: 'MessageSquare',
}

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      avatar: '/api/placeholder/64/64',
      content: 'Base Theme transformed our website completely. The clean design and fast performance have significantly improved our user engagement.',
      rating: 5,
      company: 'TechStart Inc.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director',
      avatar: '/api/placeholder/64/64',
      content: 'The customization options are incredible. We were able to match our brand perfectly while maintaining excellent performance.',
      rating: 5,
      company: 'Creative Agency'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Freelance Designer',
      avatar: '/api/placeholder/64/64',
      content: 'As a designer, I appreciate the attention to detail and the thoughtful component system. My clients love the results.',
      rating: 5,
      company: 'Design Studio'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Product Manager',
      avatar: '/api/placeholder/64/64',
      content: 'The developer experience is outstanding. Clean code, great documentation, and excellent support from the team.',
      rating: 5,
      company: 'SaaS Company'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'E-commerce Owner',
      avatar: '/api/placeholder/64/64',
      content: 'Our conversion rates improved by 40% after switching to Base Theme. The mobile experience is particularly impressive.',
      rating: 5,
      company: 'Online Store'
    },
    {
      id: 6,
      name: 'Alex Parker',
      role: 'Developer',
      avatar: '/api/placeholder/64/64',
      content: 'The code quality is exceptional. TypeScript support and modern React patterns make development a pleasure.',
      rating: 5,
      company: 'Tech Startup'
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="theme-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl">
            Don't just take our word for it. Here's what real users think about Base Theme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="group p-6 rounded-lg border border-theme-gray-200 bg-white hover:border-theme-primary-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-theme-primary-100 text-theme-primary-600 mb-4 group-hover:bg-theme-primary-500 group-hover:text-white transition-all duration-300">
                <Quote className="h-5 w-5" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-theme-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-theme-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-theme-gray-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-theme-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-theme-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 pt-12 border-t border-theme-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-theme-primary-600 mb-2">10k+</div>
              <div className="text-theme-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-theme-primary-600 mb-2">99.9%</div>
              <div className="text-theme-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-theme-primary-600 mb-2">4.9/5</div>
              <div className="text-theme-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
