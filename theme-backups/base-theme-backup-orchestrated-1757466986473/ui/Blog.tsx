import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Blog',
  name: 'Blog Section',
  description: 'Display latest blog posts and articles',
  category: 'content-blocks',
  icon: 'FileText',
}

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Base Theme',
      excerpt: 'Learn how to set up and customize your new Base Theme for maximum impact.',
      author: 'John Doe',
      date: 'March 15, 2024',
      image: '/api/placeholder/400/250',
      category: 'Tutorial'
    },
    {
      id: 2,
      title: 'Design Best Practices for Modern Websites',
      excerpt: 'Discover the latest design trends and how to implement them effectively.',
      author: 'Jane Smith',
      date: 'March 12, 2024',
      image: '/api/placeholder/400/250',
      category: 'Design'
    },
    {
      id: 3,
      title: 'Performance Optimization Tips',
      excerpt: 'Simple techniques to make your website faster and more efficient.',
      author: 'Mike Johnson',
      date: 'March 10, 2024',
      image: '/api/placeholder/400/250',
      category: 'Performance'
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-gray-50">
      <div className="theme-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl">
            Stay updated with the latest insights, tutorials, and industry news.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="group bg-white rounded-lg shadow-sm border border-theme-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video bg-theme-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{post.category}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-xs text-theme-gray-500 mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <User className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-theme-gray-900 mb-2 group-hover:text-theme-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-theme-gray-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <a 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-sm font-medium text-theme-primary-600 hover:text-theme-primary-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <div className="text-center">
          <button className="inline-flex h-12 items-center justify-center rounded-md border border-theme-primary-500 bg-white px-8 py-3 text-sm font-medium text-theme-primary-600 transition-all hover:bg-theme-primary-500 hover:text-white focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
