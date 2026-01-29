"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/context/ThemeContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getNavBarClasses = () => {
    if (!mounted) {
      return "backdrop-blur-lg bg-[rgba(255,255,255,0.8)] border border-gray-200";
    }

    if (theme === 'theme-light') {
      return "backdrop-blur-lg bg-[rgba(255,255,255,0.9)] border border-gray-300 shadow-lg";
    } else {
      return "backdrop-blur-lg bg-[rgba(15,23,42,0.85)] border border-slate-600 shadow-lg";
    }
  };

  const navBarClasses = getNavBarClasses();

  return (
    <nav className="fixed w-full z-50 py-4 px-4">
      <div className={`max-w-4xl mx-auto rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${navBarClasses}`}>
        <div className="hidden md:flex items-center">
          <div className="flex space-x-1">
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
                {t(`nav.${link.name.toLowerCase().replace(/ /g, '-')}`)}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
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
                  src={'/flags/en.svg'}
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
                  src={'/flags/fr.svg'}
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
        <div className={`md:hidden mt-2 max-w-4xl mx-auto rounded-2xl overflow-hidden ${
          theme === 'theme-light'
            ? 'backdrop-blur-lg bg-[rgba(255,255,255,0.95)] border border-gray-300 shadow-lg'
            : 'backdrop-blur-lg bg-[rgba(15,23,42,0.95)] border border-slate-600 shadow-lg'
        }`}>
          <div className="py-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="py-3 px-4 rounded-lg transition-all block"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`nav.${link.name.toLowerCase().replace(/ /g, '-')}`)}
              </Link>
            ))}
            
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
                      src={'/flags/en.svg'} 
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
                      src={'/flags/fr.svg'} 
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