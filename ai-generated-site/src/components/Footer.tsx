import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

interface FooterProps {
  companyName: string
  tagline: string
  navigation: Array<{ label: string; href: string }>
  socialLinks: Array<{ platform: string; href: string }>
  copyright: string
}

export default function Footer({ companyName, tagline, navigation, socialLinks, copyright }: FooterProps) {
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
              {companyName}
            </h3>
            <p className="text-gray-400">{tagline}</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {navigation.map((item) => (
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
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}