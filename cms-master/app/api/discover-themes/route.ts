import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const themesDir = path.join(process.cwd(), 'themes')
    
    if (!fs.existsSync(themesDir)) {
      return NextResponse.json({
        success: false,
        error: 'Themes directory does not exist',
        themes: [],
        count: 0
      })
    }
    
    const themeDirs = fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    console.log(`🔍 Discovered themes: ${themeDirs.join(', ')}`)
    
    return NextResponse.json({
      success: true,
      themes: themeDirs,
      count: themeDirs.length
    })
  } catch (error) {
    console.error('Error discovering themes:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to discover themes',
      themes: [],
      count: 0
    })
  }
}


