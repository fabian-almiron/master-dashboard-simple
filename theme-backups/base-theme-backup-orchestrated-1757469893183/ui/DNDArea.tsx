"use client"

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Image, Video, Archive, X, Check } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

interface DndareaProps {
  onFilesUploaded?: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number; // in MB
  className?: string;
}

const Dndarea: React.FC<DndareaProps> = ({
  onFilesUploaded,
  acceptedTypes = ['*'],
  maxFiles = 10,
  maxFileSize = 10,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.includes('zip') || type.includes('rar')) return Archive;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File) => {
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }
    if (acceptedTypes.length > 0 && !acceptedTypes.includes('*')) {
      const isValid = acceptedTypes.some(type => 
        file.type.includes(type) || file.name.toLowerCase().endsWith(type)
      );
      if (!isValid) {
        return `File type not accepted. Accepted types: ${acceptedTypes.join(', ')}`;
      }
    }
    return null;
  };

  const handleFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (!error && uploadedFiles.length + validFiles.length < maxFiles) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(newFiles);
      setIsUploading(false);
      
      onFilesUploaded?.(newFiles);
    }
  }, [uploadedFiles, maxFiles, onFilesUploaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded?.(newFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Drop Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-theme-primary-500 bg-theme-primary-50 scale-[1.02]' 
            : 'border-theme-gray-300 hover:border-theme-primary-400 hover:bg-theme-gray-50'
          }
          ${isUploading ? 'pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5 rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Upload Icon with Animation */}
        <div className="relative z-10 text-center">
          <div className={`
            inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300
            ${isDragOver ? 'bg-theme-primary-500 text-white scale-110' : 'bg-theme-gray-100 text-theme-gray-600'}
            ${isUploading ? 'animate-pulse' : ''}
          `}>
            <Upload className={`w-8 h-8 transition-transform duration-300 ${isDragOver ? 'scale-110' : ''}`} />
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-theme-gray-900">
              {isUploading ? 'Uploading files...' : 'Drop files here or click to browse'}
            </h3>
            <p className="text-theme-gray-600">
              {acceptedTypes.includes('*') 
                ? `Upload up to ${maxFiles} files, max ${maxFileSize}MB each`
                : `Accepted: ${acceptedTypes.join(', ')} • Max ${maxFiles} files • ${maxFileSize}MB each`
              }
            </p>
          </div>

          {/* Progress Indicator */}
          {isUploading && (
            <div className="mt-6">
              <div className="w-32 h-1 bg-theme-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-theme-primary-500 rounded-full animate-pulse" style={{width: '60%'}} />
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept={acceptedTypes.includes('*') ? undefined : acceptedTypes.join(',')}
        />
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="text-lg font-semibold text-theme-gray-900 flex items-center gap-2">
            <Check className="w-5 h-5 text-theme-green-500" />
            Uploaded Files ({uploadedFiles.length})
          </h4>
          
          <div className="grid gap-3">
            {uploadedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file);
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-theme-gray-200 hover:border-theme-primary-300 transition-colors group"
                >
                  {/* File Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-theme-primary-100 rounded-lg flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-theme-primary-600" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-theme-gray-900 truncate">{file.name}</p>
                    <p className="text-sm text-theme-gray-600">{formatFileSize(file.size)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-gray-100 hover:bg-theme-red-100 text-theme-gray-600 hover:text-theme-red-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Stats */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 p-4 bg-theme-gray-50 rounded-xl">
          <div className="flex justify-between items-center text-sm text-theme-gray-600">
            <span>{uploadedFiles.length} of {maxFiles} files uploaded</span>
            <span>
              Total size: {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Advanced Drag & Drop Upload Area',
  description: 'Professional file upload component with drag-and-drop functionality, file validation, and upload progress',
  category: 'ui-primitives',
  icon: 'Upload',
};

export default Dndarea;