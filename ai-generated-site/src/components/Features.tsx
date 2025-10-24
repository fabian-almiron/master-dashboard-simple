import { Shield, Award, Clock, CheckCircle, Wrench, Star } from 'lucide-react'

export default function Features() {
  // Component data - will be populated by AI
  const data = {
    headline: "Why Choose Our Professional Services",
    description: "We stand behind our work with industry-leading guarantees and professional credentials that give you complete peace of mind.",
    features: [
      {
        icon: "shield",
        title: "Licensed & Insured",
        description: "Fully licensed contractor with comprehensive liability and workers' compensation insurance for your protection.",
        guarantee: "$2M Liability Coverage"
      },
      {
        icon: "award",
        title: "100% Satisfaction Guarantee",
        description: "We're not satisfied until you are. If you're not completely happy with our work, we'll make it right.",
        guarantee: "Money-Back Promise"
      },
      {
        icon: "checkCircle",
        title: "5-Year Warranty",
        description: "All work comes with our comprehensive 5-year warranty covering both parts and labor.",
        guarantee: "Parts & Labor Covered"
      },
      {
        icon: "clock",
        title: "On-Time Service",
        description: "We respect your time. Arrive when promised or your service call is free.",
        guarantee: "Punctuality Promise"
      },
      {
        icon: "star",
        title: "A+ BBB Rating",
        description: "Accredited Business Bureau member with A+ rating and zero unresolved complaints.",
        guarantee: "BBB Accredited"
      },
      {
        icon: "wrench",
        title: "Expert Workmanship",
        description: "Over 25 years of experience with certified technicians and ongoing professional training.",
        guarantee: "Certified Professionals"
      }
    ]
  }

  const iconMap = {
    shield: Shield,
    award: Award,
    clock: Clock,
    checkCircle: CheckCircle,
    wrench: Wrench,
    star: Star
  }

  return (
    <section className="py-20 bg-green-50">
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
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-green-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                <div className="bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full inline-block">
                  ✓ {feature.guarantee}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center text-blue-600 bg-white px-6 py-3 rounded-lg shadow-sm border border-blue-200">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-semibold">Licensed, Bonded & Insured • BBB A+ Rating • 25+ Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}