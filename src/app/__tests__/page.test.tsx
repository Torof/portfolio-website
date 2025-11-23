import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { personalInfo } from '@/lib/data/personalInfo';

// Mock BlockchainRain component using relative path
jest.mock('../../components/BlockchainRain', () => ({
  __esModule: true,
  default: () => <div data-testid="blockchain-rain" />,
}));

// Helper to render with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe('Home Page', () => {
  describe('HeroSection - Title', () => {
    it('renders the main title with the person\'s name', () => {
      renderWithProviders(<HeroSection />);

      // Check that the main title "Scott Devines" is displayed
      const titleElement = screen.getByText(personalInfo.name);
      expect(titleElement).toBeInTheDocument();
    });

    it('displays the title as an h1 heading', () => {
      renderWithProviders(<HeroSection />);

      // Verify it's rendered as an h1 element
      const heading = screen.getByRole('heading', { level: 1, name: personalInfo.name });
      expect(heading).toBeInTheDocument();
    });

    it('applies correct styling classes to the title', () => {
      renderWithProviders(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1, name: personalInfo.name });

      // Check for key styling classes
      expect(heading.className).toContain('text-5xl');
      expect(heading.className).toContain('font-black');
      expect(heading.className).toContain('light-text');
    });
  });

  describe('HeroSection - Subtitle', () => {
    it('renders the subtitle text', () => {
      renderWithProviders(<HeroSection />);

      // The subtitle uses translation key 'hero.subtitle'
      // Check for specific subtitle text (not just "Blockchain" which appears in badges too)
      const subtitle = screen.getByText(/Experienced blockchain developer specializing/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('applies correct styling to subtitle', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Find the subtitle paragraph element
      const subtitleElements = container.querySelectorAll('p');
      const subtitle = Array.from(subtitleElements).find(p =>
        p.textContent?.includes('Blockchain') || p.className.includes('text-xl')
      );

      expect(subtitle).toBeTruthy();
      if (subtitle) {
        expect(subtitle.className).toContain('text-xl');
        expect(subtitle.className).toContain('light-text');
      }
    });
  });

  describe('HeroSection - Developer Badge', () => {
    it('renders the main developer type badge', () => {
      renderWithProviders(<HeroSection />);

      // Check for "Blockchain Developer" text (this uses the translation key, not personalInfo.title)
      const badge = screen.getByText('Blockchain Developer');
      expect(badge).toBeInTheDocument();
    });

    it('renders the Front End Developer badge', () => {
      renderWithProviders(<HeroSection />);

      const badge = screen.getByText('Front End Developer');
      expect(badge).toBeInTheDocument();
    });

    it('renders the App Developer badge', () => {
      renderWithProviders(<HeroSection />);

      const badge = screen.getByText('App Developer');
      expect(badge).toBeInTheDocument();
    });

    it('applies correct styling to badges', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Find badge elements by their distinctive classes
      const badges = container.querySelectorAll('[class*="rounded-full"]');
      const developerBadges = Array.from(badges).filter(badge =>
        badge.textContent?.includes('Developer')
      );

      expect(developerBadges.length).toBeGreaterThanOrEqual(3);

      // Check that badges have proper styling
      developerBadges.forEach(badge => {
        expect(badge.className).toContain('rounded-full');
      });
    });
  });

  describe('HeroSection - Profile Image', () => {
    it('renders the profile image', () => {
      renderWithProviders(<HeroSection />);

      // Check for the image with alt text containing the person's name
      const profileImage = screen.getByAltText(`${personalInfo.name} profile photo`);
      expect(profileImage).toBeInTheDocument();
    });

    it('profile image has correct src attribute', () => {
      renderWithProviders(<HeroSection />);

      const profileImage = screen.getByAltText(`${personalInfo.name} profile photo`);
      expect(profileImage).toHaveAttribute('src', personalInfo.profileImage);
    });

    it('profile image container has proper styling', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Find the profile image container
      const imageContainers = container.querySelectorAll('[class*="rounded-full"]');
      const profileContainer = Array.from(imageContainers).find(el =>
        el.querySelector('img')
      );

      expect(profileContainer).toBeTruthy();
    });
  });

  describe('HeroSection - Structure and Layout', () => {
    it('renders as a section element', () => {
      const { container } = renderWithProviders(<HeroSection />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('includes BlockchainRain background component', () => {
      renderWithProviders(<HeroSection />);

      const blockchainRain = screen.getByTestId('blockchain-rain');
      expect(blockchainRain).toBeInTheDocument();
    });

    it('has proper responsive layout classes', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Check for responsive flex layout
      const flexContainers = container.querySelectorAll('[class*="flex"]');
      expect(flexContainers.length).toBeGreaterThan(0);

      // Check for responsive grid/flex classes
      const responsiveElements = container.querySelectorAll('[class*="md:flex-row"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });
  });

  describe('HeroSection - Theme Integration', () => {
    it('applies theme-aware background gradient', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Check for background gradient classes
      const gradientElements = container.querySelectorAll('[class*="bg-gradient"]');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('applies theme-aware border styling', () => {
      const { container } = renderWithProviders(<HeroSection />);

      // Check for border classes
      const borderedElements = container.querySelectorAll('[class*="border"]');
      expect(borderedElements.length).toBeGreaterThan(0);
    });
  });
});
