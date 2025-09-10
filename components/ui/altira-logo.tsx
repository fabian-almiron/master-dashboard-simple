import React from 'react'

interface AltiraLogoProps {
  className?: string
  size?: number
}

export const AltiraLogo: React.FC<AltiraLogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer ring with gradient */}
        <defs>
          <linearGradient id="altira-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="altira-inner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#altira-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        
        {/* Inner geometric pattern */}
        <path
          d="M20 8 L28 16 L24 20 L20 16 L16 20 L12 16 L20 8 Z"
          fill="url(#altira-inner)"
          className="drop-shadow-sm"
        />
        
        {/* Bottom triangle */}
        <path
          d="M20 32 L12 24 L16 20 L20 24 L24 20 L28 24 L20 32 Z"
          fill="url(#altira-gradient)"
          opacity="0.8"
          className="drop-shadow-sm"
        />
        
        {/* Center diamond */}
        <path
          d="M20 16 L24 20 L20 24 L16 20 L20 16 Z"
          fill="white"
          className="drop-shadow-md"
        />
        
        {/* Center dot */}
        <circle
          cx="20"
          cy="20"
          r="2"
          fill="url(#altira-gradient)"
        />
      </svg>
    </div>
  )
}

export const AltiraIcon: React.FC<AltiraLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="altira-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {/* Simplified version for small sizes */}
        <path
          d="M12 4 L18 10 L15 13 L12 10 L9 13 L6 10 L12 4 Z"
          fill="url(#altira-icon-gradient)"
        />
        <path
          d="M12 20 L6 14 L9 11 L12 14 L15 11 L18 14 L12 20 Z"
          fill="url(#altira-icon-gradient)"
          opacity="0.7"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="white"
        />
      </svg>
    </div>
  )
}
