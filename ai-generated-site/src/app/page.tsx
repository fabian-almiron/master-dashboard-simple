import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  const headerProps = {
  "logo": "Serenity Spa & Wellness",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Treatments",
      "href": "/treatments"
    },
    {
      "label": "Wellness",
      "href": "/wellness"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Gift Cards",
      "href": "/gift-cards"
    }
  ],
  "ctaText": "Book Appointment",
  "ctaHref": "/booking",
  "socialLinks": [
    {
      "platform": "instagram",
      "href": "https://instagram.com/serenityspa"
    },
    {
      "platform": "facebook",
      "href": "https://facebook.com/serenityspa"
    },
    {
      "platform": "pinterest",
      "href": "https://pinterest.com/serenityspa"
    }
  ],
  "contactInfo": {
    "phone": "+1 (555) 234-7890",
    "email": "relax@serenityspa.com",
    "address": "456 Tranquil Lane, Wellness District, CA 90210",
    "hours": "Mon-Sat 9AM-8PM, Sun 10AM-6PM"
  },
  "emergencyPhone": "+1 (555) 234-7890",
  "serviceAreas": "Wellness District & Beverly Hills",
  "patientPortalHref": "/client-portal",
  "agentInfo": {
    "name": "Sarah Chen",
    "phone": "+1 (555) 234-7890",
    "email": "sarah@serenityspa.com"
  },
  "searchHref": "/search"
}
  const heroProps = {
  "headline": "Escape to Tranquility",
  "description": "Discover pure relaxation with our signature spa treatments and holistic wellness services in a serene, luxurious environment",
  "primaryCta": {
    "text": "Book Your Escape",
    "href": "/booking"
  },
  "secondaryCta": {
    "text": "View Treatments",
    "href": "/treatments"
  },
  "ctaText": "Book Now",
  "ctaHref": "/booking",
  "features": [
    "Award-Winning Spa",
    "Expert Therapists",
    "Organic Products"
  ],
  "heroImage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
  "backgroundImage": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=900&fit=crop",
  "credentials": [
    "ISPA Member",
    "Forbes 5-Star Spa",
    "Certified Organic"
  ],
  "testimonialQuote": "The most relaxing experience I've ever had. The therapists are true healing artists!",
  "testimonialAuthor": "Michelle Roberts, Regular Client",
  "emergencyPhone": "+1 (555) 234-7890",
  "officeHours": "Mon-Sat 9AM-8PM, Sun 10AM-6PM",
  "patientStats": {
    "yearsExperience": "12+",
    "patientsServed": "15,000+",
    "satisfactionRate": "99%"
  },
  "specialOffer": "New Client Special: 20% off your first signature treatment",
  "hours": "Mon-Sat 9AM-8PM, Sun 10AM-6PM",
  "location": "Wellness District",
  "menuHighlights": [
    "90-Min Signature Massage",
    "Himalayan Salt Stone Therapy",
    "24K Gold Facial"
  ],
  "serviceAreas": "Wellness District & Beverly Hills",
  "guarantees": [
    "100% Satisfaction",
    "Licensed Therapists",
    "Organic Products"
  ],
  "responseTime": "Same day booking available",
  "serviceHighlights": [
    "Signature Serenity Massage",
    "Detox Body Wrap",
    "Aromatherapy Journey"
  ],
  "agentName": "Sarah Chen",
  "agentCredentials": [
    "Master Esthetician",
    "Holistic Wellness Coach",
    "15 Years Experience"
  ],
  "marketStats": {
    "propertiesSold": "N/A",
    "avgDaysOnMarket": "N/A",
    "clientSatisfaction": "99%"
  }
}
  const featuresProps = {
  "headline": "Signature Treatments",
  "description": "Indulge in our carefully curated selection of spa treatments designed to rejuvenate your body, mind, and spirit",
  "features": [
    {
      "icon": "sparkles",
      "title": "Serenity Signature Massage",
      "description": "Our award-winning 90-minute full-body massage combining Swedish, deep tissue, and hot stone techniques",
      "metric": "90 min",
      "guarantee": "Most Popular",
      "badge": "Signature",
      "highlight": "$180",
      "duration": "90 minutes",
      "specialty": "Award Winner"
    },
    {
      "icon": "heart",
      "title": "24K Gold Rejuvenation Facial",
      "description": "Luxurious anti-aging facial with 24-karat gold infusion for radiant, youthful skin",
      "metric": "75 min",
      "guarantee": "Anti-Aging",
      "badge": "Luxury",
      "highlight": "$250",
      "duration": "75 minutes",
      "specialty": "Celebrity Favorite"
    },
    {
      "icon": "shield",
      "title": "Himalayan Salt Stone Therapy",
      "description": "Detoxifying body treatment using warm Himalayan salt stones to restore balance and energy",
      "metric": "60 min",
      "guarantee": "Detoxifying",
      "badge": "Healing",
      "highlight": "$160",
      "duration": "60 minutes",
      "specialty": "Energy Balancing"
    },
    {
      "icon": "star",
      "title": "Aromatherapy Journey",
      "description": "Personalized essential oil therapy combined with lymphatic massage for deep relaxation",
      "metric": "75 min",
      "guarantee": "Customized",
      "badge": "Holistic",
      "highlight": "$190",
      "duration": "75 minutes",
      "specialty": "Stress Relief"
    }
  ],
  "credentials": [
    "ISPA Certified",
    "Forbes 5-Star",
    "Green Spa Certified"
  ],
  "patientStats": {
    "yearsExperience": "12+",
    "patientsServed": "15,000+",
    "satisfactionRate": "99%"
  },
  "highlights": {
    "rating": "4.9",
    "reviews": "850+",
    "specialties": [
      "Massage Therapy",
      "Facial Treatments",
      "Body Wraps",
      "Aromatherapy"
    ]
  },
  "serviceInfo": {
    "responseTime": "Same day",
    "serviceAreas": "Wellness District",
    "yearsExperience": "12+",
    "jobsCompleted": "45,000+"
  },
  "wellness": {
    "treatments": "35+",
    "experience": "12+",
    "satisfaction": "99%",
    "awards": [
      "Best Spa 2024",
      "Excellence in Wellness",
      "Green Spa Award"
    ]
  },
  "marketData": {
    "propertiesSold": "N/A",
    "avgDaysOnMarket": "N/A",
    "clientSatisfaction": "99%",
    "marketAreas": [
      "Wellness District",
      "Beverly Hills",
      "West Hollywood"
    ]
  }
}
  const footerProps = {
  "companyName": "Serenity Spa & Wellness",
  "tagline": "Where Tranquility Meets Transformation",
  "description": "Your sanctuary for relaxation and rejuvenation in the heart of the Wellness District",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Treatments",
      "href": "/treatments"
    },
    {
      "label": "Wellness",
      "href": "/wellness"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Gift Cards",
      "href": "/gift-cards"
    },
    {
      "label": "Membership",
      "href": "/membership"
    }
  ],
  "socialLinks": [
    {
      "platform": "instagram",
      "href": "https://instagram.com/serenityspa"
    },
    {
      "platform": "facebook",
      "href": "https://facebook.com/serenityspa"
    },
    {
      "platform": "pinterest",
      "href": "https://pinterest.com/serenityspa"
    },
    {
      "platform": "youtube",
      "href": "https://youtube.com/serenityspa"
    }
  ],
  "copyright": "© 2024 Serenity Spa & Wellness. All rights reserved.",
  "columns": [
    {
      "title": "Spa Services",
      "links": [
        {
          "label": "Massage Therapy",
          "href": "/treatments/massage"
        },
        {
          "label": "Facial Treatments",
          "href": "/treatments/facials"
        },
        {
          "label": "Body Treatments",
          "href": "/treatments/body"
        },
        {
          "label": "Wellness Packages",
          "href": "/packages"
        }
      ]
    },
    {
      "title": "Quick Links",
      "links": [
        {
          "label": "Book Appointment",
          "href": "/booking"
        },
        {
          "label": "Gift Cards",
          "href": "/gift-cards"
        },
        {
          "label": "Spa Membership",
          "href": "/membership"
        },
        {
          "label": "Special Offers",
          "href": "/offers"
        }
      ]
    }
  ],
  "contactInfo": {
    "email": "relax@serenityspa.com",
    "phone": "+1 (555) 234-7890",
    "address": "456 Tranquil Lane, Wellness District, CA 90210",
    "hours": "Mon-Sat 9AM-8PM, Sun 10AM-6PM"
  },
  "credentials": [
    "Licensed Spa Facility",
    "ISPA Member",
    "Forbes 5-Star Spa"
  ],
  "emergencyPhone": "+1 (555) 234-7890",
  "patientResources": [
    {
      "label": "Client Portal",
      "href": "/client-portal"
    },
    {
      "label": "Intake Forms",
      "href": "/forms"
    },
    {
      "label": "FAQs",
      "href": "/faqs"
    }
  ],
  "specialHours": "Holiday hours vary. Closed Thanksgiving & Christmas",
  "serviceAreas": "Wellness District & Beverly Hills",
  "licenses": [
    "CA Spa License #SPA2024",
    "Business License #BUS789"
  ],
  "specialOffers": [
    {
      "title": "New Client Special",
      "description": "20% off your first signature treatment"
    },
    {
      "title": "Couples Package",
      "description": "Book two treatments and save 15%"
    }
  ],
  "agentInfo": {
    "name": "Sarah Chen",
    "phone": "+1 (555) 234-7890",
    "email": "sarah@serenityspa.com",
    "license": "CMT #12345"
  },
  "marketStats": {
    "propertiesSold": "N/A",
    "avgDaysOnMarket": "N/A",
    "clientSatisfaction": "99%"
  }
}

  return (
    <>
      <Header {...headerProps} />
      <Hero {...heroProps} />
      <Features {...featuresProps} />
      <Footer {...footerProps} />
    </>
  )
}