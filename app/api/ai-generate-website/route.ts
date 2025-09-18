import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs/promises'
import path from 'path'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface FileStructure {
  [key: string]: string | FileStructure
}

async function createDirectoryStructure(basePath: string, structure: FileStructure) {
  for (const [name, content] of Object.entries(structure)) {
    const fullPath = path.join(basePath, name)
    
    if (typeof content === 'string') {
      // It's a file
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, content, 'utf-8')
    } else {
      // It's a directory
      await fs.mkdir(fullPath, { recursive: true })
      await createDirectoryStructure(fullPath, content)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 })
    }

    // Create the AI prompt for generating a complete Next.js website
    const systemPrompt = `You are an expert Next.js developer. Generate a complete, modern Next.js website based on the user's description. 

IMPORTANT REQUIREMENTS:
1. Use Next.js 14+ with App Router
2. Use TypeScript
3. Use Tailwind CSS for styling
4. Create a responsive, modern design
5. Include proper file structure with all necessary files
6. Use proper React components and hooks
7. Include proper SEO meta tags
8. Make it production-ready

CRITICAL: Return ONLY a valid JSON object with this structure:
{
  "files": {
    "package.json": "file content as escaped JSON string",
    "next.config.js": "file content as escaped JSON string",
    "tailwind.config.ts": "file content as escaped JSON string",
    "postcss.config.js": "file content as escaped JSON string", 
    "tsconfig.json": "file content as escaped JSON string",
    "src/app/layout.tsx": "file content as escaped JSON string",
    "src/app/page.tsx": "file content as escaped JSON string",
    "src/app/globals.css": "file content as escaped JSON string",
    "README.md": "file content as escaped JSON string"
  },
  "description": "Brief description of the generated website"
}

Requirements for file contents:
- Each file content must be a properly escaped JSON string (use \\n for newlines, \\" for quotes)
- Include all necessary dependencies in package.json (Next.js 14+, React 18+, TypeScript, Tailwind CSS)
- Create additional components and pages as needed based on the user's requirements
- Make sure all file paths use forward slashes
- Do not include any markdown formatting, code blocks, or extra text outside the JSON`

    const userPrompt = `Create a Next.js website based on this description: ${prompt}

Please generate all the necessary files for a complete, functional Next.js website. Include proper styling, components, and make it look professional and modern.`

    console.log('🤖 Generating website with Anthropic AI...')

    // Use streaming for long generations to avoid timeout
    const stream = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 32000, // Maximum tokens allowed for Claude Opus 4 - enables extremely comprehensive generation
      temperature: 0.7,
      stream: true,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })

    console.log('🎯 Streaming AI response...')

    // Collect the streamed response
    let fullResponse = ''
    let stopReason = null

    for await (const chunk of stream) {
      if (chunk.type === 'message_start') {
        // Message started
        continue
      } else if (chunk.type === 'content_block_delta') {
        if (chunk.delta.type === 'text_delta') {
          fullResponse += chunk.delta.text
        }
      } else if (chunk.type === 'message_delta') {
        if (chunk.delta.stop_reason) {
          stopReason = chunk.delta.stop_reason
        }
      } else if (chunk.type === 'message_stop') {
        // Message completed
        break
      }
    }

    // Handle Claude 4 refusal stop reason
    if (stopReason === 'refusal') {
      return NextResponse.json({ 
        error: 'AI declined to generate the requested content for safety reasons',
        details: 'Please try rephrasing your request or providing different requirements'
      }, { status: 400 })
    }

    console.log('🎯 AI Response received, parsing...')

    // Parse the AI response
    let generatedData
    try {
      // Clean the response text
      let cleanedResponse = fullResponse.trim()
      
      // Remove any markdown code blocks if present
      cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '')
      
      // Extract JSON from the response (find the largest JSON object)
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response')
      }
      
      generatedData = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', fullResponse.substring(0, 1000))
      return NextResponse.json({ 
        error: 'Failed to parse AI response', 
        details: parseError instanceof Error ? parseError.message : 'Unknown error',
        rawResponse: fullResponse.substring(0, 500) + '...'
      }, { status: 500 })
    }

    if (!generatedData.files) {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 })
    }

    // Create the ai-generated-site directory
    const projectRoot = process.cwd()
    const siteDir = path.join(projectRoot, 'ai-generated-site')

    // Remove existing directory if it exists
    try {
      await fs.rm(siteDir, { recursive: true, force: true })
    } catch (error) {
      // Directory doesn't exist, which is fine
    }

    // Create the new directory structure
    await fs.mkdir(siteDir, { recursive: true })

    console.log('📁 Creating file structure...')

    // Create all the files
    const files = generatedData.files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(siteDir, filePath)
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, content as string, 'utf-8')
    }

    console.log('✅ Website generated successfully!')

    return NextResponse.json({
      success: true,
      message: 'Website generated successfully!',
      description: generatedData.description || 'AI-generated Next.js website',
      filesCreated: Object.keys(files).length,
      location: 'ai-generated-site/',
      files: Object.keys(files)
    })

  } catch (error) {
    console.error('Error generating website:', error)
    
    return NextResponse.json({
      error: 'Failed to generate website',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
