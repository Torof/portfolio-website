'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionTransition({ 
  children, 
  className = '', 
  delay = 0 
}: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom easing for smooth deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}