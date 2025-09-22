import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  const headerProps = {
  "logo": "FlowSync",
  "navigation": [
    {
      "label": "Features",
      "href": "/features"
    },
    {
      "label": "Pricing",
      "href": "/pricing"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "ctaText": "Start Free Trial",
  "ctaHref": "/signup",
  "socialLinks": [
    {
      "platform": "twitter",
      "href": "https://twitter.com/flowsync"
    },
    {
      "platform": "linkedin",
      "href": "https://linkedin.com/company/flowsync"
    },
    {
      "platform": "github",
      "href": "https://github.com/flowsync"
    }
  ],
  "contactInfo": {
    "phone": "+1 (555) 789-FLOW",
    "email": "hello@flowsync.io",
    "address": "123 Innovation Drive, Tech Valley, CA 94025",
    "hours": "24/7 Support Available"
  },
  "emergencyPhone": "+1 (555) 911-TECH",
  "serviceAreas": "Global Cloud Platform",
  "patientPortalHref": "/dashboard",
  "agentInfo": {
    "name": "Alex Chen",
    "phone": "+1 (555) 789-FLOW",
    "email": "alex@flowsync.io"
  },
  "searchHref": "/search"
}
  const heroProps = {
  "headline": "Automate Your Workflow, Amplify Your Success",
  "description": "FlowSync revolutionizes team productivity with AI-powered automation, seamless integrations, and real-time collaboration tools. Join 10,000+ teams already scaling their operations.",
  "primaryCta": {
    "text": "Start Free Trial",
    "href": "/signup"
  },
  "secondaryCta": {
    "text": "Watch Demo",
    "href": "/demo"
  },
  "ctaText": "Get Started Free",
  "ctaHref": "/signup",
  "features": [
    "AI-Powered Automation",
    "Real-time Collaboration",
    "Advanced Analytics",
    "Enterprise Security"
  ],
  "heroImage": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  "backgroundImage": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
  "credentials": [
    "SOC 2 Certified",
    "GDPR Compliant",
    "99.9% Uptime SLA"
  ],
  "testimonialQuote": "FlowSync transformed our productivity by 300%. Game-changer for our startup!",
  "testimonialAuthor": "Sarah Martinez, CTO at InnovateTech",
  "emergencyPhone": "+1 (555) 911-TECH",
  "officeHours": "24/7 Global Support",
  "patientStats": {
    "yearsExperience": "5+",
    "patientsServed": "10K+",
    "satisfactionRate": "98%"
  },
  "specialOffer": "50% off Pro plan for first 3 months",
  "hours": "24/7 Platform Availability",
  "location": "Global Cloud Infrastructure",
  "menuHighlights": [
    "Workflow Builder",
    "Team Collaboration",
    "Analytics Dashboard"
  ],
  "serviceAreas": "Worldwide Cloud Coverage",
  "guarantees": [
    "99.9% Uptime",
    "30-Day Money Back",
    "Enterprise Security"
  ],
  "responseTime": "< 2 seconds",
  "serviceHighlights": [
    "AI Automation",
    "Real-time Sync",
    "Custom Integrations"
  ],
  "agentName": "FlowSync AI Assistant",
  "agentCredentials": [
    "24/7 Available",
    "Multi-language",
    "Context Aware"
  ],
  "marketStats": {
    "propertiesSold": "10K+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%"
  }
}
  const featuresProps = {
  "headline": "Powerful Features for Modern Teams",
  "description": "Everything you need to streamline workflows, boost productivity, and scale your business with cutting-edge automation technology.",
  "features": [
    {
      "icon": "zap",
      "title": "AI-Powered Automation",
      "description": "Intelligent workflows that adapt and optimize based on your team's patterns and preferences.",
      "metric": "300%",
      "guarantee": "Productivity Boost",
      "badge": "Most Popular",
      "highlight": "AI-Driven",
      "duration": "Real-time",
      "specialty": "Machine Learning"
    },
    {
      "icon": "users",
      "title": "Real-time Collaboration",
      "description": "Seamless team coordination with live updates, shared workspaces, and instant communication.",
      "metric": "Zero",
      "guarantee": "Latency",
      "badge": "Team Favorite",
      "highlight": "Live Updates",
      "duration": "Instant",
      "specialty": "Global Sync"
    },
    {
      "icon": "bar-chart",
      "title": "Advanced Analytics",
      "description": "Deep insights into team performance, workflow efficiency, and productivity metrics.",
      "metric": "100+",
      "guarantee": "Data Points",
      "badge": "Enterprise",
      "highlight": "Actionable Insights",
      "duration": "Real-time",
      "specialty": "Predictive Analytics"
    },
    {
      "icon": "shield",
      "title": "Enterprise Security",
      "description": "Bank-level encryption, SSO integration, and compliance with global security standards.",
      "metric": "99.99%",
      "guarantee": "Security Uptime",
      "badge": "Certified",
      "highlight": "SOC 2 Type II",
      "duration": "24/7",
      "specialty": "Zero Trust"
    },
    {
      "icon": "puzzle",
      "title": "Custom Integrations",
      "description": "Connect with 500+ tools and services through our robust API and pre-built connectors.",
      "metric": "500+",
      "guarantee": "Integrations",
      "badge": "Extensible",
      "highlight": "Open API",
      "duration": "Plug & Play",
      "specialty": "Universal Compatibility"
    },
    {
      "icon": "smartphone",
      "title": "Mobile-First Design",
      "description": "Native mobile apps with offline capabilities and push notifications for on-the-go productivity.",
      "metric": "Offline",
      "guarantee": "Capability",
      "badge": "Mobile Ready",
      "highlight": "Native Apps",
      "duration": "Always On",
      "specialty": "Cross-Platform"
    }
  ],
  "credentials": [
    "SOC 2 Certified",
    "ISO 27001",
    "GDPR Compliant"
  ],
  "patientStats": {
    "yearsExperience": "5+",
    "patientsServed": "10K+",
    "satisfactionRate": "98%"
  },
  "highlights": {
    "rating": "4.9",
    "reviews": "2,500+",
    "specialties": [
      "Workflow Automation",
      "Team Collaboration",
      "Data Analytics"
    ]
  },
  "serviceInfo": {
    "responseTime": "< 2 seconds",
    "serviceAreas": "Global Cloud",
    "yearsExperience": "5+",
    "jobsCompleted": "1M+"
  },
  "wellness": {
    "treatments": "50+",
    "experience": "5+",
    "satisfaction": "98%",
    "awards": [
      "Best SaaS 2024",
      "Innovation Award"
    ]
  },
  "marketData": {
    "propertiesSold": "10K+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%",
    "marketAreas": [
      "North America",
      "Europe",
      "Asia-Pacific"
    ]
  }
}
  const testimonialsProps = {
  "headline": "Trusted by Industry Leaders",
  "description": "See how teams worldwide are transforming their productivity with FlowSync's powerful automation platform.",
  "testimonials": [
    {
      "quote": "FlowSync eliminated 80% of our manual processes. Our team now focuses on innovation instead of repetitive tasks. The ROI was evident within the first month.",
      "author": "Marcus Johnson",
      "role": "VP of Operations",
      "company": "TechCorp Solutions",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "age": "35",
      "location": "San Francisco, CA",
      "condition": "Manual Workflows",
      "outcome": "80% Process Automation",
      "treatmentType": "Enterprise Plan",
      "caseResult": "300% Productivity Increase",
      "resultMetric": "ROI in 30 days",
      "favoritedish": "Workflow Builder",
      "visitType": "Enterprise Client",
      "serviceType": "Full Implementation",
      "projectResult": "Complete Digital Transformation",
      "completionTime": "2 weeks",
      "transformation": "From Manual to Automated",
      "wellnessGoal": "Operational Excellence",
      "transactionType": "Enterprise Subscription",
      "propertyType": "SaaS Platform",
      "salePrice": "$50K ARR",
      "timeOnMarket": "Immediate"
    },
    {
      "quote": "The AI automation features are incredible. FlowSync learns our patterns and suggests optimizations we never would have thought of. It's like having a productivity consultant built into our workflow.",
      "author": "Elena Rodriguez",
      "role": "Product Manager",
      "company": "InnovateLabs",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "age": "29",
      "location": "Austin, TX",
      "condition": "Inefficient Processes",
      "outcome": "AI-Optimized Workflows",
      "treatmentType": "Pro Plan",
      "caseResult": "250% Efficiency Gain",
      "resultMetric": "50% Time Saved",
      "favoritedish": "AI Recommendations",
      "visitType": "Growth Company",
      "serviceType": "AI Implementation",
      "projectResult": "Smart Process Optimization",
      "completionTime": "1 week",
      "transformation": "Manual to AI-Powered",
      "wellnessGoal": "Peak Productivity",
      "transactionType": "Pro Subscription",
      "propertyType": "Growth Platform",
      "salePrice": "$15K ARR",
      "timeOnMarket": "Same Day"
    },
    {
      "quote": "Security was our biggest concern, but FlowSync exceeded all expectations. SOC 2 compliance, enterprise SSO, and granular permissions give us complete peace of mind.",
      "author": "David Kim",
      "role": "CISO",
      "company": "SecureBank",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "age": "42",
      "location": "New York, NY",
      "condition": "Security Concerns",
      "outcome": "Enterprise-Grade Security",
      "treatmentType": "Enterprise Security",
      "caseResult": "100% Compliance",
      "resultMetric": "Zero Security Issues",
      "favoritedish": "Security Controls",
      "visitType": "Financial Services",
      "serviceType": "Security Implementation",
      "projectResult": "Full Compliance Achievement",
      "completionTime": "3 weeks",
      "transformation": "Basic to Bank-Grade Security",
      "wellnessGoal": "Complete Data Protection",
      "transactionType": "Enterprise Security",
      "propertyType": "Secure Platform",
      "salePrice": "$100K ARR",
      "timeOnMarket": "Immediate"
    }
  ],
  "trustIndicators": {
    "totalClients": "10,000+",
    "successRate": "98%",
    "yearsExperience": "5+"
  },
  "patientStats": {
    "patientsServed": "10,000+",
    "satisfactionRate": "98%",
    "yearsExperience": "5+"
  },
  "restaurantStats": {
    "totalReviews": "2,500+",
    "averageRating": "4.9",
    "repeatCustomers": "92%"
  },
  "serviceStats": {
    "jobsCompleted": "1M+",
    "customerSatisfaction": "98%",
    "responseTime": "< 2 sec"
  },
  "wellnessStats": {
    "clientsServed": "10,000+",
    "satisfactionRate": "98%",
    "treatmentsOffered": "50+"
  },
  "marketStats": {
    "propertiesSold": "10K+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%"
  }
}
  const pricingProps = {
  "headline": "Simple, Transparent Pricing",
  "description": "Choose the perfect plan for your team size and needs. All plans include our core features with no hidden fees or surprise charges.",
  "pricingTiers": [
    {
      "name": "Starter",
      "price": "$29",
      "monthlyPrice": "$29",
      "yearlyPrice": "$290",
      "period": "month",
      "commission": "N/A",
      "description": "Perfect for small teams getting started with automation",
      "features": [
        "Up to 5 team members",
        "Basic workflow automation",
        "10 integrations included",
        "Email support",
        "Mobile apps",
        "2GB storage per user"
      ],
      "notIncluded": [
        "Advanced AI features",
        "Custom integrations",
        "Priority support",
        "Advanced analytics"
      ],
      "ctaText": "Start Free Trial",
      "ctaHref": "/signup?plan=starter",
      "popular": false,
      "badge": "Great for Startups",
      "servingSize": "5 users",
      "eventType": "Small Team",
      "minimumOrder": "1 month",
      "serviceType": "Basic Automation",
      "responseTime": "24 hours",
      "guarantee": "14-day free trial",
      "emergencyRate": "N/A",
      "duration": "Monthly/Yearly",
      "treatmentType": "Starter Package",
      "membershipBenefit": "Community Access",
      "savings": "Save 17% yearly",
      "marketingBudget": "Basic Analytics",
      "guarantees": [
        "14-day trial",
        "Cancel anytime"
      ],
      "specialties": [
        "Workflow Building",
        "Team Collaboration"
      ]
    },
    {
      "name": "Professional",
      "price": "$79",
      "monthlyPrice": "$79",
      "yearlyPrice": "$790",
      "period": "month",
      "commission": "N/A",
      "description": "Advanced features for growing teams and businesses",
      "features": [
        "Up to 25 team members",
        "Advanced AI automation",
        "Unlimited integrations",
        "Priority support",
        "Advanced analytics",
        "10GB storage per user",
        "Custom workflows",
        "API access"
      ],
      "notIncluded": [
        "Enterprise SSO",
        "Dedicated support",
        "Custom onboarding",
        "SLA guarantees"
      ],
      "ctaText": "Start Free Trial",
      "ctaHref": "/signup?plan=professional",
      "popular": true,
      "badge": "Most Popular",
      "servingSize": "25 users",
      "eventType": "Growing Business",
      "minimumOrder": "1 month",
      "serviceType": "Advanced Automation",
      "responseTime": "4 hours",
      "guarantee": "30-day money back",
      "emergencyRate": "Priority Queue",
      "duration": "Monthly/Yearly",
      "treatmentType": "Professional Package",
      "membershipBenefit": "Priority Support",
      "savings": "Save 17% yearly",
      "marketingBudget": "Advanced Analytics",
      "guarantees": [
        "30-day guarantee",
        "Priority support"
      ],
      "specialties": [
        "AI Automation",
        "Advanced Analytics",
        "API Integration"
      ]
    },
    {
      "name": "Enterprise",
      "price": "$199",
      "monthlyPrice": "$199",
      "yearlyPrice": "$1990",
      "period": "month",
      "commission": "Custom",
      "description": "Full-scale solution for large organizations with custom needs",
      "features": [
        "Unlimited team members",
        "Enterprise AI & automation",
        "Custom integrations",
        "Dedicated success manager",
        "Advanced security & compliance",
        "Unlimited storage",
        "Custom onboarding",
        "99.9% uptime SLA",
        "White-label options",
        "Advanced reporting"
      ],
      "notIncluded": [],
      "ctaText": "Contact Sales",
      "ctaHref": "/contact?plan=enterprise",
      "popular": false,
      "badge": "Enterprise Ready",
      "servingSize": "Unlimited",
      "eventType": "Large Organization",
      "minimumOrder": "12 months",
      "serviceType": "Enterprise Solution",
      "responseTime": "1 hour",
      "guarantee": "Custom SLA",
      "emergencyRate": "Dedicated Support",
      "duration": "Annual Contract",
      "treatmentType": "Enterprise Package",
      "membershipBenefit": "Dedicated Manager",
      "savings": "Save 17% yearly",
      "marketingBudget": "Custom Analytics",
      "guarantees": [
        "99.9% uptime SLA",
        "Dedicated support",
        "Custom onboarding"
      ],
      "specialties": [
        "Enterprise Security",
        "Custom Integration",
        "Dedicated Support"
      ]
    }
  ],
  "yearlyDiscount": "17%",
  "guarantee": "30-day money-back guarantee on all paid plans",
  "trustMetrics": {
    "clientsServed": "10,000+",
    "successRate": "98%",
    "yearsExperience": "5+"
  },
  "insuranceInfo": {
    "accepted": [
      "Enterprise Procurement",
      "Purchase Orders",
      "Net-30 Terms"
    ],
    "note": "Flexible payment terms for enterprise customers"
  },
  "paymentOptions": [
    "Credit Card",
    "PayPal",
    "Wire Transfer",
    "Purchase Orders",
    "ACH"
  ],
  "specialOffers": [
    {
      "title": "Startup Special",
      "description": "50% off Pro plan for first 6 months",
      "discount": "50%"
    },
    {
      "title": "Non-Profit Discount",
      "description": "30% off all plans for qualified organizations",
      "discount": "30%"
    }
  ],
  "cateringInfo": {
    "minimumGuests": "5 users",
    "advanceNotice": "Instant setup",
    "deliveryRadius": "Global"
  },
  "serviceAreas": [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Global Cloud"
  ],
  "emergencyInfo": {
    "available": "24/7",
    "surcharge": "Included",
    "responseTime": "< 1 hour"
  },
  "membershipPerks": [
    "Priority Support",
    "Early Access",
    "Exclusive Webinars",
    "Beta Features"
  ],
  "addOnServices": [
    {
      "name": "Custom Integration",
      "price": "$500",
      "duration": "1-2 weeks"
    },
    {
      "name": "Dedicated Onboarding",
      "price": "$1,000",
      "duration": "1 week"
    },
    {
      "name": "Advanced Training",
      "price": "$2,000",
      "duration": "2 days"
    }
  ],
  "marketStats": {
    "avgSalePrice": "$50K ARR",
    "avgDaysOnMarket": "Immediate",
    "successRate": "98%"
  }
}
  const footerProps = {
  "companyName": "FlowSync",
  "tagline": "Automate. Collaborate. Accelerate.",
  "description": "Empowering teams worldwide with intelligent workflow automation and seamless collaboration tools.",
  "navigation": [
    {
      "label": "Features",
      "href": "/features"
    },
    {
      "label": "Pricing",
      "href": "/pricing"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Contact",
      "href": "/contact"
    },
    {
      "label": "Blog",
      "href": "/blog"
    },
    {
      "label": "Help Center",
      "href": "/help"
    }
  ],
  "socialLinks": [
    {
      "platform": "twitter",
      "href": "https://twitter.com/flowsync"
    },
    {
      "platform": "linkedin",
      "href": "https://linkedin.com/company/flowsync"
    },
    {
      "platform": "github",
      "href": "https://github.com/flowsync"
    },
    {
      "platform": "youtube",
      "href": "https://youtube.com/flowsync"
    }
  ],
  "copyright": "© 2024 FlowSync Technologies Inc. All rights reserved.",
  "columns": [
    {
      "title": "Product",
      "links": [
        {
          "label": "Features",
          "href": "/features"
        },
        {
          "label": "Integrations",
          "href": "/integrations"
        },
        {
          "label": "API",
          "href": "/api"
        },
        {
          "label": "Security",
          "href": "/security"
        },
        {
          "label": "Roadmap",
          "href": "/roadmap"
        }
      ]
    },
    {
      "title": "Resources",
      "links": [
        {
          "label": "Documentation",
          "href": "/docs"
        },
        {
          "label": "Help Center",
          "href": "/help"
        },
        {
          "label": "Blog",
          "href": "/blog"
        },
        {
          "label": "Webinars",
          "href": "/webinars"
        },
        {
          "label": "Case Studies",
          "href": "/case-studies"
        }
      ]
    },
    {
      "title": "Company",
      "links": [
        {
          "label": "About Us",
          "href": "/about"
        },
        {
          "label": "Careers",
          "href": "/careers"
        },
        {
          "label": "Press",
          "href": "/press"
        },
        {
          "label": "Partners",
          "href": "/partners"
        },
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  ],
  "contactInfo": {
    "email": "hello@flowsync.io",
    "phone": "+1 (555) 789-FLOW",
    "address": "123 Innovation Drive, Tech Valley, CA 94025",
    "hours": "24/7 Support Available"
  },
  "credentials": [
    "SOC 2 Type II",
    "ISO 27001",
    "GDPR Compliant"
  ],
  "emergencyPhone": "+1 (555) 911-TECH",
  "patientResources": [
    {
      "label": "Status Page",
      "href": "/status"
    },
    {
      "label": "System Health",
      "href": "/health"
    }
  ],
  "specialHours": "Global support across all time zones",
  "serviceAreas": "Global Cloud Infrastructure",
  "licenses": [
    "Business License #CA-2024-001",
    "SOC 2 Certified"
  ],
  "specialOffers": [
    {
      "title": "Free Migration",
      "description": "We'll help you migrate from your current tool at no cost"
    }
  ],
  "agentInfo": {
    "name": "FlowSync Support",
    "phone": "+1 (555) 789-FLOW",
    "email": "support@flowsync.io",
    "license": "24/7 Global Support"
  },
  "marketStats": {
    "propertiesSold": "10K+ Teams",
    "avgDaysOnMarket": "Instant Setup",
    "clientSatisfaction": "98%"
  }
}

  return (
    <>
      <Header {...headerProps} />
      <Hero {...heroProps} />
      <Features {...featuresProps} />
      <Testimonials {...testimonialsProps} />
      <Pricing {...pricingProps} />
      <Footer {...footerProps} />
    </>
  )
}