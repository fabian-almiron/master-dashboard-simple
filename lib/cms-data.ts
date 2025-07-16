'use client'

import { supabase } from './supabase'
import { getCurrentSiteId } from './site-config'
import { PageBlock } from './cms-types'

// =============================================
// PAGES OPERATIONS
// =============================================

export interface CMSPage {
  id: string
  title: string
  slug: string
  description?: string
  status: 'draft' | 'published'
  blocks: PageBlock[]
  templateId?: string
  headerTemplateId?: string
  footerTemplateId?: string
  pageTemplateId?: string
  createdAt: string
  updatedAt: string
}

export async function loadPagesFromDatabase(): Promise<CMSPage[]> {
  const siteId = getCurrentSiteId()
  if (!siteId) return []

  try {
    // Get pages for this site
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: false })

    if (pagesError) throw pagesError

    // Get blocks for all pages
    const pageIds = pages.map(p => p.id)
    const { data: blocks, error: blocksError } = await supabase
      .from('page_blocks')
      .select('*')
      .in('page_id', pageIds)
      .order('order_index')

    if (blocksError) throw blocksError

    // Combine pages with their blocks
    return pages.map(page => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      description: page.description,
      status: page.status as 'draft' | 'published',
      blocks: blocks
        .filter(block => block.page_id === page.id)
        .map(block => ({
          id: block.id,
          type: block.component_type,
          order: block.order_index,
          props: block.props || {},
          isVisible: block.is_visible
        })),
      templateId: page.template_id,
      headerTemplateId: page.header_template_id,
      footerTemplateId: page.footer_template_id,
      pageTemplateId: page.page_template_id,
      createdAt: page.created_at,
      updatedAt: page.updated_at
    }))

  } catch (error) {
    console.error('Error loading pages from database:', error)
    return []
  }
}

export async function savePageToDatabase(page: Omit<CMSPage, 'id' | 'createdAt' | 'updatedAt'>): Promise<CMSPage | null> {
  const siteId = getCurrentSiteId()
  if (!siteId) return null

  try {
    // Insert page
    const { data: savedPage, error: pageError } = await supabase
      .from('pages')
      .insert([{
        site_id: siteId,
        title: page.title,
        slug: page.slug,
        description: page.description,
        status: page.status,
        template_id: page.templateId,
        header_template_id: page.headerTemplateId,
        footer_template_id: page.footerTemplateId,
        page_template_id: page.pageTemplateId
      }])
      .select()
      .single()

    if (pageError) throw pageError

    // Insert blocks
    if (page.blocks.length > 0) {
      const blocksToInsert = page.blocks.map((block, index) => ({
        site_id: siteId,
        page_id: savedPage.id,
        component_type: block.type,
        order_index: index,
        props: block.props,
        is_visible: block.isVisible
      }))

      const { error: blocksError } = await supabase
        .from('page_blocks')
        .insert(blocksToInsert)

      if (blocksError) throw blocksError
    }

    return {
      id: savedPage.id,
      title: savedPage.title,
      slug: savedPage.slug,
      description: savedPage.description,
      status: savedPage.status,
      blocks: page.blocks,
      templateId: savedPage.template_id,
      headerTemplateId: savedPage.header_template_id,
      footerTemplateId: savedPage.footer_template_id,
      pageTemplateId: savedPage.page_template_id,
      createdAt: savedPage.created_at,
      updatedAt: savedPage.updated_at
    }

  } catch (error) {
    console.error('Error saving page to database:', error)
    return null
  }
}

export async function updatePageInDatabase(pageId: string, updates: Partial<CMSPage>): Promise<boolean> {
  const siteId = getCurrentSiteId()
  if (!siteId) return false

  try {
    // Update page
    const { error: pageError } = await supabase
      .from('pages')
      .update({
        title: updates.title,
        slug: updates.slug,
        description: updates.description,
        status: updates.status,
        template_id: updates.templateId,
        header_template_id: updates.headerTemplateId,
        footer_template_id: updates.footerTemplateId,
        page_template_id: updates.pageTemplateId
      })
      .eq('id', pageId)
      .eq('site_id', siteId)

    if (pageError) throw pageError

    // Update blocks if provided
    if (updates.blocks) {
      // Delete existing blocks
      await supabase
        .from('page_blocks')
        .delete()
        .eq('page_id', pageId)
        .eq('site_id', siteId)

      // Insert new blocks
      if (updates.blocks.length > 0) {
        const blocksToInsert = updates.blocks.map((block, index) => ({
          site_id: siteId,
          page_id: pageId,
          component_type: block.type,
          order_index: index,
          props: block.props,
          is_visible: block.isVisible
        }))

        const { error: blocksError } = await supabase
          .from('page_blocks')
          .insert(blocksToInsert)

        if (blocksError) throw blocksError
      }
    }

    return true

  } catch (error) {
    console.error('Error updating page in database:', error)
    return false
  }
}

export async function deletePageFromDatabase(pageId: string): Promise<boolean> {
  const siteId = getCurrentSiteId()
  if (!siteId) return false

  try {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', pageId)
      .eq('site_id', siteId)

    if (error) throw error
    return true

  } catch (error) {
    console.error('Error deleting page from database:', error)
    return false
  }
}

// =============================================
// TEMPLATES OPERATIONS  
// =============================================

export interface CMSTemplate {
  id: string
  name: string
  type: 'header' | 'footer' | 'page' | 'post'
  description?: string
  blocks: PageBlock[]
  isDefault?: boolean
  createdAt: string
  updatedAt: string
}

