/**
 * Utility to extract TypeScript interfaces from component template strings
 * This ensures AI generates props that EXACTLY match component interfaces
 */

export interface InterfaceProperty {
  name: string
  type: string
  required: boolean
  isArray: boolean
  isObject: boolean
  objectProperties?: InterfaceProperty[]
}

export interface ExtractedInterface {
  name: string
  properties: InterfaceProperty[]
}

/**
 * Extracts the TypeScript interface definition from a component template
 */
export function extractInterfaceFromTemplate(template: string): ExtractedInterface | null {
  // Match interface definition (handle multi-line interfaces with nested braces)
  const interfaceRegex = /interface\s+(\w+Props)\s*\{([^]*?)\n\}/
  const match = template.match(interfaceRegex)
  
  if (!match) {
    console.warn('No interface found in template')
    return null
  }

  const interfaceName = match[1]
  const interfaceBody = match[2]

  const properties: InterfaceProperty[] = []
  
  // Parse each property line
  const lines = interfaceBody.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trim()
    
    // Skip empty lines and comments
    if (!line || line.startsWith('//') || line.startsWith('*')) {
      i++
      continue
    }

    // Parse property: name?: type or name: type
    const propMatch = line.match(/^(\w+)(\??):\s*(.+)$/)
    
    if (propMatch) {
      const propName = propMatch[1]
      const isOptional = propMatch[2] === '?'
      let propType = propMatch[3]
      
      // Handle nested object types
      if (propType.includes('{')) {
        // This is an inline object type
        const nestedProps: InterfaceProperty[] = []
        let braceCount = 1
        let nestedBody = propType.substring(propType.indexOf('{') + 1)
        
        i++
        while (i < lines.length && braceCount > 0) {
          const nestedLine = lines[i].trim()
          if (nestedLine.includes('{')) braceCount++
          if (nestedLine.includes('}')) braceCount--
          
          if (braceCount > 0) {
            nestedBody += '\n' + nestedLine
          }
          i++
        }
        
        // Parse nested properties
        const nestedLines = nestedBody.split('\n')
        for (const nestedLine of nestedLines) {
          const trimmed = nestedLine.trim()
          const nestedMatch = trimmed.match(/^(\w+)(\??):\s*(.+)$/)
          if (nestedMatch) {
            nestedProps.push({
              name: nestedMatch[1],
              type: nestedMatch[3].replace(/,$/, ''),
              required: nestedMatch[2] !== '?',
              isArray: nestedMatch[3].includes('[]') || nestedMatch[3].includes('Array<'),
              isObject: false,
            })
          }
        }
        
        properties.push({
          name: propName,
          type: 'object',
          required: !isOptional,
          isArray: false,
          isObject: true,
          objectProperties: nestedProps
        })
      } else {
        // Simple property
        properties.push({
          name: propName,
          type: propType.replace(/,$/, ''),
          required: !isOptional,
          isArray: propType.includes('[]') || propType.includes('Array<'),
          isObject: false
        })
      }
    }
    
    i++
  }

  return {
    name: interfaceName,
    properties
  }
}

/**
 * Build a complete interface map for all components
 */
export function buildComponentInterfaceMap(componentBlocks: {
  headers: Array<{ id: string; template: string }>
  heroes: Array<{ id: string; template: string }>
  features: Array<{ id: string; template: string }>
  testimonials: Array<{ id: string; template: string }>
  footers: Array<{ id: string; template: string }>
}): Map<string, ExtractedInterface> {
  const interfaceMap = new Map<string, ExtractedInterface>()

  // Extract interface from each header
  componentBlocks.headers.forEach(header => {
    const extracted = extractInterfaceFromTemplate(header.template)
    if (extracted) {
      interfaceMap.set(`header-${header.id}`, extracted)
    }
  })

  // Extract from other component types
  ;['heroes', 'features', 'testimonials', 'footers'].forEach(type => {
    const blocks = componentBlocks[type as keyof typeof componentBlocks]
    blocks.forEach(block => {
      const extracted = extractInterfaceFromTemplate(block.template)
      if (extracted) {
        interfaceMap.set(`${type.slice(0, -1)}-${block.id}`, extracted)
      }
    })
  })

  return interfaceMap
}

/**
 * Format interface properties as a string for the AI prompt
 */
export function formatInterfaceForPrompt(interfaceData: ExtractedInterface): string {
  let result = `interface ${interfaceData.name} {\n`
  
  interfaceData.properties.forEach(prop => {
    const optional = prop.required ? '' : '?'
    
    if (prop.isObject && prop.objectProperties) {
      result += `  ${prop.name}${optional}: {\n`
      prop.objectProperties.forEach(nested => {
        const nestedOptional = nested.required ? '' : '?'
        result += `    ${nested.name}${nestedOptional}: ${nested.type}\n`
      })
      result += `  }\n`
    } else {
      result += `  ${prop.name}${optional}: ${prop.type}\n`
    }
  })
  
  result += `}`
  
  return result
}

/**
 * Validate that generated props match the interface
 */
export function validatePropsMatchInterface(
  props: any,
  interfaceData: ExtractedInterface
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check for missing required properties
  interfaceData.properties.forEach(prop => {
    if (prop.required && !(prop.name in props)) {
      errors.push(`Missing required property: ${prop.name}`)
    }
  })
  
  // Check for extra properties
  Object.keys(props).forEach(key => {
    const found = interfaceData.properties.find(p => p.name === key)
    if (!found) {
      errors.push(`Extra property not in interface: ${key}`)
    }
  })
  
  return {
    valid: errors.length === 0,
    errors
  }
}

