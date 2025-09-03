// Server-side component discovery utilities
// This file scans theme directories and auto-discovers UI components

import fs from 'fs'
import path from 'path'

// Cache for discovered components to avoid filesystem scanning on every request
let componentCache: Map<string, ComponentDiscoveryResult> = new Map()
let lastDiscoveryTime = 0
const DISCOVERY_CACHE_TTL = 3000 // 3 seconds cache

interface ComponentFile {
  name: string
  path: string
  relativePath: string
  hasMetadata: boolean
  category?: string
  isSubComponent?: boolean
}

interface ComponentDiscoveryResult {
  components: ComponentFile[]
  subComponents: ComponentFile[]
  totalCount: number
  errors: string[]
}

// Check if a TypeScript file exports metadata
function checkHasMetadata(filePath: string): { hasMetadata: boolean; category?: string } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
        // Look for metadata export pattern
    const metadataExport = content.match(/export\s+const\s+metadata\s*:\s*ComponentInfo\s*=\s*{([^}]*)}/s)
    if (!metadataExport) {
      return { hasMetadata: false }
    }
    
    // Extract category from metadata if possible
    const categoryMatch = metadataExport[1].match(/category\s*:\s*['"]([^'"]*)['"]/);
    const category = categoryMatch ? categoryMatch[1] : undefined
    
    return { hasMetadata: true, category }
  } catch (error) {
    console.warn(`Error reading component file ${filePath}:`, error)
    return { hasMetadata: false }
  }
}

// Discover all UI components in a theme directory
export async function discoverThemeComponents(themeId: string): Promise<ComponentDiscoveryResult> {
  // Check cache first
  const cacheKey = `components-${themeId}`
  const now = Date.now()
  
  if (componentCache.has(cacheKey) && (now - lastDiscoveryTime) < DISCOVERY_CACHE_TTL) {
    return componentCache.get(cacheKey)!
  }

  const result: ComponentDiscoveryResult = {
    components: [],
    subComponents: [],
    totalCount: 0,
    errors: []
  }

  try {
    const themesDir = path.join(process.cwd(), 'themes')
    const themeDir = path.join(themesDir, themeId)
    const uiDir = path.join(themeDir, 'ui')
    
    // Check if ui directory exists
    if (!fs.existsSync(uiDir)) {
      result.errors.push(`UI directory not found: ${uiDir}`)
      return result
    }

    // Scan UI directory recursively
    function scanDirectory(dirPath: string, basePath: string = ''): void {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)
        const relativePath = path.join(basePath, entry.name)
        
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(fullPath, relativePath)
        } else if (entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.startsWith('.')) {
          // Check if it's a React component file
          const componentName = entry.name.replace('.tsx', '')
          const { hasMetadata, category } = checkHasMetadata(fullPath)
          
          const componentFile: ComponentFile = {
            name: componentName,
            path: fullPath,
            relativePath: relativePath.replace(/\\/g, '/'), // Normalize path separators
            hasMetadata,
            category,
            isSubComponent: basePath.length > 0 // Components in subdirectories are sub-components
          }
          
          if (componentFile.isSubComponent) {
            result.subComponents.push(componentFile)
          } else {
            result.components.push(componentFile)
          }
          
          result.totalCount++
        }
      }
    }

    scanDirectory(uiDir)
    
    // Sort components by name for consistent ordering
    result.components.sort((a, b) => a.name.localeCompare(b.name))
    result.subComponents.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
    
    console.log(`🔍 Discovered ${result.totalCount} components in theme "${themeId}":`)
    console.log(`   📦 Main components: ${result.components.length}`)
    console.log(`   🧩 Sub-components: ${result.subComponents.length}`)
    
    // Update cache
    componentCache.set(cacheKey, result)
    lastDiscoveryTime = now
    
  } catch (error) {
    result.errors.push(`Component discovery error: ${error}`)
    console.error('Error discovering theme components:', error)
  }

  return result
}

