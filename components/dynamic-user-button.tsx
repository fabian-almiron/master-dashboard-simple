'use client'

import dynamic from 'next/dynamic'

// Dynamically import UserButton with no SSR
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => ({ default: mod.UserButton })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">U</span>
      </div>
    )
  }
)

export function DynamicUserButton(props: any) {
  return <UserButton {...props} />
}
