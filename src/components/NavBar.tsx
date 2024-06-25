"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mark component as mounted to avoid hydration mismatch
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial state for server rendering - prevents hydration mismatch
  const navClasses = mounted 
    ? `fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-lg bg-[rgba(5,5,5,0.8)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-[rgba(255,255,255,0.05)]"
          : "py-5 bg-transparent"
      }`
    : "fixed w-full z-50 py-5 bg-transparent"; // Default state for server rendering

  return (
    <nav className={navClasses}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="relative group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-500)] opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#050505] border border-[rgba(255,255,255,0.1)] text-lg font-bold text-white">
            SD
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${
                pathname === link.path
                  ? "active"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Social Links */}
          <div className="ml-4 flex items-center space-x-2">
            {/* Email */}
            <a 
              href="mailto:dev.solidity@proton.me" 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(230,230,230,0.1)] text-[#EA4335] hover:text-[#EA4335] transition-all"
              aria-label="Email"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/scott-devines/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(10,102,194,0.2)] text-[#0A66C2] hover:text-[#0A66C2] transition-all"
              aria-label="LinkedIn Profile"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            
            {/* GitHub - more prominent */}
            <a 
              href="https://github.com/Torof" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D333B] hover:bg-[#444C56] text-white hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Only rendered client-side */}
      {mounted && isMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#050505] border-b border-[rgba(255,255,255,0.05)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="container-custom py-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-3 px-4 rounded-lg transition-all ${
                  pathname === link.path
                    ? "bg-[rgba(255,255,255,0.05)] text-white font-medium"
                    : "text-[var(--dark-200)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Social Links */}
            <div className="pt-2 flex items-center space-x-2 border-t border-[rgba(255,255,255,0.05)] mt-2">
              {/* Email */}
              <a 
                href="mailto:dev.solidity@proton.me" 
                className="flex items-center py-2 px-4 rounded-lg text-[#EA4335] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#EA4335] transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/scott-devines/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center py-2 px-4 rounded-lg text-[#0A66C2] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#0A66C2] transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </a>
            </div>
            
            {/* GitHub - more prominent in mobile too */}
            <a 
              href="https://github.com/Torof" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 px-4 rounded-lg bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}