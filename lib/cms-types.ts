export interface PageBlock {
  id: string
  type: ComponentType
  order: number
  props?: Record<string, any>
  isVisible?: boolean
}

export interface Page {
  id: string
  slug: string
  title: string
  description?: string
  blocks: PageBlock[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type ComponentType = 
  | 'Hero'
  | 'Features' 
  | 'Testimonials'
  | 'Pricing'
  | 'Blog'
  | 'CTA'

export interface ComponentInfo {
  type: ComponentType
  name: string
  description: string
  category: 'content' | 'marketing' | 'layout'
  icon: string
  previewImage?: string
}

export interface DraggedComponent {
  type: ComponentType
  isNewComponent: boolean
  sourceId?: string
}

// Database types for Supabase
export interface DbPage {
  id: string
  slug: string
  title: string
  description: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface DbPageBlock {
  id: string
  page_id: string
  component_type: ComponentType
  order_index: number
  props: Record<string, any> | null
  is_visible: boolean
  created_at: string
  updated_at: string
} 