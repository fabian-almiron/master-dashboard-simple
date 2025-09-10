"use client"

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Image, Video, Archive, X, Check, AlertCircle } from 'lucide-react';
import { ComponentInfo } from '@/lib/cms-types';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'complete' | 'error';
  progress: number;
}

const Dndarea: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
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

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'complete', progress: 100 } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => simulateUpload(file.id));
  };

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
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Main Drop Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-theme-primary-500 bg-theme-primary-50 scale-[1.02]' 
            : 'border-theme-gray-300 bg-theme-gray-50 hover:border-theme-primary-400 hover:bg-theme-primary-25'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5 rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Upload Icon with Animation */}
        <div className={`
          inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300
          ${isDragOver 
            ? 'bg-theme-primary-500 text-white scale-110' 
            : 'bg-theme-primary-100 text-theme-primary-600'
          }
        `}>
          <Upload className={`w-10 h-10 transition-transform duration-300 ${isDragOver ? 'scale-110' : ''}`} />
        </div>

        {/* Main Text */}
        <h3 className="text-2xl font-semibold text-theme-gray-900 mb-3">
          Drop files here to upload
        </h3>
        <p className="text-theme-gray-600 mb-6 max-w-md mx-auto">
          Drag and drop your files here, or click to browse. Supports images, documents, videos, and archives.
        </p>

        {/* Browse Button */}
        <button className="
          inline-flex items-center px-6 py-3 bg-theme-primary-600 text-white rounded-lg font-medium
          hover:bg-theme-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl
        ">
          Browse Files
        </button>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept="*/*"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8 space-y-3">
          <h4 className="text-lg font-semibold text-theme-gray-900 mb-4">
            Uploaded Files ({files.length})
          </h4>
          
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type);
            
            return (
              <div
                key={file.id}
                className="
                  flex items-center p-4 bg-white rounded-xl border border-theme-gray-200 
                  shadow-sm hover:shadow-md transition-all duration-200
                "
              >
                {/* File Icon */}
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-lg mr-4
                  ${file.status === 'complete' 
                    ? 'bg-green-100 text-green-600' 
                    : file.status === 'error'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-theme-primary-100 text-theme-primary-600'
                  }
                `}>
                  <FileIcon className="w-6 h-6" />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-theme-gray-900 truncate">
                      {file.name}
                    </h5>
                    <span className="text-xs text-theme-gray-500 ml-2">
                      {formatFileSize(file.size)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {file.status === 'uploading' && (
                    <div className="w-full bg-theme-gray-200 rounded-full h-2 mb-1">
                      <div
                        className="bg-theme-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Status Text */}
                  <div className="flex items-center text-xs">
                    {file.status === 'uploading' && (
                      <span className="text-theme-primary-600">
                        Uploading... {Math.round(file.progress)}%
                      </span>
                    )}
                    {file.status === 'complete' && (
                      <span className="flex items-center text-green-600">
                        <Check className="w-3 h-3 mr-1" />
                        Upload complete
                      </span>
                    )}
                    {file.status === 'error' && (
                      <span className="flex items-center text-red-600">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Upload failed
                      </span>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="
                    ml-4 p-2 text-theme-gray-400 hover:text-red-500 hover:bg-red-50 
                    rounded-lg transition-colors duration-200
                  "
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Clear All Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setFiles([])}
              className="
                px-4 py-2 text-sm text-theme-gray-600 hover:text-red-600 
                hover:bg-red-50 rounded-lg transition-colors duration-200
              "
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const metadata: ComponentInfo = {
  type: 'Dndarea',
  name: 'Advanced Drag & Drop Upload Area',
  description: 'Interactive file upload component with drag-and-drop functionality, progress tracking, and file management',
  category: 'ui-primitives',
  icon: 'Upload',
};

export default Dndarea;