import { supabase, supabaseAdmin, Site, Page, Template, PageBlock, TemplateBlock, NavigationItem, SiteSetting } from './supabase'

// Site operations
export async function getCurrentSite(searchParams?: any, headers?: any): Promise<Site | null> {
  try {
    // Import the site switcher utilities
    const { getCurrentSiteWithFallback } = await import('./site-switcher')
    
    // Use the site switcher logic which handles domain, URL and fallback
    return await getCurrentSiteWithFallback(searchParams, headers)
  } catch (error) {
    console.error('Error fetching current site:', error)
    
    // Fallback to original logic if site switcher fails
    try {
      if (typeof window === 'undefined') {
        // Server-side: use direct Supabase query
        const { data, error } = await supabaseAdmin
          .from('sites')
          .select('*')
          .limit(1)
          .single()

        if (error) {
          console.error('Error fetching current site:', error)
          return null
        }

        return data
      } else {
        // Client-side: use API route
        const response = await fetch('/api/sites?action=getCurrentSite')
        const result = await response.json()
        
        if (!response.ok) {
          console.error('Error fetching current site:', result.error)
          return null
        }

        return result.site
      }
    } catch (fallbackError) {
      console.error('Error in fallback getCurrentSite:', fallbackError)
      return null
    }
  }
}

export async function getSiteById(siteId: string): Promise<Site | null> {
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('id', siteId)
    .single()

  if (error) {
    console.error('Error fetching site:', error)
    return null
  }

  return data
}

export async function getAvailableSites(): Promise<Site[]> {
  try {
    const response = await fetch('/api/sites')
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error fetching available sites:', result.error)
      return []
    }

    return result.sites || []
  } catch (error) {
    console.error('Error fetching available sites:', error)
    return []
  }
}

export async function createSite(site: Omit<Site, 'id' | 'created_at' | 'updated_at'>): Promise<Site | null> {
  try {
    const response = await fetch('/api/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createSite',
        data: site
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error creating site:', result.error)
      return null
    }

    return result.site
  } catch (error) {
    console.error('Error creating site:', error)
    return null
  }
}

// Page operations
export async function getPagesBySite(siteId: string): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('site_id', siteId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pages:', error)
    return []
  }

  return data || []
}

export async function getPageById(pageId: string): Promise<Page | null> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use direct Supabase query
      const { data, error } = await supabaseAdmin
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (error) {
        console.error('Error fetching page by id:', error)
        return null
      }

      return data
    } else {
      // Client-side: use API route
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getPageById',
          data: { pageId }
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Error fetching page:', result.error)
        return null
      }

      return result.page
    }
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function getPageBySlug(slug: string, siteId: string): Promise<Page | null> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use direct Supabase query
      const { data, error } = await supabaseAdmin
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('site_id', siteId)
        .single()

      if (error) {
        console.error('Error fetching page by slug:', error)
        return null
      }

      return data
    } else {
      // Client-side: use API route
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getPageBySlug',
          data: { slug, siteId }
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Error fetching page by slug:', result.error)
        return null
      }

      return result.page
    }
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

export async function createPage(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>): Promise<Page | null> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createPage',
        data: page
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error creating page:', result.error)
      return null
    }

    return result.page
  } catch (error) {
    console.error('Error creating page:', error)
    return null
  }
}

export async function updatePage(pageId: string, updates: Partial<Page>): Promise<Page | null> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updatePage',
        data: { pageId, ...updates }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error updating page:', result.error)
      return null
    }

    return result.page
  } catch (error) {
    console.error('Error updating page:', error)
    return null
  }
}

export async function deletePage(pageId: string): Promise<boolean> {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', pageId)

  if (error) {
    console.error('Error deleting page:', error)
    return false
  }

  return true
}

// Template operations
export async function getTemplatesBySite(siteId: string, type?: string): Promise<Template[]> {
  let query = supabase
    .from('templates')
    .select('*')
    .eq('site_id', siteId)

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching templates:', error)
    return []
  }

  return data || []
}

export async function getTemplateById(templateId: string): Promise<Template | null> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .single()

  if (error) {
    console.error('Error fetching template:', error)
    return null
  }

  return data
}

export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at'>): Promise<Template | null> {
  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createTemplate',
        data: template
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error creating template:', result.error)
      return null
    }

    return result.template
  } catch (error) {
    console.error('Error creating template:', error)
    return null
  }
}

export async function updateTemplate(templateId: string, updates: Partial<Template>): Promise<Template | null> {
  const { data, error } = await supabase
    .from('templates')
    .update(updates)
    .eq('id', templateId)
    .select()
    .single()

  if (error) {
    console.error('Error updating template:', error)
    return null
  }

  return data
}

