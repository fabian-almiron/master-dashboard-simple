import Image from 'next/image'
import { Star, Truck, CheckCircle, Clock, Award, HardHat } from 'lucide-react'

interface TestimonialsProps {
  headline: string
  description: string
  testimonials: Array<{
    quote: string
    author: string
    location: string
    rating: number
    image: string
    projectType: string
    projectResult?: string
    completionTime?: string
  }>
  companyStats: {
    projectsCompleted: string
    yearsExperience: string
    customerSatisfaction: string
  }
}

export default function Testimonials({ headline, description, testimonials, companyStats }: TestimonialsProps) {
  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{companyStats.projectsCompleted}</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{companyStats.yearsExperience}</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{companyStats.customerSatisfaction}</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {testimonial.projectType}
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {testimonial.projectResult && (
                  <div className="bg-green-50 text-green-800 text-sm px-3 py-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    <strong>Result:</strong> {testimonial.projectResult}
                  </div>
                )}
                {testimonial.completionTime && (
                  <div className="bg-blue-50 text-blue-800 text-sm px-3 py-2 rounded-lg">
                    <Clock className="h-4 w-4 inline mr-2" />
                    <strong>Completed:</strong> {testimonial.completionTime}
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center text-blue-600">
            <HardHat className="h-5 w-5 mr-2" />
            <span className="font-semibold">Licensed, Bonded & Insured • Family Owned & Operated • Free Estimates</span>
          </div>
        </div>
      </div>
    </section>
  )
}