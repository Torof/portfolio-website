"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(79, 70, 229, 0.3)",    // Primary blue
      "rgba(139, 92, 246, 0.3)",   // Purple
      "rgba(6, 182, 212, 0.3)",    // Cyan
      "rgba(236, 72, 153, 0.3)",   // Pink
      "rgba(16, 185, 129, 0.3)",   // Emerald
    ];

    const generatedOrbs = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setOrbs(generatedOrbs);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}