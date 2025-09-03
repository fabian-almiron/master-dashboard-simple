#!/usr/bin/env node

/**
 * Build-time Component Discovery Script
 * 
 * This script automatically discovers and registers components in all themes
 * during the build process. It scans the themes directory and regenerates
 * auto-register.tsx files for all themes that have components.
 */

const fs = require('fs')
const path = require('path')

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  header: (msg) => console.log(`${colors.bright}${colors.cyan}🎨 ${msg}${colors.reset}`)
}

// Get the themes directory path
const themesDir = path.join(process.cwd(), 'themes')

/**
 * Check if a TypeScript file exports metadata
 */
function checkHasMetadata(filePath) {
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
    log.warn(`Error reading component file ${filePath}: ${error.message}`)
    return { hasMetadata: false }
  }
}

/**
 * Discover all UI components in a theme directory
 */
function discoverThemeComponents(themeDir) {
  const uiDir = path.join(themeDir, 'ui')
  
  if (!fs.existsSync(uiDir)) {
    return { components: [], subComponents: [], totalCount: 0, errors: [] }
  }

  const components = []
  const subComponents = []
  const errors = []

  function scanDirectory(dir, isSubDirectory = false) {
    try {
      const items = fs.readdirSync(dir)
      
      for (const item of items) {
        const itemPath = path.join(dir, item)
        const stat = fs.statSync(itemPath)
        
        if (stat.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(itemPath, true)
        } else if (item.endsWith('.tsx') && !item.endsWith('.d.ts')) {
          const componentName = path.basename(item, '.tsx')
          const relativePath = path.relative(uiDir, itemPath)
          const { hasMetadata, category } = checkHasMetadata(itemPath)
          
          const componentFile = {
            name: componentName,
            path: itemPath,
            relativePath: relativePath,
            hasMetadata: hasMetadata,
            category: category,
            isSubComponent: isSubDirectory
          }
          
          if (isSubDirectory) {
            subComponents.push(componentFile)
          } else {
            components.push(componentFile)
          }
        }
      }
    } catch (error) {
      errors.push(`Error scanning directory ${dir}: ${error.message}`)
    }
  }

  scanDirectory(uiDir)

  return {
    components,
    subComponents,
    totalCount: components.length + subComponents.length,
    errors
  }
}

/**
 * Generate auto-register.tsx content for a theme
 */
