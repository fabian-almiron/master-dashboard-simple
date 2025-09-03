'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCurrentSite } from '@/lib/cms-data'
import { Site } from '@/lib/supabase'
import { ExternalLink, Globe } from 'lucide-react'
import SiteSwitcher from './site-switcher'

export function AdminHeader() {
  const [site, setSite] = useState<Site | null>(null)

  useEffect(() => {
    const loadSite = async () => {
      const currentSite = await getCurrentSite()
      setSite(currentSite)
    }
    loadSite()
  }, [])

  return (
    <header className="flex h-16 items-center justify-between admin-header px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-slate-100">
          {site ? `${site.name} Admin` : 'Loading...'}
        </h1>
        {site && (
          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
            {site.status}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {/* Site Switcher */}
        <SiteSwitcher currentSite={site} />
        
        {site && (
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="text-slate-300 border-slate-600 hover:text-slate-100 hover:bg-slate-700/50 hover:border-slate-500"
          >
            <Link 
              href={`https://${site.domain}`} 
              target="_blank"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              View Site
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="text-slate-300 border-slate-600 hover:text-slate-100 hover:bg-slate-700/50 hover:border-slate-500"
        >
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </header>
  )
}
