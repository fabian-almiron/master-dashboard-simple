import Link from 'next/link'
import { ArrowRight, Users, Star, TrendingUp, Zap } from 'lucide-react'

export default function CTA() {
  // Component data - will be populated by AI
  const data = {
    headline: "Join 10,000+ Successful Companies",
    description: "Transform your business with our proven platform. Start your free trial today and see results in days, not months.",
    stats: [
      {
        number: "10,000+",
        label: "Happy Customers",
        icon: "users"
      },
      {
        number: "4.9/5",
        label: "Customer Rating",
        icon: "star"
      },
      {
        number: "300%",
        label: "Average ROI",
        icon: "trendingUp"
      },
      {
        number: "99.9%",
        label: "Uptime SLA",
        icon: "zap"
      }
    ],
    primaryCta: {
      text: "Start Free Trial",
      href: "/signup"
    },
    secondaryCta: {
      text: "Schedule Demo",
      href: "/demo"
    },
    socialProof: "Trusted by industry leaders worldwide"
  }

  const iconMap = {
    users: Users,
    star: Star,
    trendingUp: TrendingUp,
    zap: Zap
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            {data.headline}
          </span>
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          {data.description}
        </p>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {data.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <IconComponent className="h-8 w-8 text-blue-200 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href={data.primaryCta.href}
            className="bg-white text-blue-600 px-10 py-4 rounded-xl text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
          >
            {data.primaryCta.text}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
          <Link
            href={data.secondaryCta.href}
            className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-medium hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center"
          >
            {data.secondaryCta.text}
          </Link>
        </div>
        
        <p className="text-blue-200 text-sm font-medium">
          {data.socialProof}
        </p>
      </div>
    </section>
  )
}