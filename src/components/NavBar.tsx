"use client";

import { useState, useEffect } from "react";
// import Link from "next/link"; // Removed for IPFS compatibility
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/context/ThemeContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
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

  const getNavClasses = () => {
    if (!mounted) {
      return "fixed w-full z-50 transition-all duration-300 py-5 bg-transparent";
    }
    
    const baseClasses = "fixed w-full z-50 transition-all duration-300";
    
    if (theme === 'theme-light') {
      // Consistent light mode styling - always have some background
      return scrolled 
        ? `${baseClasses} py-3 backdrop-blur-lg bg-[rgba(255,255,255,0.95)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-[rgba(0,0,0,0.1)]`
        : `${baseClasses} py-5 backdrop-blur-md bg-[rgba(255,255,255,0.8)] border-b border-[rgba(0,0,0,0.05)]`;
    } else {
      // Dark mode styling
      return scrolled
        ? `${baseClasses} py-3 backdrop-blur-lg bg-[rgba(5,5,5,0.8)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-[rgba(255,255,255,0.05)]`
        : `${baseClasses} py-5 bg-transparent`;
    }
  };
  
  const navClasses = getNavClasses();

  return (
    <nav className={navClasses + (mounted && scrolled ? ' navbar-scrolled' : '')}>
      <div className="container-custom flex justify-between items-center">
        <a href="./" className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-500)] opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border text-lg font-bold transition-colors duration-300 ${
            theme === 'theme-light' 
              ? 'bg-white border-[rgba(0,0,0,0.1)] text-black' 
              : 'bg-[#050505] border-[rgba(255,255,255,0.1)] text-white'
          }`}>
            SD
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-1">
            {navLinks.map((link) => {
              // Convert paths for IPFS compatibility
              const ipfsPath = link.path === "/" ? "./" : `.${link.path}.html`;
              return (
                <a
                  key={link.path}
                  href={ipfsPath}
                  className={`nav-link ${
                    pathname === link.path
                      ? "active"
                      : ""
                  }`}
                >
                  {t(`nav.${link.name.toLowerCase().replace(/ /g, '-')}`)}
                </a>
              );
            })}
          </div>
          
          <div className={`h-6 w-px ${
            theme === 'theme-light' 
              ? 'bg-[rgba(0,0,0,0.1)]' 
              : 'bg-[rgba(255,255,255,0.1)]'
          }`}></div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 mr-2">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  language === 'en' 
                    ? theme === 'theme-light'
                      ? 'bg-[rgba(59,130,246,0.15)] ring-2 ring-[rgba(59,130,246,0.4)]' 
                      : 'bg-[rgba(255,255,255,0.15)] ring-2 ring-[rgba(255,255,255,0.3)]'
                    : theme === 'theme-light'
                      ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]'
                      : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
                }`}
                aria-label="Switch to English"
              >
                <Image 
                  src="/flags/en.svg" 
                  alt="English" 
                  width={16} 
                  height={12}
                  className="rounded-sm"
                />
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  language === 'fr' 
                    ? theme === 'theme-light'
                      ? 'bg-[rgba(59,130,246,0.15)] ring-2 ring-[rgba(59,130,246,0.4)]' 
                      : 'bg-[rgba(255,255,255,0.15)] ring-2 ring-[rgba(255,255,255,0.3)]'
                    : theme === 'theme-light'
                      ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]'
                      : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
                }`}
                aria-label="Changer vers le français"
              >
                <Image 
                  src="/flags/fr.svg" 
                  alt="Français" 
                  width={16} 
                  height={12}
                  className="rounded-sm"
                />
              </button>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
              theme === 'theme-light' 
                ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]' 
                : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
            }`}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden backdrop-blur-lg border-t ${
          theme === 'theme-light' 
            ? 'bg-[rgba(255,255,255,0.95)] border-[rgba(0,0,0,0.1)]' 
            : 'bg-[rgba(5,5,5,0.95)] border-[rgba(255,255,255,0.1)]'
        }`}>
          <div className="container-custom py-4">
            {navLinks.map((link) => {
              // Convert paths for IPFS compatibility
              const ipfsPath = link.path === "/" ? "./" : `.${link.path}.html`;
              return (
                <a
                  key={link.path}
                  href={ipfsPath}
                  className="py-3 px-4 rounded-lg transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${link.name.toLowerCase().replace(/ /g, '-')}`)}
                </a>
              );
            })}
            
            <div className={`pt-2 flex flex-col space-y-2 border-t mt-2 ${
              theme === 'theme-light' 
                ? 'border-[rgba(0,0,0,0.05)]' 
                : 'border-[rgba(255,255,255,0.05)]'
            }`}>
              <div className="py-2 px-4 rounded-lg flex items-center">
                <span className="mr-2">Language:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                      language === 'en' 
                        ? theme === 'theme-light'
                          ? 'bg-[rgba(59,130,246,0.15)] ring-2 ring-[rgba(59,130,246,0.4)]' 
                          : 'bg-[rgba(255,255,255,0.15)] ring-2 ring-[rgba(255,255,255,0.3)]'
                        : theme === 'theme-light'
                          ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]'
                          : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                    aria-label="Switch to English"
                  >
                    <Image 
                      src="/flags/en.svg" 
                      alt="English" 
                      width={16} 
                      height={12}
                      className="rounded-sm"
                    />
                  </button>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                      language === 'fr' 
                        ? theme === 'theme-light'
                          ? 'bg-[rgba(59,130,246,0.15)] ring-2 ring-[rgba(59,130,246,0.4)]' 
                          : 'bg-[rgba(255,255,255,0.15)] ring-2 ring-[rgba(255,255,255,0.3)]'
                        : theme === 'theme-light'
                          ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]'
                          : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                    aria-label="Changer vers le français"
                  >
                    <Image 
                      src="/flags/fr.svg" 
                      alt="Français" 
                      width={16} 
                      height={12}
                      className="rounded-sm"
                    />
                  </button>
                </div>
              </div>
              <div className="py-2 px-4 rounded-lg flex items-center">
                <span className="mr-2">Theme:</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}