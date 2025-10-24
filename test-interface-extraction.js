// Test the interface extraction system to debug nested object parsing

// Read the footer template and test our extraction logic
const fs = require('fs');

// Extract raw interface body from template
function extractRawInterface(template) {
  const interfaceRegex = /interface\s+(\w+Props)\s*\{([^]*?)\n\}/
  const match = template.match(interfaceRegex)
  
  if (!match) return null
  
  return {
    name: match[1],
    body: match[2]
  }
}

// Simplified interface property parser (based on our actual logic)
function parseInterfaceProperties(interfaceBody) {
  const properties = []
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
      
      console.log(`🔍 Found property: ${propName}, type: "${propType}", optional: ${isOptional}`)
      
      // Handle complex types
      if (propType.includes('{')) {
        // Check if this is an Array<{...}> type (multi-line or single-line)
        if (propType.startsWith('Array<') || propType.startsWith('Array<{')) {
          console.log(`  📦 Array type detected: ${propType}`)
          properties.push({
            name: propName,
            type: propType.replace(/,$/, ''),
            required: !isOptional,
            isArray: true,
            isObject: false
          })
        }
        // Handle regular object types (non-array)
        else {
          console.log(`  🔧 Object type detected: ${propType}`)
          // Check if this is a complete inline object definition
          const openBraces = (propType.match(/\{/g) || []).length
          const closeBraces = (propType.match(/\}/g) || []).length
          
          console.log(`  📊 Braces count - open: ${openBraces}, close: ${closeBraces}`)
          
          if (openBraces === closeBraces && openBraces === 1) {
            // Complete inline object - treat as simple type
            console.log(`  ✅ Complete inline object`)
            properties.push({
              name: propName,
              type: propType.replace(/,$/, ''),
              required: !isOptional,
              isArray: false,
              isObject: false
            })
          } else {
            // Multi-line object type - need to parse nested properties
            console.log(`  🔍 Multi-line object - parsing nested properties...`)
            
            const nestedProps = []
            let braceCount = openBraces - closeBraces
            let nestedBody = propType.substring(propType.indexOf('{') + 1)
            
            i++
            while (i < lines.length && braceCount > 0) {
              const nestedLine = lines[i].trim()
              console.log(`    📝 Processing nested line: "${nestedLine}"`)
              
              if (nestedLine.includes('{')) braceCount++
              if (nestedLine.includes('}')) braceCount--
              
              if (braceCount > 0) {
                nestedBody += '\n' + nestedLine
              }
              i++
            }
            
            console.log(`  📦 Nested body extracted: "${nestedBody}"`)
            
            // Parse nested properties
            const nestedLines = nestedBody.split('\n')
            for (const nestedLine of nestedLines) {
              const trimmed = nestedLine.trim()
              const nestedMatch = trimmed.match(/^(\w+)(\??):\s*(.+)$/)
              if (nestedMatch) {
                console.log(`    ✅ Found nested property: ${nestedMatch[1]} : ${nestedMatch[3]}`)
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
        // Simple property
        console.log(`  ✨ Simple property`)
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

  return properties
}

// Test with actual footer template
console.log('🚀 Testing Interface Extraction\n')

const footerData = JSON.parse(fs.readFileSync('./component-blocks/available-footer-blocks.json', 'utf8'))
const multiColumnFooter = footerData.footers.find(f => f.id === 'footer-multi-column')

const rawInterface = extractRawInterface(multiColumnFooter.template)
console.log('📋 Raw interface name:', rawInterface.name)
console.log('📋 Raw interface body:')
console.log(rawInterface.body)
console.log('\n🔧 Parsing properties...\n')

const properties = parseInterfaceProperties(rawInterface.body)

console.log('\n📊 Final extracted properties:')
properties.forEach((prop, index) => {
  console.log(`${index + 1}. ${prop.name} (${prop.required ? 'required' : 'optional'})`)
  console.log(`   Type: ${prop.type}`)
  console.log(`   isObject: ${prop.isObject}, isArray: ${prop.isArray}`)
  if (prop.objectProperties) {
    console.log(`   Nested properties:`)
    prop.objectProperties.forEach(nested => {
      console.log(`     - ${nested.name}: ${nested.type} (${nested.required ? 'required' : 'optional'})`)
    })
  }
  console.log('')
})
