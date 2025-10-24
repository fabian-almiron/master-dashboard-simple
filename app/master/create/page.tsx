'use client'

// Force dynamic rendering - don't pre-render during build (requires auth)
export const dynamic = 'force-dynamic'

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

interface FormData {
  name: string
  domain: string
  subdomain: string
  ownerName: string
  ownerEmail: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'free' | 'pro' | 'enterprise'
  autoDeploy: boolean
  description: string
}

interface DeploymentStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  message?: string
}

export default function CreateWebsite() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    domain: '',
    subdomain: '',
    ownerName: '',
    ownerEmail: '',
    status: 'active',
    plan: 'free',
    autoDeploy: true,
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([])
  const [error, setError] = useState<string | null>(null)
  const [instanceId, setInstanceId] = useState<string | null>(null)

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string | null => {
    // Required fields validation
    if (!formData.name.trim()) return 'Website name is required'
    if (!formData.ownerName.trim()) return 'Owner name is required'
    if (!formData.ownerEmail.trim()) return 'Owner email is required'
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.ownerEmail)) return 'Please enter a valid email address'
    
    // Domain format validation (if provided) - simplified and more reliable
    if (formData.domain && !/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.([a-zA-Z]{2,})$/.test(formData.domain)) {
      return 'Please enter a valid domain (e.g., example.com)'
    }
    
    // Subdomain validation (if provided)
    if (formData.subdomain && !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/.test(formData.subdomain)) {
      return 'Subdomain must contain only letters, numbers, and hyphens'
    }
    
    // Status validation
    const validStatuses = ['active', 'inactive', 'suspended']
    if (!validStatuses.includes(formData.status)) {
      return 'Invalid site status selected'
    }
    
    // Plan validation
    const validPlans = ['free', 'pro', 'enterprise']
    if (!validPlans.includes(formData.plan)) {
      return 'Invalid plan selected'
    }
    
    return null
  }

  const initializeDeploymentSteps = () => {
    const steps: DeploymentStep[] = [
      { id: 'create-instance', name: 'Creating website instance', status: 'running' },
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
          auto_deploy: formData.autoDeploy,
          description: formData.description
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
                Setting up your new static website. This may take a few minutes.
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
        <div className="px-4 sm:px-6 lg:px-8">
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
                <p className="text-gray-400">Deploy a new static website in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
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