export async function deleteTemplate(templateId: string): Promise<boolean> {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', templateId)

  if (error) {
    console.error('Error deleting template:', error)
    return false
  }

  return true
}

// Page blocks operations
export async function getPageBlocks(pageId: string): Promise<PageBlock[]> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use direct Supabase query
      const { data, error } = await supabaseAdmin
        .from('page_blocks')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching page blocks:', error)
        return []
      }

      return data || []
    } else {
      // Client-side: use API route
      const response = await fetch(`/api/pages?action=getPageBlocks&pageId=${pageId}`)
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Error fetching page blocks:', result.error)
        return []
      }

      return result.blocks || []
    }
  } catch (error) {
    console.error('Error fetching page blocks:', error)
    return []
  }
}

export async function createPageBlock(block: Omit<PageBlock, 'id' | 'created_at'>): Promise<PageBlock | null> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createPageBlock',
        data: block
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error creating page block:', result.error)
      return null
    }

    return result.block
  } catch (error) {
    console.error('Error creating page block:', error)
    return null
  }
}

export async function updatePageBlock(blockId: string, updates: Partial<PageBlock>): Promise<PageBlock | null> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updatePageBlock',
        data: { id: blockId, ...updates }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error updating page block:', result.error)
      return null
    }

    return result.block
  } catch (error) {
    console.error('Error updating page block:', error)
    return null
  }
}

export async function deletePageBlock(blockId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deletePageBlock',
        data: { id: blockId }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error deleting page block:', result.error)
      return false
    }

    return result.success
  } catch (error) {
    console.error('Error deleting page block:', error)
    return false
  }
}

export async function reorderPageBlocks(pageId: string, blockOrders: { id: string; order_index: number }[]): Promise<boolean> {
  try {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'reorderPageBlocks',
        data: { 
          blocks: blockOrders.map(bo => ({ id: bo.id, order: bo.order_index }))
        }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error reordering page blocks:', result.error)
      return false
    }

    return result.success
  } catch (error) {
    console.error('Error reordering page blocks:', error)
    return false
  }
}

// Template blocks operations
export async function getTemplateBlocks(templateId: string): Promise<TemplateBlock[]> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use direct Supabase query
      const { data, error } = await supabaseAdmin
        .from('template_blocks')
        .select('*')
        .eq('template_id', templateId)
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching template blocks:', error)
        return []
      }

      return data || []
    } else {
      // Client-side: use API route
      const response = await fetch(`/api/templates?templateId=${templateId}`)
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Error fetching template blocks:', result.error)
        return []
      }

      return result.blocks || []
    }
  } catch (error) {
    console.error('Error fetching template blocks:', error)
    return []
  }
}

export async function createTemplateBlock(block: Omit<TemplateBlock, 'id' | 'created_at'>): Promise<TemplateBlock | null> {
  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createTemplateBlock',
        data: block
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error creating template block:', result.error)
      return null
    }

    return result.block
  } catch (error) {
    console.error('Error creating template block:', error)
    return null
  }
}

export async function updateTemplateBlock(blockId: string, updates: Partial<TemplateBlock>): Promise<TemplateBlock | null> {
  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateTemplateBlock',
        data: { id: blockId, ...updates }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error updating template block:', result.error)
      return null
    }

    return result.block
  } catch (error) {
    console.error('Error updating template block:', error)
    return null
  }
}

export async function deleteTemplateBlock(blockId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deleteTemplateBlock',
        data: { id: blockId }
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error('Error deleting template block:', result.error)
      return false
    }

    return result.success
  } catch (error) {
    console.error('Error deleting template block:', error)
    return false
  }
}

// Navigation operations
export async function getNavigationItems(siteId: string): Promise<NavigationItem[]> {
  try {
    // Use admin client to bypass RLS for development
    const { data, error } = await supabaseAdmin
      .from('navigation_items')
      .select('*')
      .eq('site_id', siteId)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching navigation items:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching navigation items:', error)
    return []
  }
}

