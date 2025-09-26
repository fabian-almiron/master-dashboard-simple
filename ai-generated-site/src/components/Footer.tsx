import Link from 'next/link'
import { Mail, Phone, Truck, Shield, CreditCard, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

interface FooterProps {
  companyName: string
  description: string
  columns: Array<{
    title: string
    links: Array<{ label: string; href: string }>
  }>
  contactInfo: {
    email: string
    phone: string
    hours: string
  }
  socialLinks: Array<{ platform: string; href: string }>
  copyright: string
}

export default function Footer({ companyName, description, columns, contactInfo, socialLinks, copyright }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="h-5 w-5" />
      case 'twitter': return <Twitter className="h-5 w-5" />
      case 'instagram': return <Instagram className="h-5 w-5" />
      case 'youtube': return <Youtube className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest deals and new arrivals delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-md font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400 mb-6">{description}</p>
            
            {/* Customer Service */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Customer Service</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-3 text-blue-400" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 text-blue-400" />
                  <span>{contactInfo.email}</span>
                </div>
                <p className="text-gray-400 text-sm">{contactInfo.hours}</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(social.platform)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Links Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center text-gray-400">
                <Truck className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm">Free Shipping Over $50</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center text-gray-400">
                <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
                <span className="text-sm">Multiple Payment Options</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}