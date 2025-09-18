import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BookNow() {
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
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Book Now</h1>
          <p className="text-xl text-gray-600">Schedule your spa appointment</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}