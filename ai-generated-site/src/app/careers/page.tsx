import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Careers() {
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
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Careers</h1>
          <p className="text-xl text-gray-600">Join our team and help shape the future of work</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}