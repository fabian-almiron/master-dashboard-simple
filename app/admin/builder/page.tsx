'use client'

import { Suspense } from 'react'
import PageBuilder from '@/components/cms/PageBuilder'

function BuilderContent() {
  return <PageBuilder />
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page builder...</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  )
} 