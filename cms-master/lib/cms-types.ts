// Component system types
export interface ComponentInfo {
  type: string
  name: string
  description: string
  category: 'content-blocks' | 'layout' | 'ui-primitives' | 'page-templates'
  icon: string
}

// Theme system types
export interface ThemeInfo {
  name: string
  description: string
  author: string
  version: string
  components: ComponentInfo[]
}

// CMS-specific types
export interface CMSPage {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  blocks: CMSBlock[]
  template?: CMSTemplate
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface CMSBlock {
  id: string
  type: string
  props: Record<string, any>
  order: number
  isVisible: boolean
}

export interface CMSTemplate {
  id: string
  name: string
  type: 'header' | 'footer' | 'page'
  blocks: CMSBlock[]
  theme_id: string
  is_default: boolean
}

export interface CMSSite {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive' | 'suspended'
  theme_id: string
  settings: Record<string, any>
}

// Form types for CMS operations
export interface CreatePageData {
  title: string
  slug: string
  status: 'draft' | 'published'
  meta_title?: string
  meta_description?: string
  theme_id: string
  header_template_id?: string
  footer_template_id?: string
  page_template_id?: string
}

export interface UpdatePageData extends Partial<CreatePageData> {
  id: string
}

export interface CreateTemplateData {
  name: string
  type: 'header' | 'footer' | 'page'
  theme_id: string
  is_default: boolean
}

export interface UpdateTemplateData extends Partial<CreateTemplateData> {
  id: string
}

export interface CreateNavigationData {
  label: string
  type: 'internal' | 'external'
  href?: string
  page_id?: string
  order_index: number
  is_visible: boolean
}

export interface UpdateNavigationData extends Partial<CreateNavigationData> {
  id: string
}

// Drag and drop types
export interface DraggedComponent {
  type: string
  data?: Record<string, any>
}

export interface DropResult {
  draggableId: string
  type: string
  source: {
    droppableId: string
    index: number
  }
  destination?: {
    droppableId: string
    index: number
  }
}
