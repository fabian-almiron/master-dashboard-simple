import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
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
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
          <p className="text-xl text-gray-600">Our mission to revolutionize workflow automation</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}