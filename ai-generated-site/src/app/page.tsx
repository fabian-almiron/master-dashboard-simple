import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
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
  const heroProps = {
  "headline": "Honest Work, Fair Prices, Real Results",
  "description": "Owner-operated excavation services in Logan, Utah. No middleman, no markup—just Colton and his commitment to quality work at honest prices.",
  "primaryCta": {
    "text": "Get Your Free Quote",
    "href": "/contact"
  },
  "secondaryCta": {
    "text": "View Our Services",
    "href": "/services"
  },
  "heroImage": "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800&h=600&fit=crop",
  "contactPhone": "(435) 555-DIRT",
  "serviceAreas": "Logan, UT & Cache Valley",
  "projectTypes": [
    "Yard Preparation",
    "Sod Installation",
    "Decorative Rock Work",
    "Driveway Grading",
    "Demolition",
    "Junk Removal"
  ],
  "guarantees": [
    "Owner-Operated Service",
    "Transparent Pricing",
    "Quality Guaranteed"
  ],
  "yearsExperience": "15+"
}
  const featuresProps = {
  "headline": "Why Choose Stirring Dirt Excavation",
  "description": "When you work with us, you're working directly with the owner. No sales teams, no overhead—just honest service and fair prices.",
  "features": [
    {
      "icon": "truck",
      "title": "Owner-Operated",
      "description": "Work directly with Colton from quote to completion. No middleman means better prices and personal accountability.",
      "guarantee": "Direct owner communication"
    },
    {
      "icon": "hardHat",
      "title": "Honest Pricing",
      "description": "Transparent quotes with no hidden fees. You'll know exactly what you're paying for before we start.",
      "guarantee": "No surprise charges"
    },
    {
      "icon": "shield",
      "title": "Quality Guaranteed",
      "description": "Built on values of honesty, hard work, and respect. Your satisfaction is our reputation.",
      "guarantee": "100% satisfaction"
    },
    {
      "icon": "mapPin",
      "title": "Local & Reliable",
      "description": "Proudly serving Logan and Cache Valley. We're your neighbors, and we treat your property like our own.",
      "guarantee": "Same-week service"
    },
    {
      "icon": "award",
      "title": "Full Service",
      "description": "From yard prep to junk removal, we handle it all. One call for all your excavation needs.",
      "guarantee": "Complete project management"
    },
    {
      "icon": "check",
      "title": "Community Focused",
      "description": "Supporting our local community with fair prices and dependable service you can trust.",
      "guarantee": "Local business values"
    }
  ],
  "companyInfo": {
    "yearsExperience": "15+",
    "projectsCompleted": "500+",
    "serviceAreas": "Logan & Cache Valley",
    "equipmentCount": "Professional Grade"
  }
}
  const testimonialsProps = {
  "headline": "What Our Neighbors Say",
  "description": "Real reviews from real customers in Cache Valley",
  "testimonials": [
    {
      "quote": "Colton transformed our backyard! He was honest about costs from the start, showed up when he said he would, and the work was exceptional. You can tell he takes pride in what he does.",
      "author": "Sarah Johnson",
      "location": "Logan, UT",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      "projectType": "Yard Preparation & Sod",
      "projectResult": "Beautiful new lawn installed",
      "completionTime": "3 days"
    },
    {
      "quote": "Finally, a contractor who does what he says! Colton regraded our driveway and it looks better than new. Fair price, great communication, and quality work.",
      "author": "Mike Peterson",
      "location": "Providence, UT",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "projectType": "Driveway Grading",
      "projectResult": "Proper drainage restored",
      "completionTime": "1 day"
    },
    {
      "quote": "Stirring Dirt helped us clear out years of junk and debris. Colton was respectful of our property and worked efficiently. Highly recommend for any excavation needs!",
      "author": "Linda Chen",
      "location": "North Logan, UT",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "projectType": "Demolition & Junk Removal",
      "projectResult": "Property completely cleared",
      "completionTime": "2 days"
    }
  ],
  "companyStats": {
    "projectsCompleted": "500+",
    "yearsExperience": "15+",
    "customerSatisfaction": "100%"
  }
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
      <Hero {...heroProps} />
      <Features {...featuresProps} />
      <Testimonials {...testimonialsProps} />
      <Footer {...footerProps} />
    </>
  )
}