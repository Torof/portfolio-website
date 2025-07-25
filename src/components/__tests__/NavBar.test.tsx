import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from '../NavBar';

// Mock the contexts
const mockToggleTheme = jest.fn();
const mockSetLanguage = jest.fn();
const mockT = jest.fn((key: string) => key);

jest.mock('../../lib/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'theme-dark',
    toggleTheme: mockToggleTheme,
  }),
}));

jest.mock('../../lib/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    setLanguage: mockSetLanguage,
    t: mockT,
  }),
}));

// Mock navigation data
jest.mock('../../lib/data/navigation', () => ({
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ],
}));

// Mock ThemeToggle component
jest.mock('../ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme Toggle</button>;
  };
});

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render navigation links', () => {
    render(<NavBar />);

    // The actual rendered text will be the translation keys since we mocked t to return the key
    expect(screen.getByText('nav.home')).toBeInTheDocument();
    expect(screen.getByText('nav.experience')).toBeInTheDocument();
    expect(screen.getByText('nav.projects')).toBeInTheDocument();
    expect(screen.getByText('nav.contact')).toBeInTheDocument();
  });

  it('should render logo with correct link', () => {
    render(<NavBar />);

    const logoLink = screen.getByRole('link', { name: /SD/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render theme toggle component', () => {
    render(<NavBar />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('should render language switches', () => {
    render(<NavBar />);

    const englishFlag = screen.getAllByAltText('English')[0];
    const frenchFlag = screen.getAllByAltText('Français')[0];

    expect(englishFlag).toBeInTheDocument();
    expect(frenchFlag).toBeInTheDocument();
  });

  it('should call setLanguage when language buttons are clicked', () => {
    render(<NavBar />);

    const englishButtons = screen.getAllByLabelText('Switch to English');
    const frenchButtons = screen.getAllByLabelText('Changer vers le français');

    fireEvent.click(englishButtons[0]);
    expect(mockSetLanguage).toHaveBeenCalledWith('en');

    fireEvent.click(frenchButtons[0]);
    expect(mockSetLanguage).toHaveBeenCalledWith('fr');
  });

  it('should toggle mobile menu when hamburger is clicked', () => {
    render(<NavBar />);

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Mobile menu should not be visible initially
    expect(screen.queryByText('Language:')).not.toBeInTheDocument();

    fireEvent.click(mobileMenuButton);

    // Mobile menu should be visible after click
    expect(screen.getByText('Language:')).toBeInTheDocument();
  });

  it('should close mobile menu when navigation link is clicked', () => {
    render(<NavBar />);

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    
    // Open mobile menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByText('Language:')).toBeInTheDocument();

    // Click a navigation link in mobile menu
    const mobileLinks = screen.getAllByText('nav.home');
    const mobileHomeLink = mobileLinks[mobileLinks.length - 1]; // Get the mobile version
    
    fireEvent.click(mobileHomeLink);
    
    // Menu should close
    waitFor(() => {
      expect(screen.queryByText('Language:')).not.toBeInTheDocument();
    });
  });

  it('should apply correct styling classes based on scroll state', () => {
    render(<NavBar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'w-full', 'z-50');
  });

  it('should highlight active navigation link', () => {
    render(<NavBar />);

    // The current path is '/' so Home should be active
    const homeLinks = screen.getAllByText('nav.home');
    const desktopHomeLink = homeLinks[0]; // First occurrence should be desktop
    
    expect(desktopHomeLink).toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    render(<NavBar />);

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    const englishButton = screen.getAllByLabelText('Switch to English')[0];
    const frenchButton = screen.getAllByLabelText('Changer vers le français')[0];

    expect(mobileMenuButton).toHaveAttribute('aria-label');
    expect(englishButton).toHaveAttribute('aria-label');
    expect(frenchButton).toHaveAttribute('aria-label');
  });
});