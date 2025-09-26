import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
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
  "headline": "Elevate Your Style",
  "description": "Discover premium fashion pieces that define modern elegance. From timeless classics to contemporary trends, find your perfect style with our curated collections.",
  "primaryCta": {
    "text": "Shop New Arrivals",
    "href": "/collections"
  },
  "secondaryCta": {
    "text": "Browse Collections",
    "href": "/shop"
  },
  "heroImage": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  "specialOffer": "Free shipping on orders over $150 + 15% off your first purchase",
  "features": [
    "Premium Quality",
    "Free Returns",
    "Size Guide Available"
  ]
}
  const featuresProps = {
  "headline": "Featured Collections",
  "description": "Explore our carefully curated fashion collections designed for the modern lifestyle",
  "features": [
    {
      "title": "New Arrivals",
      "description": "Fresh styles and trending pieces just landed in our collection",
      "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
      "link": "/collections/new-arrivals"
    },
    {
      "title": "Best Sellers",
      "description": "Customer favorites and most-loved pieces from our collection",
      "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
      "link": "/collections/best-sellers"
    },
    {
      "title": "Seasonal Edit",
      "description": "Perfectly curated pieces for the current season and weather",
      "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      "link": "/collections/seasonal"
    },
    {
      "title": "Sale Items",
      "description": "Premium fashion at unbeatable prices - limited time offers",
      "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop",
      "link": "/sale"
    }
  ]
}
  const testimonialsProps = {
  "headline": "What Our Customers Say",
  "description": "Real reviews from fashion lovers who trust our quality and style",
  "testimonials": [
    {
      "quote": "Absolutely love the quality and fit of everything I've ordered. The pieces are versatile and well-made. Will definitely be a repeat customer!",
      "author": "Sarah Mitchell",
      "role": "Marketing Manager",
      "company": "Tech Startup",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      "quote": "The shopping experience is seamless and the clothes are even better in person. Fast shipping and beautiful packaging too!",
      "author": "Emily Rodriguez",
      "role": "Fashion Blogger",
      "company": "Style Diary",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      "quote": "Finally found a brand that combines style, quality, and sustainability. Every piece I own from here gets compliments!",
      "author": "Lisa Chen",
      "role": "Creative Director",
      "company": "Design Studio",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    {
      "quote": "The size guide is accurate and the return process is so easy. Great customer service and beautiful clothes!",
      "author": "Amanda Johnson",
      "role": "Consultant",
      "company": "Business Solutions",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ]
}
  const pricingProps = {
  "headline": "Membership Benefits",
  "description": "Join our fashion community and enjoy exclusive perks and early access to new collections",
  "pricingTiers": [
    {
      "name": "Fashion Lover",
      "price": "Free",
      "period": "forever",
      "description": "Perfect for discovering new styles",
      "features": [
        "Free shipping on orders $150+",
        "Size guide access",
        "30-day returns",
        "Newsletter with style tips"
      ],
      "ctaText": "Join Free",
      "ctaHref": "/signup"
    },
    {
      "name": "Style Insider",
      "price": "$19.99",
      "period": "year",
      "description": "For the fashion-forward shopper",
      "features": [
        "Everything in Fashion Lover",
        "Free shipping on all orders",
        "Early access to sales",
        "Exclusive member discounts",
        "Personal styling tips"
      ],
      "ctaText": "Become Insider",
      "ctaHref": "/membership"
    },
    {
      "name": "VIP Stylist",
      "price": "$49.99",
      "period": "year",
      "description": "Ultimate fashion experience",
      "features": [
        "Everything in Style Insider",
        "Personal stylist consultation",
        "Priority customer service",
        "Exclusive VIP events",
        "First access to limited editions"
      ],
      "ctaText": "Go VIP",
      "ctaHref": "/vip"
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
      <Pricing {...pricingProps} />
      <Footer {...footerProps} />
    </>
  )
}