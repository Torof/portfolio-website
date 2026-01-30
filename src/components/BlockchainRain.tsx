"use client";

import { useEffect, useRef } from "react";

interface BlockchainRainProps {
  theme?: string;
}

export default function BlockchainRain({ theme = 'theme-dark' }: BlockchainRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on parent section height + navbar offset
    const navbarHeight = 64; // 4rem = 64px
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = window.innerWidth;
      // Use parent height + navbar offset, fallback to window height
      canvas.height = parent ? parent.offsetHeight + navbarHeight : window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Blockchain data - mix of addresses, hashes, and symbols
    const blockchainElements = [
      // Ethereum addresses
      "0x742d35Cc6634C0532925a3b8D000",
      "0x8ba1f109551bD432803012645B",
      "0x1f9840a85d5aF5bf1D1762F925",
      "0xA0b86a33E6e2A3D5B5A0d1A2E3",
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      
      // Bitcoin addresses
      "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
      
      // Transaction hashes
      "0x4e8d9c2a7f3b6c8d9e2f1a4b7c3d9e8f2a5b8c4d",
      "0x7f2e5a8c4d9b3e6f1a2c5d8e9f4b7a3c6d9e2f5a",
      "0x9e4f7a2c5d8b3e6f1a4c7d9e2f5b8a3c6d9e4f7a",
      
      // Gas prices and values
      "21000", "50000", "100000", "250000",
      "0.05 ETH", "0.1 ETH", "0.25 ETH", "1.0 ETH",
      "100 GWEI", "50 GWEI", "25 GWEI", "10 GWEI",
      
      // Block numbers
      "#18500000", "#18500001", "#18500002", "#18500003",
      
      // Symbols
      "ETH", "BTC", "USDC", "USDT", "DAI", "WETH", "UNI", "AAVE",
      "⟠", "₿", "◈", "⬟", "⬢", "◊", "⟐", "⬡"
    ];
    
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops: number[] = [];
    const dropSpeeds: number[] = [];
    const dropElements: string[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      dropSpeeds[i] = Math.random() * 0.2 + 0.1; // Variable speed
      dropElements[i] = blockchainElements[Math.floor(Math.random() * blockchainElements.length)];
    }

    // Drawing the blockchain data
    function draw() {
      if (!ctx || !canvas) return;
      
      // Clear canvas completely - no trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set grey background
      ctx.fillStyle = theme === 'theme-light' 
        ? 'rgba(243, 244, 246, 0.9)'  // Light gray for light theme
        : 'rgba(42, 42, 42, 0.9)';    // Dark gray for dark theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.font = fontSize + "px 'JetBrains Mono Variable', monospace";
      
      // Draw blockchain elements
      for (let i = 0; i < drops.length; i++) {
        // Get element for this column
        const element = dropElements[i];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Only draw if on screen
        if (y > 0 && y < canvas.height) {
          // Color based on element type
          if (element.startsWith("0x")) {
            // Ethereum addresses/hashes - blue/cyan
            if (element.length > 20) {
              ctx.fillStyle = `rgba(6, 182, 212, 0.9)`; // Transaction hash - bright cyan
            } else {
              ctx.fillStyle = `rgba(79, 70, 229, 0.8)`; // Address - blue
            }
          } else if (element.startsWith("bc1") || element.startsWith("1") || element.startsWith("3")) {
            // Bitcoin addresses - orange
            ctx.fillStyle = `rgba(255, 165, 0, 0.8)`;
          } else if (element.includes("ETH") || element.includes("GWEI")) {
            // Ethereum values - purple
            ctx.fillStyle = `rgba(139, 92, 246, 0.8)`;
          } else if (element.startsWith("#")) {
            // Block numbers - green
            ctx.fillStyle = `rgba(34, 197, 94, 0.8)`;
          } else if (element.length <= 4) {
            // Symbols - bright colors
            if (Math.random() > 0.7) {
              ctx.fillStyle = `rgba(236, 72, 153, 1)`; // Pink
            } else {
              ctx.fillStyle = `rgba(16, 185, 129, 1)`; // Emerald
            }
          } else {
            // Numbers and other data - cyan
            ctx.fillStyle = `rgba(6, 182, 212, 0.7)`;
          }
          
          // Draw only a portion of long elements to fit
          const displayText = element.length > 12 ? element.substring(0, 12) + "..." : element;
          ctx.fillText(displayText, x, y);
        }
        
        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = -1;
          dropElements[i] = blockchainElements[Math.floor(Math.random() * blockchainElements.length)];
          dropSpeeds[i] = Math.random() * 0.2 + 0.1;
        }
        
        // Move drop down at variable speed
        drops[i] += dropSpeeds[i];
      }
    }

    // Animation loop
    const intervalId = setInterval(draw, 50);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute -top-16 left-0 right-0 bottom-0 opacity-40 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}