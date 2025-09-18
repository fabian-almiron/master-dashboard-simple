import Link from 'next/link'
import Image from 'next/image'
import { Shield, Award, Users, Calendar, Star } from 'lucide-react'

interface HeroProps {
  headline: string
  description: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  heroImage: string
  credentials: string[]
  testimonialQuote?: string
  testimonialAuthor?: string
}

export default function Hero({ headline, description, primaryCta, secondaryCta, heroImage, credentials, testimonialQuote, testimonialAuthor }: HeroProps) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold text-sm">Licensed & Trusted Professionals</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {headline}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {description}
            </p>
            
            {/* Credentials */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-900">Credentials & Recognition</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {credentials.map((credential, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {credential}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Testimonial */}
            {testimonialQuote && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600 mb-6">
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
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {primaryCta.text}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                >
                  <Users className="mr-2 h-5 w-5" />
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <Image
              src={heroImage}
              alt="Professional team"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Fully Licensed</p>
                  <p className="text-xs text-gray-600">& Insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}