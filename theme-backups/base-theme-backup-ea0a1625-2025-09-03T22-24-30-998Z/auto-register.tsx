import React from 'react'
import type { ComponentInfo } from '@/lib/cms-types'

import './styles.css'

import Blog, { metadata as BlogMetadata } from './ui/Blog'
import CTA, { metadata as CTAMetadata } from './ui/CTA'
import DNDArea, { metadata as DNDAreaMetadata } from './ui/DNDArea'
import Features, { metadata as FeaturesMetadata } from './ui/Features'
import Footer, { metadata as FooterMetadata } from './ui/Footer'
import Header, { metadata as HeaderMetadata } from './ui/Header'
import Hero, { metadata as HeroMetadata } from './ui/Hero'
import Pricing, { metadata as PricingMetadata } from './ui/Pricing'
import Testimonials, { metadata as TestimonialsMetadata } from './ui/Testimonials'

export const themeName = 'TestTech Theme'
export const themeDescription = 'A clean and minimal tech theme with a modern blue color scheme. Perfect for technology companies and startups.'
export const themeAuthor = 'CMS TailWinds'
export const themeVersion = '1.0.0'

export const componentRegistry = {
  [BlogMetadata.type]: Blog,
  [CTAMetadata.type]: CTA, 
  [DNDAreaMetadata.type]: DNDArea,
  [FeaturesMetadata.type]: Features,
  [FooterMetadata.type]: Footer,
  [HeaderMetadata.type]: Header,
  [HeroMetadata.type]: Hero,
  [PricingMetadata.type]: Pricing,
  [TestimonialsMetadata.type]: Testimonials,
} as const

export const componentInfo: ComponentInfo[] = [
  BlogMetadata,
  CTAMetadata,
  DNDAreaMetadata, 
  FeaturesMetadata,
  FooterMetadata,
  HeaderMetadata,
  HeroMetadata,
  PricingMetadata,
  TestimonialsMetadata,
]

export const getComponent = (type: string) => componentRegistry[type as keyof typeof componentRegistry]
export const renderComponent = (type: string, props: Record<string, any> = {}) => {
  const Component = getComponent(type)
  return Component ? <Component {...props} /> : null
}
export const getComponentInfo = (type: string) => componentInfo.find(info => info.type === type)
export const getAllComponents = () => componentInfo
export const getComponentsByCategory = (category: string) => componentInfo.filter(info => info.category === category)