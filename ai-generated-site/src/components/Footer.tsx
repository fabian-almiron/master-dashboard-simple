import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  // Component data - will be populated by AI
  const data = {
    companyName: "Summit Roofing & Restoration",
    description: "Leading provider of innovative solutions that help businesses thrive in today's competitive marketplace.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Consulting", href: "/consulting" },
          { label: "Development", href: "/development" },
          { label: "Support", href: "/support" },
          { label: "Training", href: "/training" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Blog", href: "/blog" },
          { label: "News", href: "/news" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Help Center", href: "/help" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" }
        ]
      }
    ],
    contactInfo: {
      email: "hello@company.com",
      phone: "(555) 123-4567",
      address: "123 Business St, Suite 100, City, ST 12345"
    },
    socialLinks: [
      { platform: "facebook", href: "https://facebook.com/company" },
      { platform: "twitter", href: "https://twitter.com/company" },
      { platform: "instagram", href: "https://instagram.com/company" },
      { platform: "linkedin", href: "https://linkedin.com/company" }
    ],
    copyright: "© 2024 Summit Roofing & Restoration. All rights reserved."
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="h-5 w-5" />
      case 'twitter': return <Twitter className="h-5 w-5" />
      case 'instagram': return <Instagram className="h-5 w-5" />
      case 'linkedin': return <Linkedin className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{data.companyName}</h3>
            <p className="text-gray-400 mb-4">{data.description}</p>
            <div className="flex space-x-4">
              {data.socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  className="text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
          
          {data.columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>{data.contactInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>{data.contactInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{data.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">{data.copyright}</p>
        </div>
      </div>
    </footer>
  )
}