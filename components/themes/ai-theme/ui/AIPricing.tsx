import type { ComponentInfo } from "@/lib/cms-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Zap, Crown, Rocket } from "lucide-react"

export const metadata: ComponentInfo = {
  type: "AIPricing",
  name: "AI Voice Pricing",
  description: "Modern pricing plans for AI voice services",
  category: "content-blocks",
  icon: "Crown",
}

export default function AIPricing() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: 29,
      period: "month",
      description: "Perfect for individuals and small projects",
      features: [
        "10,000 characters/month",
        "5 voice models",
        "Basic voice cloning",
        "Standard quality",
        "Email support",
        "API access",
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Professional",
      icon: Crown,
      price: 99,
      period: "month",
      description: "Ideal for businesses and content creators",
      features: [
        "100,000 characters/month",
        "25 voice models",
        "Advanced voice cloning",
        "Premium quality",
        "Priority support",
        "API access",
        "Custom integrations",
        "Analytics dashboard",
      ],
      popular: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: 299,
      period: "month",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited characters",
        "Unlimited voice models",
        "Custom voice training",
        "Ultra-premium quality",
        "24/7 dedicated support",
        "Full API access",
        "White-label solution",
        "Advanced analytics",
        "SLA guarantee",
      ],
      popular: false,
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-6">
            <Crown className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-sm font-medium text-green-300">Flexible Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scale your AI voice projects with our flexible pricing options. From individual creators to enterprise
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-purple-500/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-4 mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  } py-3 font-semibold rounded-xl transition-all duration-300`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <Button
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
          >
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  )
}
