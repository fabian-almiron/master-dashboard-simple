"use client"

import React, { useState } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Check, Star, Heart } from 'lucide-react'

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Mindful Start',
      description: 'Perfect for personal wellness journeys',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Personal dashboard',
        'Basic analytics',
        'Email support',
        'Mobile app access',
        '5 team members'
      ],
      gradient: 'from-purple-200/30 via-lavender-100/20 to-purple-50/10',
      borderGradient: 'from-purple-300/40 to-lavender-200/30',
      icon: Heart,
      popular: false
    },
    {
      name: 'Harmony Pro',
      description: 'Ideal for growing teams seeking balance',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Team collaboration',
        '25 team members',
        'Advanced reporting'
      ],
      gradient: 'from-emerald-200/40 via-sage-100/30 to-green-50/20',
      borderGradient: 'from-emerald-300/50 to-sage-200/40',
      icon: Star,
      popular: true
    },
    {
      name: 'Zen Enterprise',
      description: 'Complete solution for mindful organizations',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        'Enterprise analytics',
        'Dedicated support',
        'Custom development',
        'Unlimited members',
        'White-label options',
        'API access',
        'Advanced security'
      ],
      gradient: 'from-orange-200/30 via-peach-100/20 to-orange-50/10',
      borderGradient: 'from-orange-300/40 to-peach-200/30',
      icon: Star,
      popular: false
    }
  ]

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/30 via-white to-emerald-50/20 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 100%)'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(167, 243, 208, 0.3) 0%, rgba(254, 215, 170, 0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-purple-200/30">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-600">Choose Your Wellness Path</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Mindful <span className="font-serif italic text-purple-600">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect plan to nurture your team's growth and well-being with our thoughtfully crafted solutions
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 border border-purple-200/30 shadow-sm">
            <div className="flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
            const yearlyDiscount = billingCycle === 'yearly' ? Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100) : 0

            return (
              <div
                key={plan.name}
                className={`relative group transition-all duration-500 hover:scale-105 ${
                  plan.popular ? 'md:-mt-4 md:mb-4' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div 
                  className={`relative h-full bg-gradient-to-br ${plan.gradient} backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Subtle border gradient */}
                  <div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: '1px' }}
                  >
                    <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${plan.gradient}`} />
                  </div>

                  <div className="relative z-10">
                    {/* Plan Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      <h3 className="text-2xl font-light text-gray-800 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-light text-gray-800">${price}</span>
                        <span className="text-gray-500 text-sm">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && yearlyDiscount > 0 && (
                        <div className="text-sm text-emerald-600 font-medium">
                          Save {yearlyDiscount}% with yearly billing
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-white/60 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                        : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-white/40 hover:border-white/60'
                    }`}>
                      Start Your Journey
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We're here to help you find the perfect fit.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contact Our Wellness Team
          </button>
        </div>
      </div>
    </div>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Mindful Wellness Pricing',
  description: 'Zen-inspired pricing component with organic curves, dreamy gradients, and therapeutic color psychology',
  category: 'content-blocks',
  icon: 'DollarSign',
}

export default Pricing