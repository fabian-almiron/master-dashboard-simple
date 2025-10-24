import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Features() {
  // Component data - will be populated by AI
  const data = {
    headline: "Comprehensive Solutions",
    description: "Discover how our integrated approach delivers exceptional results across every aspect of your business needs.",
    features: [
      {
        title: "Strategic Planning",
        description: "Comprehensive strategic planning that aligns with your business objectives and market opportunities for sustainable growth.",
        image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop",
        benefits: [
          "Market analysis and competitive research",
          "Goal setting and milestone planning",
          "ROI optimization strategies"
        ]
      },
      {
        title: "Expert Implementation",
        description: "Professional implementation by certified experts who understand the nuances of your industry and specific requirements.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        benefits: [
          "Certified implementation specialists",
          "Best practices and proven methodologies",
          "Quality assurance at every step"
        ]
      },
      {
        title: "Ongoing Support",
        description: "Continuous support and optimization to ensure long-term success and adaptation to changing business needs.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        benefits: [
          "24/7 technical support",
          "Regular performance reviews",
          "Continuous improvement programs"
        ]
      }
    ]
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>
        
        <div className="space-y-20">
          {data.features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}