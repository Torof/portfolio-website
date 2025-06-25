'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'theme-dark' | 'theme-light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>('theme-dark');
  
  // Initialize on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('theme-light');
    }
  }, []);
  
  // Update document when theme changes
  useEffect(() => {
    const html = window.document.documentElement;
    const body = window.document.body;
    
    // Apply to both html and body
    html.classList.remove('theme-dark', 'theme-light');
    body.classList.remove('theme-dark', 'theme-light');
    
    html.classList.add(theme);
    body.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'theme-dark' ? 'theme-light' : 'theme-dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}