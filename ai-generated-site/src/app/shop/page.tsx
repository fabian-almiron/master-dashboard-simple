import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Shop() {
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
  "headline": "Discover Your Style",
  "description": "Browse our complete collection of premium fashion pieces, from everyday essentials to statement pieces that define your unique style.",
  "primaryCta": {
    "text": "Shop All",
    "href": "/collections"
  },
  "secondaryCta": {
    "text": "Filter Products",
    "href": "#filters"
  },
  "heroImage": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  "specialOffer": "Free shipping on orders over $150",
  "features": [
    "Free Returns",
    "Size Guide Available",
    "Premium Quality"
  ]
}
  const featuresProps = {
  "headline": "Shop by Category",
  "description": "Find exactly what you're looking for with our organized collections",
  "features": [
    {
      "title": "Women's Collection",
      "description": "Elegant dresses, chic tops, and sophisticated outerwear for the modern woman",
      "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
      "link": "/women"
    },
    {
      "title": "Men's Collection",
      "description": "Sharp suits, casual wear, and contemporary styles for the discerning gentleman",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "link": "/men"
    },
    {
      "title": "Accessories",
      "description": "Complete your look with our curated selection of bags, jewelry, and accessories",
      "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      "link": "/accessories"
    },
    {
      "title": "Sale Items",
      "description": "Premium fashion at unbeatable prices - limited time offers on selected pieces",
      "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop",
      "link": "/sale"
    }
  ]
}
  const testimonialsProps = {
  "headline": "What Our Customers Say",
  "description": "Real feedback from fashion lovers who trust our quality and style",
  "testimonials": [
    {
      "quote": "The quality is exceptional and the fit is perfect. I've received so many compliments on my purchases!",
      "author": "Sarah Johnson",
      "role": "Fashion Blogger",
      "company": "Style Maven",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      "quote": "Fast shipping, beautiful packaging, and clothes that look even better in person. Highly recommend!",
      "author": "Emily Chen",
      "role": "Marketing Director",
      "company": "Creative Agency",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
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