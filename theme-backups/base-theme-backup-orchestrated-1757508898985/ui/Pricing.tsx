"use client"

import React, { useState, useEffect } from 'react'
import { Check, Star, Award, CreditCard, DollarSign, X } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [isAnnual, setIsAnnual] = useState(true)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started with essential features',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 5 team members',
        'Basic analytics dashboard',
        'Email support response within 24h',
        '10GB secure cloud storage',
        'Standard integrations library',
        'Mobile app access for iOS & Android',
        'Basic project templates',
        'Community forum access'
      ],
      popular: false,
      color: 'theme-gray-600',
      gradient: 'from-theme-gray-100 to-theme-gray-200'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses with advanced needs and enhanced collaboration',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        'Up to 25 team members',
        'Advanced analytics & custom reporting',
        'Priority support with 4h response',
        '100GB secure cloud storage',
        'Premium integrations marketplace',
        'Custom workflows & automation',
        'Full API access with documentation',
        'Advanced security & compliance',
        'Team collaboration tools',
        'Custom branding options'
      ],
      popular: true,
      color: 'theme-primary-600',
      gradient: 'from-theme-primary-100 to-theme-primary-200'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations requiring maximum flexibility',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        'Unlimited team members',
        'Custom analytics dashboard builder',
        'Dedicated account manager',
        'Unlimited secure cloud storage',
        'Custom integrations development',
        'White-label solutions available',
        'Advanced API with webhooks',
        'Enterprise-grade security & SSO',
        'SLA guarantee with 99.9% uptime',
        'On-premise deployment options',
        'Custom training & onboarding',
        '24/7 phone support hotline'
      ],
      popular: false,
      color: 'theme-gray-800',
      gradient: 'from-theme-gray-800 to-theme-gray-900'
    }
  ]

  const testimonials = [
    { name: 'Sarah Chen', company: 'TechFlow Inc', text: 'Transformed our workflow completely' },
    { name: 'Marcus Rodriguez', company: 'Digital Dynamics', text: 'ROI exceeded expectations within 3 months' },
    { name: 'Emily Watson', company: 'Innovation Labs', text: 'Best investment we made this year' }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-theme-gray-50 to-theme-primary-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-theme-primary-100 to-theme-primary-200 rounded-full mb-8 shadow-lg backdrop-blur-sm">
            <Award className="w-6 h-6 text-theme-primary-600 mr-3" />
            <span className="text-theme-primary-700 font-semibold text-lg">Trusted by 50,000+ professionals worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-theme-gray-900 mb-8 leading-tight tracking-tight">
            Choose Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-500 to-theme-primary-700">
              Growth Plan
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-theme-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Transparent pricing designed to scale with your ambitions. No hidden fees, no surprises, no compromises. 
            Start your transformation today with enterprise-grade tools and dedicated support that grows with you.
          </p>

          <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-xl border border-theme-gray-200 mb-16 backdrop-blur-lg">
            <button
              onClick={() => setIsAnnual(false)}
              onMouseEnter={() => setHoveredPlan('monthly')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform ${
                !isAnnual 
                  ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white shadow-lg scale-105' 
                  : 'text-theme-gray-600 hover:text-theme-gray-900 hover:bg-theme-gray-50'
              }`}
              aria-label="Select monthly billing"
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              onMouseEnter={() => setHoveredPlan('annual')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform relative ${
                isAnnual 
                  ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white shadow-lg scale-105' 
                  : 'text-theme-gray-600 hover:text-theme-gray-900 hover:bg-theme-gray-50'
              }`}
              aria-label="Select annual billing with 20% savings"
            >
              Annual Billing
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-3 py-1 rounded-full shadow-lg animate-pulse">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-2xl border-2 transition-all duration-700 transform ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                plan.popular 
                  ? 'border-theme-primary-500 scale-105 lg:scale-110 shadow-theme-primary-200/50' 
                  : 'border-theme-gray-200 hover:border-theme-primary-300'
              } ${
                selectedPlan === plan.id ? 'ring-4 ring-theme-primary-200 ring-opacity-50' : ''
              } ${
                hoveredPlan === plan.id ? 'shadow-3xl -translate-y-4' : 'hover:shadow-3xl hover:-translate-y-2'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedPlan(plan.id)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-theme-primary-500 via-theme-primary-600 to-theme-primary-700 text-white px-8 py-3 rounded-full shadow-xl flex items-center backdrop-blur-sm">
                    <Star className="w-5 h-5 mr-2 fill-current animate-pulse" />
                    <span className="font-bold text-lg">Most Popular Choice</span>
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-3xl`} />

              <div className="relative p-10 lg:p-12">
                <div className="text-center mb-10">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-theme-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-theme-gray-600 text-lg leading-relaxed">{plan.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center mb-2">
                      <DollarSign className="w-8 h-8 text-theme-gray-700 mr-1" />
                      <span className="text-6xl font-bold text-theme-gray-900">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-theme-gray-600 ml-3 text-xl">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        <Check className="w-4 h-4 mr-2" />
                        Save ${(plan.monthlyPrice * 12) - plan.annualPrice} annually
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center justify-center transform ${
                      plan.popular
                        ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 hover:from-theme-primary-600 hover:to-theme-primary-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                        : 'bg-theme-gray-100 hover:bg-theme-gray-200 text-theme-gray-900 hover:shadow-lg hover:scale-102'
                    }`}
                    aria-label={`Select ${plan.name} plan for ${isAnnual ? plan.annualPrice : plan.monthlyPrice} dollars per ${isAnnual ? 'year' : 'month'}`}
                  >
                    <CreditCard className="w-6 h-6 mr-3" />
                    Start Free Trial
                  </button>
                </div>

                <div className="space-y-5">
                  <h4 className="font-bold text-theme-gray-900 text-xl mb-6 flex items-center">
                    <Award className="w-6 h-6 mr-3 text-theme-primary-600" />
                    Everything included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-theme-gray-700 leading-relaxed text-lg group-hover:text-theme-gray-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-theme-gray-200 backdrop-blur-lg">
            <h3 className="text-3xl font-bold text-theme-gray-900 mb-6 flex items-center">
              <Star className="w-8 h-8 text-theme-primary-600 mr-4" />
              Need a custom solution?
            </h3>
            <p className="text-theme-gray-600 mb-8 leading-relaxed text-lg">
              Our enterprise specialists can create a tailored package that perfectly fits your unique requirements. 
              Get dedicated support, custom integrations, flexible pricing, and white-glove onboarding.
            </p>
            <button 
              className="bg-gradient-to-r from-theme-gray-900 to-theme-gray-800 hover:from-theme-gray-800 hover:to-theme-gray-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:shadow-xl transform hover:scale-105"
              aria-label="Contact our sales team for custom enterprise solutions"
            >
              Contact Sales Team
            </button>
          </div>

          <div className="bg-gradient-to-br from-theme-primary-50 to-theme-primary-100 rounded-3xl shadow-xl p-10 border border-theme-primary-200">
            <h3 className="text-3xl font-bold text-theme-gray-900 mb-6">
              What our customers say
            </h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-theme-primary-200">
                  <p className="text-theme-gray-700 mb-4 italic text-lg">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-theme-gray-900">{testimonial.name}</p>
                      <p className="text-theme-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-theme-gray-200">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center text-theme-gray-600">
              <Check className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-lg">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center text-theme-gray-600">
              <Check className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-lg">No setup fees</span>
            </div>
            <div className="flex items-center text-theme-gray-600">
              <Check className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-lg">Cancel anytime</span>
            </div>
          </div>
          <p className="text-theme-gray-500 text-lg">
            Join thousands of satisfied customers who trust us with their business growth
          </p>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Professional Pricing Plans',
  description: 'Modern pricing component with interactive plan selection, annual/monthly toggle, customer testimonials, and trust-focused design elements',
  category: 'content-blocks',
  icon: 'CreditCard'
}


export default Pricing;