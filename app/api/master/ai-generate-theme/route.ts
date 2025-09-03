import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import path from 'path'
import fs from 'fs/promises'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ThemeGenerationRequest {
  ai_customization_message: string
  target_industry?: string
  design_style?: string
  primary_color?: string
  site_name: string
  instance_id?: string
  create_physical_files?: boolean
}

interface ThemeFile {
  path: string
  content: string
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      )
    }

    const body: ThemeGenerationRequest = await request.json()
    
    if (!body.ai_customization_message) {
      return NextResponse.json(
        { error: 'AI customization message is required' },
        { status: 400 }
      )
    }

    // Load AI rules
    const rulesPath = path.join(process.cwd(), 'ai-theme-customization-rules.json')
    const aiRules = JSON.parse(await fs.readFile(rulesPath, 'utf-8'))

    // Load base theme for reference and get backup
    const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
    const baseThemeFiles = await loadBaseTheme(baseThemePath)
    
    // Create backup of original base-theme before modifications
    const backupPath = await createBaseThemeBackup(baseThemePath, body.instance_id)

    // Generate customized theme using Claude API
    const customTheme = await generateThemeWithClaude(body, aiRules, baseThemeFiles)

    // Modify the base-theme directly with AI customizations
    await modifyBaseThemeInPlace(baseThemePath, customTheme.files)

    return NextResponse.json({
      success: true,
      theme_name: customTheme.theme_name,
      theme_id: 'base-theme', // Always use base-theme
      theme_description: customTheme.theme_description,
      files_modified: customTheme.files.length,
      backup_path: backupPath,
      modifications_applied: true
    })

  } catch (error) {
    console.error('Theme generation error:', error)
    return NextResponse.json(
      { error: `Theme generation failed: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}

async function loadBaseTheme(baseThemePath: string): Promise<ThemeFile[]> {
  const files: ThemeFile[] = []
  
  const loadFiles = async (dir: string, relativePath: string = '') => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relPath = path.join(relativePath, entry.name)
      
      if (entry.isDirectory()) {
        await loadFiles(fullPath, relPath)
      } else if (entry.isFile() && (
        entry.name.endsWith('.tsx') ||
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.css') ||
        entry.name.endsWith('.md') ||
        entry.name.endsWith('.js')
      )) {
        const content = await fs.readFile(fullPath, 'utf-8')
        files.push({
          path: relPath,
          content
        })
      }
    }
  }
  
  await loadFiles(baseThemePath)
  return files
}

async function generateThemeWithClaude(
  request: ThemeGenerationRequest,
  aiRules: any,
  baseThemeFiles: ThemeFile[]
): Promise<{ theme_name: string; theme_description: string; files: ThemeFile[] }> {
  
  const industryContext = request.target_industry ? `for the ${request.target_industry} industry` : ''
  const styleContext = request.design_style ? `with a ${request.design_style} design style` : ''
  const colorContext = request.primary_color ? `using ${request.primary_color} as the primary color` : ''
  
  const systemPrompt = `You are an expert web designer and React developer. You will customize the existing CMS TailWinds base-theme based on user requirements.

CRITICAL REQUIREMENTS:
${JSON.stringify(aiRules, null, 2)}

IMPORTANT CONTEXT:
- You are MODIFYING the existing base-theme, not creating a new theme
- The theme will always be called "base-theme" and live in cms-master/themes/base-theme/
- You have COMPLETE FREEDOM to modify colors, components, layouts, content, and styling
- You can edit existing components or create entirely new ones
- Maintain the exact folder structure and technical requirements

YOU MUST:
1. Keep the exact folder structure (ui/, styles.css, auto-register.tsx, etc.)
2. Modify ALL files to match the user's vision completely
3. Update colors, typography, layouts, and content
4. Ensure all components export proper metadata
5. Make the theme responsive and accessible
6. Use industry-appropriate content and styling
7. Be creative and bold with design changes

CRITICAL RESPONSE FORMAT:
You MUST respond with ONLY valid JSON in a code block. Structure:

Start with: triple-backticks + json
{
  "theme_name": "descriptive-theme-name",
  "theme_description": "Description of the customized theme", 
  "files": [
    {
      "path": "auto-register.tsx",
      "content": "modified file content here..."
    },
    {
      "path": "styles.css",
      "content": "completely new CSS with custom colors..."
    }
  ]
}
End with: triple-backticks

IMPORTANT: 
- Wrap JSON in code block
- Include ALL modified files
- Ensure valid JSON syntax
- No explanatory text outside the JSON block

Transform the base-theme completely to match the user's vision!`

  const userPrompt = `USER REQUEST: "${request.ai_customization_message}"
SITE NAME: "${request.site_name}"
CONTEXT: Creating a theme ${industryContext} ${styleContext} ${colorContext}

BASE THEME FILES FOR REFERENCE:
${JSON.stringify(baseThemeFiles.slice(0, 3), null, 2)}

Create a complete custom theme that transforms the base theme according to the user's requirements. Return the complete theme as JSON.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: userPrompt
    }]
  })

  const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
  
  console.log('🤖 Claude Response Length:', responseText.length)
  console.log('🔍 First 500 chars:', responseText.substring(0, 500))
  
  // Try multiple JSON extraction methods
  let jsonContent = null
  
  // Method 1: Look for ```json blocks
  let jsonMatch = responseText.match(/```json\s*\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    jsonContent = jsonMatch[1]
    console.log('📦 Found JSON in ```json block')
  }
  
  // Method 2: Look for any ``` blocks
  if (!jsonContent) {
    jsonMatch = responseText.match(/```\s*\n([\s\S]*?)\n```/)
    if (jsonMatch) {
      jsonContent = jsonMatch[1]
      console.log('📦 Found JSON in ``` block')
    }
  }
  
  // Method 3: Look for { ... } JSON structure
  if (!jsonContent) {
    jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonContent = jsonMatch[0]
      console.log('📦 Found JSON structure directly')
    }
  }
  
  // Method 4: Try the entire response
  if (!jsonContent) {
    jsonContent = responseText.trim()
    console.log('📦 Using entire response as JSON')
  }

  try {
    const parsed = JSON.parse(jsonContent)
    console.log('✅ Successfully parsed JSON with keys:', Object.keys(parsed))
    return parsed
  } catch (error) {
    console.error('❌ JSON Parse Error:', error.message)
    console.error('🔍 Attempted to parse:', jsonContent.substring(0, 200) + '...')
    throw new Error(`Failed to parse theme JSON: ${error.message}`)
  }
}

async function createBaseThemeBackup(baseThemePath: string, instanceId?: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupId = instanceId ? `${instanceId.slice(0, 8)}-${timestamp}` : timestamp
  const backupPath = path.join(process.cwd(), 'theme-backups', `base-theme-backup-${backupId}`)
  
  try {
    // Create backup directory
    await fs.mkdir(path.dirname(backupPath), { recursive: true })
    
    // Copy entire base-theme directory to backup
    await copyDirectory(baseThemePath, backupPath)
    
    console.log(`💾 Base theme backup created: ${backupPath}`)
    return backupPath
    
  } catch (error) {
    console.error(`❌ Failed to create backup: ${error}`)
    throw new Error(`Failed to create backup: ${(error as Error).message}`)
  }
}

async function modifyBaseThemeInPlace(baseThemePath: string, themeFiles: ThemeFile[]): Promise<void> {
  try {
    console.log(`🔧 Modifying base-theme in place...`)
    
    // Modify each file in the base-theme
    for (const file of themeFiles) {
      const filePath = path.join(baseThemePath, file.path)
      const fileDir = path.dirname(filePath)
      
      // Create subdirectories if needed
      await fs.mkdir(fileDir, { recursive: true })
      
      // Write/overwrite file content
      await fs.writeFile(filePath, file.content, 'utf-8')
      console.log(`✏️  Modified: ${file.path}`)
    }
    
    console.log(`✅ Base theme modified successfully with ${themeFiles.length} files`)
    
  } catch (error) {
    console.error(`❌ Failed to modify base theme: ${error}`)
    throw new Error(`Failed to modify base theme: ${(error as Error).message}`)
  }
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}
