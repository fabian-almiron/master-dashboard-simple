import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Footer',
  description: 'Site footer with links and information',
  category: 'layout',
  icon: 'Layout',
}

export default function Footer() {
  return (
    <footer className="w-full bg-theme-gray-900 text-theme-gray-300">
      <div className="theme-container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-theme-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="ml-2 text-xl font-bold text-white">Base Theme</span>
              </div>
              <p className="text-sm text-theme-gray-400 mb-4">
                A clean and modern theme for your website. Built with performance and accessibility in mind.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-.219c0-1.495.869-2.609 1.949-2.609.919 0 1.364.687 1.364 1.513 0 .921-.587 2.297-.889 3.572-.253 1.069.537 1.941 1.593 1.941 1.914 0 3.389-2.019 3.389-4.932 0-2.58-1.855-4.385-4.503-4.385-3.066 0-4.87 2.299-4.87 4.676 0 .926.357 1.918.803 2.458a.373.373 0 0 1 .084.366c-.094.385-.303 1.11-.345 1.265-.055.201-.179.243-.412.147-1.351-.629-2.197-2.604-2.197-4.192 0-3.403 2.472-6.531 7.129-6.531 3.739 0 6.641 2.663 6.641 6.22 0 3.713-2.343 6.704-5.594 6.704-1.092 0-2.121-.568-2.472-1.245 0 0-.54 2.058-.671 2.56-.243.921-.9 2.078-1.337 2.78.998.307 2.058.469 3.176.469 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-sm text-theme-gray-400 hover:text-theme-primary-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-theme-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@example.com
                </li>
                <li className="flex items-center text-sm text-theme-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </li>
                <li className="flex items-center text-sm text-theme-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Main St, City
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-theme-gray-400">
              © 2024 InnovateSaaS. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-theme-gray-400">
                Built with ❤️ using CMS TailWinds
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}