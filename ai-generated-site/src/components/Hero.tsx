import Link from 'next/link'
import Image from 'next/image'
import { Award, Shield, Users, MapPin, Star, HardHat } from 'lucide-react'

export default function Hero() {
  // Component data - will be populated by AI
  const data = {
    headline: "Quality Construction Services",
    description: "Professional contractors with 25+ years of experience. Licensed, insured, and committed to delivering exceptional results on every project.",
    yearsExperience: "25+",
    projectsCompleted: "500+", 
    serviceAreas: "Tri-City Metro Area",
    primaryCta: { text: "Get Free Estimate", href: "/contact" },
    secondaryCta: { text: "View Our Work", href: "/gallery" },
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    guarantees: [
      "100% Satisfaction Guarantee",
      "Licensed & Insured",
      "Free Estimates",
      "Warranty on All Work"
    ]
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Credential Badge */}
            <div className="flex items-center mb-4">
              <HardHat className="h-6 w-6 text-blue-600 mr-2" />
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Professional Contractors
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {data.description}
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.yearsExperience}</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.projectsCompleted}</div>
                <div className="text-sm text-gray-600">Projects Done</div>
              </div>
              <div className="text-center">
                <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <div className="text-xs text-gray-600">{data.serviceAreas}</div>
              </div>
            </div>
            
            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {data.guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-gray-700 font-medium">{guarantee}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={data.primaryCta.href}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <Award className="mr-2 h-5 w-5" />
                {data.primaryCta.text}
              </Link>
              <Link
                href={data.secondaryCta.href}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {data.secondaryCta.text}
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src={data.heroImage}
              alt="Construction project"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            {/* Trust Badge Overlay */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border border-green-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Fully Licensed</p>
                  <p className="text-xs text-gray-600">& Insured Contractor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}