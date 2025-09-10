"use client"

import React, { useState } from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Check, Star, Zap, Shield, Crown } from 'lucide-react'

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      icon: Star,
      price: { monthly: 9, yearly: 90 },
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Basic support',
        'Standard templates',
        'Mobile responsive'
      ],
      popular: false,
      color: 'theme-gray-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses and teams',
      icon: Zap,
      price: { monthly: 29, yearly: 290 },
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Premium templates',
        'Advanced analytics',
        'Team collaboration',
        'Custom domains'
      ],
      popular: true,
      color: 'theme-primary-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced features for large organizations',
      icon: Crown,
      price: { monthly: 99, yearly: 990 },
      features: [
        'Everything in Professional',
        'Unlimited storage',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
        'White-label options',
        'SLA guarantee',
        'Custom training'
      ],
      popular: false,
      color: 'theme-secondary-500'
    }
  ]

  const savings = Math.round(((plans[1].price.monthly * 12 - plans[1].price.yearly) / (plans[1].price.monthly * 12)) * 100)

  return (
    <section className="py-24 bg-gradient-to-br from-theme-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto mb-8">
            Scale your business with our flexible pricing options. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-theme-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-theme-gray-900 shadow-sm'
                  : 'text-theme-gray-600 hover:text-theme-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-theme-gray-900 shadow-sm'
                  : 'text-theme-gray-600 hover:text-theme-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-theme-primary-500 text-white text-xs px-2 py-1 rounded-full">
                Save {savings}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const isHovered = hoveredPlan === plan.id
            const price = plan.price[billingCycle]
            const originalPrice = billingCycle === 'yearly' ? plan.price.monthly * 12 : null

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 transform ${
                  plan.popular
                    ? 'border-theme-primary-200 scale-105 shadow-2xl'
                    : isHovered
                    ? 'border-theme-gray-200 scale-102 shadow-xl'
                    : 'border-theme-gray-100 hover:border-theme-gray-200'
                } ${isHovered ? 'translate-y-[-4px]' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-theme-primary-500 to-theme-primary-600 text-white'
                        : isHovered
                        ? `bg-${plan.color} text-white`
                        : `bg-${plan.color}/10 text-${plan.color}`
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-theme-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-theme-gray-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold text-theme-gray-900">${price}</span>
                      <span className="text-theme-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    {originalPrice && (
                      <div className="text-sm text-theme-gray-500">
                        <span className="line-through">${originalPrice}/yr</span>
                        <span className="ml-2 text-theme-primary-600 font-medium">
                          Save ${originalPrice - price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 ${
                          plan.popular
                            ? 'bg-theme-primary-100 text-theme-primary-600'
                            : isHovered
                            ? `bg-${plan.color}/10 text-${plan.color}`
                            : 'bg-theme-gray-100 text-theme-gray-600'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-theme-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
                    plan.popular
                      ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : isHovered
                      ? `bg-${plan.color} text-white shadow-lg hover:shadow-xl hover:scale-105`
                      : 'bg-theme-gray-100 text-theme-gray-900 hover:bg-theme-gray-200'
                  }`}>
                    Get Started
                  </button>
                </div>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <div className={`absolute inset-0 rounded-2xl opacity-20 blur-xl transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600'
                      : `bg-${plan.color}`
                  }`} style={{ zIndex: -1 }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-theme-gray-600 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <button className="inline-flex items-center gap-2 bg-theme-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-theme-gray-800 transition-all duration-300 transform hover:scale-105">
            <Shield className="w-5 h-5" />
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Interactive Pricing Cards',
  description: 'Modern pricing component with animated cards, billing toggle, and hover effects',
  category: 'content-blocks',
  icon: 'DollarSign',
}

export default Pricing