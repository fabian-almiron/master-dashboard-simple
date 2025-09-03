import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function POST(request: NextRequest) {
  try {
    const { backup_path } = await request.json()
    
    if (!backup_path) {
      return NextResponse.json(
        { error: 'Backup path is required' },
        { status: 400 }
      )
    }

    const baseThemePath = path.join(process.cwd(), 'cms-master', 'themes', 'base-theme')
    
    // Check if backup exists
    try {
      await fs.access(backup_path)
    } catch {
      return NextResponse.json(
        { error: 'Backup not found' },
        { status: 404 }
      )
    }

    // Remove current base-theme
    await fs.rm(baseThemePath, { recursive: true, force: true })
    
    // Restore from backup
    await copyDirectory(backup_path, baseThemePath)
    
    console.log(`✅ Base theme restored from backup: ${backup_path}`)

    return NextResponse.json({
      success: true,
      message: 'Base theme restored successfully',
      restored_from: backup_path
    })

  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json(
      { error: `Restore failed: ${(error as Error).message}` },
      { status: 500 }
    )
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
