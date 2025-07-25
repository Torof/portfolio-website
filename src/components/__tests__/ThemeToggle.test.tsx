import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

// Mock the theme context for controlled testing
const mockToggleTheme = jest.fn();
const mockUseTheme = {
  theme: 'theme-dark' as const,
  toggleTheme: mockToggleTheme,
};

jest.mock('../../lib/context/ThemeContext', () => ({
  useTheme: () => mockUseTheme,
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.theme = 'theme-dark';
  });

  it('should render toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should have correct aria-label for dark theme', () => {
    mockUseTheme.theme = 'theme-dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('should have correct aria-label for light theme', () => {
    mockUseTheme.theme = 'theme-light';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('should display sun icon in dark theme', () => {
    mockUseTheme.theme = 'theme-dark';
    
    render(<ThemeToggle />);
    
    const sunIcon = screen.getByRole('button').querySelector('svg');
    expect(sunIcon).toBeInTheDocument();
    
    // Check for circle element (part of sun icon)
    const circle = sunIcon?.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  it('should display moon icon in light theme', () => {
    mockUseTheme.theme = 'theme-light';
    
    render(<ThemeToggle />);
    
    const moonIcon = screen.getByRole('button').querySelector('svg');
    expect(moonIcon).toBeInTheDocument();
    
    // Check for path element (part of moon icon)
    const path = moonIcon?.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  it('should call toggleTheme when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should have correct styling classes for dark theme', () => {
    mockUseTheme.theme = 'theme-dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[rgba(255,255,255,0.05)]');
    expect(button).toHaveClass('border-[rgba(255,255,255,0.1)]');
  });

  it('should have correct styling classes for light theme', () => {
    mockUseTheme.theme = 'theme-light';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[rgba(0,0,0,0.05)]');
    expect(button).toHaveClass('border-[rgba(0,0,0,0.1)]');
  });

  it('should have proper CSS classes for styling', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('transition-colors');
    expect(button).toHaveClass('border');
  });

  it('should have proper hover classes', () => {
    mockUseTheme.theme = 'theme-dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-[rgba(255,255,255,0.1)]');
  });
});