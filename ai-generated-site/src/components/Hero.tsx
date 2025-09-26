import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Truck, Shield, Star, Search, Tag, ArrowRight } from 'lucide-react'

interface HeroProps {
  headline: string
  description: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  heroImage: string
  specialOffer?: string
  features: string[]
}

export default function Hero({ headline, description, primaryCta, secondaryCta, heroImage, specialOffer, features }: HeroProps) {
  return (
    <>
      {/* Promotional Banner */}
      {specialOffer && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center">
              <Tag className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{specialOffer}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>
      )}
      
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {headline}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {description}
              </p>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-green-600">
                  <Truck className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center text-yellow-600">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={primaryCta.href}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {primaryCta.text}
                </Link>
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    {secondaryCta.text}
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <Image
                src={heroImage}
                alt="Featured products"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}