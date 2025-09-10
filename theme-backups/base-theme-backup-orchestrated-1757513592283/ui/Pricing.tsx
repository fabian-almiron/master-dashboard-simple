"use client"

import React, { useState, useEffect } from 'react'
import { Check, Star, Award, CreditCard, DollarSign, X } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [isAnnual, setIsAnnual] = useState(true)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const phases = [1, 2, 3]
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), index * 400)
    })
  }, [])

  const plans = [
    {
      id: 'essential',
      name: 'Essential Care',
      tagline: 'Perfect for new homeowners',
      monthlyPrice: 89,
      annualPrice: 890,
      originalPrice: 1068,
      color: 'slate',
      gradient: 'from-slate-500 to-slate-700',
      bgPattern: 'from-slate-50 via-white to-slate-50',
      features: [
        { name: 'Annual system inspection', essential: true },
        { name: 'Basic filter replacement', essential: true },
        { name: 'Emergency phone support', essential: false },
        { name: '1-year parts warranty', essential: false },
        { name: 'Maintenance reminders', essential: false }
      ],
      warranty: '1 Year',
      response: '24 Hours'
    },
    {
      id: 'professional',
      name: 'Professional Plus',
      tagline: 'Most comprehensive protection',
      monthlyPrice: 149,
      annualPrice: 1490,
      originalPrice: 1788,
      color: 'primary',
      gradient: 'from-theme-primary-500 to-theme-primary-700',
      bgPattern: 'from-theme-primary-50 via-white to-theme-primary-50',
      features: [
        { name: 'Bi-annual comprehensive service', essential: true },
        { name: 'Premium filter upgrades', essential: true },
        { name: '24/7 emergency guarantee', essential: true },
        { name: '3-year full warranty', essential: true },
        { name: 'Smart thermostat optimization', essential: false },
        { name: 'Air quality testing', essential: false },
        { name: 'Priority scheduling', essential: false }
      ],
      warranty: '3 Years',
      response: 'Same Day',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Elite',
      tagline: 'Ultimate luxury experience',
      monthlyPrice: 229,
      annualPrice: 2290,
      originalPrice: 2748,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      bgPattern: 'from-amber-50 via-white to-amber-50',
      features: [
        { name: 'Quarterly precision maintenance', essential: true },
        { name: 'Advanced filtration systems', essential: true },
        { name: 'Immediate emergency response', essential: true },
        { name: '5-year comprehensive warranty', essential: true },
        { name: 'Complete energy optimization', essential: true },
        { name: 'Duct cleaning & sanitization', essential: true },
        { name: 'Smart home integration', essential: false },
        { name: 'Dedicated technician', essential: false },
        { name: 'Annual upgrade credits', essential: false }
      ],
      warranty: '5 Years',
      response: 'Immediate'
    }
  ]

  const calculateSavings = (plan: any) => {
    return Math.round(((plan.originalPrice - plan.annualPrice) / plan.originalPrice) * 100)
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-25 py-20 px-4 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute top-20 left-10 w-72 h-72 bg-theme-primary-100 rounded-full blur-3xl opacity-20 transition-all duration-[3000ms] ${
            animationPhase >= 1 ? 'translate-x-0 translate-y-0' : '-translate-x-20 -translate-y-20'
          }`}
        />
        <div 
          className={`absolute bottom-20 right-10 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 transition-all duration-[3000ms] delay-500 ${
            animationPhase >= 2 ? 'translate-x-0 translate-y-0' : 'translate-x-20 translate-y-20'
          }`}
        />
        <div 
          className={`absolute top-1/2 left-1/2 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-15 transition-all duration-[3000ms] delay-1000 ${
            animationPhase >= 3 ? 'translate-x-0 translate-y-0' : 'translate-x-10 translate-y-10'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Revolutionary Header Design */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-theme-primary-500 to-transparent rounded-full opacity-60" />
          </div>
          
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-theme-primary-200 px-6 py-3 rounded-full text-theme-primary-700 font-bold text-sm mb-8 shadow-xl">
            <Award className="w-5 h-5" />
            Trusted by 25,000+ Homeowners
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-theme-gray-900 mb-4 leading-tight">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-600 via-theme-primary-500 to-amber-600 mt-2">
              Comfort Level
            </span>
          </h1>

          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Professional HVAC maintenance plans designed for maximum comfort, efficiency, and peace of mind with guaranteed emergency support and comprehensive warranties.
          </p>

          {/* Innovative Billing Toggle */}
          <div className="relative inline-flex items-center bg-white/95 backdrop-blur-sm rounded-2xl p-1.5 shadow-2xl border border-theme-gray-200 mb-8">
            <div 
              className={`absolute top-1.5 bottom-1.5 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-xl shadow-lg transition-all duration-500 ${
                isAnnual ? 'left-1/2 right-1.5' : 'left-1.5 right-1/2'
              }`}
            />
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                !isAnnual ? 'text-white' : 'text-theme-gray-600 hover:text-theme-primary-600'
              }`}
              aria-label="Switch to monthly billing"
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                isAnnual ? 'text-white' : 'text-theme-gray-600 hover:text-theme-primary-600'
              }`}
              aria-label="Switch to annual billing"
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Asymmetrical Card Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Essential Plan - Compact Left */}
          <div className="lg:col-span-3 relative">
            <div 
              className={`bg-gradient-to-br ${plans[0].bgPattern} rounded-3xl p-6 shadow-xl border-2 transition-all duration-700 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                selectedPlan === 'essential' ? 'border-slate-300 ring-4 ring-slate-100' : 'border-slate-200'
              }`}
              onClick={() => setSelectedPlan('essential')}
            >
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${plans[0].gradient} text-white mb-4`}>
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-theme-gray-900 mb-1">{plans[0].name}</h3>
                <p className="text-theme-gray-600 text-sm">{plans[0].tagline}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <DollarSign className="w-6 h-6 text-theme-gray-700" />
                  <span className="text-4xl font-black text-theme-gray-900">
                    {isAnnual ? plans[0].annualPrice : plans[0].monthlyPrice}
                  </span>
                  <span className="text-theme-gray-600 font-semibold">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-green-600 font-bold text-sm mt-2">
                    Save {calculateSavings(plans[0])}%
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plans[0].features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    <span className="text-theme-gray-700 text-sm">{feature.name}</span>
                  </div>
                ))}
                <div className="text-theme-gray-500 text-xs text-center pt-2">
                  +{plans[0].features.length - 3} more features
                </div>
              </div>

              <button 
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  selectedPlan === 'essential'
                    ? `bg-gradient-to-r ${plans[0].gradient} text-white shadow-lg`
                    : 'bg-theme-gray-100 text-theme-gray-700 hover:bg-theme-gray-200'
                }`}
                aria-label="Select Essential Care plan"
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Choose Plan
              </button>
            </div>
          </div>

          {/* Professional Plan - Hero Center */}
          <div className="lg:col-span-6 relative">
            {plans[1].popular && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className={`bg-gradient-to-r ${plans[1].gradient} text-white px-8 py-3 rounded-2xl font-bold shadow-2xl border-4 border-white flex items-center gap-2`}>
                  <Star className="w-5 h-5 fill-current" />
                  Most Popular Choice
                </div>
              </div>
            )}

            <div 
              className={`bg-gradient-to-br ${plans[1].bgPattern} rounded-3xl p-10 shadow-2xl border-2 transition-all duration-700 cursor-pointer hover:shadow-3xl hover:-translate-y-4 ${
                selectedPlan === 'professional' ? 'border-theme-primary-300 ring-8 ring-theme-primary-100' : 'border-theme-primary-200'
              } ${plans[1].popular ? 'lg:scale-105' : ''}`}
              onClick={() => setSelectedPlan('professional')}
            >
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${plans[1].gradient} text-white mb-6 shadow-xl`}>
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-theme-gray-900 mb-2">{plans[1].name}</h3>
                <p className="text-theme-gray-600 text-lg">{plans[1].tagline}</p>
              </div>

              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-2">
                  <DollarSign className="w-8 h-8 text-theme-gray-700 mt-2" />
                  <span className="text-6xl font-black text-theme-gray-900">
                    {isAnnual ? plans[1].annualPrice : plans[1].monthlyPrice}
                  </span>
                  <span className="text-xl text-theme-gray-600 font-semibold">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="mt-4 space-y-2">
                    <div className="text-green-600 font-bold text-xl">
                      Save ${plans[1].originalPrice - plans[1].annualPrice} annually
                    </div>
                    <div className="text-theme-gray-500 line-through">
                      Regular: ${plans[1].originalPrice}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {plans[1].features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 group cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(`${plans[1].id}-${index}`)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${plans[1].gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      hoveredFeature === `${plans[1].id}-${index}` ? 'scale-110' : ''
                    }`}>
                      {feature.essential ? <Check className="w-4 h-4 text-white font-bold" /> : <Star className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-theme-gray-700 font-medium transition-colors duration-300 ${
                      hoveredFeature === `${plans[1].id}-${index}` ? 'text-theme-gray-900' : ''
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="font-black text-2xl text-theme-gray-900">{plans[1].warranty}</div>
                  <div className="text-theme-gray-600 text-sm">Warranty</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="font-black text-2xl text-theme-gray-900">{plans[1].response}</div>
                  <div className="text-theme-gray-600 text-sm">Response</div>
                </div>
              </div>

              <button 
                className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform ${
                  selectedPlan === 'professional'
                    ? `bg-gradient-to-r ${plans[1].gradient} text-white shadow-2xl scale-105 hover:scale-110`
                    : 'bg-theme-gray-100 text-theme-gray-700 hover:bg-theme-gray-200 hover:scale-105'
                }`}
                aria-label="Select Professional Plus plan"
              >
                <CreditCard className="w-6 h-6 inline mr-3" />
                {selectedPlan === 'professional' ? 'Plan Selected' : 'Choose This Plan'}
              </button>
            </div>
          </div>

          {/* Premium Plan - Elegant Right */}
          <div className="lg:col-span-3 relative">
            <div 
              className={`bg-gradient-to-br ${plans[2].bgPattern} rounded-3xl p-6 shadow-xl border-2 transition-all duration-700 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                selectedPlan === 'premium' ? 'border-amber-300 ring-4 ring-amber-100' : 'border-amber-200'
              }`}
              onClick={() => setSelectedPlan('premium')}
            >
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${plans[2].gradient} text-white mb-4`}>
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-theme-gray-900 mb-1">{plans[2].name}</h3>
                <p className="text-theme-gray-600 text-sm">{plans[2].tagline}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <DollarSign className="w-6 h-6 text-theme-gray-700" />
                  <span className="text-4xl font-black text-theme-gray-900">
                    {isAnnual ? plans[2].annualPrice : plans[2].monthlyPrice}
                  </span>
                  <span className="text-theme-gray-600 font-semibold">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-green-600 font-bold text-sm mt-2">
                    Save {calculateSavings(plans[2])}%
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plans[2].features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-theme-gray-700 text-sm">{feature.name}</span>
                  </div>
                ))}
                <div className="text-theme-gray-500 text-xs text-center pt-2">
                  +{plans[2].features.length - 4} premium features
                </div>
              </div>

              <button 
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  selectedPlan === 'premium'
                    ? `bg-gradient-to-r ${plans[2].gradient} text-white shadow-lg`
                    : 'bg-theme-gray-100 text-theme-gray-700 hover:bg-theme-gray-200'
                }`}
                aria-label="Select Premium Elite plan"
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Choose Plan
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-theme-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-lg text-theme-gray-900 mb-2">Licensed & Insured</h4>
              <p className="text-theme-gray-600 text-sm">Fully certified technicians</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-lg text-theme-gray-900 mb-2">5-Star Rated</h4>
              <p className="text-theme-gray-600 text-sm">Excellent customer reviews</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-lg text-theme-gray-900 mb-2">100% Satisfaction</h4>
              <p className="text-theme-gray-600 text-sm">Money-back guarantee</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-lg text-theme-gray-900 mb-2">Flexible Billing</h4>
              <p className="text-theme-gray-600 text-sm">Monthly or annual options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Asymmetrical HVAC Pricing Experience',
  description: 'Innovative asymmetrical pricing layout with hero center card, compact side options, and advanced interactive features for HVAC maintenance plans',
  category: 'content-blocks',
  icon: 'CreditCard'
}


export default Pricing;