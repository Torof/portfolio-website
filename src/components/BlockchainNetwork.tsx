"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'validator' | 'contract' | 'transaction' | 'block';
  connections: string[];
  activity: number;
  lastActivity: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  activity: number;
  lastPulse: number;
}

export default function BlockchainNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Node types with different characteristics
    const nodeTypes = {
      validator: { color: '#10B981', size: 8, count: 8 }, // Emerald
      contract: { color: '#3B82F6', size: 6, count: 12 }, // Blue  
      transaction: { color: '#F59E0B', size: 4, count: 20 }, // Amber
      block: { color: '#8B5CF6', size: 10, count: 6 } // Purple
    };

    // Initialize network
    const initializeNetwork = () => {
      const nodes: Node[] = [];
      const connections: Connection[] = [];

      // Create nodes
      Object.entries(nodeTypes).forEach(([type, config]) => {
        for (let i = 0; i < config.count; i++) {
          const node: Node = {
            id: `${type}-${i}`,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: config.size + Math.random() * 3,
            type: type as Node['type'],
            connections: [],
            activity: Math.random(),
            lastActivity: Date.now()
          };
          nodes.push(node);
        }
      });

      // Create connections between nodes
      nodes.forEach(node => {
        const connectionCount = Math.floor(Math.random() * 4) + 1;
        const nearbyNodes = nodes
          .filter(n => n.id !== node.id)
          .sort((a, b) => {
            const distA = Math.sqrt((a.x - node.x) ** 2 + (a.y - node.y) ** 2);
            const distB = Math.sqrt((b.x - node.x) ** 2 + (b.y - node.y) ** 2);
            return distA - distB;
          })
          .slice(0, connectionCount + 3);

        for (let i = 0; i < Math.min(connectionCount, nearbyNodes.length); i++) {
          const target = nearbyNodes[i];
          const distance = Math.sqrt((target.x - node.x) ** 2 + (target.y - node.y) ** 2);
          
          if (distance < 300 && Math.random() > 0.3) {
            const connectionId = `${node.id}-${target.id}`;
            const reverseId = `${target.id}-${node.id}`;
            
            if (!connections.find(c => c.from === connectionId || c.from === reverseId)) {
              connections.push({
                from: node.id,
                to: target.id,
                strength: Math.random() * 0.8 + 0.2,
                activity: 0,
                lastPulse: Date.now() + Math.random() * 5000
              });
              
              node.connections.push(target.id);
              target.connections.push(node.id);
            }
          }
        }
      });

      nodesRef.current = nodes;
      connectionsRef.current = connections;
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNetwork();
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      const now = Date.now();
      
      // Clear canvas with theme-aware background
      ctx.fillStyle = theme === 'theme-light' 
        ? "rgba(249, 250, 251, 0.05)" 
        : "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connectionsRef.current.forEach(connection => {
        const fromNode = nodesRef.current.find(n => n.id === connection.from);
        const toNode = nodesRef.current.find(n => n.id === connection.to);
        
        if (!fromNode || !toNode) return;

        // Pulse activity
        if (now - connection.lastPulse > 3000 + Math.random() * 7000) {
          connection.activity = 1;
          connection.lastPulse = now;
          fromNode.activity = Math.min(1, fromNode.activity + 0.3);
          toNode.activity = Math.min(1, toNode.activity + 0.3);
        }

        connection.activity *= 0.98;

        // Draw connection line
        const opacity = (connection.strength * 0.3 + connection.activity * 0.7) * 
                       (theme === 'theme-light' ? 0.4 : 0.6);
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = theme === 'theme-light' 
          ? `rgba(99, 102, 241, ${opacity})`  // Indigo
          : `rgba(129, 140, 248, ${opacity})`; // Lighter indigo
        ctx.lineWidth = connection.activity * 2 + 0.5;
        ctx.stroke();

        // Draw pulse effect
        if (connection.activity > 0.1) {
          const pulseProgress = 1 - connection.activity;
          const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulseProgress;
          const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulseProgress;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, connection.activity * 3, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'theme-light'
            ? `rgba(59, 130, 246, ${connection.activity})`  // Blue
            : `rgba(96, 165, 250, ${connection.activity})`; // Lighter blue
          ctx.fill();
        }
      });

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary check with smooth bounce
        if (node.x <= node.size || node.x >= canvas.width - node.size) {
          node.vx *= -0.8;
          node.x = Math.max(node.size, Math.min(canvas.width - node.size, node.x));
        }
        if (node.y <= node.size || node.y >= canvas.height - node.size) {
          node.vy *= -0.8;
          node.y = Math.max(node.size, Math.min(canvas.height - node.size, node.y));
        }

        // Random activity
        if (Math.random() < 0.002) {
          node.activity = Math.min(1, node.activity + 0.5);
          node.lastActivity = now;
        }
        
        node.activity *= 0.99;

        // Get node color
        const baseColor = nodeTypes[node.type].color;
        const activityBoost = node.activity * 0.5;
        
        // Draw node glow
        if (node.activity > 0.1) {
          const glowRadius = node.size + node.activity * 8;
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowRadius
          );
          gradient.addColorStop(0, `${baseColor}40`);
          gradient.addColorStop(1, `${baseColor}00`);
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        
        // Node fill with activity-based brightness
        const opacity = 0.7 + activityBoost;
        ctx.fillStyle = theme === 'theme-light'
          ? `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
          : `${baseColor}${Math.floor((opacity * 0.9) * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Node border
        ctx.strokeStyle = theme === 'theme-light'
          ? `${baseColor}66`
          : `${baseColor}99`;
        ctx.lineWidth = 1 + node.activity;
        ctx.stroke();

        // Node type indicator (small inner circle for contracts and blocks)
        if (node.type === 'contract' || node.type === 'block') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'theme-light' ? '#ffffff' : '#1e293b';
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    initializeNetwork();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}