// Generate auto-register.tsx content based on discovered components
export async function generateAutoRegisterContent(themeId: string): Promise<string> {
  const discovery = await discoverThemeComponents(themeId)
  
  if (discovery.errors.length > 0) {
    throw new Error(`Component discovery failed: ${discovery.errors.join(', ')}`)
  }
  
  // Filter only components with metadata for registration
  const registrableComponents = discovery.components.filter(comp => comp.hasMetadata)
  
  if (registrableComponents.length === 0) {
    throw new Error('No components with metadata found for registration')
  }

  // Generate import statements
  const imports = registrableComponents.map(comp => {
    const importPath = `./ui/${comp.name}`
    return `import ${comp.name}, { metadata as ${comp.name}Metadata } from '${importPath}'`
  }).join('\n')

  // Generate component registry entries
  const registryEntries = registrableComponents.map(comp => 
    `  [${comp.name}Metadata.type]: ${comp.name},`
  ).join('\n')

  // Generate component info array entries
  const componentInfoEntries = registrableComponents.map(comp => 
    `  ${comp.name}Metadata,`
  ).join('\n')

  // Get theme metadata (try to read from existing auto-register or use defaults)
  let themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1)
  let themeDescription = `Auto-registered components for theme: ${themeId}`
  let themeAuthor = 'Auto-Generated'
  let themeVersion = '1.0.0'

  // Try to preserve existing theme metadata
  try {
    const existingPath = path.join(process.cwd(), 'themes', themeId, 'auto-register.tsx')
    if (fs.existsSync(existingPath)) {
      const existingContent = fs.readFileSync(existingPath, 'utf-8')
      
      const nameMatch = existingContent.match(/export const themeName = ['"]([^'"]*)['"]/);
      const descMatch = existingContent.match(/export const themeDescription = ['"]([^'"]*)['"]/);
      const authorMatch = existingContent.match(/export const themeAuthor = ['"]([^'"]*)['"]/);
      const versionMatch = existingContent.match(/export const themeVersion = ['"]([^'"]*)['"]/);
      
      if (nameMatch) themeName = nameMatch[1]
      if (descMatch) themeDescription = descMatch[1]
      if (authorMatch) themeAuthor = authorMatch[1]
      if (versionMatch) themeVersion = versionMatch[1]
    }
  } catch (error) {
    console.warn('Could not read existing theme metadata, using defaults')
  }

  // Generate the complete auto-register.tsx content
  const content = `import React from 'react'
import type { ComponentInfo } from '@/lib/cms-types'

// Import theme styles
import './styles.css'

${imports}

export const themeName = '${themeName}'
export const themeDescription = '${themeDescription}'
export const themeAuthor = '${themeAuthor}'
export const themeVersion = '${themeVersion}'

export const componentRegistry = {
${registryEntries}
} as const

export const componentInfo: ComponentInfo[] = [
${componentInfoEntries}
]

export const getComponent = (type: string) => componentRegistry[type as keyof typeof componentRegistry]
export const renderComponent = (type: string, props: Record<string, any> = {}) => {
  const Component = getComponent(type)
  return Component ? <Component {...props} /> : null
}
export const getComponentInfo = (type: string) => componentInfo.find(info => info.type === type)
export const getAllComponents = () => componentInfo
export const getComponentsByCategory = (category: string) => componentInfo.filter(info => info.category === category)
`

  return content
}

// Auto-generate the auto-register.tsx file for a theme
export async function regenerateAutoRegister(themeId: string): Promise<{ success: boolean; message: string }> {
  try {
    const content = await generateAutoRegisterContent(themeId)
    const outputPath = path.join(process.cwd(), 'themes', themeId, 'auto-register.tsx')
    
    // Create backup of existing file if it exists
    if (fs.existsSync(outputPath)) {
      const backupPath = `${outputPath}.backup.${Date.now()}`
      fs.copyFileSync(outputPath, backupPath)
      console.log(`📋 Created backup: ${backupPath}`)
    }
    
    // Write the new auto-register file
    fs.writeFileSync(outputPath, content, 'utf-8')
    
    const discoveryResult = await discoverThemeComponents(themeId)
    const registeredCount = discoveryResult.components.filter(c => c.hasMetadata).length
    
    console.log(`✅ Auto-register file generated for theme "${themeId}"`)
    console.log(`   📝 File: ${outputPath}`)
    console.log(`   🎯 Registered ${registeredCount} components`)
    
    return {
      success: true,
      message: `Successfully regenerated auto-register.tsx with ${registeredCount} components`
    }
  } catch (error) {
    console.error('Error regenerating auto-register:', error)
    return {
      success: false,
      message: `Failed to regenerate auto-register.tsx: ${error}`
    }
  }
}

// Clear component discovery cache
export function clearComponentCache(themeId?: string) {
  if (themeId) {
    componentCache.delete(`components-${themeId}`)
    console.log(`🧹 Component cache cleared for theme: ${themeId}`)
  } else {
    componentCache.clear()
    lastDiscoveryTime = 0
    console.log('🧹 All component cache cleared')
  }
}

// Get comprehensive theme component statistics
export async function getThemeComponentStats(themeId: string) {
  const discovery = await discoverThemeComponents(themeId)
  
  const stats = {
    themeId,
    totalComponents: discovery.totalCount,
    mainComponents: discovery.components.length,
    subComponentsCount: discovery.subComponents.length,
    registrableComponents: discovery.components.filter(c => c.hasMetadata).length,
    componentsByCategory: {} as Record<string, number>,
    errors: discovery.errors,
    components: discovery.components.map(c => ({
      name: c.name,
      hasMetadata: c.hasMetadata,
      category: c.category
    })),
    subComponents: discovery.subComponents.map(c => ({
      name: c.name,
      path: c.relativePath,
      hasMetadata: c.hasMetadata,
      category: c.category
    }))
  }
  
  // Count components by category
  discovery.components.forEach(comp => {
    if (comp.category) {
      stats.componentsByCategory[comp.category] = (stats.componentsByCategory[comp.category] || 0) + 1
    }
  })
  
  return stats
}
