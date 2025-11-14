import { Check, Shield, Zap, Users, Globe, Award } from 'lucide-react'

export default function Features() {
  // Component data - will be populated by AI
  const data = {
    headline: "Why Choose Our Service",
    description: "Discover the key features that make us the preferred choice for businesses looking to achieve exceptional results.",
    features: [
      {
        icon: "check",
        title: "Quality Assurance",
        description: "Every project undergoes rigorous quality testing to ensure exceptional standards and reliability."
      },
      {
        icon: "shield",
        title: "Secure & Reliable",
        description: "Enterprise-grade security with 99.9% uptime guarantee for peace of mind."
      },
      {
        icon: "zap",
        title: "Lightning Fast",
        description: "Optimized performance that delivers results faster than the competition."
      },
      {
        icon: "users",
        title: "Expert Support",
        description: "24/7 dedicated support team ready to help you succeed at every step."
      },
      {
        icon: "globe",
        title: "Global Reach",
        description: "Worldwide presence with local expertise in markets that matter to you."
      },
      {
        icon: "award",
        title: "Award Winning",
        description: "Recognized by industry leaders for innovation and excellence."
      }
    ]
  }

  const iconMap = {
    check: Check,
    shield: Shield,
    zap: Zap,
    users: Users,
    globe: Globe,
    award: Award
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Check
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}