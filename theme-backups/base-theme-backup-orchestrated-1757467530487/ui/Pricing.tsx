import React from 'react';
import { Check, Star, Zap, Shield, Crown } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      period: 'month',
      description: 'Perfect for small teams getting started',
      icon: Zap,
      popular: false,
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Mobile app access',
        'API access'
      ],
      buttonText: 'Start Free Trial',
      gradient: 'from-theme-gray-50 to-theme-gray-100'
    },
    {
      name: 'Professional',
      price: 79,
      period: 'month',
      description: 'Advanced features for growing businesses',
      icon: Star,
      popular: true,
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Mobile app access',
        'API access',
        'Custom integrations',
        'Advanced security'
      ],
      buttonText: 'Get Started',
      gradient: 'from-theme-primary-50 to-theme-primary-100'
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'Complete solution for large organizations',
      icon: Crown,
      popular: false,
      features: [
        'Unlimited team members',
        '1TB storage',
        'Custom analytics',
        '24/7 dedicated support',
        'Mobile app access',
        'Full API access',
        'Custom integrations',
        'Enterprise security',
        'SLA guarantee',
        'Custom training'
      ],
      buttonText: 'Contact Sales',
      gradient: 'from-theme-gray-900 to-theme-gray-800'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-theme-primary-100 text-theme-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Scale with confidence. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            const isEnterprise = plan.name === 'Enterprise';
            
            return (
              <div
                key={plan.name}
                className={`relative group transition-all duration-500 hover:scale-105 ${
                  isPopular ? 'lg:-mt-8 lg:mb-8' : ''
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`
                  relative h-full bg-gradient-to-br ${plan.gradient} 
                  ${isPopular ? 'border-2 border-theme-primary-200 shadow-2xl' : 'border border-theme-gray-200 shadow-lg'}
                  ${isEnterprise ? 'bg-gradient-to-br from-theme-gray-900 to-theme-gray-800 text-white' : ''}
                  rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl
                `}>
                  {/* Card Header */}
                  <div className="text-center mb-8">
                    <div className={`
                      inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                      ${isEnterprise ? 'bg-white/10' : isPopular ? 'bg-theme-primary-100' : 'bg-theme-gray-100'}
                      transition-transform duration-300 group-hover:scale-110
                    `}>
                      <IconComponent className={`w-8 h-8 ${
                        isEnterprise ? 'text-white' : isPopular ? 'text-theme-primary-600' : 'text-theme-gray-600'
                      }`} />
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${
                      isEnterprise ? 'text-white' : 'text-theme-gray-900'
                    }`}>
                      {plan.name}
                    </h3>
                    
                    <p className={`text-sm ${
                      isEnterprise ? 'text-gray-300' : 'text-theme-gray-600'
                    }`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-sm font-medium ${
                        isEnterprise ? 'text-gray-300' : 'text-theme-gray-600'
                      }`}>
                        $
                      </span>
                      <span className={`text-5xl font-bold ${
                        isEnterprise ? 'text-white' : 'text-theme-gray-900'
                      }`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm font-medium ${
                        isEnterprise ? 'text-gray-300' : 'text-theme-gray-600'
                      }`}>
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`
                          flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                          ${isEnterprise ? 'bg-white/20' : isPopular ? 'bg-theme-primary-100' : 'bg-theme-gray-100'}
                        `}>
                          <Check className={`w-3 h-3 ${
                            isEnterprise ? 'text-white' : isPopular ? 'text-theme-primary-600' : 'text-theme-gray-600'
                          }`} />
                        </div>
                        <span className={`text-sm ${
                          isEnterprise ? 'text-gray-200' : 'text-theme-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300
                    ${isEnterprise 
                      ? 'bg-white text-theme-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl' 
                      : isPopular 
                        ? 'bg-theme-primary-600 text-white hover:bg-theme-primary-700 shadow-lg hover:shadow-xl' 
                        : 'bg-theme-gray-900 text-white hover:bg-theme-gray-800 shadow-lg hover:shadow-xl'
                    }
                    transform hover:scale-105 active:scale-95
                  `}>
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-theme-gray-600 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-theme-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-theme-primary-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-theme-primary-500" />
              24/7 support
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-theme-primary-500" />
              Money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Modern Pricing Cards',
  description: 'Elegant pricing component with three-tier plans, popular badge, and smooth animations',
  category: 'content-blocks',
  icon: 'CreditCard',
};

export default Pricing;