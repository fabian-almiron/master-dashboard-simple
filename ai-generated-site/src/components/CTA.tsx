import Link from 'next/link'
import { Phone, Clock, Shield, AlertTriangle } from 'lucide-react'

export default function CTA() {
  // Component data - will be populated by AI
  const data = {
    headline: "Emergency Service Available 24/7",
    description: "Don't let plumbing emergencies turn into disasters. Our licensed professionals are standing by to help.",
    emergencyPhone: "(555) 847-6663",
    phoneNumber: "5558476663",
    responseTime: "30 Minutes or Less",
    primaryCta: {
      text: "Call Emergency Line",
      href: "tel:5558476663"
    },
    secondaryCta: {
      text: "Request Service",
      href: "/contact"
    },
    trustIndicators: [
      "Licensed & Insured",
      "Local Professionals",
      "Upfront Pricing",
      "No Hidden Fees"
    ]
  }

  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Emergency Alert */}
          <div className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-full mb-6">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-bold text-sm">EMERGENCY SERVICES AVAILABLE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            {data.description}
          </p>
          
          {/* Emergency Phone Prominent Display */}
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 max-w-md mx-auto">
            <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <div className="text-sm text-gray-600 mb-2">Emergency Hotline</div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{data.emergencyPhone}</div>
            <div className="text-sm text-green-600 font-semibold">{data.responseTime}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href={data.primaryCta.href}
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-50 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-3 h-6 w-6" />
              {data.primaryCta.text}
            </Link>
            <Link
              href={data.secondaryCta.href}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center"
            >
              <Clock className="mr-2 h-5 w-5" />
              {data.secondaryCta.text}
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {data.trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center text-red-100">
                <Shield className="h-4 w-4 mr-2" />
                <span className="font-medium">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}