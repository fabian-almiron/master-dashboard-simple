import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowUp,
  Heart,
  Zap
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-theme-gray-900 text-theme-gray-100 overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary-900/20 via-transparent to-theme-secondary-900/20" />
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-theme-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-theme-primary-500 to-theme-secondary-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-theme-primary-400 to-theme-secondary-400 bg-clip-text text-transparent">
                    Base Theme
                  </span>
                </div>
                <p className="text-theme-gray-400 mb-6 leading-relaxed">
                  Empowering modern businesses with innovative solutions and exceptional user experiences.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Twitter, href: '#', label: 'Twitter' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: Instagram, href: '#', label: 'Instagram' }
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="w-10 h-10 bg-theme-gray-800 rounded-lg flex items-center justify-center text-theme-gray-400 hover:bg-theme-primary-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-theme-primary-500 to-theme-secondary-500 rounded-full" />
                </h3>
                <ul className="space-y-3">
                  {['About Us', 'Services', 'Portfolio', 'Blog', 'Careers'].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-theme-primary-500 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 relative">
                  Services
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-theme-primary-500 to-theme-secondary-500 rounded-full" />
                </h3>
                <ul className="space-y-3">
                  {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Consulting', 'Support'].map((service) => (
                    <li key={service}>
                      <a
                        href="#"
                        className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-theme-primary-500 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full" />
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 relative">
                  Get in Touch
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-theme-primary-500 to-theme-secondary-500 rounded-full" />
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-theme-gray-800 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-theme-primary-600 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-theme-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-theme-gray-400 text-sm">Email</p>
                      <a href="mailto:hello@basetheme.com" className="text-white hover:text-theme-primary-400 transition-colors duration-300">
                        hello@basetheme.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-theme-gray-800 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-theme-primary-600 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-theme-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-theme-gray-400 text-sm">Phone</p>
                      <a href="tel:+1234567890" className="text-white hover:text-theme-primary-400 transition-colors duration-300">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-theme-gray-800 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-theme-primary-600 transition-colors duration-300">
                      <MapPin className="w-4 h-4 text-theme-gray-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-theme-gray-400 text-sm">Address</p>
                      <p className="text-white">123 Business Ave<br />Suite 100, City 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-theme-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by Base Theme</span>
            </div>
            
            <div className="text-theme-gray-400 text-sm">
              © 2024 Base Theme. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-theme-primary-500 to-theme-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-20"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Modern Business Footer',
  description: 'Comprehensive footer with company info, links, contact details, and social media integration',
  category: 'layout',
  icon: 'Layout',
};

export default Footer;