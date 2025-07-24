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

interface Cube {
  id: number
  offsetX: number
  offsetY: number
  offsetZ: number
  delay: number
  size: number
}

export default function WireframeCubeChain() {
  const [time, setTime] = useState(0)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  // Animation loop for gentle floating
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.01
      setTime(timeRef.current)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Create cubes with maximum spacing throughout the section
  const cubes: Cube[] = [
    // Far left corner
    { id: 0, offsetX: -850, offsetY: -180, offsetZ: 70, delay: 0, size: 65 },
    
    // Left side - more spread
    { id: 1, offsetX: -650, offsetY: 120, offsetZ: -50, delay: 0.3, size: 55 },
    { id: 2, offsetX: -500, offsetY: -120, offsetZ: 40, delay: 0.6, size: 70 },
    
    // Left-center - wider gaps
    { id: 3, offsetX: -350, offsetY: 220, offsetZ: -30, delay: 0.9, size: 50 },
    { id: 4, offsetX: -200, offsetY: -200, offsetZ: 90, delay: 1.2, size: 75 },
    
    // Center area - more separated
    { id: 5, offsetX: -50, offsetY: 150, offsetZ: 20, delay: 1.5, size: 45 },
    { id: 6, offsetX: 100, offsetY: -80, offsetZ: -60, delay: 1.8, size: 80 },
    
    // Right-center - wider spacing
    { id: 7, offsetX: 280, offsetY: 200, offsetZ: 50, delay: 2.1, size: 60 },
    { id: 8, offsetX: 450, offsetY: -160, offsetZ: 10, delay: 2.4, size: 65 },
    
    // Right side - more spread
    { id: 9, offsetX: 620, offsetY: 80, offsetZ: -40, delay: 2.7, size: 55 },
    { id: 10, offsetX: 780, offsetY: -50, offsetZ: 80, delay: 3.0, size: 70 },
    
    // Far right corner
    { id: 11, offsetX: 880, offsetY: 170, offsetZ: 30, delay: 3.3, size: 50 },
  ]

  // Define the 8 vertices of a cube (relative to center)
  const getVertices = (size: number): Point3D[] => [
    { x: -size/2, y: -size/2, z: -size/2 }, // 0: back-bottom-left
    { x:  size/2, y: -size/2, z: -size/2 }, // 1: back-bottom-right
    { x:  size/2, y:  size/2, z: -size/2 }, // 2: back-top-right
    { x: -size/2, y:  size/2, z: -size/2 }, // 3: back-top-left
    { x: -size/2, y: -size/2, z:  size/2 }, // 4: front-bottom-left
    { x:  size/2, y: -size/2, z:  size/2 }, // 5: front-bottom-right
    { x:  size/2, y:  size/2, z:  size/2 }, // 6: front-top-right
    { x: -size/2, y:  size/2, z:  size/2 }, // 7: front-top-left
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
    const scale = distance / (distance + point.z + 100)
    return {
      x: point.x * scale,
      y: point.y * scale
    }
  }

  // Calculate rotation for each cube - simple floating motion
  const getCubeRotation = (cube: Cube) => {
    const adjustedTime = time + cube.delay
    
    return {
      x: Math.sin(adjustedTime * 0.3) * 8 + 15,
      y: Math.sin(adjustedTime * 0.2) * 12 + 25,
      z: Math.cos(adjustedTime * 0.25) * 5 + 5
    }
  }

  // Transform vertices for a specific cube
  const getTransformedVertices = (cube: Cube) => {
    const vertices = getVertices(cube.size)
    const rotation = getCubeRotation(cube)
    
    return vertices.map(vertex => {
      // Apply cube-specific offset first
      const offsetVertex = {
        x: vertex.x + cube.offsetX,
        y: vertex.y + cube.offsetY,
        z: vertex.z + cube.offsetZ
      }
      
      return project(rotatePoint(offsetVertex, rotation.x, rotation.y, rotation.z))
    })
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        width="1800"
        height="600"
        viewBox="-900 -300 1800 600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -15, 0] // Gentle floating for entire chain
        }}
        transition={{ 
          opacity: { duration: 1.5 },
          scale: { duration: 1.5 },
          y: { 
            duration: 6, 
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
        
        {/* Draw all cubes */}
        {cubes.map(cube => {
          const transformedVertices = getTransformedVertices(cube)
          
          return (
            <g key={cube.id}>
              {/* Draw all 12 edges for this cube */}
              {edges.map((edge, edgeIndex) => {
                const [startIdx, endIdx] = edge
                const start = transformedVertices[startIdx]
                const end = transformedVertices[endIdx]
                
                // All cubes have same opacity for unified chain look
                const opacity = 0.9
                
                return (
                  <motion.line
                    key={`${cube.id}-edge-${edgeIndex}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="url(#subtle-grey)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity={opacity}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity }}
                    transition={{ 
                      duration: 2, 
                      delay: cube.delay + edgeIndex * 0.05,
                      ease: "easeInOut"
                    }}
                    style={{
                      filter: 'url(#subtle-glow)',
                    }}
                  />
                )
              })}

            </g>
          )
        })}
      </motion.svg>
    </div>
  )
}