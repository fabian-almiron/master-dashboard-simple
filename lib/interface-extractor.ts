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
      
      // Handle complex types
      if (propType.includes('{')) {
        // Check if this is an Array<{...}> type (multi-line or single-line)
        if (propType.startsWith('Array<') || propType.startsWith('Array<{')) {
          const openBraces = (propType.match(/\{/g) || []).length
          const closeBraces = (propType.match(/\}/g) || []).length
          
          if (openBraces === closeBraces && openBraces >= 1) {
            // Complete Array<{...}> definition in current line(s) already read
            properties.push({
              name: propName,
              type: propType.replace(/,$/, ''),
              required: !isOptional,
              isArray: true,
              isObject: false
            })
          } else {
            // Multi-line Array<{...}> definition - need to read more lines
            let braceCount = openBraces - closeBraces
            let fullType = propType
            
            i++
            while (i < lines.length && braceCount > 0) {
              const nextLine = lines[i].trim()
              if (nextLine.includes('{')) braceCount += (nextLine.match(/\{/g) || []).length
              if (nextLine.includes('}')) braceCount -= (nextLine.match(/\}/g) || []).length
              
              fullType += ' ' + nextLine
              i++
            }
            
            properties.push({
              name: propName,
              type: fullType.replace(/,$/, '').replace(/\s+/g, ' '),
              required: !isOptional,
              isArray: true,
              isObject: false
            })
          }
        }
        // Handle regular object types (non-array)
        else {
          // Check if this is a complete inline object definition (e.g., "{ text: string; href: string }")
          const openBraces = (propType.match(/\{/g) || []).length
          const closeBraces = (propType.match(/\}/g) || []).length
          
          if (openBraces === closeBraces && openBraces === 1) {
            // This is a complete inline object definition, treat as simple type
            properties.push({
              name: propName,
              type: propType.replace(/,$/, ''),
              required: !isOptional,
              isArray: propType.includes('[]') || propType.includes('Array<'),
              isObject: false // Treat as simple type to avoid nested parsing
            })
          } else {
            // This is a multi-line object type
            const nestedProps: InterfaceProperty[] = []
            let braceCount = openBraces - closeBraces // Start with remaining open braces
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
          }
        }
      } else {
        // Simple property (including Array types)
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
  componentBlocks.heroes.forEach(hero => {
    const extracted = extractInterfaceFromTemplate(hero.template)
    if (extracted) {
      interfaceMap.set(`hero-${hero.id}`, extracted)
    }
  })
  
  componentBlocks.features.forEach(feature => {
    const extracted = extractInterfaceFromTemplate(feature.template)
    if (extracted) {
      interfaceMap.set(`features-${feature.id}`, extracted)
    }
  })
  
  componentBlocks.testimonials.forEach(testimonial => {
    const extracted = extractInterfaceFromTemplate(testimonial.template)
    if (extracted) {
      interfaceMap.set(`testimonials-${testimonial.id}`, extracted)
    }
  })
  
  componentBlocks.footers.forEach(footer => {
    const extracted = extractInterfaceFromTemplate(footer.template)
    if (extracted) {
      interfaceMap.set(`footer-${footer.id}`, extracted)
    }
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
      return
    }
    
    // For array properties, validate array element structure
    if (prop.isArray && prop.name in props) {
      const arrayValue = props[prop.name]
      if (Array.isArray(arrayValue) && arrayValue.length > 0) {
        // Check if this is an array of objects (e.g., Array<{icon: string, title: string}>)
        if (prop.type.includes('{') && prop.type.includes('}')) {
          // Extract the object definition from Array<{...}> with proper brace counting
          const startIndex = prop.type.indexOf('{')
          if (startIndex !== -1) {
            let braceCount = 0
            let endIndex = startIndex
            
            // Find the matching closing brace for the first opening brace
            for (let i = startIndex; i < prop.type.length; i++) {
              if (prop.type[i] === '{') braceCount++
              if (prop.type[i] === '}') braceCount--
              if (braceCount === 0) {
                endIndex = i
                break
              }
            }
            
            if (braceCount === 0) {
              let objectDef = prop.type.substring(startIndex + 1, endIndex)
              // Clean up the object definition - normalize whitespace and newlines
              objectDef = objectDef.replace(/\s+/g, ' ').trim()
              
              console.log(`🔍 Raw object definition for ${prop.name}:`, objectDef)
              
              // Parse only top-level properties, ignoring nested structures
              const requiredProps = []
              const lines = objectDef.split(/[,\n]/)
              
              for (const line of lines) {
                const cleaned = line.trim()
                // Only match direct properties (not nested array/object properties)
                const propMatch = cleaned.match(/^(\w+)(\??):\s*([^,]*?)$/)
                if (propMatch) {
                  const propName = propMatch[1]
                  const isOptional = propMatch[2] === '?'
                  const propType = propMatch[3].trim()
                  
                  // Skip nested Array or object types as they should be validated separately
                  if (!propType.includes('Array<') && !propType.includes('{')) {
                    requiredProps.push({ name: propName, required: !isOptional })
                  }
                }
              }
              
              const requiredPropNames = requiredProps.filter(p => p?.required).map(p => p?.name).filter(Boolean)
              
              console.log(`🔍 Validating array ${prop.name} with required props:`, requiredPropNames)
              
              // Validate each array element has required properties
              arrayValue.forEach((element, index) => {
                if (typeof element === 'object' && element !== null) {
                  requiredPropNames.forEach(requiredProp => {
                    if (!(requiredProp in element)) {
                      errors.push(`Missing required property: ${requiredProp} in ${prop.name}[${index}]`)
                    }
                  })
                }
              })
            }
          }
        }
      }
    }
    
    // For object properties, validate nested structure
    if (prop.isObject && prop.objectProperties && prop.name in props) {
      const objectValue = props[prop.name]
      if (typeof objectValue === 'object' && objectValue !== null) {
        prop.objectProperties.forEach(nestedProp => {
          if (nestedProp.required && !(nestedProp.name in objectValue)) {
            errors.push(`Missing required property: ${prop.name}.${nestedProp.name}`)
          }
        })
      } else {
        errors.push(`Property ${prop.name} should be an object but got ${typeof objectValue}`)
      }
    }
    
    // Special check for properties that SHOULD be nested but appear as flat properties
    if (prop.isObject && prop.objectProperties) {
      // Check if any nested properties appear as top-level properties (common AI mistake)
      prop.objectProperties.forEach(nestedProp => {
        if (nestedProp.name in props) {
          errors.push(`🚨 CRITICAL: Property "${nestedProp.name}" should be nested inside "${prop.name}" object, not a top-level property! This is a common AI generation error.`)
        }
      })
      
      // Also check if the nested object is missing entirely but we have the flat properties
      if (!(prop.name in props)) {
        const hasAnyNestedPropsAsFlat = prop.objectProperties.some(nestedProp => nestedProp.name in props)
        if (hasAnyNestedPropsAsFlat) {
          errors.push(`🚨 MISSING NESTED OBJECT: "${prop.name}" object is missing, but its nested properties exist as flat properties. You need to create the "${prop.name}" object and move properties inside it.`)
        }
      }
    }
  })
  
  // Check for extra properties (top-level only for now)
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

