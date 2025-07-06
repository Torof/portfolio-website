"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters - mix of tech symbols and binary
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Drawing the characters
    function draw() {
      if (!ctx || !canvas) return;
      
      // Black background with opacity for trail effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.font = fontSize + "px monospace";
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Gradient effect - brighter at the bottom
        const opacity = Math.min(1, drops[i] / 20);
        
        // Color based on theme colors
        if (Math.random() > 0.98) {
          // Occasional bright characters
          ctx.fillStyle = `rgba(79, 70, 229, ${opacity})`;
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 0.8})`;
        }
        
        ctx.fillText(text, x, y);
        
        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
    }

    // Animation loop
    const intervalId = setInterval(draw, 35);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}