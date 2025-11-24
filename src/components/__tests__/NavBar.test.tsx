import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../NavBar';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import * as nextNavigation from 'next/navigation';

// Mock ThemeToggle component
jest.mock('../ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme Toggle</button>;
  };
});

// Helper to render with providers
const renderWithProviders = (component: React.ReactElement, pathname = '/') => {
  // Mock usePathname to return specific path
  jest.spyOn(nextNavigation, 'usePathname').mockReturnValue(pathname);

  return render(
    <ThemeProvider>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      renderWithProviders(<Navbar />);

      // Check for navigation links (they appear twice: desktop + mobile menu)
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBeGreaterThan(0);

      const experienceLinks = screen.getAllByText('Experience');
      expect(experienceLinks.length).toBeGreaterThan(0);

      const skillsLinks = screen.getAllByText('Skills');
      expect(skillsLinks.length).toBeGreaterThan(0);
    });

    it('includes ThemeToggle component', () => {
      renderWithProviders(<Navbar />);

      const themeToggles = screen.getAllByTestId('theme-toggle');
      expect(themeToggles.length).toBeGreaterThan(0);
    });
  });

  describe('Active Link', () => {
    it('applies active class to current route link', () => {
      renderWithProviders(<Navbar />, '/experience');

      // Get all links with the experience path
      const links = screen.getAllByRole('link', { name: /experience/i });

      // At least one should have the active class
      const hasActiveLink = links.some(link =>
        link.className.includes('active')
      );
      expect(hasActiveLink).toBe(true);
    });

    it('does not apply active class to non-current routes', () => {
      renderWithProviders(<Navbar />, '/experience');

      // Get all links with the home path
      const links = screen.getAllByRole('link', { name: /home/i });

      // None should have the active class
      const hasActiveLink = links.some(link =>
        link.className.includes('active')
      );
      expect(hasActiveLink).toBe(false);
    });
  });

  describe('Mobile Menu', () => {
    it('mobile menu is initially closed', () => {
      renderWithProviders(<Navbar />);

      // Mobile menu container should not be visible initially
      const mobileLinks = screen.queryByText('Language:');
      expect(mobileLinks).not.toBeInTheDocument();
    });

    it('opens mobile menu when hamburger button is clicked', () => {
      renderWithProviders(<Navbar />);

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(menuButton);

      // Mobile menu should now be visible
      expect(screen.getByText('Language:')).toBeInTheDocument();
      expect(screen.getByText('Theme:')).toBeInTheDocument();
    });

    it('closes mobile menu when hamburger button is clicked again', () => {
      renderWithProviders(<Navbar />);

      const menuButton = screen.getByLabelText('Toggle mobile menu');

      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByText('Language:')).toBeInTheDocument();

      // Close menu
      fireEvent.click(menuButton);
      expect(screen.queryByText('Language:')).not.toBeInTheDocument();
    });

    it('closes mobile menu when a link is clicked', () => {
      renderWithProviders(<Navbar />);

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(menuButton);

      // Menu should be open
      expect(screen.getByText('Language:')).toBeInTheDocument();

      // Click a mobile menu link (find the one in the mobile menu container)
      const mobileLinks = screen.getAllByRole('link', { name: /home/i });
      // The mobile link should be one that's inside the mobile menu
      const mobileLink = mobileLinks.find(link =>
        link.className.includes('block')
      );

      if (mobileLink) {
        fireEvent.click(mobileLink);

        // Menu should be closed
        expect(screen.queryByText('Language:')).not.toBeInTheDocument();
      }
    });
  });

  describe('Scroll Behavior', () => {
    it('applies scrolled styles when scrolled down', async () => {
      const { container } = renderWithProviders(<Navbar />);

      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const nav = container.querySelector('nav');
        expect(nav?.className).toContain('navbar-scrolled');
      });
    });

    it('removes scrolled styles when at top', async () => {
      const { container } = renderWithProviders(<Navbar />);

      // Scroll down first
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const nav = container.querySelector('nav');
        expect(nav?.className).toContain('navbar-scrolled');
      });

      // Scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const nav = container.querySelector('nav');
        expect(nav?.className).not.toContain('navbar-scrolled');
      });
    });

    it('cleans up scroll event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = renderWithProviders(<Navbar />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Theme Integration', () => {
    it('applies light theme classes when theme is light', async () => {
      // Set light theme in localStorage before rendering
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
      getItemSpy.mockReturnValue('theme-light');

      const { container } = renderWithProviders(<Navbar />);

      // Wait for the component to mount and apply theme styles
      await waitFor(() => {
        const nav = container.querySelector('nav');
        // After mounting, light theme should have rgba(255,255,255 background
        expect(nav?.className).toContain('bg-[rgba(255,255,255');
      });

      // Clean up
      getItemSpy.mockRestore();
    });

    it('applies different styles when scrolled in light mode', async () => {
      const { container } = renderWithProviders(<Navbar />);

      // Scroll down
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const nav = container.querySelector('nav');
        // Should have scrolled styling
        expect(nav?.className).toContain('py-3');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label for mobile menu button', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
    });

    it('all links are keyboard accessible', () => {
      renderWithProviders(<Navbar />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Responsive Design', () => {
    it('shows desktop navigation on large screens', () => {
      renderWithProviders(<Navbar />);

      // Desktop nav should have md:flex class
      const desktopNav = screen.getAllByRole('link')[0].parentElement?.parentElement;
      expect(desktopNav?.className).toContain('md:flex');
    });

    it('shows mobile menu button', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
    });
  });
});
