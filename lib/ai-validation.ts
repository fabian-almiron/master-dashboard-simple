/**
 * AI Generation Validation Utilities
 * Ensures generated code follows proper JSX/React syntax
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  fixedCode?: string
}

/**
 * Validates and fixes common AI-generated JSX syntax errors
 */
export function validateAndFixJSX(code: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  let fixedCode = code

  // 1. Fix invalid style attributes (most common issue)
  // Pattern: style=sometext or style=123 or style=text with spaces
  const invalidStylePattern = /style=([^{][^>\s]*[^}])/g
  let invalidStyleMatch
  while ((invalidStyleMatch = invalidStylePattern.exec(code)) !== null) {
    const invalidValue = invalidStyleMatch[1]
    errors.push(`Invalid style attribute: style=${invalidValue}`)
    
    // Try to fix common patterns
    if (invalidValue.match(/^\d+\.?\d*s$/)) {
      // Animation duration: style=2.5s -> style={{animationDuration: '2.5s'}}
      fixedCode = fixedCode.replace(
        `style=${invalidValue}`, 
        `style={{animationDuration: '${invalidValue}'}}`
      )
    } else if (invalidValue.match(/^\d+\.?\d*$/)) {
      // Numeric value: style=123 -> remove or convert to delay
      fixedCode = fixedCode.replace(`style=${invalidValue}`, '')
      warnings.push(`Removed invalid numeric style: ${invalidValue}`)
    } else {
      // Text content: style=Some Text -> remove
      fixedCode = fixedCode.replace(`style=${invalidValue}`, '')
      warnings.push(`Removed invalid text style: ${invalidValue}`)
    }
  }

  // 2. Check for unclosed JSX tags
  const tagPattern = /<(\w+)(?:\s[^>]*)?(?:\s*\/>|>[^<]*<\/\1>)/g
  const openTagPattern = /<(\w+)(?:\s[^>]*)?(?!\/?>)/g
  const openTags = code.match(openTagPattern) || []
  const closedTags = code.match(tagPattern) || []
  
  if (openTags.length !== closedTags.length) {
    errors.push('Potential unclosed JSX tags detected')
  }

  // 3. Check for invalid attribute syntax
  const invalidAttrPattern = /\s+(\w+)=([^"'{][^>\s]*)/g
  let invalidAttrMatch
  while ((invalidAttrMatch = invalidAttrPattern.exec(code)) !== null) {
    const attrName = invalidAttrMatch[1]
    const attrValue = invalidAttrMatch[2]
    
    if (attrName !== 'style') { // style is handled above
      errors.push(`Invalid attribute syntax: ${attrName}=${attrValue}`)
      // Fix by adding quotes
      fixedCode = fixedCode.replace(
        `${attrName}=${attrValue}`,
        `${attrName}="${attrValue}"`
      )
    }
  }

  // 4. Validate React event handlers
  const eventHandlerPattern = /\s+(on\w+)=([^{][^>\s]*)/g
  let eventMatch
  while ((eventMatch = eventHandlerPattern.exec(code)) !== null) {
    errors.push(`Invalid event handler: ${eventMatch[1]}=${eventMatch[2]}`)
    warnings.push(`Event handlers should use {function} syntax`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fixedCode: fixedCode !== code ? fixedCode : undefined
  }
}

/**
 * Comprehensive AI prompt rules for generating valid JSX
 */
export const AI_GENERATION_RULES = `
CRITICAL JSX SYNTAX RULES - NEVER VIOLATE THESE:

1. STYLE ATTRIBUTES:
   ✅ CORRECT: style={{animationDuration: '2.5s', backgroundColor: 'red'}}
   ❌ WRONG: style=2.5s or style=red or style=some text

2. ALL ATTRIBUTES MUST HAVE PROPER VALUES:
   ✅ CORRECT: className="text-red-500" id="header"
   ❌ WRONG: className=text-red-500 or id=header

3. CUSTOM CSS PROPERTIES:
   ✅ CORRECT: style={{'--custom-var': '10px', color: 'var(--custom-var)'}}
   ❌ WRONG: --custom-var=10px

4. ANIMATION PROPERTIES:
   ✅ CORRECT: style={{animationDelay: '1s', animationDuration: '3s'}}
   ❌ WRONG: animation=3s or delay=1s

5. ALL JSX TAGS MUST BE PROPERLY CLOSED:
   ✅ CORRECT: <div></div> or <img />
   ❌ WRONG: <div> without closing or <img>

CREATIVE FREEDOM AREAS (ENCOURAGED):
- Create new CSS custom properties in styles.css
- Add new colors/animations to tailwind.config.ts  
- Use complex animations and effects
- Create innovative UI patterns
- Use glassmorphism, neumorphism, cyberpunk styles
- Add particle systems and interactive elements

THEME STRUCTURE REQUIREMENTS:
- Always use theme-* color classes (theme-primary-500, theme-gray-800, etc.)
- Add new theme variables to both styles.css AND tailwind.config.ts
- Export default component at the end
- Include proper TypeScript interfaces for props
- Use responsive design patterns

VALIDATION: Before outputting any component, verify:
1. All style attributes use proper object syntax
2. All tags are closed
3. All attributes have quoted values (except style objects and event handlers)
4. No syntax errors that would break compilation
`

/**
 * Validates theme file structure and content
 */
export function validateThemeStructure(themePath: string): Promise<ValidationResult> {
  // TODO: Implement file structure validation
  return Promise.resolve({ isValid: true, errors: [], warnings: [] })
}

/**
 * Auto-fixes common AI generation issues
 */
export function autoFixCommonIssues(code: string): string {
  let fixed = code

  // Fix common style attribute issues
  fixed = fixed.replace(/style=([^{][^>\s]*)/g, (match, value) => {
    if (value.match(/^\d+\.?\d*s$/)) {
      return `style={{animationDuration: '${value}'}}`
    }
    if (value.match(/^\d+\.?\d*$/)) {
      return '' // Remove invalid numeric styles
    }
    return '' // Remove other invalid styles
  })

  // Fix unquoted attributes (except style and event handlers)
  fixed = fixed.replace(/\s+(\w+)=([^"'{][^>\s]*)/g, (match, attr, value) => {
    if (attr.startsWith('on') || attr === 'style') {
      return match // Keep event handlers and style as-is
    }
    return ` ${attr}="${value}"`
  })

  return fixed
}
