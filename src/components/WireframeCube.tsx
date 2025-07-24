'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Point3D {
  x: number
  y: number
  z: number
}

interface Point2D {
  x: number
  y: number
}

export default function WireframeCube() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  // Animation loop for gentle floating
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.01
      
      setRotation({
        x: Math.sin(timeRef.current * 0.3) * 8 + 15, // Gentle rocking on X axis
        y: Math.sin(timeRef.current * 0.2) * 12 + 25, // Slow sway on Y axis  
        z: Math.cos(timeRef.current * 0.25) * 5 + 5   // Subtle tilt on Z axis
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const cubeSize = 80

  // Define the 8 vertices of a cube
  const vertices: Point3D[] = [
    { x: -cubeSize/2, y: -cubeSize/2, z: -cubeSize/2 }, // 0: back-bottom-left
    { x:  cubeSize/2, y: -cubeSize/2, z: -cubeSize/2 }, // 1: back-bottom-right
    { x:  cubeSize/2, y:  cubeSize/2, z: -cubeSize/2 }, // 2: back-top-right
    { x: -cubeSize/2, y:  cubeSize/2, z: -cubeSize/2 }, // 3: back-top-left
    { x: -cubeSize/2, y: -cubeSize/2, z:  cubeSize/2 }, // 4: front-bottom-left
    { x:  cubeSize/2, y: -cubeSize/2, z:  cubeSize/2 }, // 5: front-bottom-right
    { x:  cubeSize/2, y:  cubeSize/2, z:  cubeSize/2 }, // 6: front-top-right
    { x: -cubeSize/2, y:  cubeSize/2, z:  cubeSize/2 }, // 7: front-top-left
  ]

  // Define the 12 edges (connecting vertex pairs)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
  ]

  // Rotate a 3D point with proper matrix multiplication
  const rotatePoint = (point: Point3D, rotX: number, rotY: number, rotZ: number): Point3D => {
    const radX = (rotX * Math.PI) / 180
    const radY = (rotY * Math.PI) / 180
    const radZ = (rotZ * Math.PI) / 180

    let { x, y, z } = point

    // Rotate around X axis
    const cosX = Math.cos(radX)
    const sinX = Math.sin(radX)
    const y1 = y * cosX - z * sinX
    const z1 = y * sinX + z * cosX
    y = y1
    z = z1

    // Rotate around Y axis
    const cosY = Math.cos(radY)
    const sinY = Math.sin(radY)
    const x1 = x * cosY + z * sinY
    const z2 = -x * sinY + z * cosY
    x = x1
    z = z2

    // Rotate around Z axis
    const cosZ = Math.cos(radZ)
    const sinZ = Math.sin(radZ)
    const x2 = x * cosZ - y * sinZ
    const y2 = x * sinZ + y * cosZ

    return { x: x2, y: y2, z }
  }

  // Project 3D point to 2D with better perspective
  const project = (point: Point3D): Point2D => {
    const distance = 500
    const scale = distance / (distance + point.z + 100) // Add offset to prevent division by zero
    return {
      x: point.x * scale,
      y: point.y * scale
    }
  }

  // Transform all vertices
  const transformedVertices = vertices.map(vertex => 
    project(rotatePoint(vertex, rotation.x, rotation.y, rotation.z))
  )

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        width="400"
        height="400"
        viewBox="-200 -200 400 400"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -10, 0] // Gentle floating up and down
        }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { duration: 1 },
          y: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }
        }}
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="subtle-grey" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="25%" stopColor="rgba(229, 231, 235, 0.5)" />
            <stop offset="50%" stopColor="rgba(209, 213, 219, 0.6)" />
            <stop offset="75%" stopColor="rgba(156, 163, 175, 0.5)" />
            <stop offset="100%" stopColor="rgba(107, 114, 128, 0.4)" />
          </linearGradient>
          
          <filter id="subtle-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Draw all 12 edges */}
        {edges.map((edge, index) => {
          const [startIdx, endIdx] = edge
          const start = transformedVertices[startIdx]
          const end = transformedVertices[endIdx]
          
          // All edges use the subtle grey gradient
          const strokeColor = "url(#subtle-grey)"
          
          return (
            <motion.line
              key={index}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              style={{
                filter: 'url(#subtle-glow)',
              }}
            />
          )
        })}

      </motion.svg>
    </div>
  )
}