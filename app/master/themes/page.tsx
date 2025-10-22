'use client'

// Force dynamic rendering - don't pre-render during build (requires auth)
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Sparkles, Palette, Wand2, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ThemeGenerationForm {
  websiteName: string
  description: string
  industry: string
  colorScheme: string
  style: string
  mood: string
  prompt: string
  claudeApiKey: string
}

interface GenerationStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  message?: string
}

export default function CreateTheme() {
  const router = useRouter()
  const [formData, setFormData] = useState<ThemeGenerationForm>({
    websiteName: '',
    description: '',
    industry: 'business',
    colorScheme: 'professional',
    style: 'modern',
    mood: 'professional',
    prompt: '',
    claudeApiKey: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([])
  const [error, setError] = useState<string | null>(null)
  const [themeName, setThemeName] = useState<string>('')

  const industries = [
    { value: 'business', label: 'Business & Corporate' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'restaurant', label: 'Restaurant & Food' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'creative', label: 'Creative & Portfolio' },
    { value: 'nonprofit', label: 'Non-profit & Charity' },
    { value: 'technology', label: 'Technology & Startup' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'entertainment', label: 'Entertainment & Media' }
  ]

  const colorSchemes = [
    { value: 'professional', label: 'Professional (Blue, Gray, White)' },
    { value: 'vibrant', label: 'Vibrant (Bright colors, energetic)' },
    { value: 'minimal', label: 'Minimal (Black, White, Gray)' },
    { value: 'warm', label: 'Warm (Oranges, Reds, Browns)' },
    { value: 'cool', label: 'Cool (Blues, Greens, Purples)' },
    { value: 'nature', label: 'Nature (Greens, Earth tones)' },
    { value: 'luxury', label: 'Luxury (Gold, Black, Deep blues)' },
    { value: 'playful', label: 'Playful (Bright, Fun colors)' }
  ]

  const styles = [
    { value: 'modern', label: 'Modern & Clean' },
    { value: 'classic', label: 'Classic & Traditional' },
    { value: 'bold', label: 'Bold & Dramatic' },
    { value: 'minimalist', label: 'Minimalist & Simple' },
    { value: 'industrial', label: 'Industrial & Raw' },
    { value: 'organic', label: 'Organic & Natural' },
    { value: 'geometric', label: 'Geometric & Structured' },
    { value: 'handwritten', label: 'Handwritten & Personal' }
  ]

  const moods = [
    { value: 'professional', label: 'Professional & Trustworthy' },
    { value: 'friendly', label: 'Friendly & Approachable' },
    { value: 'energetic', label: 'Energetic & Dynamic' },
    { value: 'calm', label: 'Calm & Peaceful' },
    { value: 'elegant', label: 'Elegant & Sophisticated' },
    { value: 'creative', label: 'Creative & Innovative' },
    { value: 'adventurous', label: 'Adventurous & Bold' },
    { value: 'minimal', label: 'Minimal & Focused' }
  ]

  const updateFormData = (field: keyof ThemeGenerationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string | null => {
    if (!formData.claudeApiKey.trim()) return 'Claude API key is required'
    if (!formData.claudeApiKey.startsWith('sk-ant-api03-')) return 'Please enter a valid Claude API key'
    if (!formData.websiteName.trim()) return 'Website name is required'
    if (!formData.description.trim()) return 'Description is required'
    if (formData.websiteName.length < 3) return 'Website name must be at least 3 characters'
    if (formData.description.length < 10) return 'Description must be at least 10 characters'
    return null
  }

  const initializeGenerationSteps = () => {
    const steps: GenerationStep[] = [
      { id: 'analyze', name: 'Analyzing requirements', status: 'running' },
      { id: 'design', name: 'Designing color scheme and layout', status: 'pending' },
      { id: 'structure', name: 'Creating theme structure', status: 'pending' },
      { id: 'components', name: 'Generating components', status: 'pending' },
      { id: 'styles', name: 'Creating styles and configuration', status: 'pending' },
      { id: 'register', name: 'Setting up component registry', status: 'pending' },
      { id: 'finalize', name: 'Finalizing theme', status: 'pending' }
    ]
    setGenerationSteps(steps)
    return steps
  }

  const updateGenerationStep = (stepId: string, status: GenerationStep['status'], message?: string) => {
    setGenerationSteps(prev => prev.map(step =>
      step.id === stepId
        ? { ...step, status, message }
        : step
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsGenerating(true)

    const steps = initializeGenerationSteps()

    try {
      // Generate theme name from website name (lowercase, kebab-case)
      const generatedThemeName = formData.websiteName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      setThemeName(generatedThemeName)

      updateGenerationStep('analyze', 'completed', 'Requirements analyzed successfully')
      updateGenerationStep('design', 'running')

      // Call theme generation API
      const response = await fetch('/api/master/generate-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteName: formData.websiteName,
          themeName: generatedThemeName,
          description: formData.description,
          industry: formData.industry,
          colorScheme: formData.colorScheme,
          style: formData.style,
          mood: formData.mood,
          prompt: formData.prompt,
          claudeApiKey: formData.claudeApiKey
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Theme generation failed')
      }

      const result = await response.json()

      // Update all steps to completed
      updateGenerationStep('design', 'completed', 'Design completed')
      updateGenerationStep('structure', 'completed', 'Theme structure created')
      updateGenerationStep('components', 'completed', 'All components generated')
      updateGenerationStep('styles', 'completed', 'Styles and configuration created')
      updateGenerationStep('register', 'completed', 'Component registry set up')
      updateGenerationStep('finalize', 'completed', 'Theme generation completed successfully')

      // Redirect to success page or dashboard after 3 seconds
      setTimeout(() => {
        router.push('/master')
      }, 3000)

    } catch (error) {
      console.error('Theme generation error:', error)
      const currentStep = steps.find(step => step.status === 'running')
      if (currentStep) {
        updateGenerationStep(currentStep.id, 'error', (error as Error).message)
      }
      setError(`Theme generation failed: ${(error as Error).message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const getStepIcon = (status: GenerationStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'running': return <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
    }
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="relative mr-3">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
              </div>
              Generating Theme for "{formData.websiteName}"
            </CardTitle>
            <CardDescription className="text-gray-300">
              AI is creating your custom theme with {generationSteps.filter(s => s.status === 'completed').length} of {generationSteps.length} steps completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                {getStepIcon(step.status)}
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{step.name}</p>
                  {step.message && (
                    <p className="text-sm text-gray-400">{step.message}</p>
                  )}
                </div>
                {step.status === 'completed' && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Done
                  </Badge>
                )}
                {step.status === 'error' && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Error
                  </Badge>
                )}
              </div>
            ))}

            {themeName && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                <p className="text-blue-300 font-medium">Theme Name: {themeName}</p>
                <p className="text-blue-400/80 text-sm mt-1">
                  Your theme will be saved as: /cms-master/themes/{themeName}/
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                <p className="text-red-300">{error}</p>
                <Button
                  variant="outline"
                  className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => {
                    setIsGenerating(false)
                    setError(null)
                    setGenerationSteps([])
                  }}
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link href="/master">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Theme Generator
                </h1>
                <p className="text-gray-400">Create beautiful, custom themes with artificial intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Theme Details */}
          {/* Claude API Key */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                Claude AI Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure your Claude API key for AI-powered theme generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="claudeApiKey" className="text-gray-300">Claude API Key *</Label>
                <Input
                  id="claudeApiKey"
                  type="password"
                  value={formData.claudeApiKey}
                  onChange={(e) => updateFormData('claudeApiKey', e.target.value)}
                  placeholder="sk-ant-api03-..."
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Anthropic Console</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-purple-400" />
                Theme Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Provide information about your website to generate the perfect theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="websiteName" className="text-gray-300">Website Name *</Label>
                  <Input
                    id="websiteName"
                    value={formData.websiteName}
                    onChange={(e) => updateFormData('websiteName', e.target.value)}
                    placeholder="My Awesome Website"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will become your theme name (e.g., "My Awesome Website" → "my-awesome-website")
                  </p>
                </div>
                <div>
                  <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value} className="focus:bg-gray-800">
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Website Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe your website, its purpose, and what you want to achieve..."
                  rows={4}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The more detail you provide, the better your theme will match your vision
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Design Preferences */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="h-5 w-5 mr-2 text-green-400" />
                Design Preferences
              </CardTitle>
              <CardDescription className="text-gray-400">
                Customize the visual style and mood of your theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="colorScheme" className="text-gray-300">Color Scheme</Label>
                  <Select value={formData.colorScheme} onValueChange={(value) => updateFormData('colorScheme', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Choose color scheme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme.value} value={scheme.value} className="focus:bg-gray-800">
                          {scheme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="style" className="text-gray-300">Visual Style</Label>
                  <Select value={formData.style} onValueChange={(value) => updateFormData('style', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Choose visual style" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {styles.map((style) => (
                        <SelectItem key={style.value} value={style.value} className="focus:bg-gray-800">
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mood" className="text-gray-300">Mood & Tone</Label>
                <Select value={formData.mood} onValueChange={(value) => updateFormData('mood', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Choose mood and tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {moods.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value} className="focus:bg-gray-800">
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prompt" className="text-gray-300">AI Prompt (Optional)</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => updateFormData('prompt', e.target.value)}
                  placeholder="Give specific instructions to the AI about your theme preferences. For example: 'Make it very colorful and playful', 'Use a dark theme with neon accents', 'Focus on nature-inspired colors', etc."
                  rows={4}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Provide specific instructions to customize your theme generation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/master">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Theme...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Theme
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
