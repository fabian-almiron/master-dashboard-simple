'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Wand2, 
  Globe, 
  Palette, 
  Layout,
  Code, 
  Send,
  Loader2,
  Lightbulb,
  Zap,
  Brain
} from 'lucide-react'
// Removed Select and Tabs imports as we're going freeform only

// Force dynamic rendering - don't pre-render during build (requires auth)
export const dynamic = 'force-dynamic'

// Removed websiteTypes and designStyles arrays - going pure freeform

const examplePrompts = [
  {
    category: 'Business',
    prompts: [
      "Create a modern law firm website with a professional blue color scheme, featuring services, attorney profiles, and a contact form",
      "Build a tech startup landing page with a dark theme, animated hero section, and pricing tiers",
      "Design a restaurant website with warm colors, menu showcase, online reservations, and location map"
    ]
  },
  {
    category: 'E-commerce',
    prompts: [
      "Create a fashion e-commerce site with a clean white design, product galleries, and shopping cart functionality",
      "Build an electronics store with a tech-focused design, product comparisons, and customer reviews",
      "Design a handmade crafts marketplace with earthy tones and artisan profiles"
    ]
  },
  {
    category: 'Creative',
    prompts: [
      "Create a photographer's portfolio with full-screen image galleries and a minimalist black design",
      "Build a graphic designer's showcase with bold colors, interactive portfolio, and client testimonials",
      "Design a musician's website with audio players, tour dates, and merchandise store"
    ]
  }
]

export default function AIPlayground() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationMode, setGenerationMode] = useState("single") // "single", "multi", "hybrid"

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    try {
      console.log('🚀 Starting AI website generation...')
      
      let apiEndpoint = "/api/ai-generate-website"
      if (generationMode === "multi") apiEndpoint = "/api/ai-generate-website-multi"
      if (generationMode === "hybrid") apiEndpoint = "/api/ai-generate-hybrid"
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate website')
      }

      console.log('✅ Website generated successfully:', result)
      
      // Show success message
      if (result.stages) {
        // Multi-stage result
        const stageInfo = result.stages.map(s => `Stage ${s.stage}: ${s.name} (${s.filesCount} files)`).join("\n")
        alert(`🎉 Multi-Stage Website Generated!\n\n${result.description}\n\nTotal Files: ${result.totalFiles}\nLocation: ${result.location}\n\nStages Completed:\n${stageInfo}\n\nCheck the ai-generated-site folder!`)
      } else {
        // Single-stage result
        alert(`🎉 Website Generated Successfully!\n\n${result.description}\n\nFiles created: ${result.filesCreated}\nLocation: ${result.location}\n\nCheck the ai-generated-site folder in your project root!`)
      }
      
    } catch (error) {
      console.error('❌ Error generating website:', error)
      alert(`Failed to generate website: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const insertExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-8">
            <div className="relative mr-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-xl animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                AI Website Playground
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                Describe your dream website and watch AI bring it to life
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Generation Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wand2 className="h-6 w-6 mr-3 text-purple-400" />
                  Create Your Website with AI
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Describe your dream website in natural language and watch AI bring it to life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-gray-300 flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-purple-400" />
                    Describe Your Website
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your dream website in detail... Include the type of business, design preferences, colors, features, and any specific requirements. For example: 'Create a modern law firm website with a professional blue color scheme, featuring services, attorney profiles, and a contact form'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={8}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
                  />
                  <div className="text-xs text-gray-500 flex items-center justify-between">
                    <span>{prompt.length} characters</span>
                    <span>Be as detailed as possible for better results</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span>Pro tip: Include business type, colors, features, and style preferences</span>
                  </div>
                  
                  
                  <div className="space-y-3">
                    <label className="text-sm text-gray-300 font-medium">Generation Mode:</label>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center space-x-2 text-sm text-gray-300">
                        <input
                          type="radio"
                          name="generationMode"
                          value="single"
                          checked={generationMode === "single"}
                          onChange={(e) => setGenerationMode(e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                        />
                        <span>Single Stage</span>
                        <span className="text-xs text-gray-500">(Fast, simple sites)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-300">
                        <input
                          type="radio"
                          name="generationMode"
                          value="hybrid"
                          checked={generationMode === "hybrid"}
                          onChange={(e) => setGenerationMode(e.target.value)}
                          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 focus:ring-purple-500"
                        />
                        <span>Hybrid Components</span>
                        <span className="text-xs text-gray-500">(Recommended - Fast & efficient)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-300">
                        <input
                          type="radio"
                          name="generationMode"
                          value="multi"
                          checked={generationMode === "multi"}
                          onChange={(e) => setGenerationMode(e.target.value)}
                          className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 focus:ring-green-500"
                        />
                        <span>Multi-Stage</span>
                        <span className="text-xs text-gray-500">(Complex, comprehensive sites)</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generating Magic...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Generate Website
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generation Progress */}
            {isGenerating && (
              <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">AI is working its magic...</h3>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                        Analyzing your requirements with Claude AI...
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                        Stage 1: Foundation & Configuration (deps, config, setup)
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                        Stage 2: UI Components & Design System (reusable components)
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                        Stage 3: Pages & Content (all pages, mock data, navigation)
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Websites Generated</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    1,247
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Success Rate</span>
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                    98.5%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Avg. Generation Time</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    45s
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  Example Prompts
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get inspired by these examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {examplePrompts.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                      {category.category}
                    </h4>
                    <div className="space-y-2">
                      {category.prompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => insertExamplePrompt(prompt)}
                          className="w-full text-left p-3 text-xs bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-lg transition-all duration-200 text-gray-300 hover:text-white"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <Palette className="h-4 w-4 mr-3 text-pink-400" />
                  Smart Color Schemes
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Layout className="h-4 w-4 mr-3 text-blue-400" />
                  Responsive Layouts
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Code className="h-4 w-4 mr-3 text-green-400" />
                  Clean Code Generation
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Globe className="h-4 w-4 mr-3 text-purple-400" />
                  SEO Optimization
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Zap className="h-4 w-4 mr-3 text-yellow-400" />
                  Performance Optimized
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
