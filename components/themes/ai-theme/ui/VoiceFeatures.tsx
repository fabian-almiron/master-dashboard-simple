import type { ComponentInfo } from "@/lib/cms-types"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, AudioWaveformIcon as Waveform, Brain, Zap, Globe, Shield } from "lucide-react"

export const metadata: ComponentInfo = {
  type: "VoiceFeatures",
  name: "Voice Features Grid",
  description: "Showcase key AI voice features with modern cards",
  category: "content-blocks",
  icon: "Waveform",
}

export default function VoiceFeatures() {
  const features = [
    {
      icon: Brain,
      title: "Neural Voice Synthesis",
      description:
        "Advanced deep learning models create incredibly natural-sounding voices with human-like intonation and emotion.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Waveform,
      title: "Real-time Processing",
      description: "Lightning-fast voice generation with sub-second latency for seamless real-time applications.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description:
        "Create custom voice models from just minutes of audio samples with our proprietary cloning technology.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Generate voices in 50+ languages with native pronunciation and cultural nuances.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Emotion Control",
      description: "Fine-tune emotional expression, tone, and speaking style to match your exact requirements.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and privacy controls ensure your voice data remains completely secure.",
      color: "from-slate-500 to-gray-500",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
            <Waveform className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Cutting-Edge Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Advanced
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              AI Technology
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our revolutionary AI voice platform combines the latest in neural networks, machine learning, and audio
            processing to deliver unparalleled voice experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
