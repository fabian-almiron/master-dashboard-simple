import Image from 'next/image'
import { Star, Award, Shield, CheckCircle, Users, Briefcase } from 'lucide-react'

export default function Testimonials() {
  // Component data - will be populated by AI
  const data = {
    headline: "Professional Excellence Recognized",
    description: "Our commitment to professional standards and quality craftsmanship speaks for itself through our customers' experiences.",
    credentials: {
      yearsExperience: "25+",
      certifications: "12",
      industryAwards: "5",
      licensedStates: "3"
    },
    testimonials: [
      {
        quote: "As a general contractor myself, I'm very particular about subcontractors. Their attention to detail and professional standards are exactly what you want on a high-end project.",
        author: "Michael Torres",
        role: "General Contractor",
        company: "Torres Construction",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        projectValue: "$85,000",
        credentialFocus: "Industry Professional"
      },
      {
        quote: "The level of craftsmanship is outstanding. Every detail was perfect, from the initial consultation to the final walkthrough. True professionals who take pride in their work.",
        author: "Elizabeth Harper",
        role: "Interior Designer",
        company: "Harper Design Studio",
        rating: 5,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        projectValue: "$45,000",
        credentialFocus: "Quality Craftsmanship"
      },
      {
        quote: "Permits, inspections, code compliance - they handled everything flawlessly. It's rare to find contractors who are both skilled tradespeople and business professionals.",
        author: "James Patterson",
        role: "Property Manager",
        company: "Premier Properties",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        projectValue: "$120,000",
        credentialFocus: "Code Compliance Expert"
      }
    ]
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Award className="h-6 w-6 text-blue-600 mr-2" />
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              CERTIFIED PROFESSIONALS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {data.description}
          </p>
          
          {/* Professional Credentials */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
              <Briefcase className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{data.credentials.yearsExperience}</div>
              <div className="text-xs text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
              <Award className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{data.credentials.certifications}</div>
              <div className="text-xs text-gray-600">Certifications</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
              <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{data.credentials.industryAwards}</div>
              <div className="text-xs text-gray-600">Industry Awards</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
              <Shield className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{data.credentials.licensedStates}</div>
              <div className="text-xs text-gray-600">Licensed States</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Customer Info */}
                <div className="lg:order-1">
                  <div className="flex items-center lg:flex-col lg:text-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="rounded-full mr-4 lg:mr-0 lg:mb-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-slate-600">{testimonial.company}</p>
                      <div className="flex items-center mt-2 lg:justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="lg:order-2 lg:col-span-2">
                  <div className="bg-slate-100 p-4 rounded-lg mb-4">
                    <div className="text-sm font-medium text-slate-600 mb-1">Project Focus:</div>
                    <div className="text-lg font-semibold text-slate-900">{testimonial.credentialFocus}</div>
                  </div>
                  
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                {/* Project Value */}
                <div className="lg:order-3">
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Project Value</div>
                    <div className="text-2xl font-bold text-slate-900">{testimonial.projectValue}</div>
                    <div className="flex items-center justify-center mt-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600 font-medium">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-slate-600 text-white p-6 rounded-lg shadow-lg inline-block">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-semibold">Licensed, Bonded & Insured Professional</span>
            </div>
            <p className="text-slate-200 text-sm">25+ years of excellence • Industry certifications • Quality guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  )
}