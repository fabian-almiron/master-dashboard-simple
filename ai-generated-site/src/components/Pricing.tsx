'use client'

import { useState } from 'react'
import { Check, Star } from 'lucide-react'

interface PricingProps {
  headline: string
  description: string
  pricingTiers: Array<{
    name: string
    monthlyPrice: string
    yearlyPrice: string
    description: string
    features: string[]
    ctaText: string
    ctaHref: string
    popular?: boolean
  }>
  yearlyDiscount: string
  guarantee?: string
}

export default function Pricing({ headline, description, pricingTiers, yearlyDiscount, guarantee }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                Save {yearlyDiscount}
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-sm border ${
                tier.popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
              } p-6`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isYearly ? 'year' : 'month'}</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={tier.ctaHref}
                className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
        
        {guarantee && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              <Star className="h-5 w-5 text-yellow-400 inline mr-2" />
              {guarantee}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}