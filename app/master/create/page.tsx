'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Globe, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { 
  getCMSTemplates, 
  createCMSInstance,
  type CMSTemplate 
} from '@/lib/master-supabase'

interface FormData {
  name: string
  domain: string
  subdomain: string
  ownerName: string
  ownerEmail: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'free' | 'pro' | 'enterprise'
  templateId: string
  themeId: string
  autoDeploy: boolean
  description: string
  // AI Theme Customization
  enableAICustomization: boolean
  aiCustomizationMessage: string
  targetIndustry: string
  designStyle: string
  primaryColor: string
}

interface DeploymentStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  message?: string
}

export default function CreateWebsite() {
  const router = useRouter()
  const [templates, setTemplates] = useState<CMSTemplate[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    domain: '',
    subdomain: '',
    ownerName: '',
    ownerEmail: '',
    status: 'active',
    plan: 'free',
    templateId: 'default',
    themeId: 'base-theme',
    autoDeploy: true,
    description: '',
    // AI Theme Customization
    enableAICustomization: false,
    aiCustomizationMessage: '',
    targetIndustry: '',
    designStyle: '',
    primaryColor: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([])
  const [error, setError] = useState<string | null>(null)
  const [instanceId, setInstanceId] = useState<string | null>(null)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const templatesData = await getCMSTemplates()
      setTemplates(templatesData)
    } catch (error) {
      console.error('Error loading templates:', error)
      setError('Failed to load templates')
    }
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string | null => {
    // Required fields validation (matching database NOT NULL constraints)
    if (!formData.name.trim()) return 'Website name is required'
    if (!formData.ownerName.trim()) return 'Owner name is required'
    if (!formData.ownerEmail.trim()) return 'Owner email is required'
    if (!formData.templateId) return 'Please select a template'
    
    // AI Customization validation
    if (formData.enableAICustomization) {
      if (!formData.aiCustomizationMessage.trim()) {
        return 'Please describe your vision for AI customization'
      }
      if (formData.aiCustomizationMessage.trim().length < 20) {
        return 'Please provide a more detailed description (at least 20 characters)'
      }
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.ownerEmail)) return 'Please enter a valid email address'
    
    // Domain format validation (if provided)
    if (formData.domain && !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      return 'Please enter a valid domain (e.g., example.com)'
    }
    
    // Subdomain validation (if provided)
    if (formData.subdomain && !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/.test(formData.subdomain)) {
      return 'Subdomain must contain only letters, numbers, and hyphens'
    }
    
    // Status validation (matching database CHECK constraint)
    const validStatuses = ['active', 'inactive', 'suspended']
    if (!validStatuses.includes(formData.status)) {
      return 'Invalid site status selected'
    }
    
    // Plan validation (matching database CHECK constraint)
    const validPlans = ['free', 'pro', 'enterprise']
    if (!validPlans.includes(formData.plan)) {
      return 'Invalid plan selected'
    }
    
    return null
  }

  const initializeDeploymentSteps = () => {
    const steps: DeploymentStep[] = [
      { id: 'create-instance', name: 'Creating CMS instance record', status: 'running' },
      ...(formData.enableAICustomization ? [
        { id: 'ai-customize-theme', name: 'AI customizing theme based on your requirements', status: 'pending' as const }
      ] : []),
      { id: 'setup-database', name: 'Creating site in shared database', status: 'pending' as const },
      { id: 'create-vercel', name: 'Creating Vercel project', status: 'pending' as const },
      { id: 'configure-env', name: 'Configuring environment variables', status: 'pending' as const },
      { id: 'deploy', name: 'Deploying to Vercel', status: 'pending' as const },
      { id: 'finalize', name: 'Finalizing deployment', status: 'pending' as const }
    ]
    setDeploymentSteps(steps)
    return steps
  }

  const updateDeploymentStep = (stepId: string, status: DeploymentStep['status'], message?: string) => {
    setDeploymentSteps(prev => prev.map(step => 
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
    setIsDeploying(true)
    
    const steps = initializeDeploymentSteps()

    try {
      // Call the deployment API which handles all the steps
      updateDeploymentStep('create-instance', 'running')
      
      const response = await fetch('/api/master/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          domain: formData.domain || undefined,
          subdomain: formData.subdomain || undefined,
          owner_name: formData.ownerName,
          owner_email: formData.ownerEmail,
          status: formData.status,
          plan: formData.plan,
          template_id: formData.templateId,
          theme_id: formData.themeId,
          auto_deploy: formData.autoDeploy,
          description: formData.description,
          // AI Customization data
          enable_ai_customization: formData.enableAICustomization,
          ai_customization_message: formData.aiCustomizationMessage,
          target_industry: formData.targetIndustry,
          design_style: formData.designStyle,
          primary_color: formData.primaryColor
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Deployment failed')
      }

      const result = await response.json()
      setInstanceId(result.instanceId)

      // Update all steps to completed for now
      // In a real implementation, you'd poll for progress or use websockets
      updateDeploymentStep('create-instance', 'completed', 'Instance record created')
      updateDeploymentStep('setup-database', 'completed', 'Site created in shared database')
      updateDeploymentStep('create-vercel', 'completed', 'Vercel project created')
      updateDeploymentStep('configure-env', 'completed', 'Environment variables configured')
      updateDeploymentStep('deploy', 'completed', 'Deployed successfully')
      updateDeploymentStep('finalize', 'completed', 'Deployment completed successfully')

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/master')
      }, 2000)

    } catch (error) {
      console.error('Deployment error:', error)
      const currentStep = steps.find(step => step.status === 'running')
      if (currentStep) {
        updateDeploymentStep(currentStep.id, 'error', (error as Error).message)
      }
      setError(`Deployment failed: ${(error as Error).message}`)
    } finally {
      setIsDeploying(false)
    }
  }



  const getStepIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'running': return <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
    }
  }

  if (isDeploying) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="relative mr-3">
                <Zap className="h-6 w-6 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
              </div>
              Deploying Your Website
            </CardTitle>
            <CardDescription className="text-gray-300">
              Setting up your new CMS instance. This may take a few minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deploymentSteps.map((step, index) => (
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
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                <p className="text-red-300">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => {
                    setIsDeploying(false)
                    setError(null)
                    setDeploymentSteps([])
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
                  Create New Website
                </h1>
                <p className="text-gray-400">Deploy a new CMS instance in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-gray-400">
                Set up the basic details for your new website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Website Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="My Awesome Website"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="domain" className="text-gray-300">Custom Domain (Optional)</Label>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) => updateFormData('domain', e.target.value)}
                    placeholder="example.com"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    If not provided, a unique domain will be auto-generated
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="subdomain" className="text-gray-300">Subdomain (Optional)</Label>
                  <Input
                    id="subdomain"
                    value={formData.subdomain}
                    onChange={(e) => updateFormData('subdomain', e.target.value)}
                    placeholder="blog"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For subdomain-based multi-tenancy (e.g., blog.yoursite.com)
                  </p>
                </div>
                <div>
                  <Label htmlFor="plan" className="text-gray-300">Plan</Label>
                  <Select value={formData.plan} onValueChange={(value) => updateFormData('plan', value as 'free' | 'pro' | 'enterprise')}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="free" className="focus:bg-gray-800">
                        <div className="flex items-center space-x-2">
                          <span>Free</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Basic</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="pro" className="focus:bg-gray-800">
                        <div className="flex items-center space-x-2">
                          <span>Pro</span>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Advanced</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="enterprise" className="focus:bg-gray-800">
                        <div className="flex items-center space-x-2">
                          <span>Enterprise</span>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Full</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-gray-300">Site Status</Label>
                <Select value={formData.status} onValueChange={(value) => updateFormData('status', value as 'active' | 'inactive' | 'suspended')}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select site status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="active" className="focus:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <span>Active</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive" className="focus:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <span>Inactive</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Paused</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="suspended" className="focus:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <span>Suspended</span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Blocked</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Site status controls accessibility and functionality
                </p>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Brief description of your website..."
                  rows={3}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Owner Information</CardTitle>
              <CardDescription className="text-gray-400">
                Details about the website owner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ownerName" className="text-gray-300">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => updateFormData('ownerName', e.target.value)}
                    placeholder="John Doe"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerEmail" className="text-gray-300">Owner Email *</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => updateFormData('ownerEmail', e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Theme Customization */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="relative mr-3">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"></div>
                </div>
                AI Theme Customization
                <Badge className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Beta</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Let AI customize your theme colors, layout, and content based on your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableAICustomization"
                  checked={formData.enableAICustomization}
                  onCheckedChange={(checked) => updateFormData('enableAICustomization', checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor="enableAICustomization" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Enable AI theme customization
                </Label>
              </div>

              {formData.enableAICustomization && (
                <div className="space-y-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <div>
                    <Label htmlFor="aiMessage" className="text-gray-300">
                      Describe your vision <span className="text-purple-400">*</span>
                    </Label>
                    <Textarea
                      id="aiMessage"
                      value={formData.aiCustomizationMessage}
                      onChange={(e) => updateFormData('aiCustomizationMessage', e.target.value)}
                      placeholder="I want a modern, professional website for my tech startup. Use blue and white colors with a clean, minimalist design. The site should feel trustworthy and innovative..."
                      rows={4}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                      required={formData.enableAICustomization}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Describe your business, preferred colors, style, and any specific requirements
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="targetIndustry" className="text-gray-300">Industry/Business Type</Label>
                      <Select value={formData.targetIndustry} onValueChange={(value) => updateFormData('targetIndustry', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="technology" className="focus:bg-gray-800">Technology</SelectItem>
                          <SelectItem value="healthcare" className="focus:bg-gray-800">Healthcare</SelectItem>
                          <SelectItem value="finance" className="focus:bg-gray-800">Finance</SelectItem>
                          <SelectItem value="education" className="focus:bg-gray-800">Education</SelectItem>
                          <SelectItem value="restaurant" className="focus:bg-gray-800">Restaurant/Food</SelectItem>
                          <SelectItem value="agency" className="focus:bg-gray-800">Creative Agency</SelectItem>
                          <SelectItem value="ecommerce" className="focus:bg-gray-800">E-commerce</SelectItem>
                          <SelectItem value="professional" className="focus:bg-gray-800">Professional Services</SelectItem>
                          <SelectItem value="nonprofit" className="focus:bg-gray-800">Non-profit</SelectItem>
                          <SelectItem value="other" className="focus:bg-gray-800">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="designStyle" className="text-gray-300">Design Style</Label>
                      <Select value={formData.designStyle} onValueChange={(value) => updateFormData('designStyle', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select design style" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="minimal" className="focus:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <span>Minimal</span>
                              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Clean</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="modern" className="focus:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <span>Modern</span>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Trendy</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="professional" className="focus:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <span>Professional</span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Business</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="creative" className="focus:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <span>Creative</span>
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Artistic</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="tech" className="focus:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <span>Tech</span>
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Dark</Badge>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="primaryColor" className="text-gray-300">Preferred Primary Color (Optional)</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData('primaryColor', e.target.value)}
                        className="w-12 h-10 bg-gray-800/50 border-gray-700 rounded cursor-pointer"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData('primaryColor', e.target.value)}
                        placeholder="#3B82F6"
                        className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to let AI choose the best color for your industry
                    </p>
                  </div>

                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-300 mb-1">How it works:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• AI analyzes your requirements and industry</li>
                      <li>• Generates a custom color palette and design</li>
                      <li>• Modifies components, layouts, and content</li>
                      <li>• Creates a unique theme just for your business</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Template & Theme</CardTitle>
              <CardDescription className="text-gray-400">
                Choose a template and theme for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="template" className="text-gray-300">Template *</Label>
                  <Select value={formData.templateId} onValueChange={(value) => updateFormData('templateId', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id} className="focus:bg-gray-800">
                          <div className="flex items-center space-x-2">
                            <span>{template.name}</span>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{template.category}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme" className="text-gray-300">Theme</Label>
                  <Select value={formData.themeId} onValueChange={(value) => updateFormData('themeId', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="base-theme" className="focus:bg-gray-800">Base Theme</SelectItem>
                      <SelectItem value="default" className="focus:bg-gray-800">Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Template Preview */}
              {formData.templateId && (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <h4 className="font-medium text-gray-200 mb-2">Template Preview</h4>
                  {(() => {
                    const selectedTemplate = templates.find(t => t.id === formData.templateId)
                    return selectedTemplate ? (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">{selectedTemplate.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{selectedTemplate.category}</Badge>
                          <span className="text-xs text-gray-500">
                            Repository: {selectedTemplate.git_repo}
                          </span>
                        </div>
                      </div>
                    ) : null
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deployment Settings */}
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Deployment Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure how your website will be deployed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoDeploy"
                  checked={formData.autoDeploy}
                  onCheckedChange={(checked) => updateFormData('autoDeploy', checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="autoDeploy" className="text-sm font-medium text-gray-300">
                  Enable automatic deployments on changes
                </Label>
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
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-blue-500/25"
              disabled={isLoading || isDeploying}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Deploy Website
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 