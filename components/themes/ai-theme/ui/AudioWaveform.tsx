"use client"

import type { ComponentInfo } from "@/lib/cms-types"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from "lucide-react"
import { useState } from "react"

export const metadata: ComponentInfo = {
  type: "AudioWaveform",
  name: "Audio Waveform Demo",
  description: "Interactive audio waveform visualization with playback controls",
  category: "content-blocks",
  icon: "Volume2",
}

export default function AudioWaveform() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // Generate mock waveform data
  const waveformBars = Array.from({ length: 100 }, (_, i) => ({
    height: Math.random() * 100 + 20,
    active: i < currentTime,
  }))

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Simulate audio playback
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 50)
    }
  }

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 mb-6">
            <Volume2 className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Live Demo</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hear the
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Difference
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience our AI voice technology in action. Listen to ultra-realistic voice synthesis that's
            indistinguishable from human speech.
          </p>

          {/* Waveform Visualization */}
          <div className="bg-slate-800/50 rounded-2xl p-8 mb-8 border border-slate-700/50">
            <div className="flex items-end justify-center space-x-1 h-32 mb-6">
              {waveformBars.map((bar, index) => (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-100 ${
                    bar.active ? "bg-gradient-to-t from-blue-500 to-purple-500" : "bg-slate-600"
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
              ))}
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center space-x-6">
              <Button
                onClick={togglePlayback}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full w-16 h-16 p-0"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>

              <div className="text-white font-mono text-sm">
                {Math.floor(currentTime / 10)}:{(currentTime % 10).toString().padStart(2, "0")} / 10:00
              </div>
            </div>
          </div>

          {/* Sample Voices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah", accent: "American", type: "Professional" },
              { name: "James", accent: "British", type: "Conversational" },
              { name: "Maria", accent: "Spanish", type: "Warm & Friendly" },
            ].map((voice, index) => (
              <div
                key={index}
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 hover:border-purple-500/50 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">{voice.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{voice.accent} Accent</p>
                <p className="text-purple-400 text-sm">{voice.type}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
