import { ComponentInfo } from '@/lib/cms-types'

// UI Components (blocks for drag-and-drop building)
import Hero from './ui/Hero'
import Features from './ui/Features'
import Testimonials from './ui/Testimonials'
import Pricing from './ui/Pricing'
import Blog from './ui/Blog'
import CTA from './ui/CTA'
import Header from './ui/Header'
import Footer from './ui/Footer'
import DNDArea from './ui/DNDArea'

// Shared UI Components (from shadcn/ui)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

// Theme Configuration
export const themeName = 'Modern'
export const themeDescription = 'Sleek, contemporary design with bold styling and enhanced visuals'
export const themeAuthor = 'Page Builder CMS'
export const themeVersion = '1.0.0'

// Component registry for this theme
export const componentRegistry = {
  // UI Blocks (for page building)
  Hero,
  Features,
  Testimonials,
  Pricing,
  Blog,
  CTA,
  
  // Layout Components
  Header,
  Footer,
  DNDArea,
  
  // UI Primitives
  Button,
  Card,
  Badge,
  Separator,
  Progress,
} as const

// Component metadata for the page builder
export const componentInfo: ComponentInfo[] = [
  // Content Blocks
  {
    type: 'Hero',
    name: 'Hero Section',
    description: 'Main landing section with headline, CTA buttons, and hero image',
    category: 'content-blocks',
    icon: 'Zap',
  },
  {
    type: 'Features',
    name: 'Features',
    description: 'Showcase key product features with icons and descriptions',
    category: 'content-blocks',
    icon: 'Star',
  },
  {
    type: 'Testimonials',
    name: 'Testimonials',
    description: 'Customer reviews and social proof',
    category: 'content-blocks',
    icon: 'MessageSquare',
  },
  {
    type: 'Pricing',
    name: 'Pricing',
    description: 'Pricing plans and subscription tiers',
    category: 'content-blocks',
    icon: 'DollarSign',
  },
  {
    type: 'Blog',
    name: 'Blog',
    description: 'Blog posts grid with featured articles',
    category: 'content-blocks',
    icon: 'FileText',
  },
  {
    type: 'CTA',
    name: 'Call to Action',
    description: 'Compelling call-to-action section with button',
    category: 'content-blocks',
    icon: 'ArrowRight',
  },
  
  // Layout Components
  {
    type: 'Header',
    name: 'Header',
    description: 'Site navigation and branding header',
    category: 'layout',
    icon: 'Grip',
  },
  {
    type: 'Footer',
    name: 'Footer',
    description: 'Site footer with links and information',
    category: 'layout',
    icon: 'Grip',
  },
  {
    type: 'DNDArea',
    name: 'Dynamic Content Area',
    description: 'Placeholder for dynamic page content in templates',
    category: 'layout',
    icon: 'Grip',
  },
  
  // UI Primitives
  {
    type: 'Button',
    name: 'Button',
    description: 'Interactive button component',
    category: 'ui-primitives',
    icon: 'Grip',
  },
  {
    type: 'Card',
    name: 'Card',
    description: 'Content card container',
    category: 'ui-primitives',
    icon: 'Grip',
  },
  {
    type: 'Badge',
    name: 'Badge',
    description: 'Small status or label badge',
    category: 'ui-primitives',
    icon: 'Grip',
  },
  {
    type: 'Separator',
    name: 'Separator',
    description: 'Visual separator line',
    category: 'ui-primitives',
    icon: 'Grip',
  },
  {
    type: 'Progress',
    name: 'Progress',
    description: 'Progress bar indicator',
    category: 'ui-primitives',
    icon: 'Grip',
  },
]

// Helper functions for theme management
export const getComponent = (type: string) => {
  return componentRegistry[type as keyof typeof componentRegistry]
}

export const renderComponent = (type: string, props: Record<string, any> = {}) => {
  const Component = getComponent(type)
  if (!Component) {
    console.warn(`Component "${type}" not found in theme registry`)
    return null
  }
  
  return <Component {...props} />
}

export const getComponentInfo = (type: string) => {
  return componentInfo.find(info => info.type === type)
}

export const getAllComponents = () => {
  return componentInfo
}

export const getComponentsByCategory = (category: string) => {
  return componentInfo.filter(info => info.category === category)
} 