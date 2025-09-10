import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'
import { Check, Star } from 'lucide-react'

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Pricing Section',
  description: 'Display pricing plans and packages',
  category: 'content-blocks',
  icon: 'DollarSign',
}

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for small projects and personal websites',
      features: [
        'Up to 5 pages',
        'Basic customization',
        'Email support',
        'SSL certificate',
        'Mobile responsive'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Ideal for growing businesses and agencies',
      features: [
        'Unlimited pages',
        'Advanced customization',
        'Priority support',
        'SSL certificate',
        'Mobile responsive',
        'Analytics dashboard',
        'Custom domain',
        'SEO optimization'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        'Multi-site management',
        'API access',
        'Custom training'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="theme-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-[700px] text-theme-gray-600 md:text-xl">
            Choose the perfect plan for your needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-lg border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-theme-primary-500 shadow-lg scale-105' 
                  : 'border-theme-gray-200 hover:border-theme-primary-200 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-theme-primary-500 px-3 py-1 text-xs font-medium text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-theme-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-theme-gray-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-theme-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-theme-gray-500 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-theme-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-theme-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full h-12 rounded-md text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 ${
                  plan.popular
                    ? 'bg-theme-primary-500 text-white hover:bg-theme-primary-600 focus:ring-theme-primary-500 shadow-lg hover:shadow-xl'
                    : 'border border-theme-gray-300 bg-white text-theme-gray-900 hover:bg-theme-gray-50 focus:ring-theme-primary-500'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-theme-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
