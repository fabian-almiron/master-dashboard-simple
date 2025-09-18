import { Heart, Sparkles, Leaf, Clock, Star, Gift } from 'lucide-react'

interface FeaturesProps {
  headline: string
  description: string
  features: Array<{
    icon: string
    title: string
    description: string
    duration?: string
  }>
  wellness: {
    treatments: string
    experience: string
    satisfaction: string
    awards: string[]
  }
}

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  leaf: Leaf,
  clock: Clock,
  star: Star,
  gift: Gift
}

export default function Features({ headline, description, features, wellness }: FeaturesProps) {
  return (
    <section className="py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Wellness Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">{wellness.treatments}</div>
              <div className="text-sm text-gray-600">Signature Treatments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">{wellness.experience}</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">{wellness.satisfaction}</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
          </div>
          
          {/* Awards */}
          <div className="flex flex-wrap justify-center gap-3">
            {wellness.awards.map((award, index) => (
              <span key={index} className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded-full">
                ⭐ {award}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Heart
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-rose-200">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                {feature.duration && (
                  <div className="bg-rose-50 text-rose-800 text-sm px-3 py-1 rounded-full inline-block">
                    ⏱️ {feature.duration}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center text-green-600">
            <Leaf className="h-5 w-5 mr-2" />
            <span className="font-semibold">Organic Products • Cruelty-Free • Eco-Friendly Practices</span>
          </div>
        </div>
      </div>
    </section>
  )
}