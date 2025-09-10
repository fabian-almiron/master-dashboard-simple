"use client"

import React, { useState } from 'react'
import { Check, Star, Award, CreditCard } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const LuxuryPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 5 projects',
        'Basic analytics',
        'Email support',
        '10GB storage',
        'Standard templates'
      ],
      accent: 'from-amber-100 to-amber-50',
      border: 'border-amber-200',
      button: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '100GB storage',
        'Premium templates',
        'Team collaboration',
        'Custom integrations'
      ],
      popular: true,
      accent: 'from-amber-200 to-amber-100',
      border: 'border-amber-400',
      button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Unlimited storage',
        'White-label options',
        'Advanced security',
        'Custom development',
        'SLA guarantee'
      ],
      accent: 'from-amber-300 to-amber-200',
      border: 'border-amber-500',
      button: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2 rounded-full border border-amber-200 mb-6">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Premium Plans</span>
          </div>
          
          <h2 className="text-5xl font-serif text-stone-900 mb-6 leading-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Unlock premium features designed for professionals who demand excellence
          </p>

          <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-lg border border-stone-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
            const isHovered = hoveredPlan === plan.id
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.border
                } ${plan.popular ? 'scale-105 lg:scale-110' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">Most Popular</span>
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${plan.accent} rounded-3xl opacity-50`} />
                
                <div className="relative p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-serif text-stone-900 mb-2">{plan.name}</h3>
                    <p className="text-stone-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-stone-900">${price}</span>
                        <span className="text-stone-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-sm text-emerald-600 font-medium mt-2">
                          Save ${(plan.monthlyPrice * 12) - plan.annualPrice} per year
                        </p>
                      )}
                    </div>

                    <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                      plan.button
                    } ${isHovered ? 'scale-105' : ''} shadow-lg hover:shadow-xl`}>
                      <div className="flex items-center justify-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Get Started
                      </div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-stone-900 text-lg mb-4">Everything included:</h4>
                    {plan.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 group"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-stone-700 group-hover:text-stone-900 transition-colors duration-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-stone-600 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-stone-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Luxury Pricing',
  description: 'Sophisticated pricing component with warm gold accents and elegant typography',
  category: 'content-blocks',
  icon: 'CreditCard'
}

export default LuxuryPricing;
