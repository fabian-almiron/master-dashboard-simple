"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Upload, FileText, Image, Video, Music, Archive, CheckCircle, X } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

interface DragFile {
  id: string
  file: File
  preview?: string
  status: 'uploading' | 'complete' | 'error'
  progress: number
}

const Dndarea: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<DragFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image
    if (file.type.startsWith('video/')) return Video
    if (file.type.startsWith('audio/')) return Music
    if (file.type.includes('zip') || file.type.includes('rar')) return Archive
    return FileText
  }

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: DragFile[] = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading' as const,
      progress: 0,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    setFiles(prev => [...prev, ...newFiles])

    newFiles.forEach(dragFile => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === dragFile.id) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100)
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? 'complete' : 'uploading'
            }
          }
          return f
        }))
      }, 200)

      setTimeout(() => clearInterval(interval), 3000)
    })
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragOver(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    dragCounter.current = 0

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
  }, [processFiles])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-theme-gray-800 mb-3">
          Share Your Files
        </h2>
        <p className="text-theme-gray-600 text-lg">
          Drag and drop files or click to browse
        </p>
      </div>

      <div
        className={`relative transition-all duration-500 ease-out ${
          isDragOver ? 'scale-105' : 'scale-100'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
            isDragOver
              ? 'border-theme-primary-400 bg-theme-primary-50 shadow-2xl'
              : 'border-theme-gray-300 bg-gradient-to-br from-white via-theme-gray-50 to-theme-primary-50 hover:border-theme-primary-300 hover:shadow-xl'
          }`}
          onClick={() => fileInputRef.current?.click()}
          style={{
            backgroundImage: isDragOver 
              ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              : undefined
          }}
        >
          <div className={`transition-all duration-300 ${isDragOver ? 'scale-110' : 'scale-100'}`}>
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${
              isDragOver 
                ? 'bg-theme-primary-200 text-theme-primary-700' 
                : 'bg-gradient-to-br from-theme-primary-100 to-theme-primary-200 text-theme-primary-600'
            }`}>
              <Upload className="w-8 h-8" />
            </div>
            
            <h3 className={`text-xl font-medium mb-3 transition-colors duration-300 ${
              isDragOver ? 'text-theme-primary-700' : 'text-theme-gray-700'
            }`}>
              {isDragOver ? 'Drop files here' : 'Upload your files'}
            </h3>
            
            <p className={`text-sm mb-6 transition-colors duration-300 ${
              isDragOver ? 'text-theme-primary-600' : 'text-theme-gray-500'
            }`}>
              {isDragOver 
                ? 'Release to upload' 
                : 'Drag and drop files here, or click to select files'
              }
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 text-xs text-theme-gray-400">
              <span className="px-3 py-1 bg-white rounded-full border border-theme-gray-200">
                Images
              </span>
              <span className="px-3 py-1 bg-white rounded-full border border-theme-gray-200">
                Documents
              </span>
              <span className="px-3 py-1 bg-white rounded-full border border-theme-gray-200">
                Videos
              </span>
              <span className="px-3 py-1 bg-white rounded-full border border-theme-gray-200">
                Audio
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-theme-gray-700 mb-4">
            Uploaded Files ({files.length})
          </h3>
          
          <div className="grid gap-4">
            {files.map((dragFile) => {
              const IconComponent = getFileIcon(dragFile.file)
              
              return (
                <div
                  key={dragFile.id}
                  className="flex items-center p-4 bg-white rounded-2xl border border-theme-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {dragFile.preview ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={dragFile.preview}
                        alt={dragFile.file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-theme-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-theme-primary-600" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-theme-gray-900 truncate">
                      {dragFile.file.name}
                    </p>
                    <p className="text-xs text-theme-gray-500">
                      {formatFileSize(dragFile.file.size)}
                    </p>
                    
                    {dragFile.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-theme-gray-500 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(dragFile.progress)}%</span>
                        </div>
                        <div className="w-full bg-theme-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-theme-primary-500 to-theme-primary-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${dragFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center ml-4">
                    {dragFile.status === 'complete' && (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    )}
                    <button
                      onClick={() => removeFile(dragFile.id)}
                      className="p-1 text-theme-gray-400 hover:text-theme-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Zen File Upload Area',
  description: 'A serene drag-and-drop file upload component with organic curves, gentle animations, and mindful interaction design',
  category: 'ui-primitives',
  icon: 'Upload',
}

export default Dndarea