export async function createNavigationItem(item: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>): Promise<NavigationItem | null> {
  try {
    // Use admin client to bypass RLS for development
    const { data, error } = await supabaseAdmin
      .from('navigation_items')
      .insert([item])
      .select()
      .single()

    if (error) {
      console.error('Error creating navigation item:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating navigation item:', error)
    return null
  }
}

export async function updateNavigationItem(itemId: string, updates: Partial<NavigationItem>): Promise<NavigationItem | null> {
  try {
    // Use admin client to bypass RLS for development
    const { data, error } = await supabaseAdmin
      .from('navigation_items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single()

    if (error) {
      console.error('Error updating navigation item:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating navigation item:', error)
    return null
  }
}

export async function deleteNavigationItem(itemId: string): Promise<boolean> {
  try {
    // Use admin client to bypass RLS for development
    const { error } = await supabaseAdmin
      .from('navigation_items')
      .delete()
      .eq('id', itemId)

    if (error) {
      console.error('Error deleting navigation item:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting navigation item:', error)
    return false
  }
}

export async function reorderNavigationItems(siteId: string, itemOrders: { id: string; order_index: number }[]): Promise<boolean> {
  try {
    const updates = itemOrders.map(({ id, order_index }) => ({ id, order_index }))
    
    // Use admin client to bypass RLS for development
    const { error } = await supabaseAdmin
      .from('navigation_items')
      .upsert(updates)

    if (error) {
      console.error('Error reordering navigation items:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error reordering navigation items:', error)
    return false
  }
}

// Site settings operations
export async function getSiteSettings(siteId: string): Promise<SiteSetting[]> {
  try {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use admin client
      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .select('*')
        .eq('site_id', siteId)

      if (error) {
        console.error('Error fetching site settings:', error)
        return []
      }

      return data || []
    } else {
      // Client-side: use regular client
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('site_id', siteId)

      if (error) {
        console.error('Error fetching site settings:', error)
        return []
      }

      return data || []
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return []
  }
}

export async function getSiteSetting(siteId: string, key: string): Promise<SiteSetting | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('site_id', siteId)
    .eq('key', key)
    .maybeSingle()

  if (error) {
    console.error('Error fetching site setting:', error)
    return null
  }

  return data
}

export async function setSiteSetting(siteId: string, key: string, value: any): Promise<SiteSetting | null> {
  try {
    // First try to update existing setting
    const { data: updateData, error: updateError } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('site_id', siteId)
      .eq('key', key)
      .select()
      .single()

    if (updateData) {
      return updateData
    }

    // If no existing setting found, insert new one
    const { data: insertData, error: insertError } = await supabase
      .from('site_settings')
      .insert([{ site_id: siteId, key, value }])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting site setting:', insertError)
      return null
    }

    return insertData
  } catch (error) {
    console.error('Error setting site setting:', error)
    return null
  }
}

// Helper function to load pages for navigation (used in Header component)
export async function loadPagesFromDatabase(): Promise<Page[]> {
  const site = await getCurrentSite()
  if (!site) return []
  
  return getPagesBySite(site.id)
}

// Statistics for dashboard
export async function getSiteStatistics(siteId: string) {
  const [pages, templates, navigationItems] = await Promise.all([
    getPagesBySite(siteId),
    getTemplatesBySite(siteId),
    getNavigationItems(siteId)
  ])

  const publishedPages = pages.filter(page => page.status === 'published')
  const draftPages = pages.filter(page => page.status === 'draft')

  return {
    totalPages: pages.length,
    publishedPages: publishedPages.length,
    draftPages: draftPages.length,
    totalTemplates: templates.length,
    navigationItems: navigationItems.length,
    recentPages: pages.slice(0, 5),
  }
}

// Setup functions for initial site configuration
export async function createDefaultTemplates(siteId: string): Promise<boolean> {
  try {
    const defaultTemplates = [
      {
        site_id: siteId,
        name: 'Default Header',
        type: 'header' as const,
        theme_id: 'base-theme',
        is_default: true
      },
      {
        site_id: siteId,
        name: 'Default Footer',
        type: 'footer' as const,
        theme_id: 'base-theme',
        is_default: true
      },
      {
        site_id: siteId,
        name: 'Default Page Template',
        type: 'page' as const,
        theme_id: 'base-theme',
        is_default: true
      }
    ]

    const { error } = await supabaseAdmin
      .from('templates')
      .insert(defaultTemplates)

    if (error) {
      console.error('Error creating default templates:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in createDefaultTemplates:', error)
    return false
  }
}

export async function createDefaultNavigation(siteId: string): Promise<boolean> {
  try {
    const defaultNavigation = [
      {
        site_id: siteId,
        label: 'Home',
        type: 'internal' as const,
        page_id: null, // Will be set when first page is created
        href: '/',
        order_index: 1,
        is_visible: true
      },
      {
        site_id: siteId,
        label: 'About',
        type: 'internal' as const,
        page_id: null,
        href: '/about',
        order_index: 2,
        is_visible: true
      },
      {
        site_id: siteId,
        label: 'Contact',
        type: 'internal' as const,
        page_id: null,
        href: '/contact',
        order_index: 3,
        is_visible: true
      }
    ]

    const { error } = await supabaseAdmin
      .from('navigation_items')
      .insert(defaultNavigation)

    if (error) {
      console.error('Error creating default navigation:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in createDefaultNavigation:', error)
    return false
  }
}
