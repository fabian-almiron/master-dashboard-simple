import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Award, Shield, Linkedin, Facebook } from 'lucide-react'

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
  credentials: Array<string>
  socialLinks: Array<{ platform: string; href: string }>
  copyright: string
}

export default function Footer({ companyName, tagline, description, navigation, contactInfo, credentials, socialLinks, copyright }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="h-5 w-5" />
      case 'facebook': return <Facebook className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{companyName}</h3>
            <p className="text-blue-600 font-medium mb-3">{tagline}</p>
            <p className="text-gray-600 mb-4">{description}</p>
            
            {/* Credentials */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Award className="h-4 w-4 mr-2 text-blue-600" />
                Credentials & Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {credentials.map((credential, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {credential}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center text-green-600 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              <span>Licensed & Insured Professional Services</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2 text-blue-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                <span>{contactInfo.hours}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}