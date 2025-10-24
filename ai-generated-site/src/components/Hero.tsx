import Link from 'next/link'
import Image from 'next/image'
import { Award, Wrench, Shield, Users, CheckCircle, Settings } from 'lucide-react'

export default function Hero() {
  // Component data - will be populated by AI
  const data = {
    headline: "Expert HVAC Services & Repair",
    description: "Certified technicians specializing in heating, ventilation, and air conditioning systems. Advanced diagnostics and energy-efficient solutions.",
    certifications: ["EPA Certified", "NATE Certified", "Licensed Contractor"],
    specializations: [
      "Emergency Repairs",
      "System Installation", 
      "Preventive Maintenance",
      "Energy Audits"
    ],
    teamSize: "12",
    warrantyYears: "5",
    primaryCta: { text: "Schedule Service", href: "/contact" },
    secondaryCta: { text: "Emergency Repair", href: "tel:555-123-4567" },
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
  }

  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Certification Banner */}
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Certified Professionals</div>
                <div className="text-sm text-blue-600">
                  {data.certifications.join(' • ')}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {data.description}
            </p>
            
            {/* Specializations Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {data.specializations.map((spec, index) => (
                <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <Settings className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">{spec}</span>
                </div>
              ))}
            </div>
            
            {/* Team & Warranty Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="font-semibold text-gray-900">{data.teamSize} Expert Technicians</div>
                    <div className="text-xs text-gray-600">Certified Team</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="font-semibold text-gray-900">{data.warrantyYears}-Year Warranty</div>
                    <div className="text-xs text-gray-600">On All Work</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={data.primaryCta.href}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <Wrench className="mr-2 h-5 w-5" />
                {data.primaryCta.text}
              </Link>
              <Link
                href={data.secondaryCta.href}
                className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition-colors"
              >
                {data.secondaryCta.text}
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src={data.heroImage}
              alt="Technical service work"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            {/* Certification Badge */}
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <Award className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xs font-bold">CERTIFIED</div>
                <div className="text-xs">EXPERTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}