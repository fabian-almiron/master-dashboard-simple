'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Globe, ExternalLink, Trash2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useSafeUser } from '@/components/clerk-wrapper'
import { 
  type CMSInstance 
} from '@/lib/master-supabase'

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic'

export default function AllInstancesPage() {
  const { user, isLoaded } = useSafeUser()
  const [instances, setInstances] = useState<CMSInstance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded) {
      loadInstances()
    }
  }, [isLoaded])

  const loadInstances = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch instances via API endpoint
      const response = await fetch('/api/master/instances?limit=100')
      if (!response.ok) {
        throw new Error('Failed to fetch instances')
      }
      
      const result = await response.json()
      if (result.success) {
        setInstances(result.data)
      } else {
        throw new Error('API returned error response')
      }
    } catch (error) {
      console.error('Error loading instances:', error)
      setError('Failed to load CMS instances')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: CMSInstance['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'creating': return 'bg-yellow-500'
      case 'inactive': return 'bg-gray-500'
      case 'failed': return 'bg-red-500'
      case 'deleting': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: CMSInstance['status']) => {
    switch (status) {
      case 'active': return 'Active'
      case 'creating': return 'Creating'
      case 'inactive': return 'Inactive'
      case 'failed': return 'Failed'
      case 'deleting': return 'Deleting'
      default: return 'Unknown'
    }
  }

  const handleDelete = async (instance: CMSInstance) => {
    const confirmed = window.confirm(
      `Are you sure you want to COMPLETELY DELETE "${instance.name}"?\n\nThis will:\n• Delete the Bitbucket repository\n• Delete the Vercel project\n• Remove the CMS instance record\n• Delete ALL associated data\n\nThis action cannot be undone!`
    )
    
    if (!confirmed) return

    try {
      setDeletingId(instance.id)
      
      const response = await fetch('/api/master/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instanceId: instance.id
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Deletion failed')
      }

      // Show deletion results
      const { results, message } = result
      let alertMessage = `${message}\n\n`
      
      if (results.masterDatabase) alertMessage += '✅ Master database record deleted\n'
      if (results.sharedDatabase) alertMessage += '✅ Website data deleted from shared database\n'
      if (results.bitbucketRepo) alertMessage += '✅ Bitbucket repository deleted\n'
      if (results.vercelProject) alertMessage += '✅ Vercel project deleted\n'
      
      if (results.errors && results.errors.length > 0) {
        alertMessage += '\n⚠️ Some errors occurred:\n' + results.errors.join('\n')
      }

      alert(alertMessage)
      
      // Remove from local state and reload
      setInstances(prev => prev.filter(i => i.id !== instance.id))
      
    } catch (error) {
      console.error('Failed to delete instance:', error)
      alert(`Failed to delete instance: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDeletingId(null)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 bg-blue-400/20 blur-md animate-pulse mx-auto"></div>
          </div>
          <p className="text-gray-300">Loading all instances...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-red-400">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">{error}</p>
            <Button onClick={loadInstances} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/master">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  All CMS Instances
                </h1>
                <p className="text-gray-400">
                  Manage all {instances.length} CMS instances
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={loadInstances}
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link href="/master/create">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                  Create New Instance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Instances List */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {instances.length === 0 ? (
          <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50">
            <CardContent className="py-16 text-center">
              <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No CMS instances yet</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Create your first CMS instance to get started with the master dashboard.
              </p>
              <Link href="/master/create">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                  Create Your First Instance
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {instances.map((instance) => (
              <Card
                key={instance.id}
                className="bg-gray-900/40 backdrop-blur-xl border-gray-800/50 hover:bg-gray-800/50 transition-all duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(instance.status)} mr-3`}></div>
                      {instance.name}
                    </CardTitle>
                    <Badge className="bg-gray-700/50 text-gray-300 border-gray-600">
                      {getStatusText(instance.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {instance.owner_email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {instance.domain && (
                      <div className="flex items-center text-sm text-gray-400">
                        <Globe className="h-4 w-4 mr-2" />
                        {instance.domain}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-500">
                      Created: {new Date(instance.created_at).toLocaleDateString()}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {instance.vercel_deployment_url && (
                        <Button 
                          size="sm"
                          onClick={() => window.open(instance.vercel_deployment_url, '_blank')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(instance)}
                        disabled={deletingId === instance.id}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400"
                      >
                        {deletingId === instance.id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-red-400 border-t-transparent mr-1" />
                        ) : (
                          <Trash2 className="h-3 w-3 mr-1" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
