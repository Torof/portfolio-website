"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: "gradient" | "glitch" | "split" | "reveal" | "neon";
  gradient?: string;
  delay?: number;
}

export default function AnimatedTitle({ 
  children, 
  className = "", 
  variant = "gradient",
  gradient = "from-[#4f46e5] via-[#8b5cf6] to-[#06b6d4]",
  delay = 0 
}: AnimatedTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const baseClasses = "font-bold tracking-tight";

  if (variant === "glitch") {
    return (
      <motion.h2
        className={`${baseClasses} ${className} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        <span className="relative inline-block">
          {children}
          <span 
            className="absolute top-0 left-0 w-full h-full opacity-80"
            style={{
              textShadow: "2px 2px 0 #ff00de, -2px -2px 0 #00ffff",
              animation: "glitch 2s infinite",
              animationDelay: "0.2s"
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 w-full h-full opacity-80"
            style={{
              textShadow: "-2px 2px 0 #00ffff, 2px -2px 0 #ff00de",
              animation: "glitch 2s infinite reverse",
              animationDelay: "0.4s"
            }}
            aria-hidden="true"
          >
            {children}
          </span>
        </span>
      </motion.h2>
    );
  }

  if (variant === "split") {
    const text = children?.toString() || "";
    const words = text.split(" ");
    const midPoint = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, midPoint).join(" ");
    const secondHalf = words.slice(midPoint).join(" ");

    return (
      <motion.h2
        className={`${baseClasses} ${className} flex flex-wrap justify-center gap-2`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        <motion.span
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.5, type: "spring" }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
        >
          {firstHalf}
        </motion.span>
        <motion.span
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]"
        >
          {secondHalf}
        </motion.span>
      </motion.h2>
    );
  }

  if (variant === "reveal") {
    return (
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        <motion.h2
          className={`${baseClasses} ${className}`}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.8, type: "spring", damping: 15 }}
        >
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
            theme === 'theme-light' 
              ? 'from-gray-800 to-gray-600' 
              : 'from-white to-gray-300'
          }`}>
            {children}
          </span>
        </motion.h2>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#06b6d4]"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ delay: delay + 0.1, duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    );
  }

  if (variant === "neon") {
    return (
      <motion.h2
        className={`${baseClasses} ${className} relative`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        <span 
          className="relative z-10"
          style={{
            textShadow: `
              0 0 10px rgba(79, 70, 229, 0.8),
              0 0 20px rgba(79, 70, 229, 0.6),
              0 0 30px rgba(79, 70, 229, 0.4),
              0 0 40px rgba(79, 70, 229, 0.2)
            `,
            animation: "pulse 2s infinite"
          }}
        >
          {children}
        </span>
        <span 
          className="absolute inset-0 blur-xl opacity-50"
          style={{
            background: `linear-gradient(45deg, #4f46e5, #8b5cf6, #06b6d4)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
          aria-hidden="true"
        >
          {children}
        </span>
      </motion.h2>
    );
  }

  // Default gradient variant
  return (
    <motion.h2
      className={`${baseClasses} ${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay, duration: 0.6 }}
    >
      <span 
        className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
      >
        {children}
      </span>
    </motion.h2>
  );
}