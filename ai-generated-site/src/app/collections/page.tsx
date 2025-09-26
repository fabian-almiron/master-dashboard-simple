import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Collections() {
  const headerProps = {
  "logo": "LUXE FASHION",
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Shop",
      "href": "/shop"
    },
    {
      "label": "Women",
      "href": "/women"
    },
    {
      "label": "Men",
      "href": "/men"
    },
    {
      "label": "Collections",
      "href": "/collections"
    },
    {
      "label": "Sale",
      "href": "/sale"
    }
  ],
  "ctaText": "Cart (0)",
  "ctaHref": "/cart",
  "searchHref": "/search"
}
  const heroProps = {
  "headline": "Curated Collections",
  "description": "Discover our carefully curated fashion collections, each telling a unique style story designed for the modern wardrobe.",
  "primaryCta": {
    "text": "Explore Collections",
    "href": "#collections"
  },
  "secondaryCta": {
    "text": "Style Guide",
    "href": "/about"
  },
  "heroImage": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
  "features": [
    "Seasonal Updates",
    "Limited Editions",
    "Curated by Experts"
  ]
}
  const featuresProps = {
  "headline": "Featured Collections",
  "description": "Each collection is thoughtfully designed to complement your lifestyle and express your personality",
  "features": [
    {
      "title": "Spring Essentials",
      "description": "Light fabrics and fresh colors perfect for the new season",
      "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop"
    },
    {
      "title": "Work Wardrobe",
      "description": "Professional pieces that transition seamlessly from office to evening",
      "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
    },
    {
      "title": "Weekend Casual",
      "description": "Comfortable yet stylish pieces for your downtime",
      "image": "https://images.unsplash.com/photo-1544957992-20349e0611d1?w=400&h=300&fit=crop"
    },
    {
      "title": "Evening Elegance",
      "description": "Sophisticated pieces for special occasions and nights out",
      "image": "https://images.unsplash.com/photo-1566479179817-c7e8b0b7f6b5?w=400&h=300&fit=crop"
    }
  ]
}
  const testimonialsProps = {
  "headline": "Collection Reviews",
  "description": "See why our curated collections are loved by fashion enthusiasts",
  "testimonials": [
    {
      "quote": "The Spring Essentials collection is absolutely perfect. Every piece works beautifully together!",
      "author": "Lisa Wang",
      "role": "Fashion Stylist",
      "company": "Style Studio",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    {
      "quote": "I love how the collections make it easy to put together complete looks. Great curation!",
      "author": "Amanda Rodriguez",
      "role": "Creative Director",
      "company": "Design Co",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ]
}
  const footerProps = {
  "companyName": "LUXE FASHION",
  "description": "Premium fashion for the modern lifestyle. Discover timeless pieces that celebrate your unique style.",
  "columns": [
    {
      "title": "Shop",
      "links": [
        {
          "label": "New Arrivals",
          "href": "/collections/new"
        },
        {
          "label": "Women",
          "href": "/women"
        },
        {
          "label": "Men",
          "href": "/men"
        },
        {
          "label": "Accessories",
          "href": "/accessories"
        },
        {
          "label": "Sale",
          "href": "/sale"
        }
      ]
    },
    {
      "title": "Customer Care",
      "links": [
        {
          "label": "Size Guide",
          "href": "/size-guide"
        },
        {
          "label": "Shipping Info",
          "href": "/shipping"
        },
        {
          "label": "Returns",
          "href": "/returns"
        },
        {
          "label": "FAQ",
          "href": "/faq"
        },
        {
          "label": "Contact Us",
          "href": "/contact"
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
          "label": "Sustainability",
          "href": "/sustainability"
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
          "label": "Store Locator",
          "href": "/stores"
        }
      ]
    }
  ],
  "contactInfo": {
    "email": "hello@luxefashion.com",
    "phone": "+1 (555) 123-LUXE",
    "hours": "Mon-Fri 9AM-6PM EST"
  },
  "socialLinks": [
    {
      "platform": "instagram",
      "href": "https://instagram.com/luxefashion"
    },
    {
      "platform": "facebook",
      "href": "https://facebook.com/luxefashion"
    },
    {
      "platform": "pinterest",
      "href": "https://pinterest.com/luxefashion"
    },
    {
      "platform": "twitter",
      "href": "https://twitter.com/luxefashion"
    }
  ],
  "copyright": "© 2024 LUXE FASHION. All rights reserved."
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