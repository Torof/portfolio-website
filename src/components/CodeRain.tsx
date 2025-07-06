"use client";

import { useEffect, useRef } from "react";

export default function CodeRain() {
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

    // Code elements - mix of programming languages and symbols
    const codeElements = [
      // JavaScript/TypeScript
      "function()", "const", "let", "var", "=>", "async", "await", "return",
      "useState", "useEffect", "import", "export", "class", "extends",
      
      // Solidity
      "contract", "function", "public", "private", "view", "pure", "payable",
      "modifier", "mapping", "address", "uint256", "bytes32", "msg.sender",
      "require", "assert", "revert", "emit", "event", "struct", "enum",
      
      // React/JSX
      "<div>", "</div>", "<span>", "onClick", "onChange", "useState",
      "props", "state", "render", "component",
      
      // CSS/Styling
      "flex", "grid", "margin", "padding", "color", "background",
      "transform", "transition", "hover", "active",
      
      // General programming
      "if", "else", "for", "while", "switch", "case", "break", "continue",
      "true", "false", "null", "undefined", "try", "catch", "finally",
      
      // Symbols and operators
      "===", "!==", "&&", "||", "??", "?.", "=>", "++", "--", "+=", "-=",
      "{}", "[]", "()", ";", ":", ",", ".", "?", "!", "@", "#", "$", "%",
      
      // Web3/Blockchain specific
      "web3", "ethers", "provider", "signer", "contract", "transaction",
      "block", "gas", "gwei", "ether", "token", "NFT", "DeFi", "DAO"
    ];
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops: number[] = [];
    const dropSpeeds: number[] = [];
    const dropElements: string[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      dropSpeeds[i] = Math.random() * 0.3 + 0.15; // Moderate speed
      dropElements[i] = codeElements[Math.floor(Math.random() * codeElements.length)];
    }

    // Drawing the code elements
    function draw() {
      if (!ctx || !canvas) return;
      
      // Clear canvas completely - no trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set dark grey background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.font = fontSize + "px 'JetBrains Mono Variable', monospace";
      
      // Draw code elements
      for (let i = 0; i < drops.length; i++) {
        // Get element for this column
        const element = dropElements[i];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Only draw if on screen
        if (y > 0 && y < canvas.height) {
          // Color based on element type
          if (element.includes("contract") || element.includes("function") || element.includes("mapping")) {
            // Solidity - purple
            ctx.fillStyle = `rgba(139, 92, 246, 0.9)`;
          } else if (element.includes("use") || element.includes("React") || element.includes("<")) {
            // React - cyan
            ctx.fillStyle = `rgba(6, 182, 212, 0.9)`;
          } else if (element.includes("const") || element.includes("let") || element.includes("=>")) {
            // JavaScript - yellow
            ctx.fillStyle = `rgba(234, 179, 8, 0.9)`;
          } else if (element.includes("web3") || element.includes("ether") || element.includes("gas")) {
            // Web3 - emerald
            ctx.fillStyle = `rgba(16, 185, 129, 0.9)`;
          } else if (element.includes("flex") || element.includes("grid") || element.includes("color")) {
            // CSS - pink
            ctx.fillStyle = `rgba(236, 72, 153, 0.9)`;
          } else if (element.includes("=") || element.includes("!") || element.includes("&")) {
            // Operators - orange
            ctx.fillStyle = `rgba(249, 115, 22, 0.9)`;
          } else {
            // General keywords - blue
            ctx.fillStyle = `rgba(59, 130, 246, 0.8)`;
          }
          
          // Draw the element
          ctx.fillText(element, x, y);
        }
        
        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = -1;
          dropElements[i] = codeElements[Math.floor(Math.random() * codeElements.length)];
          dropSpeeds[i] = Math.random() * 0.3 + 0.15;
        }
        
        // Move drop down at variable speed
        drops[i] += dropSpeeds[i];
      }
    }

    // Animation loop
    const intervalId = setInterval(draw, 60);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-50 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}