import React from 'react';
import { ComponentInfo } from '@/lib/cms-types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
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
    <footer className="relative bg-white border-t border-theme-gray-200 overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="group">
                <h3 className="text-2xl font-bold text-theme-gray-900 mb-4 group-hover:text-theme-primary-600 transition-colors duration-300">
                  Base Theme
                </h3>
                <p className="text-theme-gray-600 leading-relaxed mb-6">
                  Crafting exceptional digital experiences with modern design principles and innovative solutions.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200 group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">hello@basetheme.com</span>
                </div>
                <div className="flex items-center space-x-3 text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200 group">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200 group">
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-theme-gray-900">Quick Links</h4>
              <nav className="space-y-3">
                {['About Us', 'Services', 'Portfolio', 'Blog', 'Contact'].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-theme-gray-600 hover:text-theme-primary-600 transition-all duration-200 hover:translate-x-1 group"
                  >
                    <span className="relative">
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-theme-gray-900">Services</h4>
              <nav className="space-y-3">
                {['Web Design', 'Development', 'Branding', 'Consulting', 'Support'].map((service, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-theme-gray-600 hover:text-theme-primary-600 transition-all duration-200 hover:translate-x-1 group"
                  >
                    <span className="relative">
                      {service}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-primary-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-theme-gray-900">Stay Connected</h4>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-theme-gray-600 text-sm">
                  Subscribe to our newsletter for the latest updates and insights.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 text-sm border border-theme-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <button className="px-4 py-2 bg-theme-primary-600 text-white rounded-r-lg hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2 transition-all duration-200 group">
                    <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-theme-gray-600 text-sm">Follow us on social media</p>
                <div className="flex space-x-4">
                  {[
                    { icon: Twitter, href: '#', label: 'Twitter' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: Github, href: '#', label: 'GitHub' },
                    { icon: Instagram, href: '#', label: 'Instagram' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-theme-gray-100 rounded-lg flex items-center justify-center text-theme-gray-600 hover:bg-theme-primary-600 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                    >
                      <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-theme-gray-600">
              <span className="text-sm">© 2024 Base Theme. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-sm">in San Francisco</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-theme-gray-600 hover:text-theme-primary-600 transition-colors duration-200">
                Cookies
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-theme-primary-600 text-white rounded-lg hover:bg-theme-primary-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 mx-auto group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-theme-primary-200 to-theme-primary-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
};

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Modern Minimalist Footer',
  description: 'A comprehensive footer with contact info, navigation, newsletter signup, and social links featuring subtle animations and modern design',
  category: 'layout',
  icon: 'Layout',
};

export default Footer;