function generateAutoRegisterContent(themeId, discoveryResult) {
  const { components } = discoveryResult
  const registrableComponents = components.filter(comp => comp.hasMetadata)
  
  if (registrableComponents.length === 0) {
    log.warn(`No registrable components found for theme: ${themeId}`)
    return null
  }

  // Generate imports
  const imports = registrableComponents.map(comp => 
    `import ${comp.name}, { metadata as ${comp.name}Metadata } from './ui/${comp.relativePath.replace('.tsx', '')}'`
  ).join('\n')

  // Generate component registry
  const componentRegistry = registrableComponents.map(comp => 
    `  [${comp.name}Metadata.type]: ${comp.name},`
  ).join('\n')

  // Generate component info array
  const componentInfo = registrableComponents.map(comp => 
    `  ${comp.name}Metadata,`
  ).join('\n')

  // Get theme metadata (try to read from existing auto-register or use defaults)
  let themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1)
  let themeDescription = `Auto-registered components for theme: ${themeId}`
  let themeAuthor = 'Auto-Generated'
  let themeVersion = '1.0.0'

  // Try to preserve existing theme metadata
  const existingAutoRegisterPath = path.join(process.cwd(), 'themes', themeId, 'auto-register.tsx')
  if (fs.existsSync(existingAutoRegisterPath)) {
    try {
      const existingContent = fs.readFileSync(existingAutoRegisterPath, 'utf-8')
      
      const nameMatch = existingContent.match(/export const themeName = ['"`]([^'"`]*)['"`]/)
      if (nameMatch) themeName = nameMatch[1]
      
      const descMatch = existingContent.match(/export const themeDescription = ['"`]([^'"`]*?)['"`]/s)
      if (descMatch) themeDescription = descMatch[1]
      
      const authorMatch = existingContent.match(/export const themeAuthor = ['"`]([^'"`]*?)['"`]/)
      if (authorMatch) themeAuthor = authorMatch[1]
      
      const versionMatch = existingContent.match(/export const themeVersion = ['"`]([^'"`]*?)['"`]/)
      if (versionMatch) themeVersion = versionMatch[1]
    } catch (error) {
      log.warn('Could not read existing theme metadata, using defaults')
    }
  }

  // Generate the complete auto-register.tsx content
  return `import React from 'react'
import type { ComponentInfo } from '@/lib/cms-types'

// Import theme styles
import './styles.css'

${imports}

export const themeName = '${themeName}'
export const themeDescription = '${themeDescription}'
export const themeAuthor = '${themeAuthor}'
export const themeVersion = '${themeVersion}'

export const componentRegistry = {
${componentRegistry}
} as const

export const componentInfo: ComponentInfo[] = [
${componentInfo}
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
}

/**
 * Regenerate auto-register.tsx for a specific theme
 */
function regenerateThemeAutoRegister(themeId) {
  const themeDir = path.join(themesDir, themeId)
  
  if (!fs.existsSync(themeDir)) {
    throw new Error(`Theme directory not found: ${themeDir}`)
  }

  log.info(`Discovering components for theme: ${themeId}`)
  
  // Discover components
  const discoveryResult = discoverThemeComponents(themeDir)
  
  if (discoveryResult.errors.length > 0) {
    discoveryResult.errors.forEach(error => log.error(error))
  }

  log.info(`Found ${discoveryResult.totalCount} total components (${discoveryResult.components.length} main, ${discoveryResult.subComponents.length} sub)`)
  
  // Generate auto-register content
  const autoRegisterContent = generateAutoRegisterContent(themeId, discoveryResult)
  
  if (!autoRegisterContent) {
    log.warn(`Skipping theme ${themeId} - no registrable components found`)
    return { success: false, message: 'No registrable components found' }
  }

  // Write auto-register.tsx
  const autoRegisterPath = path.join(themeDir, 'auto-register.tsx')
  fs.writeFileSync(autoRegisterPath, autoRegisterContent, 'utf-8')
  
  const registrableCount = discoveryResult.components.filter(comp => comp.hasMetadata).length
  log.success(`Regenerated auto-register.tsx for ${themeId} with ${registrableCount} components`)
  
  return { 
    success: true, 
    message: `Regenerated ${registrableCount} components`, 
    stats: discoveryResult 
  }
}

/**
 * Main function - discover and regenerate all themes
 */
function main() {
  log.header('Build-time Component Discovery')
  
  if (!fs.existsSync(themesDir)) {
    log.warn(`Themes directory not found: ${themesDir}`)
    log.info('Skipping component discovery - no themes to process')
    return
  }

  try {
    const themes = fs.readdirSync(themesDir).filter(item => {
      const themeDir = path.join(themesDir, item)
      return fs.statSync(themeDir).isDirectory()
    })

    if (themes.length === 0) {
      log.info('No themes found - skipping component discovery')
      return
    }

    log.info(`Found ${themes.length} theme(s): ${themes.join(', ')}`)

    let successCount = 0
    let totalComponents = 0

    for (const themeId of themes) {
      try {
        const result = regenerateThemeAutoRegister(themeId)
        if (result.success) {
          successCount++
          totalComponents += result.stats.components.filter(comp => comp.hasMetadata).length
        }
      } catch (error) {
        log.error(`Failed to process theme ${themeId}: ${error.message}`)
      }
    }

    log.success(`Component discovery completed: ${successCount}/${themes.length} themes processed, ${totalComponents} total components registered`)
    
  } catch (error) {
    log.error(`Build-time component discovery failed: ${error.message}`)
    process.exit(1)
  }
}

// Run the main function
if (require.main === module) {
  main()
}

module.exports = { main, regenerateThemeAutoRegister, discoverThemeComponents }
