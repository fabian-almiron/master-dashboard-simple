import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { themeData, componentType } = body

    // Define paths
    const sourcePath = '/Users/mac/Documents/9S/AI Theme Gen for Theme /Page Builder CMS + Dashboard/cms-master/themes/base-theme'
    const targetPath = '/Users/mac/Documents/9S/AI Theme Gen for Theme /cms-tailwinds/themes/base-theme'

    // Ensure target directory exists
    await fs.mkdir(targetPath, { recursive: true })
    await fs.mkdir(path.join(targetPath, 'ui'), { recursive: true })

    // Copy all theme files
    const copyDirectory = async (src: string, dest: string) => {
      try {
        const entries = await fs.readdir(src, { withFileTypes: true })
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name)
          const destPath = path.join(dest, entry.name)
          
          if (entry.isDirectory()) {
            await fs.mkdir(destPath, { recursive: true })
            await copyDirectory(srcPath, destPath)
          } else {
            await fs.copyFile(srcPath, destPath)
          }
        }
      } catch (error) {
        console.error(`Error copying directory ${src}:`, error)
        throw error
      }
    }

    // Copy the entire base-theme directory
    await copyDirectory(sourcePath, targetPath)

    // Log the push operation
    const timestamp = new Date().toISOString()
    const logEntry = `${timestamp} - Theme pushed to test environment\n`
    const logPath = '/Users/mac/Documents/9S/AI Theme Gen for Theme /cms-tailwinds/theme-push-log.txt'
    
    try {
      await fs.appendFile(logPath, logEntry)
    } catch (error) {
      // If log file doesn't exist, create it
      await fs.writeFile(logPath, logEntry)
    }

    return NextResponse.json({
      success: true,
      message: 'Theme successfully pushed to test environment',
      target_path: targetPath,
      timestamp: timestamp,
      files_copied: true
    })

  } catch (error) {
    console.error('Push to test environment failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
