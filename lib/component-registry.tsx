import { ComponentType, ComponentInfo } from './cms-types'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Blog from '@/components/Blog'
import CTA from '@/components/CTA'

// Component registry mapping types to actual React components
export const componentRegistry = {
  Hero,
  Features,
  Testimonials,
  Pricing,
  Blog,
  CTA,
} as const

// Component metadata for the CMS interface
export const componentInfo: ComponentInfo[] = [
  {
    type: 'Hero',
    name: 'Hero Section',
    description: 'Main landing section with headline, CTA buttons, and hero image',
    category: 'content',
    icon: 'Zap',
  },
  {
    type: 'Features',
    name: 'Features',
    description: 'Showcase key product features with icons and descriptions',
    category: 'content',
    icon: 'Star',
  },
  {
    type: 'Testimonials',
    name: 'Testimonials',
    description: 'Customer reviews and social proof',
    category: 'marketing',
    icon: 'MessageSquare',
  },
  {
    type: 'Pricing',
    name: 'Pricing',
    description: 'Pricing plans and subscription tiers',
    category: 'marketing',
    icon: 'DollarSign',
  },
  {
    type: 'Blog',
    name: 'Blog',
    description: 'Latest blog posts and articles',
    category: 'content',
    icon: 'FileText',
  },
  {
    type: 'CTA',
    name: 'Call to Action',
    description: 'Final conversion section with action buttons',
    category: 'marketing',
    icon: 'ArrowRight',
  },
]

// Helper function to get component by type
export function getComponent(type: ComponentType) {
  return componentRegistry[type]
}

// Helper function to render a component
export function renderComponent(type: ComponentType, props: Record<string, any> = {}) {
  const Component = getComponent(type)
  if (!Component) {
    console.warn(`Component type "${type}" not found in registry`)
    return null
  }
  return <Component {...props} />
}

// Helper function to get component info
export function getComponentInfo(type: ComponentType): ComponentInfo | undefined {
  return componentInfo.find(info => info.type === type)
} 