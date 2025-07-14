'use client'

import { PageBlock } from '@/lib/cms-types'
import { renderComponent } from '@/lib/component-registry'

interface PageRendererProps {
  blocks: PageBlock[]
  className?: string
}

export default function PageRenderer({ blocks, className = '' }: PageRendererProps) {
  // Sort blocks by order and filter visible ones
  const visibleBlocks = blocks
    .filter(block => block.isVisible !== false)
    .sort((a, b) => a.order - b.order)

  return (
    <div className={className}>
      {visibleBlocks.map((block) => (
        <div key={block.id}>
          {renderComponent(block.type, block.props)}
        </div>
      ))}
    </div>
  )
} 