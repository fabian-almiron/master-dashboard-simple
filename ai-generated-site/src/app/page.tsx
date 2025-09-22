import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  const headerProps = {
  "logo": "AutoFlow",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
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
      "label": "Blog",
      "href": "/blog"
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
      "href": "https://twitter.com/autoflow"
    },
    {
      "platform": "linkedin",
      "href": "https://linkedin.com/company/autoflow"
    },
    {
      "platform": "github",
      "href": "https://github.com/autoflow"
    }
  ],
  "contactInfo": {
    "phone": "+1 (555) 234-5678",
    "email": "hello@autoflow.com",
    "address": "123 Innovation Drive, San Francisco, CA 94105",
    "hours": "Mon-Fri 9AM-6PM PST"
  },
  "emergencyPhone": "+1 (555) 911-TECH",
  "serviceAreas": "Global - All Time Zones",
  "patientPortalHref": "/dashboard",
  "agentInfo": {
    "name": "Sarah Chen",
    "phone": "+1 (555) 234-5678",
    "email": "sarah@autoflow.com"
  },
  "searchHref": "/search"
}
  const heroProps = {
  "headline": "Automate Your Business, Amplify Your Success",
  "description": "Transform your workflow with our AI-powered automation platform. Streamline operations, boost productivity, and scale faster than ever before.",
  "primaryCta": {
    "text": "Start Free Trial",
    "href": "/signup"
  },
  "secondaryCta": {
    "text": "Watch Demo",
    "href": "/demo"
  },
  "ctaText": "Get Started Now",
  "ctaHref": "/signup",
  "features": [
    "No-Code Automation",
    "AI-Powered Insights",
    "Enterprise Security",
    "24/7 Support"
  ],
  "heroImage": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  "backgroundImage": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
  "credentials": [
    "SOC 2 Certified",
    "GDPR Compliant",
    "99.9% Uptime SLA"
  ],
  "testimonialQuote": "AutoFlow transformed our operations overnight. We've saved 40 hours per week!",
  "testimonialAuthor": "Michael Rodriguez, CTO at TechCorp",
  "emergencyPhone": "+1 (555) 911-TECH",
  "officeHours": "24/7 Support Available",
  "patientStats": {
    "yearsExperience": "5+",
    "patientsServed": "10,000+",
    "satisfactionRate": "99%"
  },
  "specialOffer": "Get 3 months free with annual plans - Limited time!",
  "hours": "24/7 Platform Availability",
  "location": "Cloud-Based Global Platform",
  "menuHighlights": [
    "Workflow Builder",
    "Analytics Dashboard",
    "API Integrations"
  ],
  "serviceAreas": "Global Coverage - All Industries",
  "guarantees": [
    "99.9% Uptime",
    "30-Day Money Back",
    "Enterprise Security"
  ],
  "responseTime": "< 2 seconds",
  "serviceHighlights": [
    "AI Automation",
    "Custom Workflows",
    "Real-time Analytics"
  ],
  "agentName": "AutoFlow AI Assistant",
  "agentCredentials": [
    "24/7 Availability",
    "Multi-language Support",
    "Expert Knowledge"
  ],
  "marketStats": {
    "propertiesSold": "10,000+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%"
  }
}
  const featuresProps = {
  "headline": "Powerful Features for Modern Businesses",
  "description": "Everything you need to automate, optimize, and scale your operations with cutting-edge technology",
  "features": [
    {
      "icon": "zap",
      "title": "Lightning-Fast Automation",
      "description": "Create complex workflows in minutes with our drag-and-drop builder. No coding required.",
      "metric": "10x Faster",
      "guarantee": "Performance Guaranteed",
      "badge": "Most Popular",
      "highlight": "Zero Code Required",
      "duration": "Setup in 5 minutes",
      "specialty": "Industry Leader"
    },
    {
      "icon": "brain",
      "title": "AI-Powered Intelligence",
      "description": "Leverage machine learning to optimize your processes and predict business outcomes.",
      "metric": "40% More Efficient",
      "guarantee": "Continuous Learning",
      "badge": "Advanced",
      "highlight": "Smart Predictions",
      "duration": "Real-time Processing",
      "specialty": "Cutting-Edge AI"
    },
    {
      "icon": "shield",
      "title": "Enterprise Security",
      "description": "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
      "metric": "99.99% Secure",
      "guarantee": "SOC 2 Certified",
      "badge": "Enterprise",
      "highlight": "Military-Grade Encryption",
      "duration": "24/7 Monitoring",
      "specialty": "Security First"
    },
    {
      "icon": "chart",
      "title": "Advanced Analytics",
      "description": "Get deep insights into your operations with customizable dashboards and reports.",
      "metric": "360° Visibility",
      "guarantee": "Real-time Data",
      "badge": "Pro Feature",
      "highlight": "Custom Dashboards",
      "duration": "Live Updates",
      "specialty": "Data-Driven"
    },
    {
      "icon": "plug",
      "title": "Seamless Integrations",
      "description": "Connect with 500+ apps and services including Slack, Salesforce, and Google Workspace.",
      "metric": "500+ Apps",
      "guarantee": "Easy Setup",
      "badge": "Universal",
      "highlight": "One-Click Connect",
      "duration": "Instant Sync",
      "specialty": "Integration Expert"
    },
    {
      "icon": "users",
      "title": "Team Collaboration",
      "description": "Work together seamlessly with role-based permissions and real-time collaboration tools.",
      "metric": "Unlimited Users",
      "guarantee": "Team-Friendly",
      "badge": "Collaborative",
      "highlight": "Real-time Sync",
      "duration": "Always Connected",
      "specialty": "Team-First Design"
    }
  ],
  "credentials": [
    "SOC 2 Type II",
    "ISO 27001",
    "GDPR Compliant",
    "HIPAA Ready"
  ],
  "patientStats": {
    "yearsExperience": "5+",
    "patientsServed": "50,000+",
    "satisfactionRate": "98%"
  },
  "highlights": {
    "rating": "4.9",
    "reviews": "2,500+",
    "specialties": [
      "Workflow Automation",
      "AI Integration",
      "Enterprise Solutions"
    ]
  },
  "serviceInfo": {
    "responseTime": "< 2 seconds",
    "serviceAreas": "Global Platform",
    "yearsExperience": "5+",
    "jobsCompleted": "1M+ Workflows"
  },
  "wellness": {
    "treatments": "50+",
    "experience": "5+",
    "satisfaction": "98%",
    "awards": [
      "Best SaaS 2024",
      "Innovation Award",
      "Customer Choice"
    ]
  },
  "marketData": {
    "propertiesSold": "50,000+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%",
    "marketAreas": [
      "North America",
      "Europe",
      "Asia-Pacific",
      "Global"
    ]
  }
}
  const testimonialsProps = {
  "headline": "Trusted by Industry Leaders",
  "description": "See how companies worldwide are transforming their operations with AutoFlow",
  "testimonials": [
    {
      "quote": "AutoFlow has revolutionized our workflow management. We've reduced manual tasks by 80% and improved team productivity dramatically. The AI insights have been game-changing for our decision-making process.",
      "author": "Sarah Johnson",
      "role": "VP of Operations",
      "company": "TechVision Inc",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "age": "35",
      "location": "San Francisco, CA",
      "condition": "Complex Workflows",
      "outcome": "80% Task Reduction",
      "treatmentType": "Full Platform Implementation",
      "caseResult": "Productivity Increased 3x",
      "resultMetric": "ROI: 400%",
      "favoritedish": "Workflow Automation",
      "visitType": "Enterprise Client",
      "serviceType": "Complete Automation Suite",
      "projectResult": "Streamlined Operations",
      "completionTime": "2 weeks",
      "transformation": "From Manual to Automated",
      "wellnessGoal": "Operational Excellence",
      "transactionType": "Enterprise License",
      "propertyType": "SaaS Platform",
      "salePrice": "$50K Annual",
      "timeOnMarket": "Immediate ROI"
    },
    {
      "quote": "The customer support is exceptional, and the platform is incredibly intuitive. Our team was up and running in just days, not months. AutoFlow has become an essential part of our daily operations.",
      "author": "Marcus Chen",
      "role": "CTO",
      "company": "DataFlow Solutions",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "age": "42",
      "location": "Austin, TX",
      "condition": "Legacy System Integration",
      "outcome": "Seamless Migration",
      "treatmentType": "Custom Integration",
      "caseResult": "Zero Downtime Migration",
      "resultMetric": "99.9% Uptime",
      "favoritedish": "API Integrations",
      "visitType": "Strategic Partnership",
      "serviceType": "Enterprise Migration",
      "projectResult": "Modern Infrastructure",
      "completionTime": "1 week",
      "transformation": "Legacy to Modern",
      "wellnessGoal": "System Modernization",
      "transactionType": "Multi-year Contract",
      "propertyType": "Cloud Platform",
      "salePrice": "$75K Annual",
      "timeOnMarket": "Fast Implementation"
    },
    {
      "quote": "AutoFlow's AI capabilities have given us insights we never had before. We can now predict bottlenecks and optimize our processes proactively. It's like having a crystal ball for our operations.",
      "author": "Emily Rodriguez",
      "role": "Director of Analytics",
      "company": "InnovateCorp",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "age": "38",
      "location": "New York, NY",
      "condition": "Data Silos",
      "outcome": "Unified Analytics",
      "treatmentType": "AI Implementation",
      "caseResult": "Predictive Insights",
      "resultMetric": "30% Cost Reduction",
      "favoritedish": "Predictive Analytics",
      "visitType": "Analytics Focused",
      "serviceType": "AI-Powered Insights",
      "projectResult": "Data-Driven Decisions",
      "completionTime": "3 weeks",
      "transformation": "Reactive to Predictive",
      "wellnessGoal": "Operational Intelligence",
      "transactionType": "Premium License",
      "propertyType": "Analytics Platform",
      "salePrice": "$60K Annual",
      "timeOnMarket": "Quick Wins"
    }
  ],
  "trustIndicators": {
    "totalClients": "50,000+",
    "successRate": "98%",
    "yearsExperience": "5+"
  },
  "patientStats": {
    "patientsServed": "50,000+",
    "satisfactionRate": "98%",
    "yearsExperience": "5+"
  },
  "restaurantStats": {
    "totalReviews": "2,500+",
    "averageRating": "4.9",
    "repeatCustomers": "92%"
  },
  "serviceStats": {
    "jobsCompleted": "1M+ Workflows",
    "customerSatisfaction": "98%",
    "responseTime": "< 2 seconds"
  },
  "wellnessStats": {
    "clientsServed": "50,000+",
    "satisfactionRate": "98%",
    "treatmentsOffered": "50+"
  },
  "marketStats": {
    "propertiesSold": "50,000+",
    "avgDaysOnMarket": "Instant",
    "clientSatisfaction": "98%"
  }
}
  const pricingProps = {
  "headline": "Simple, Transparent Pricing",
  "description": "Choose the perfect plan for your business. Start free, scale as you grow. No hidden fees, no surprises.",
  "pricingTiers": [
    {
      "name": "Starter",
      "price": "$29",
      "period": "month",
      "monthlyPrice": "$29",
      "yearlyPrice": "$290",
      "commission": "N/A",
      "description": "Perfect for small teams getting started with automation",
      "features": [
        "Up to 1,000 tasks/month",
        "5 active workflows",
        "Basic integrations (50+ apps)",
        "Email support",
        "Standard templates",
        "Basic analytics"
      ],
      "notIncluded": [
        "Advanced AI features",
        "Custom integrations",
        "Priority support"
      ],
      "ctaText": "Start Free Trial",
      "ctaHref": "/signup?plan=starter",
      "popular": false,
      "badge": "Most Popular",
      "servingSize": "Small Teams",
      "eventType": "Getting Started",
      "minimumOrder": "1 user",
      "serviceType": "Basic Automation",
      "responseTime": "24 hours",
      "guarantee": "14-day free trial",
      "emergencyRate": "N/A",
      "duration": "Monthly/Annual",
      "treatmentType": "Standard Support",
      "membershipBenefit": "Community Access",
      "savings": "Save 17% annually",
      "marketingBudget": "N/A",
      "guarantees": [
        "14-day trial",
        "Cancel anytime"
      ],
      "specialties": [
        "Workflow Automation",
        "Basic Integrations"
      ]
    },
    {
      "name": "Professional",
      "price": "$99",
      "period": "month",
      "monthlyPrice": "$99",
      "yearlyPrice": "$990",
      "commission": "N/A",
      "description": "Best for growing businesses that need advanced features",
      "features": [
        "Up to 10,000 tasks/month",
        "Unlimited workflows",
        "Advanced integrations (500+ apps)",
        "Priority support",
        "Custom templates",
        "Advanced analytics & reporting",
        "AI-powered insights",
        "Team collaboration tools",
        "API access"
      ],
      "notIncluded": [
        "White-label options",
        "Dedicated account manager"
      ],
      "ctaText": "Start Free Trial",
      "ctaHref": "/signup?plan=professional",
      "popular": true,
      "badge": "Best Value",
      "servingSize": "Growing Teams",
      "eventType": "Scaling Business",
      "minimumOrder": "5 users",
      "serviceType": "Advanced Automation",
      "responseTime": "4 hours",
      "guarantee": "30-day money back",
      "emergencyRate": "2-hour response",
      "duration": "Monthly/Annual",
      "treatmentType": "Priority Support",
      "membershipBenefit": "Expert Webinars",
      "savings": "Save 17% annually",
      "marketingBudget": "Included Analytics",
      "guarantees": [
        "30-day guarantee",
        "SLA included"
      ],
      "specialties": [
        "AI Insights",
        "Advanced Analytics",
        "Priority Support"
      ]
    },
    {
      "name": "Enterprise",
      "price": "Custom",
      "period": "month",
      "monthlyPrice": "Custom",
      "yearlyPrice": "Custom",
      "commission": "Volume Discounts",
      "description": "For large organizations with complex automation needs",
      "features": [
        "Unlimited tasks & workflows",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom templates & workflows",
        "Advanced security & compliance",
        "White-label options",
        "On-premise deployment",
        "Custom training & onboarding",
        "SLA guarantees"
      ],
      "notIncluded": [],
      "ctaText": "Contact Sales",
      "ctaHref": "/contact-sales",
      "popular": false,
      "badge": "Enterprise",
      "servingSize": "Large Organizations",
      "eventType": "Enterprise Deployment",
      "minimumOrder": "100 users",
      "serviceType": "Custom Solutions",
      "responseTime": "1 hour",
      "guarantee": "Custom SLA",
      "emergencyRate": "24/7 support",
      "duration": "Annual contracts",
      "treatmentType": "Dedicated Support",
      "membershipBenefit": "Executive Access",
      "savings": "Volume discounts",
      "marketingBudget": "Custom ROI Analysis",
      "guarantees": [
        "Custom SLA",
        "Dedicated support",
        "Security compliance"
      ],
      "specialties": [
        "Custom Development",
        "Enterprise Security",
        "Dedicated Support"
      ]
    }
  ],
  "yearlyDiscount": "17%",
  "guarantee": "30-day money-back guarantee on all paid plans",
  "trustMetrics": {
    "clientsServed": "50,000+",
    "successRate": "98%",
    "yearsExperience": "5+"
  },
  "insuranceInfo": {
    "accepted": [
      "Enterprise Contracts",
      "Government Approved",
      "SOC 2 Compliant"
    ],
    "note": "We meet all enterprise security and compliance requirements"
  },
  "paymentOptions": [
    "Credit Card",
    "ACH Transfer",
    "Wire Transfer",
    "Purchase Orders",
    "Multi-year Contracts"
  ],
  "specialOffers": [
    {
      "title": "New Customer Special",
      "description": "3 months free with annual Professional plan",
      "discount": "25%"
    },
    {
      "title": "Migration Assistance",
      "description": "Free migration from competing platforms",
      "discount": "100%"
    }
  ],
  "cateringInfo": {
    "minimumGuests": "5 users",
    "advanceNotice": "24 hours setup",
    "deliveryRadius": "Global deployment"
  },
  "serviceAreas": [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Global Coverage"
  ],
  "emergencyInfo": {
    "available": "24/7 Enterprise Support",
    "surcharge": "Included in Enterprise",
    "responseTime": "1 hour SLA"
  },
  "membershipPerks": [
    "Priority Support",
    "Exclusive Webinars",
    "Early Feature Access",
    "Dedicated Success Manager"
  ],
  "addOnServices": [
    {
      "name": "Custom Integration",
      "price": "$500",
      "duration": "1-2 weeks"
    },
    {
      "name": "Advanced Training",
      "price": "$200/hour",
      "duration": "Customized"
    },
    {
      "name": "Priority Support",
      "price": "$50/month",
      "duration": "Ongoing"
    }
  ],
  "marketStats": {
    "avgSalePrice": "$50K",
    "avgDaysOnMarket": "30 days",
    "successRate": "98%"
  }
}
  const footerProps = {
  "companyName": "AutoFlow",
  "tagline": "Automate Your Success",
  "description": "Empowering businesses worldwide with intelligent automation solutions",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
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
      "label": "Blog",
      "href": "/blog"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "socialLinks": [
    {
      "platform": "twitter",
      "href": "https://twitter.com/autoflow"
    },
    {
      "platform": "linkedin",
      "href": "https://linkedin.com/company/autoflow"
    },
    {
      "platform": "github",
      "href": "https://github.com/autoflow"
    },
    {
      "platform": "youtube",
      "href": "https://youtube.com/autoflow"
    }
  ],
  "copyright": "© 2024 AutoFlow. All rights reserved.",
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
        }
      ]
    },
    {
      "title": "Company",
      "links": [
        {
          "label": "About",
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
          "label": "Community",
          "href": "/community"
        },
        {
          "label": "Blog",
          "href": "/blog"
        }
      ]
    }
  ],
  "contactInfo": {
    "email": "hello@autoflow.com",
    "phone": "+1 (555) 234-5678",
    "address": "123 Innovation Drive, San Francisco, CA 94105",
    "hours": "24/7 Platform - Support: Mon-Fri 9AM-6PM PST"
  },
  "credentials": [
    "SOC 2 Type II Certified",
    "GDPR Compliant",
    "ISO 27001",
    "99.9% Uptime SLA"
  ],
  "emergencyPhone": "+1 (555) 911-TECH",
  "patientResources": [
    {
      "label": "Help Center",
      "href": "/help"
    },
    {
      "label": "API Documentation",
      "href": "/docs"
    },
    {
      "label": "Community Forum",
      "href": "/community"
    }
  ],
  "specialHours": "Enterprise support available 24/7",
  "serviceAreas": "Global Platform - All Time Zones Supported",
  "licenses": [
    "Business License #SF-2024-001",
    "SOC 2 Certified",
    "GDPR Compliant"
  ],
  "specialOffers": [
    {
      "title": "Free Migration",
      "description": "Switch from any competitor for free"
    },
    {
      "title": "Startup Program",
      "description": "50% off for qualifying startups"
    }
  ],
  "agentInfo": {
    "name": "AutoFlow Support Team",
    "phone": "+1 (555) 234-5678",
    "email": "support@autoflow.com",
    "license": "24/7 Technical Support"
  },
  "marketStats": {
    "propertiesSold": "50,000+",
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