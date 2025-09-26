import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Accessories() {
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
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Accessories</h1>
          <p className="text-xl text-gray-600">Fashion accessories, bags, jewelry, and more</p>
        </div>
      </main>
      <Footer {...footerProps} />
    </>
  )
}