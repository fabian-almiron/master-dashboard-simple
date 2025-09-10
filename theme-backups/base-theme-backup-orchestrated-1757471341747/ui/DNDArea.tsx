"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Upload, Music, Play, Pause, Volume2, Share2, Heart, MoreHorizontal } from 'lucide-react'
import { ComponentInfo } from '@/lib/cms-types'

const Dndarea: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('audio/')
    )
    
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files])
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type.startsWith('audio/')
    )
    
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files])
    }
  }, [])

  const togglePlayback = useCallback((index: number) => {
    if (currentTrack === index && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentTrack(index)
      setIsPlaying(true)
    }
  }, [currentTrack, isPlaying])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Main Drop Zone */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-theme-primary-500 bg-theme-primary-500/10 scale-105'
            : 'border-theme-gray-600 bg-theme-gray-900/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Animated Background Gradient */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDragging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.1) 0%, rgba(30, 215, 96, 0.1) 50%, rgba(29, 185, 84, 0.1) 100%)',
            backgroundSize: '400% 400%',
            animation: isDragging ? 'gradientShift 3s ease infinite' : 'none',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-12 text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${
            isDragging 
              ? 'bg-theme-primary-500 text-white scale-110' 
              : 'bg-theme-gray-800 text-theme-gray-400'
          }`}>
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            Drop your music here
          </h3>
          <p className="text-theme-gray-400 mb-6 max-w-md mx-auto">
            Drag and drop your audio files or click to browse. Support for MP3, WAV, FLAC, and more.
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-6 py-3 bg-theme-primary-500 hover:bg-theme-primary-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2 focus:ring-offset-theme-gray-900"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white">Your Playlist</h4>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-theme-gray-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-theme-gray-400 hover:text-theme-primary-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`group flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-theme-gray-800/50 ${
                  currentTrack === index && isPlaying
                    ? 'bg-theme-primary-500/10 border border-theme-primary-500/30'
                    : 'bg-theme-gray-900/30'
                }`}
              >
                {/* Play Button */}
                <button
                  onClick={() => togglePlayback(index)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-200 ${
                    currentTrack === index && isPlaying
                      ? 'bg-theme-primary-500 text-white'
                      : 'bg-theme-gray-700 text-theme-gray-300 group-hover:bg-theme-primary-500 group-hover:text-white'
                  }`}
                >
                  {currentTrack === index && isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <Music className="w-5 h-5 text-theme-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium truncate">
                        {file.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <p className="text-theme-gray-400 text-sm">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="hidden md:flex items-center space-x-1 mx-6">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        currentTrack === index && isPlaying
                          ? 'bg-theme-primary-500 animate-pulse'
                          : 'bg-theme-gray-600'
                      }`}
                      style={{
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-theme-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-theme-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  )
}

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Music Drop Zone',
  description: 'Interactive drag-and-drop area for music files with playlist functionality and audio visualization',
  category: 'ui-primitives',
  icon: 'Upload',
}

export default Dndarea