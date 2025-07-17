// AI Theme Component Registration
import AIHero, { metadata as AIHeroMetadata } from "./ui/AIHero"
import VoiceFeatures, { metadata as VoiceFeaturesMetadata } from "./ui/VoiceFeatures"
import AudioWaveform, { metadata as AudioWaveformMetadata } from "./ui/AudioWaveform"
import AIPricing, { metadata as AIPricingMetadata } from "./ui/AIPricing"
import AITestimonials, { metadata as AITestimonialsMetadata } from "./ui/AITestimonials"
import AICTA, { metadata as AICTAMetadata } from "./ui/AICTA"

export const componentRegistry = {
  AIHero,
  VoiceFeatures,
  AudioWaveform,
  AIPricing,
  AITestimonials,
  AICTA,
}

export const componentInfo = [
  AIHeroMetadata,
  VoiceFeaturesMetadata,
  AudioWaveformMetadata,
  AIPricingMetadata,
  AITestimonialsMetadata,
  AICTAMetadata,
]
