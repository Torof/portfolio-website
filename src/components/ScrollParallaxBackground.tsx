'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Box, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/lib/context/ThemeContext';

interface FloatingCubeProps {
  position: [number, number, number];
  scale: number;
  color: string;
}

function FloatingCube({ position, scale, color }: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const index = position[0] + position[1] + position[2]; // Unique identifier for each cube
      
      // Orbital motion - each cube orbits around its original position
      const orbitRadius = 0.8;
      const orbitSpeed = 0.15;
      meshRef.current.position.x = position[0] + Math.cos(time * orbitSpeed + index) * orbitRadius;
      meshRef.current.position.z = position[2] + Math.sin(time * orbitSpeed + index) * orbitRadius;
      
      // Figure-8 vertical motion (lissajous curve)
      meshRef.current.position.y = position[1] + Math.sin(time * 0.2 + index) * 1.2 + Math.cos(time * 0.4 + index) * 0.6;
      
      // Dynamic rotation based on movement
      meshRef.current.rotation.x = time * 0.0008 + Math.sin(time * 0.3 + index) * 0.1;
      meshRef.current.rotation.y = time * 0.0006 + Math.cos(time * 0.25 + index) * 0.1;
      meshRef.current.rotation.z = Math.sin(time * 0.18 + index) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <Box
        position={position}
        args={[scale, scale, scale]}
      >
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
        />
        <Edges color={color} linewidth={2} />
      </Box>
    </group>
  );
}

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function ConnectionLine({ start, end, color }: ConnectionLineProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      // Slower opacity animation
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      
      // Update line positions to follow cubes with new movement patterns
      const time = state.clock.elapsedTime;
      const startIndex = start[0] + start[1] + start[2];
      const endIndex = end[0] + end[1] + end[2];
      
      const positions = lineRef.current.geometry.attributes.position;
      
      // Match orbital motion for start point
      const orbitRadius = 0.8;
      const orbitSpeed = 0.15;
      positions.setX(0, start[0] + Math.cos(time * orbitSpeed + startIndex) * orbitRadius);
      positions.setZ(0, start[2] + Math.sin(time * orbitSpeed + startIndex) * orbitRadius);
      positions.setY(0, start[1] + Math.sin(time * 0.2 + startIndex) * 1.2 + Math.cos(time * 0.4 + startIndex) * 0.6);
      
      // Match orbital motion for end point
      positions.setX(1, end[0] + Math.cos(time * orbitSpeed + endIndex) * orbitRadius);
      positions.setZ(1, end[2] + Math.sin(time * orbitSpeed + endIndex) * orbitRadius);
      positions.setY(1, end[1] + Math.sin(time * 0.2 + endIndex) * 1.2 + Math.cos(time * 0.4 + endIndex) * 0.6);
      
      positions.needsUpdate = true;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.15}
    />
  );
}

function ParallaxScene() {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const cubeColor = theme === 'theme-light' ? '#3b82f6' : '#0ea5e9';
  const gridColor = theme === 'theme-light' ? '#60a5fa' : '#0ea5e9';
  
  // Generate random positions for cubes
  const cubePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 15; i++) {
      positions.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ]);
    }
    return positions;
  }, []);
  
  // Generate connections between nearby cubes
  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    
    for (let i = 0; i < cubePositions.length; i++) {
      for (let j = i + 1; j < cubePositions.length; j++) {
        const distance = Math.sqrt(
          Math.pow(cubePositions[i][0] - cubePositions[j][0], 2) +
          Math.pow(cubePositions[i][1] - cubePositions[j][1], 2) +
          Math.pow(cubePositions[i][2] - cubePositions[j][2], 2)
        );
        
        // Connect cubes that are close enough - reduced distance for cleaner look
        if (distance < 5) {
          lines.push({
            start: cubePositions[i],
            end: cubePositions[j]
          });
        }
      }
    }
    
    return lines;
  }, [cubePositions]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Floating cubes */}
      {cubePositions.map((position, index) => (
        <FloatingCube
          key={index}
          position={position}
          scale={0.3 + Math.random() * 0.4}
          color={cubeColor}
        />
      ))}
      
      {/* Connection lines */}
      {connections.map((connection, index) => (
        <ConnectionLine
          key={index}
          start={connection.start}
          end={connection.end}
          color={cubeColor}
        />
      ))}
      
      {/* Grid lines */}
      <gridHelper 
        args={[30, 30, gridColor, gridColor]} 
        position={[0, -8, 0]}
        material-opacity={0.05}
        material-transparent={true}
      />
    </>
  );
}

export default function ScrollParallaxBackground() {
  return (
    <div 
      className="fixed inset-0" 
      style={{ 
        zIndex: -9999,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParallaxScene />
      </Canvas>
    </div>
  );
}