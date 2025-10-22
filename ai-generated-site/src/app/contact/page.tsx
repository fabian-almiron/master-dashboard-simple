import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  const headerProps = {
  "logo": "Stirring Dirt Excavation",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Services",
      "href": "/services"
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
  "ctaText": "Get Free Quote",
  "ctaHref": "/contact",
  "contactPhone": "(435) 555-DIRT",
  "serviceAreas": "Logan, UT & Surrounding Areas"
}
  const footerProps = {
  "companyName": "Stirring Dirt Excavation",
  "tagline": "Honest Work, Fair Prices",
  "description": "Owner-operated excavation services in Logan, Utah. No middleman, just quality work at honest prices.",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Services",
      "href": "/services"
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
  "contactInfo": {
    "email": "colton@stirringdirt.com",
    "phone": "(435) 555-DIRT",
    "address": "Logan, UT 84321",
    "hours": "Mon-Sat 7AM-6PM"
  },
  "serviceAreas": "Logan, Providence, North Logan, Hyde Park, Smithfield, and all of Cache Valley",
  "licenses": [
    "Utah Contractor License #123456",
    "Fully Insured"
  ],
  "yearsExperience": "15+",
  "guarantees": [
    "Owner-Operated",
    "Transparent Pricing",
    "Quality Guaranteed"
  ],
  "socialLinks": [
    {
      "platform": "facebook",
      "href": "#"
    },
    {
      "platform": "instagram",
      "href": "#"
    }
  ],
  "copyright": "© 2024 Stirring Dirt Excavation. All rights reserved."
}

  return (
    <>
      <Header {...headerProps} />
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact</h1>
          <p className="text-xl text-gray-600">Get a free quote</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}