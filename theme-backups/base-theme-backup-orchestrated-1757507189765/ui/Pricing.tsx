"use client"

import React, { useState } from 'react'
import { Check, Star, Award, CreditCard } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      id: 'basic',
      name: 'Basic Service',
      description: 'Essential HVAC maintenance for small homes',
      monthlyPrice: 89,
      yearlyPrice: 890,
      features: [
        'Annual system inspection',
        'Filter replacement (2x/year)',
        'Basic cleaning service',
        'Emergency phone support',
        'Service report documentation',
        '10% discount on repairs'
      ],
      color: 'theme-gray-500',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Care',
      description: 'Comprehensive HVAC & plumbing maintenance',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        'Bi-annual system inspections',
        'Priority emergency service',
        'Filter replacement (4x/year)',
        'Duct cleaning service',
        'Plumbing system check',
        '15% discount on all repairs',
        'Energy efficiency consultation',
        '24/7 emergency hotline'
      ],
      color: 'theme-primary-500',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Protection',
      description: 'Complete home comfort solution',
      monthlyPrice: 229,
      yearlyPrice: 2290,
      features: [
        'Quarterly system inspections',
        'Premium emergency response',
        'Monthly filter replacements',
        'Complete duct sanitization',
        'Full plumbing maintenance',
        '20% discount on all services',
        'Smart thermostat optimization',
        'Indoor air quality testing',
        'Preventive maintenance alerts',
        'Dedicated service technician'
      ],
      color: 'theme-orange-500',
      popular: false
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleBillingToggle = (cycle: string) => {
    setBillingCycle(cycle)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-theme-primary-50 via-white to-theme-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-theme-orange-100 text-theme-orange-800 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 5,000+ Local Homeowners
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-theme-gray-900 mb-6 leading-tight">
            Professional Home Comfort
            <span className="block text-theme-primary-600">Service Plans</span>
          </h1>
          
          <p className="text-xl text-theme-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Keep your HVAC and plumbing systems running efficiently year-round with our comprehensive maintenance plans. Local expertise you can trust, with emergency support when you need it most.
          </p>

          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-lg border border-theme-gray-200 mb-12">
            <button
              onClick={() => handleBillingToggle('monthly')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-theme-primary-500 text-white shadow-md'
                  : 'text-theme-gray-600 hover:text-theme-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingToggle('yearly')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-theme-primary-500 text-white shadow-md'
                  : 'text-theme-gray-600 hover:text-theme-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-theme-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                selectedPlan === plan.id
                  ? `border-${plan.color} ring-4 ring-${plan.color} ring-opacity-20`
                  : 'border-theme-gray-200 hover:border-theme-gray-300'
              } ${plan.popular ? 'lg:scale-110 lg:z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-theme-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-theme-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-theme-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-theme-gray-900">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                    </span>
                    <span className="text-theme-gray-600 ml-2">
                      /month
                    </span>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-theme-green-600 font-medium mt-1">
                        Billed annually (${plan.yearlyPrice})
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-5 h-5 text-${plan.color} mr-3 mt-0.5 flex-shrink-0`} />
                      <span className="text-theme-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedPlan === plan.id
                      ? `bg-${plan.color} text-white shadow-lg`
                      : `border-2 border-${plan.color} text-${plan.color} hover:bg-${plan.color} hover:text-white`
                  }`}
                  aria-label={`Select ${plan.name} plan`}
                >
                  <CreditCard className="w-5 h-5 inline mr-2" />
                  {selectedPlan === plan.id ? 'Selected Plan' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-theme-primary-600 to-theme-primary-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Emergency Service Available 24/7
          </h2>
          <p className="text-xl mb-8 opacity-90">
            All plans include priority emergency response. When your comfort is at risk, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:555-HVAC-NOW"
              className="bg-theme-orange-500 hover:bg-theme-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Call (555) HVAC-NOW
            </a>
            <span className="text-theme-primary-100">or</span>
            <button className="border-2 border-white text-white hover:bg-white hover:text-theme-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Schedule Online
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Professional Service Pricing',
  description: 'Comprehensive HVAC and plumbing service pricing component with interactive plan selection and emergency contact prominence',
  category: 'content-blocks',
  icon: 'CreditCard'
}


export default Pricing;