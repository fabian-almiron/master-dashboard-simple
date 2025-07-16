import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full py-12 mx-auto md:py-24 lg:py-32 xl:py-48 modern-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none modern-text-gradient font-heading">
                Streamline Your Workflow Like Never Before
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl font-sans">
                Boost productivity, reduce overhead, and focus on what matters most with our all-in-one platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1 modern-button-primary modern-glow">
                Start Free Trial <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="modern-glass-effect border-white/30 text-white hover:bg-white/20">
                View Demo
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white/30 bg-white/20 overflow-hidden modern-glass-effect">
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      alt="User"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <div className="text-white/80">
                Trusted by <span className="font-medium text-white modern-neon-text">2,000+</span> companies
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=550&width=550&text=Platform+Screenshot"
            width={550}
            height={550}
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last modern-card-hover modern-glow"
          />
        </div>
      </div>
    </section>
  )
} 