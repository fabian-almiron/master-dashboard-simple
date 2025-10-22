import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Truck, HardHat, Shield, Award, Wrench, CheckCircle } from 'lucide-react'

interface FooterProps {
  companyName: string
  tagline: string
  description: string
  navigation: Array<{ label: string; href: string }>
  contactInfo: {
    email: string
    phone: string
    address: string
    hours: string
  }
  serviceAreas: string
  licenses: Array<string>
  yearsExperience: string
  guarantees: Array<string>
  socialLinks: Array<{ platform: string; href: string }>
  copyright: string
}

export default function Footer({ companyName, tagline, description, navigation, contactInfo, serviceAreas, licenses, yearsExperience, guarantees, socialLinks, copyright }: FooterProps) {
  return (
    <footer className="bg-orange-50 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{companyName}</h3>
            <p className="text-orange-600 font-medium mb-3">{tagline}</p>
            <p className="text-gray-600 mb-4">{description}</p>
            
            {/* Contact Highlight */}
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-orange-800 mb-2 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-orange-600" />
                Call for Free Quote
              </h4>
              <p className="text-orange-900 font-bold text-lg">{contactInfo.phone}</p>
              <p className="text-orange-700 text-xs mt-1">Available 7 Days a Week</p>
            </div>
            
            {/* Service Areas */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                Service Areas
              </h4>
              <p className="text-gray-600 text-sm">{serviceAreas}</p>
            </div>
            
            {/* Licenses */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-orange-600" />
                Licensed • Bonded • Insured
              </h4>
              <div className="flex flex-wrap gap-2">
                {licenses.map((license, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {license}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Years Experience Badge */}
            <div className="flex items-center text-blue-600 text-sm">
              <Award className="h-4 w-4 mr-2" />
              <span>{yearsExperience} Years of Reliable Service • Family Owned & Operated</span>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-orange-600" />
              Our Services
            </h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-orange-600 text-sm transition-colors flex items-center"
                  >
                    <CheckCircle className="h-3 w-3 mr-2 text-orange-500" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <Link
              href="/quote"
              className="inline-flex items-center mt-4 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors w-full justify-center"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Request Free Estimate
            </Link>
          </div>
          
          {/* Contact & Guarantees */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact & Hours</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-orange-600" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2 text-orange-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-2 text-orange-600" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-orange-600" />
                <span>{contactInfo.hours}</span>
              </div>
            </div>
            
            {/* Guarantees */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <HardHat className="h-4 w-4 mr-2 text-orange-600" />
                Our Commitment
              </h4>
              <ul className="space-y-1">
                {guarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-start text-gray-600 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                    <span>{guarantee}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-orange-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">{copyright}</p>
            <div className="flex items-center text-gray-600 text-sm">
              <Shield className="h-4 w-4 mr-2 text-orange-600" />
              <span>Fully Licensed, Bonded & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}