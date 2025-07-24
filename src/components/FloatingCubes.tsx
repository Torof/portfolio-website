'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Cube {
  id: number
  x: number
  y: number
  z: number
  size: number
  rotationX: number
  rotationY: number
  rotationZ: number
  opacity: number
  color: string
}

export default function FloatingCubes() {
  const [cubes, setCubes] = useState<Cube[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  // Initialize cubes
  useEffect(() => {
    const initialCubes: Cube[] = []
    const numCubes = 12
    
    const colors = [
      'from-blue-500/20 to-blue-600/30',
      'from-purple-500/20 to-purple-600/30', 
      'from-cyan-500/20 to-cyan-600/30',
      'from-indigo-500/20 to-indigo-600/30'
    ]

    for (let i = 0; i < numCubes; i++) {
      initialCubes.push({
        id: i,
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 300,
        size: 40 + Math.random() * 40,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        opacity: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    setCubes(initialCubes)
  }, [])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.005

      setCubes(prevCubes => 
        prevCubes.map(cube => ({
          ...cube,
          rotationX: cube.rotationX + 0.3,
          rotationY: cube.rotationY + 0.5,
          rotationZ: cube.rotationZ + 0.2,
          y: cube.y + Math.sin(timeRef.current + cube.id) * 0.8,
          x: cube.x + Math.cos(timeRef.current + cube.id * 0.5) * 0.3,
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
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1000px' }}>
      {cubes.map(cube => (
        <motion.div
          key={cube.id}
          className="absolute preserve-3d"
          style={{
            left: '50%',
            top: '50%',
            transform: `
              translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)
              rotateX(${cube.rotationX}deg)
              rotateY(${cube.rotationY}deg)
              rotateZ(${cube.rotationZ}deg)
            `,
            opacity: cube.opacity,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: cube.opacity }}
          transition={{ duration: 1, delay: cube.id * 0.1 }}
        >
          {/* 3D Cube */}
          <div 
            className="relative preserve-3d"
            style={{ width: cube.size, height: cube.size }}
          >
            {/* Front Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/20 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `translateZ(${cube.size / 2}px)`,
              }}
            />
            
            {/* Back Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/10 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `translateZ(${-cube.size / 2}px) rotateY(180deg)`,
              }}
            />
            
            {/* Right Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/15 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
              }}
            />
            
            {/* Left Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/15 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
              }}
            />
            
            {/* Top Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/10 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
              }}
            />
            
            {/* Bottom Face */}
            <div 
              className={`absolute bg-gradient-to-br ${cube.color} border border-white/10 backdrop-blur-sm`}
              style={{
                width: cube.size,
                height: cube.size,
                transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}