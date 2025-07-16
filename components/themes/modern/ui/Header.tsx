'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

// Navigation item type
interface NavigationItem {
  id: string
  label: string
  type: 'internal' | 'external' | 'dropdown'
  href?: string
  pageId?: string
  order: number
  isVisible: boolean
  children?: NavigationItem[]
}

// localStorage utilities
const STORAGE_KEY = 'cms_navigation'
const PAGES_STORAGE_KEY = 'cms_pages'

function loadNavigationFromStorage(): NavigationItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading navigation from localStorage:', error)
    return []
  }
}

function loadPagesFromStorage() {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(PAGES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading pages from localStorage:', error)
    return []
  }
}

export default function Header() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadedNavigation = loadNavigationFromStorage()
    const loadedPages = loadPagesFromStorage()
    setNavigation(loadedNavigation)
    setPages(loadedPages)
    setIsLoaded(true)
  }, [])

  const getNavigationHref = (item: NavigationItem): string => {
    if (item.type === 'external') {
      return item.href || '#'
    } else if (item.type === 'internal') {
      if (item.pageId === 'home' || !item.pageId) {
        return '/'
      }
      const page = pages.find(p => p.id === item.pageId)
      return page ? `/${page.slug}` : '/'
    }
    return '/'
  }

  // Get visible navigation items sorted by order
  const visibleNavigation = navigation
    .filter(item => item.isVisible)
    .sort((a, b) => a.order - b.order)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-5 mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">StreamLinessss</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {isLoaded ? (
            visibleNavigation.map((item) => (
              <Link 
                key={item.id}
                href={getNavigationHref(item)} 
                className="text-sm font-medium hover:text-primary"
              >
                {item.label}
              </Link>
            ))
          ) : (
            // Fallback navigation while loading
            <>
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="#features" className="text-sm font-medium hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
              <Link href="#blog" className="text-sm font-medium hover:text-primary">
                Blog
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block">
            Admin
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block">
            Sign In
          </Link>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
} 