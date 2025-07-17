import type { ComponentInfo } from "@/lib/cms-types"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export const metadata: ComponentInfo = {
  type: "AITestimonials",
  name: "AI Voice Testimonials",
  description: "Customer testimonials with ratings for AI voice services",
  category: "content-blocks",
  icon: "Quote",
}

export default function AITestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Podcast Producer",
      company: "AudioCraft Studios",
      content:
        "The voice quality is absolutely incredible. Our listeners can't tell the difference between AI-generated and human voices. It's revolutionized our production workflow.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      company: "Digital Storytelling Co.",
      content:
        "I've tried many voice synthesis tools, but this platform delivers unmatched naturalness and emotion. The voice cloning feature saved us thousands in voice actor fees.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      company: "TechFlow Solutions",
      content:
        "The API integration was seamless, and the real-time processing capabilities are exactly what we needed for our customer service chatbot. Outstanding performance.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Kim",
      role: "E-learning Developer",
      company: "EduTech Innovations",
      content:
        "Multi-language support is phenomenal. We've localized our courses to 15 languages with consistent, high-quality narration. Our global reach has expanded dramatically.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Brand Voice Agency",
      content:
        "The emotion control features allow us to perfectly match brand personalities. We can create warm, professional, or energetic voices that align with our clients' needs.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Alex Johnson",
      role: "App Developer",
      company: "Mobile Innovations",
      content:
        "Lightning-fast processing and reliable uptime. Our voice-enabled app has never performed better. The enterprise security features give us complete peace of mind.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30 mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Customer Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {" "}
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how creators, businesses, and developers are transforming their projects with our AI voice technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-purple-400 mb-4" />
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 bg-slate-700"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
              <span className="font-semibold text-white">4.9/5</span>
              <span className="ml-2">Average Rating</span>
            </div>
            <div className="w-px h-6 bg-slate-600"></div>
            <div>
              <span className="font-semibold text-white">10,000+</span>
              <span className="ml-2">Happy Customers</span>
            </div>
            <div className="w-px h-6 bg-slate-600"></div>
            <div>
              <span className="font-semibold text-white">99.9%</span>
              <span className="ml-2">Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
