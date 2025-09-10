"use client"

import React from 'react'
import { ComponentInfo } from '@/lib/cms-types'

export const metadata: ComponentInfo = {
  type: 'Footer',
  name: 'Footer',
  description: 'Custom cyberpunk_footer footer component',
  category: 'layout',
  icon: 'Square',
}

export default function Footer() {
  return (
    <div className="w-full bg-theme-primary-500 text-white p-8">
      <div className="theme-container">
        <h2 className="text-2xl font-bold">Level Up Your Reality</h2>
        <p className="text-theme-gray-100">Next-Gen Gaming Experiences Await</p>
      </div>
    </div>
  )
}