import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Gift, Heart, Sparkles, Star, Clock, Leaf } from 'lucide-react'

interface HeroProps {
  headline: string
  description: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  heroImage: string
  specialOffer?: string
  serviceHighlights: string[]
  testimonialQuote?: string
  testimonialAuthor?: string
}

export default function Hero({ headline, description, primaryCta, secondaryCta, heroImage, specialOffer, serviceHighlights, testimonialQuote, testimonialAuthor }: HeroProps) {
  return (
    <section className="bg-rose-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-rose-500 mr-2" />
              <span className="text-rose-600 font-semibold text-sm">Wellness • Beauty • Serenity</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {headline}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {description}
            </p>
            
            {/* Special Offer */}
            {specialOffer && (
              <div className="bg-rose-100 border border-rose-200 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Gift className="h-5 w-5 text-rose-600 mr-2" />
                  <span className="text-sm font-semibold text-rose-800">Limited Time Offer</span>
                </div>
                <p className="text-rose-700 font-medium">{specialOffer}</p>
              </div>
            )}
            
            {/* Service Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Sparkles className="h-5 w-5 text-rose-500 mr-2" />
                Signature Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceHighlights.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonial */}
            {testimonialQuote && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-rose-400 mb-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm mb-2">"{testimonialQuote}"</p>
                <p className="text-gray-600 text-xs">- {testimonialAuthor}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryCta.href}
                className="bg-rose-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-rose-600 transition-colors inline-flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {primaryCta.text}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="border border-rose-300 text-rose-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  {secondaryCta.text}
                </Link>
              )}
            </div>
            
            <div className="mt-6 flex items-center text-green-600 text-sm">
              <Leaf className="h-4 w-4 mr-2" />
              <span>Organic Products • Cruelty-Free • Eco-Friendly</span>
            </div>
          </div>
          <div className="relative">
            <Image
              src={heroImage}
              alt="Serene spa environment"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-rose-500 mr-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Open 7 Days</p>
                  <p className="text-xs text-gray-600">Extended Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}