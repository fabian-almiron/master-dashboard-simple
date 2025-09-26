import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface FeaturesProps {
  headline: string
  description: string
  features: Array<{
    title: string
    description: string
    image: string
    link?: string
  }>
}

export default function Features({ headline, description, features }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {headline}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 opacity-90">
                  {feature.description}
                </p>
                {feature.link && (
                  <div className="flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}