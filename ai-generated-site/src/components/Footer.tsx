import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  // Component data - will be populated by AI
  const data = {
    companyName: "Nexus Cloud",
    tagline: "Building the future of technology",
    navigation: [
      { label: "Product", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" }
    ],
    socialLinks: [
      { platform: "github", href: "https://github.com/company" },
      { platform: "twitter", href: "https://twitter.com/company" },
      { platform: "linkedin", href: "https://linkedin.com/company" }
    ],
    copyright: "© 2024 Nexus Cloud. All rights reserved."
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="h-5 w-5" />
      case 'twitter': return <Twitter className="h-5 w-5" />
      case 'linkedin': return <Linkedin className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              {data.companyName}
            </h3>
            <p className="text-gray-400">{data.tagline}</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {data.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex space-x-4">
            {data.socialLinks.map((social) => (
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
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">{data.copyright}</p>
        </div>
      </div>
    </footer>
  )
}