import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

// Debug logging
console.log('🔧 [Supabase] Environment check:', {
  hasUrl: !!supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  hasServiceKey: !!supabaseServiceKey,
  url: supabaseUrl?.substring(0, 20) + '...',
  anonKey: supabaseAnonKey?.substring(0, 20) + '...'
})

// Declare clients
let supabase: any
let supabaseAdmin: any

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ [Supabase] Missing required environment variables:', {
    NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseAnonKey,
    SUPABASE_SERVICE_ROLE_KEY: !!supabaseServiceKey,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV
  })
  
  // Create a mock client for development/missing env vars
  console.warn('⚠️ [Supabase] Creating mock client - environment variables not loaded')
  
  // Mock client that will throw errors when used
  const mockClient = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: 'Mock client - environment variables not loaded' } }) }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: 'Mock client - environment variables not loaded' } }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: 'Mock client - environment variables not loaded' } }) }) }) }),
      delete: () => ({ eq: () => ({ data: null, error: { message: 'Mock client - environment variables not loaded' } }) })
    })
  }

  supabase = mockClient
  supabaseAdmin = mockClient
} else {
    // Client for client-side operations (browser)
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  })

  // Admin client for server-side operations with elevated privileges
  // Note: Service key should only be used server-side
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('✅ [Supabase] Clients initialized successfully')
}

// Export the clients
export { supabase, supabaseAdmin }

// Database types based on your schema
export interface Site {
  id: string
  name: string
  domain: string
  subdomain?: string
  owner_email: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'free' | 'pro' | 'enterprise'
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  site_id: string
  title: string
  slug: string
  content?: string
  status: 'draft' | 'published'
  theme_id: string
  header_template_id?: string
  footer_template_id?: string
  page_template_id?: string
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  site_id: string
  name: string
  type: 'header' | 'footer' | 'page'
  theme_id: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface PageBlock {
  id: string
  site_id: string
  page_id: string
  component_type: string
  order_index: number
  props: Record<string, any>
  is_visible: boolean
  created_at: string
}

export interface TemplateBlock {
  id: string
  site_id: string
  template_id: string
  component_type: string
  order_index: number
  props: Record<string, any>
  is_visible: boolean
  created_at: string
}

export interface NavigationItem {
  id: string
  site_id: string
  label: string
  type: 'internal' | 'external'
  href?: string
  page_id?: string
  order_index: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  site_id: string
  key: string
  value: any
  created_at: string
  updated_at: string
}