export async function loadTemplatesFromDatabase(): Promise<CMSTemplate[]> {
  const siteId = getCurrentSiteId()
  if (!siteId) return []

  try {
    // Get templates for this site
    const { data: templates, error: templatesError } = await supabase
      .from('templates')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: false })

    if (templatesError) throw templatesError

    // Get blocks for all templates
    const templateIds = templates.map(t => t.id)
    const { data: blocks, error: blocksError } = await supabase
      .from('template_blocks')
      .select('*')
      .in('template_id', templateIds)
      .order('order_index')

    if (blocksError) throw blocksError

    // Combine templates with their blocks
    return templates.map(template => ({
      id: template.id,
      name: template.name,
      type: template.type,
      description: template.description,
      blocks: blocks
        .filter(block => block.template_id === template.id)
        .map(block => ({
          id: block.id,
          type: block.component_type,
          order: block.order_index,
          props: block.props || {},
          isVisible: block.is_visible
        })),
      isDefault: template.is_default,
      createdAt: template.created_at,
      updatedAt: template.updated_at
    }))

  } catch (error) {
    console.error('Error loading templates from database:', error)
    return []
  }
}

export async function saveTemplateToDatabase(template: Omit<CMSTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<CMSTemplate | null> {
  const siteId = getCurrentSiteId()
  if (!siteId) return null

  try {
    // Insert template
    const { data: savedTemplate, error: templateError } = await supabase
      .from('templates')
      .insert([{
        site_id: siteId,
        name: template.name,
        type: template.type,
        description: template.description,
        is_default: template.isDefault || false
      }])
      .select()
      .single()

    if (templateError) throw templateError

    // Insert blocks
    if (template.blocks.length > 0) {
      const blocksToInsert = template.blocks.map((block, index) => ({
        site_id: siteId,
        template_id: savedTemplate.id,
        component_type: block.type,
        order_index: index,
        props: block.props,
        is_visible: block.isVisible
      }))

      const { error: blocksError } = await supabase
        .from('template_blocks')
        .insert(blocksToInsert)

      if (blocksError) throw blocksError
    }

    return {
      id: savedTemplate.id,
      name: savedTemplate.name,
      type: savedTemplate.type,
      description: savedTemplate.description,
      blocks: template.blocks,
      isDefault: savedTemplate.is_default,
      createdAt: savedTemplate.created_at,
      updatedAt: savedTemplate.updated_at
    }

  } catch (error) {
    console.error('Error saving template to database:', error)
    return null
  }
}

// =============================================
// NAVIGATION OPERATIONS
// =============================================

export interface CMSNavigationItem {
  id: string
  label: string
  type: 'internal' | 'external'
  href?: string
  pageId?: string
  order: number
  isVisible: boolean
}

export async function loadNavigationFromDatabase(): Promise<CMSNavigationItem[]> {
  const siteId = getCurrentSiteId()
  if (!siteId) return []

  try {
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('site_id', siteId)
      .order('order_index')

    if (error) throw error

    return data.map(item => ({
      id: item.id,
      label: item.label,
      type: item.type,
      href: item.href,
      pageId: item.page_id,
      order: item.order_index,
      isVisible: item.is_visible
    }))

  } catch (error) {
    console.error('Error loading navigation from database:', error)
    return []
  }
}

export async function saveNavigationToDatabase(navigation: CMSNavigationItem[]): Promise<boolean> {
  const siteId = getCurrentSiteId()
  if (!siteId) return false

  try {
    // Delete existing navigation items
    await supabase
      .from('navigation_items')
      .delete()
      .eq('site_id', siteId)

    // Insert new navigation items
    if (navigation.length > 0) {
      const itemsToInsert = navigation.map(item => ({
        site_id: siteId,
        label: item.label,
        type: item.type,
        href: item.href,
        page_id: item.pageId,
        order_index: item.order,
        is_visible: item.isVisible
      }))

      const { error } = await supabase
        .from('navigation_items')
        .insert(itemsToInsert)

      if (error) throw error
    }

    return true

  } catch (error) {
    console.error('Error saving navigation to database:', error)
    return false
  }
}

// =============================================
// MIGRATION UTILITIES
// =============================================

export async function migrateFromLocalStorage(): Promise<{ pages: number, templates: number, navigation: number }> {
  let migratedCounts = { pages: 0, templates: 0, navigation: 0 }

  try {
    // Migrate pages
    const storedPages = localStorage.getItem('cms_pages')
    if (storedPages) {
      const pages = JSON.parse(storedPages)
      for (const page of pages) {
        const saved = await savePageToDatabase({
          title: page.title,
          slug: page.slug,
          description: page.description,
          status: page.status,
          blocks: page.blocks || [],
          templateId: page.templateId,
          headerTemplateId: page.headerTemplateId,
          footerTemplateId: page.footerTemplateId,
          pageTemplateId: page.pageTemplateId
        })
        if (saved) migratedCounts.pages++
      }
    }

    // Migrate templates
    const storedTemplates = localStorage.getItem('cms-templates')
    if (storedTemplates) {
      const templates = JSON.parse(storedTemplates)
      for (const template of templates) {
        const saved = await saveTemplateToDatabase({
          name: template.name,
          type: template.type,
          description: template.description,
          blocks: template.blocks || [],
          isDefault: template.isDefault
        })
        if (saved) migratedCounts.templates++
      }
    }

    // Migrate navigation
    const storedNavigation = localStorage.getItem('cms_navigation')
    if (storedNavigation) {
      const navigation = JSON.parse(storedNavigation)
      const success = await saveNavigationToDatabase(navigation.map((item: any) => ({
        id: item.id,
        label: item.label,
        type: item.type,
        href: item.href,
        pageId: item.pageId,
        order: item.order,
        isVisible: item.isVisible
      })))
      if (success) migratedCounts.navigation = navigation.length
    }

  } catch (error) {
    console.error('Error migrating from localStorage:', error)
  }

  return migratedCounts
} 