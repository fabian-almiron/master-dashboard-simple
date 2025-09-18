import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function OurAttorneys() {
  const headerProps = {
  "logo": "Sterling & Associates Law Firm",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Practice Areas",
      "href": "/practice-areas"
    },
    {
      "label": "Our Attorneys",
      "href": "/attorneys"
    },
    {
      "label": "Case Results",
      "href": "/results"
    },
    {
      "label": "Resources",
      "href": "/resources"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "ctaText": "Free Consultation",
  "ctaHref": "/contact",
  "socialLinks": [
    {
      "platform": "linkedin",
      "href": "#"
    },
    {
      "platform": "twitter",
      "href": "#"
    }
  ],
  "contactInfo": {
    "phone": "+1 (555) 123-4567",
    "email": "info@sterlinglaw.com",
    "address": "100 Financial Plaza, Suite 1500, New York, NY 10005",
    "hours": "Mon-Fri 8:30AM-6:00PM"
  },
  "emergencyPhone": "+1 (555) 911-HELP",
  "serviceAreas": "New York, New Jersey, Connecticut",
  "patientPortalHref": "/client-portal",
  "agentInfo": {
    "name": "Michael Sterling, Esq.",
    "phone": "+1 (555) 123-4567",
    "email": "msterling@sterlinglaw.com"
  },
  "searchHref": "/search"
}
  const footerProps = {
  "companyName": "Sterling & Associates Law Firm",
  "tagline": "Excellence in Legal Representation Since 1994",
  "description": "Sterling & Associates is a full-service law firm dedicated to providing exceptional legal representation to businesses and individuals throughout the tri-state area.",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Practice Areas",
      "href": "/practice-areas"
    },
    {
      "label": "Our Attorneys",
      "href": "/attorneys"
    },
    {
      "label": "Case Results",
      "href": "/results"
    },
    {
      "label": "Client Portal",
      "href": "/client-portal"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "socialLinks": [
    {
      "platform": "linkedin",
      "href": "#"
    },
    {
      "platform": "twitter",
      "href": "#"
    },
    {
      "platform": "facebook",
      "href": "#"
    }
  ],
  "copyright": "© 2024 Sterling & Associates Law Firm. All rights reserved. Attorney Advertising.",
  "columns": [
    {
      "title": "Practice Areas",
      "links": [
        {
          "label": "Corporate Law",
          "href": "/practice-areas/corporate"
        },
        {
          "label": "Personal Injury",
          "href": "/practice-areas/personal-injury"
        },
        {
          "label": "Real Estate",
          "href": "/practice-areas/real-estate"
        },
        {
          "label": "Employment Law",
          "href": "/practice-areas/employment"
        },
        {
          "label": "Estate Planning",
          "href": "/practice-areas/estate-planning"
        }
      ]
    },
    {
      "title": "Resources",
      "links": [
        {
          "label": "Legal Blog",
          "href": "/blog"
        },
        {
          "label": "FAQs",
          "href": "/faqs"
        },
        {
          "label": "Legal Forms",
          "href": "/forms"
        },
        {
          "label": "Case Studies",
          "href": "/case-studies"
        },
        {
          "label": "News & Updates",
          "href": "/news"
        }
      ]
    }
  ],
  "contactInfo": {
    "email": "info@sterlinglaw.com",
    "phone": "+1 (555) 123-4567",
    "address": "100 Financial Plaza, Suite 1500, New York, NY 10005",
    "hours": "Mon-Fri 8:30AM-6:00PM, Sat by appointment"
  },
  "credentials": [
    "AV Preeminent® Rated",
    "Super Lawyers® 2020-2024",
    "American Bar Association",
    "NY State Bar Association"
  ],
  "emergencyPhone": "+1 (555) 911-LEGAL",
  "patientResources": [
    {
      "label": "Client Portal",
      "href": "/client-portal"
    },
    {
      "label": "Payment Options",
      "href": "/payments"
    },
    {
      "label": "Document Upload",
      "href": "/upload"
    }
  ],
  "specialHours": "24/7 Emergency Legal Hotline Available",
  "serviceAreas": "New York, New Jersey, Connecticut",
  "licenses": [
    "NY Bar License #123456",
    "NJ Bar License #789012",
    "CT Bar License #345678"
  ],
  "specialOffers": [
    {
      "title": "Free Consultation",
      "description": "No-obligation case evaluation for all new clients"
    }
  ],
  "agentInfo": {
    "name": "Michael Sterling, Esq.",
    "phone": "+1 (555) 123-4567",
    "email": "msterling@sterlinglaw.com",
    "license": "NY Bar #123456"
  },
  "marketStats": {
    "propertiesSold": "$150M+",
    "avgDaysOnMarket": "45",
    "clientSatisfaction": "98%"
  }
}

  return (
    <>
      <Header {...headerProps} />
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Attorneys</h1>
          <p className="text-xl text-gray-600">Meet our experienced legal team</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}