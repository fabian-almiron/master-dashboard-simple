import { Truck, HardHat, Shield, MapPin, Award, CheckCircle } from 'lucide-react'

interface FeaturesProps {
  headline: string
  description: string
  features: Array<{
    icon: string
    title: string
    description: string
    guarantee?: string
  }>
  companyInfo: {
    yearsExperience: string
    projectsCompleted: string
    serviceAreas: string
    equipmentCount: string
  }
}

const iconMap = {
  truck: Truck,
  hardHat: HardHat,
  shield: Shield,
  mapPin: MapPin,
  award: Award,
  check: CheckCircle
}

export default function Features({ headline, description, features, companyInfo }: FeaturesProps) {
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{companyInfo.yearsExperience}</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{companyInfo.projectsCompleted}</div>
              <div className="text-sm text-gray-600">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{companyInfo.equipmentCount}</div>
              <div className="text-sm text-gray-600">Equipment Fleet</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Serving</div>
              <div className="text-sm font-semibold text-orange-600">{companyInfo.serviceAreas}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Truck
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                {feature.guarantee && (
                  <div className="bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full inline-block">
                    ✓ {feature.guarantee}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center text-blue-600">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-semibold">Licensed, Bonded & Insured • Safety First • Quality Workmanship</span>
          </div>
        </div>
      </div>
    </section>
  )
}