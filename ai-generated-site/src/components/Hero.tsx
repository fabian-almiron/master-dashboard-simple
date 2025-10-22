import Link from 'next/link'
import Image from 'next/image'
import { Truck, Phone, MapPin, HardHat, Shield, Award, CheckCircle, Wrench } from 'lucide-react'

interface HeroProps {
  headline: string
  description: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  heroImage: string
  contactPhone: string
  serviceAreas: string
  projectTypes: string[]
  guarantees: string[]
  yearsExperience: string
}

export default function Hero({ headline, description, primaryCta, secondaryCta, heroImage, contactPhone, serviceAreas, projectTypes, guarantees, yearsExperience }: HeroProps) {
  return (
    <section className="bg-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <HardHat className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-orange-600 font-semibold text-sm">Licensed • Bonded • Insured</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {headline}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {description}
            </p>
            
            {/* Contact & Service Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-100 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-orange-700 mr-2" />
                  <span className="text-sm font-semibold text-orange-800">Call for Free Quote</span>
                </div>
                <p className="text-orange-900 font-bold text-lg">{contactPhone}</p>
                <p className="text-orange-700 text-xs">Available 7 Days a Week</p>
              </div>
              <div className="bg-white border border-orange-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-sm font-semibold text-gray-800">Service Areas</span>
                </div>
                <p className="text-gray-700 text-sm">{serviceAreas}</p>
              </div>
            </div>
            
            {/* Project Types */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Truck className="h-5 w-5 text-orange-600 mr-2" />
                Services We Provide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {projectTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-gray-700 text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Guarantees */}
            <div className="bg-white border border-orange-200 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm font-semibold text-gray-900">Our Commitment to Quality</span>
              </div>
              <div className="space-y-2">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 text-sm">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryCta.href}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors inline-flex items-center justify-center"
              >
                <Wrench className="mr-2 h-5 w-5" />
                {primaryCta.text}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="border border-orange-300 text-orange-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <Image
              src={heroImage}
              alt="Excavation equipment at work"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-orange-600 mr-2" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{yearsExperience}</p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-1" />
                <p className="text-xs font-semibold">Full Fleet</p>
                <p className="text-xs">of Equipment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}