import { useState, useEffect } from 'react'
import { getNavigationItems, getCurrentSite } from '@/lib/cms-data'
import { NavigationItem } from '@/lib/supabase'

export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const site = await getCurrentSite()
        if (!site) {
          setError('No active site found')
          return
        }

        const items = await getNavigationItems(site.id)
        setNavigation(items)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load navigation')
        console.error('Error loading navigation:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadNavigation()
  }, [])

  const refreshNavigation = async () => {
    try {
      const site = await getCurrentSite()
      if (site) {
        const items = await getNavigationItems(site.id)
        setNavigation(items)
      }
    } catch (err) {
      console.error('Error refreshing navigation:', err)
    }
  }

  return {
    navigation,
    isLoading,
    error,
    refreshNavigation,
  }
}
