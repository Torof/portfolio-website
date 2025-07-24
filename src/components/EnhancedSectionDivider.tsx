'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface EnhancedSectionDividerProps {
  type?: 'wave' | 'gradient' | 'geometric' | 'fluid'
  fromColor?: string
  toColor?: string
  height?: number
}

export default function EnhancedSectionDivider({ 
  type = 'wave',
  fromColor = 'from-background',
  toColor = 'to-background',
  height = 150
}: EnhancedSectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  if (type === 'wave') {
    return (
      <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
        <motion.div 
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="url(#waveGradient)"
              className="animate-wave"
            />
          </svg>
        </motion.div>
        <div className={`absolute inset-0 bg-gradient-to-b ${fromColor} ${toColor} opacity-50`} />
      </div>
    )
  }

  if (type === 'gradient') {
    return (
      <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
        <motion.div 
          className="absolute inset-0"
          style={{ opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/20 to-pink-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    )
  }

  if (type === 'geometric') {
    return (
      <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
        <motion.div 
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <polygon
              points="0,120 300,60 600,90 900,30 1200,80 1200,120"
              fill="url(#grid)"
              className="animate-float"
            />
          </svg>
        </motion.div>
      </div>
    )
  }

  // Fluid type
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
      </motion.div>
    </div>
  )
}