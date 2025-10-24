import Link from 'next/link'
import { Phone, Calendar, Shield, Award, CheckCircle, FileText } from 'lucide-react'

export default function CTA() {
  // Component data - will be populated by AI
  const data = {
    headline: "Ready for Professional Service?",
    description: "Get a free, detailed estimate from licensed professionals. No obligations, no pressure - just honest advice and competitive pricing.",
    guarantees: [
      "100% Satisfaction Guarantee",
      "Licensed & Insured",
      "Free Written Estimates", 
      "Upfront Pricing",
      "5-Year Warranty",
      "Emergency Service Available"
    ],
    primaryCta: {
      text: "Get Free Estimate",
      href: "/contact"
    },
    emergencyCta: {
      text: "Emergency Service",
      href: "tel:5554827826",
      phone: "(555) 482-7826"
    },
    processSteps: [
      "Call or schedule online",
      "Free on-site assessment",
      "Written estimate provided",
      "Professional work completed"
    ]
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Main CTA */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {data.headline}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {data.description}
              </p>
              
              {/* Process Steps */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Simple Process:</h3>
                <div className="space-y-3">
                  {data.processSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={data.primaryCta.href}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {data.primaryCta.text}
                </Link>
                <Link
                  href={data.emergencyCta.href}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {data.emergencyCta.text}
                </Link>
              </div>
            </div>
            
            {/* Right Side - Guarantees */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Guarantees</h3>
              
              <div className="space-y-4">
                {data.guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700 font-medium">{guarantee}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-xl border border-blue-200">
                <div className="text-center">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="font-bold text-gray-900 mb-1">A+ BBB Rating</div>
                  <div className="text-sm text-gray-600 mb-3">Trusted by hundreds of satisfied customers</div>
                  <div className="bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Licensed Contractor #123456
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}