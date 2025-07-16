import { Template } from './cms-types'

export const getThemeTemplateStorageKey = (themeId: string): string => {
  return `cms-templates-${themeId}`
}

// Create basic starter templates for a theme
const createStarterTemplates = (themeId: string): Template[] => {
  const now = new Date().toISOString()
  
  return [
    {
      id: `header-starter-${themeId}`,
      name: 'Basic Header',
      type: 'header',
      description: 'Simple header with navigation',
      blocks: [
        {
          id: 'header-block',
          type: 'Header',
          order: 0,
          props: {},
          isVisible: true
        }
      ],
      isDefault: true,
      createdAt: now,
      updatedAt: now
    },
    {
      id: `footer-starter-${themeId}`,
      name: 'Basic Footer',
      type: 'footer',
      description: 'Simple footer with links',
      blocks: [
        {
          id: 'footer-block',
          type: 'Footer',
          order: 0,
          props: {},
          isVisible: true
        }
      ],
      isDefault: true,
      createdAt: now,
      updatedAt: now
    },
    {
      id: `page-starter-${themeId}`,
      name: 'Blank Page',
      type: 'page',
      description: 'Empty page template with DND area',
      blocks: [
        {
          id: 'page-dnd',
          type: 'DNDArea',
          order: 0,
          props: {},
          isVisible: true
        }
      ],
      isDefault: true,
      createdAt: now,
      updatedAt: now
    }
  ]
}

export const loadThemeTemplates = (themeId: string): Template[] => {
  const storageKey = getThemeTemplateStorageKey(themeId)
  const saved = localStorage.getItem(storageKey)
  if (saved) {
    return JSON.parse(saved)
  }
  
  // Create and save starter templates if none exist
  const starterTemplates = createStarterTemplates(themeId)
  localStorage.setItem(storageKey, JSON.stringify(starterTemplates))
  return starterTemplates
}

export const saveThemeTemplates = (themeId: string, templates: Template[]): void => {
  const storageKey = getThemeTemplateStorageKey(themeId)
  localStorage.setItem(storageKey, JSON.stringify(templates))
}

export const getThemeTemplate = (themeId: string, templateId: string): Template | null => {
  const templates = loadThemeTemplates(themeId)
  return templates.find(t => t.id === templateId) || null
}

export const getDefaultThemeTemplate = (themeId: string, type: 'header' | 'footer' | 'page'): Template | null => {
  const templates = loadThemeTemplates(themeId)
  return templates.find(t => t.type === type && t.isDefault) || null
}

export const createStarterTemplatesForTheme = (themeId: string): Template[] => {
  const starterTemplates = createStarterTemplates(themeId)
  saveThemeTemplates(themeId, starterTemplates)
  return starterTemplates
} 