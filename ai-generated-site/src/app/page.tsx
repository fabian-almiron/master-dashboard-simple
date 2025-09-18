import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
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
  const heroProps = {
  "headline": "Experienced Legal Representation You Can Trust",
  "description": "With over 30 years of combined experience, Sterling & Associates delivers results-driven legal solutions for businesses and individuals across New York.",
  "primaryCta": {
    "text": "Schedule Free Consultation",
    "href": "/contact"
  },
  "secondaryCta": {
    "text": "View Our Practice Areas",
    "href": "/practice-areas"
  },
  "ctaText": "Get Started Today",
  "ctaHref": "/contact",
  "features": [
    "30+ Years Combined Experience",
    "500+ Cases Won",
    "24/7 Client Support"
  ],
  "heroImage": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
  "backgroundImage": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
  "credentials": [
    "AV Preeminent® Rated by Martindale-Hubbell®",
    "Super Lawyers® Recognition 2020-2024",
    "American Bar Association Member",
    "New York State Bar Association"
  ],
  "testimonialQuote": "Sterling & Associates secured a $2.5M settlement for our company. Their expertise and dedication were exceptional throughout the entire process.",
  "testimonialAuthor": "Sarah Johnson, CEO of TechCorp Industries",
  "emergencyPhone": "+1 (555) 911-LEGAL",
  "officeHours": "Mon-Fri 8:30AM-6:00PM, Sat by appointment",
  "patientStats": {
    "yearsExperience": "30+",
    "patientsServed": "2,500+",
    "satisfactionRate": "98%"
  },
  "specialOffer": "Free initial consultation for all new clients",
  "hours": "Mon-Fri 8:30AM-6:00PM",
  "location": "Financial District, New York",
  "menuHighlights": [
    "Corporate Law",
    "Personal Injury",
    "Real Estate Law"
  ],
  "serviceAreas": "New York, New Jersey, Connecticut",
  "guarantees": [
    "No Win, No Fee",
    "100% Confidential",
    "Free Case Evaluation"
  ],
  "responseTime": "24 hours",
  "serviceHighlights": [
    "Business Litigation",
    "Estate Planning",
    "Employment Law"
  ],
  "agentName": "Michael Sterling, Esq.",
  "agentCredentials": [
    "Harvard Law School, J.D.",
    "Former Federal Prosecutor",
    "Board Certified Trial Attorney"
  ],
  "marketStats": {
    "propertiesSold": "500+",
    "avgDaysOnMarket": "45",
    "clientSatisfaction": "98%"
  }
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
      <Hero {...heroProps} />
      <Footer {...footerProps} />
    </>
  )
}