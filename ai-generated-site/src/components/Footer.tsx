import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Calendar, Gift, Heart, Instagram, Facebook, Twitter } from 'lucide-react'

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
  specialOffers?: Array<{ title: string; description: string }>
  socialLinks: Array<{ platform: string; href: string }>
  copyright: string
}

export default function Footer({ companyName, tagline, description, navigation, contactInfo, specialOffers, socialLinks, copyright }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-5 w-5" />
      case 'facebook': return <Facebook className="h-5 w-5" />
      case 'twitter': return <Twitter className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <footer className="bg-rose-50 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Spa Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{companyName}</h3>
            <p className="text-rose-600 font-medium mb-3">{tagline}</p>
            <p className="text-gray-600 mb-4">{description}</p>
            
            {/* Special Offers */}
            {specialOffers && specialOffers.length > 0 && (
              <div className="bg-rose-100 border border-rose-200 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-rose-800 mb-2 flex items-center">
                  <Gift className="h-4 w-4 mr-2 text-rose-600" />
                  Special Offers
                </h4>
                {specialOffers.map((offer, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <p className="text-rose-700 font-medium text-sm">{offer.title}</p>
                    <p className="text-rose-600 text-xs">{offer.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center text-green-600 text-sm">
              <Heart className="h-4 w-4 mr-2" />
              <span>Organic Products • Cruelty-Free • Eco-Friendly</span>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Services</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-rose-600 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 space-y-2">
              <Link
                href="/booking"
                className="inline-flex items-center w-full bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
              <Link
                href="/gift-cards"
                className="inline-flex items-center w-full border border-rose-300 text-rose-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-50 transition-colors justify-center"
              >
                <Gift className="h-4 w-4 mr-2" />
                Gift Cards
              </Link>
            </div>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Visit & Connect</h4>
            <div className="space-y-3">
              <div className="flex items-start text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-rose-600" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2 text-rose-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-2 text-rose-600" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-rose-600" />
                <span>{contactInfo.hours}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Follow Our Journey</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="text-gray-400 hover:text-rose-600 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(social.platform)}
                  </Link>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-2">Share your experience with #RelaxAndRenew</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-rose-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}