"use client"

import React, { useState, useEffect } from 'react';
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
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' }
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Our Team', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '#' },
        { name: 'Mobile Apps', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Consulting', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-theme-gray-900 via-theme-gray-800 to-theme-gray-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-theme-primary-900/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="group">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 bg-clip-text text-transparent">
                  Base Theme
                </h3>
                <div className="h-1 w-0 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600 transition-all duration-500 group-hover:w-full mt-2" />
              </div>
              
              <p className="text-theme-gray-300 leading-relaxed">
                Crafting exceptional digital experiences with modern design principles and cutting-edge technology.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-theme-gray-300 hover:text-theme-primary-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-theme-gray-800 rounded-lg group-hover:bg-theme-primary-500/20 transition-colors duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">hello@basetheme.com</span>
                </div>
                
                <div className="flex items-center space-x-3 text-theme-gray-300 hover:text-theme-primary-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-theme-gray-800 rounded-lg group-hover:bg-theme-primary-500/20 transition-colors duration-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center space-x-3 text-theme-gray-300 hover:text-theme-primary-400 transition-colors duration-300 group cursor-pointer">
                  <div className="p-2 bg-theme-gray-800 rounded-lg group-hover:bg-theme-primary-500/20 transition-colors duration-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-lg font-semibold text-white relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 h-0.5 w-8 bg-gradient-to-r from-theme-primary-400 to-theme-primary-600" />
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-theme-gray-300 hover:text-theme-primary-400 transition-all duration-300 flex items-center group text-sm"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-theme-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-theme-primary-900/20 to-theme-primary-800/20 rounded-2xl backdrop-blur-sm border border-theme-primary-500/20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-theme-gray-300 mb-6">Get the latest news and updates delivered to your inbox.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-theme-gray-800/50 border border-theme-gray-700 rounded-lg text-white placeholder-theme-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-lg hover:from-theme-primary-600 hover:to-theme-primary-700 transition-all duration-300 transform hover:scale-105 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-gray-700/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-theme-gray-400 text-sm">
              <span>© 2024 Base Theme. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>in San Francisco</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-3 bg-theme-gray-800 rounded-lg text-theme-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-theme-gray-700`}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Professional Footer',
  description: 'Modern footer with contact info, links, newsletter signup, and social media integration',
  category: 'layout',
  icon: 'Layout',
};

export default Footer;