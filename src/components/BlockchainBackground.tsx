'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Block {
  id: number
  x: number
  y: number
  z: number
  rotationY: number
  hash: string
  timestamp: string
}

export default function BlockchainBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  // Generate random hash-like string
  const generateHash = () => {
    const chars = '0123456789abcdef'
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }

  // Initialize blocks in a linear chain
  useEffect(() => {
    const initialBlocks: Block[] = []
    const numBlocks = 6
    const blockSpacing = 200 // Distance between each block
    
    // Create a linear chain of blocks
    for (let i = 0; i < numBlocks; i++) {
      initialBlocks.push({
        id: i,
        x: (i - (numBlocks - 1) / 2) * blockSpacing, // Center the chain horizontally
        y: 0, // Keep all blocks at same height initially
        z: 0, // Start flat, will animate in 3D
        rotationY: 0,
        hash: generateHash(),
        timestamp: new Date(Date.now() - (numBlocks - i - 1) * 60000).toISOString().slice(11, 19) // Different timestamps
      })
    }

    setBlocks(initialBlocks)
  }, [])

  // Chain rotation and animation
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.006

      setBlocks(prevBlocks => 
        prevBlocks.map((block, index) => ({
          ...block,
          // Rotate the entire chain around Y axis
          rotationY: timeRef.current * 30,
          // Add some wave motion to the chain
          y: Math.sin(timeRef.current * 2 + index * 0.8) * 30,
          z: Math.cos(timeRef.current * 2 + index * 0.8) * 50,
        }))
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
    >
      {/* 3D Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center preserve-3d">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            className="absolute preserve-3d"
            style={{
              transform: `
                translate3d(${block.x}px, ${block.y}px, ${block.z}px)
                rotateY(${block.rotationY}deg)
              `,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            {/* 3D Cube */}
            <div className="relative preserve-3d w-24 h-24">
              {/* Front Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-600/30 border border-blue-400/50 backdrop-blur-sm"
                style={{
                  transform: 'translateZ(12px)',
                }}
              >
                <div className="p-3 h-full flex flex-col justify-between text-white">
                  <div className="text-xs font-mono text-blue-200">
                    Block #{block.id.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs font-mono text-purple-200 break-all">
                    {block.hash}
                  </div>
                  <div className="text-xs font-mono text-gray-300">
                    {block.timestamp}
                  </div>
                </div>
              </div>

              {/* Back Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-purple-600/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-sm"
                style={{
                  transform: 'translateZ(-12px) rotateY(180deg)',
                }}
              >
                <div className="p-3 h-full flex items-center justify-center">
                  <div className="text-xs font-mono text-gray-400">
                    Hash: {block.hash}
                  </div>
                </div>
              </div>

              {/* Right Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-purple-500/25 to-pink-500/25 border border-purple-400/40 backdrop-blur-sm"
                style={{
                  transform: 'rotateY(90deg) translateZ(12px)',
                }}
              >
                <div className="p-3 h-full flex items-center justify-center">
                  <div className="text-xs font-mono text-pink-200">
                    Prev: {block.id > 0 ? blocks[block.id - 1]?.hash : 'Genesis'}
                  </div>
                </div>
              </div>

              {/* Left Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-blue-500/25 to-cyan-500/25 border border-blue-400/40 backdrop-blur-sm"
                style={{
                  transform: 'rotateY(-90deg) translateZ(12px)',
                }}
              >
                <div className="p-3 h-full flex items-center justify-center">
                  <div className="text-xs font-mono text-cyan-200">
                    Next: {block.id < blocks.length - 1 ? blocks[block.id + 1]?.hash : 'Pending'}
                  </div>
                </div>
              </div>

              {/* Top Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 border border-blue-300/30 backdrop-blur-sm"
                style={{
                  transform: 'rotateX(90deg) translateZ(12px)',
                }}
              />

              {/* Bottom Face */}
              <div 
                className="absolute w-24 h-24 bg-gradient-to-br from-purple-500/15 to-blue-600/15 border border-purple-300/25 backdrop-blur-sm"
                style={{
                  transform: 'rotateX(-90deg) translateZ(12px)',
                }}
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-400/10 blur-lg scale-150 animate-pulse-glow" />
            </div>

            {/* Chain Link to Next Block */}
            {index < blocks.length - 1 && (
              <div className="absolute top-1/2 left-full preserve-3d">
                {/* Main connecting bar */}
                <div 
                  className="relative w-32 h-6 bg-gradient-to-r from-blue-500/40 to-purple-500/40 border border-blue-400/50"
                  style={{
                    transform: 'translateY(-50%) translateZ(0px)',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  {/* Top face of chain link */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                    style={{
                      transform: 'rotateX(90deg) translateZ(3px)',
                      transformOrigin: 'top'
                    }}
                  />
                  {/* Bottom face of chain link */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                    style={{
                      transform: 'rotateX(-90deg) translateZ(3px)',
                      transformOrigin: 'bottom'
                    }}
                  />
                  
                  {/* Chain link content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-mono text-blue-200 opacity-80">
                      LINK #{index + 1}
                    </div>
                  </div>
                  
                  {/* Glow effect for chain link */}
                  <div className="absolute inset-0 bg-blue-400/20 blur-md scale-110" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}