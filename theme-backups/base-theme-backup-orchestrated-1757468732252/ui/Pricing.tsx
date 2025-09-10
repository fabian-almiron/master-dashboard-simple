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
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Mobile app access'
      ],
      icon: Zap,
      popular: false,
      gradient: 'from-theme-gray-50 to-theme-gray-100'
    },
    {
      name: 'Professional',
      price: 79,
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom integrations'
      ],
      icon: Star,
      popular: true,
      gradient: 'from-theme-primary-50 to-theme-primary-100'
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited team members',
        '1TB storage',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Full API access',
        'Custom development',
        'SLA guarantee'
      ],
      icon: Crown,
      popular: false,
      gradient: 'from-theme-gray-900 to-theme-gray-800'
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-theme-gray-50 via-white to-theme-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary-100 text-theme-primary-700 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            Scale your business with confidence. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isEnterprise = plan.name === 'Enterprise';
            
            return (
              <div
                key={plan.name}
                className={`relative group ${
                  plan.popular ? 'lg:scale-105 lg:-mt-4' : ''
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`
                  relative h-full rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl
                  ${isEnterprise 
                    ? 'bg-gradient-to-br from-theme-gray-900 to-theme-gray-800 text-white' 
                    : `bg-gradient-to-br ${plan.gradient} backdrop-blur-sm border border-theme-gray-200 hover:border-theme-primary-300`
                  }
                  ${plan.popular ? 'ring-2 ring-theme-primary-500 shadow-xl' : ''}
                `}>
                  
                  {/* Icon */}
                  <div className={`
                    inline-flex p-3 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110
                    ${isEnterprise 
                      ? 'bg-gradient-to-br from-theme-primary-500 to-theme-primary-600' 
                      : 'bg-gradient-to-br from-theme-primary-100 to-theme-primary-200'
                    }
                  `}>
                    <IconComponent className={`w-6 h-6 ${isEnterprise ? 'text-white' : 'text-theme-primary-600'}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className={`text-2xl font-bold mb-2 ${isEnterprise ? 'text-white' : 'text-theme-gray-900'}`}>
                    {plan.name}
                  </h3>
                  
                  {/* Description */}
                  <p className={`mb-6 ${isEnterprise ? 'text-theme-gray-300' : 'text-theme-gray-600'}`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-bold ${isEnterprise ? 'text-white' : 'text-theme-gray-900'}`}>
                        ${plan.price}
                      </span>
                      <span className={`text-lg ${isEnterprise ? 'text-theme-gray-400' : 'text-theme-gray-500'}`}>
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`
                          flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                          ${isEnterprise 
                            ? 'bg-theme-primary-500' 
                            : 'bg-theme-primary-100'
                          }
                        `}>
                          <Check className={`w-3 h-3 ${isEnterprise ? 'text-white' : 'text-theme-primary-600'}`} />
                        </div>
                        <span className={`${isEnterprise ? 'text-theme-gray-300' : 'text-theme-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`
                    w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
                    ${isEnterprise
                      ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white hover:from-theme-primary-600 hover:to-theme-primary-700 shadow-lg hover:shadow-xl'
                      : plan.popular
                        ? 'bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 text-white hover:from-theme-primary-600 hover:to-theme-primary-700 shadow-lg hover:shadow-xl'
                        : 'bg-white text-theme-primary-600 border-2 border-theme-primary-500 hover:bg-theme-primary-50'
                    }
                  `}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-theme-gray-600 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-theme-gray-900 text-white rounded-xl font-semibold hover:bg-theme-gray-800 transition-colors duration-300">
            <Shield className="w-5 h-5" />
            Talk to Sales
          </button>
        </div>
      </div>

    </section>
  );
};

export const metadata: ComponentInfo = {
  type: 'Pricing',
  name: 'Modern Pricing Cards',
  description: 'Clean and modern pricing component with gradient cards, feature lists, and interactive hover effects',
  category: 'content-blocks',
  icon: 'DollarSign',
};

export default Pricing;