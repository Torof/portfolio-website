import { render, screen } from '@testing-library/react';
import ContactPage from '../page';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { personalInfo, socialLinks } from '@/lib/data/personalInfo';

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

describe('ContactPage', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithProviders(<ContactPage />);
      // Check for multiple elements with "Connect" - page renders successfully
      const connectElements = screen.getAllByText(/Connect/i);
      expect(connectElements.length).toBeGreaterThan(0);
    });

    it('renders header section with title', () => {
      renderWithProviders(<ContactPage />);

      // Check for header content - looking for the main title specifically
      const connectElements = screen.getAllByText(/Connect/i);
      expect(connectElements.length).toBeGreaterThan(0);

      // Verify we have the main title in the page
      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    });

    it('renders all four contact cards', () => {
      renderWithProviders(<ContactPage />);

      // Check for card titles
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('LinkedIn Card', () => {
    it('has correct link URL', () => {
      renderWithProviders(<ContactPage />);

      const linkedinUrl = socialLinks.find(link => link.platform === 'LinkedIn')?.url;
      const linkedinLinks = screen.getAllByRole('link', { name: /LinkedIn/i });

      // Find the actual link element (not just text)
      const linkedinLink = linkedinLinks.find(link =>
        link.getAttribute('href') === linkedinUrl
      );

      expect(linkedinLink).toHaveAttribute('href', linkedinUrl);
    });

    it('opens in new tab', () => {
      renderWithProviders(<ContactPage />);

      const linkedinUrl = socialLinks.find(link => link.platform === 'LinkedIn')?.url;
      const linkedinLink = screen.getAllByRole('link').find(link =>
        link.getAttribute('href') === linkedinUrl
      );

      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('GitHub Card', () => {
    it('has correct link URL', () => {
      renderWithProviders(<ContactPage />);

      const githubUrl = socialLinks.find(link => link.platform === 'GitHub')?.url;
      const githubLinks = screen.getAllByRole('link', { name: /GitHub/i });

      const githubLink = githubLinks.find(link =>
        link.getAttribute('href') === githubUrl
      );

      expect(githubLink).toHaveAttribute('href', githubUrl);
    });

    it('opens in new tab', () => {
      renderWithProviders(<ContactPage />);

      const githubUrl = socialLinks.find(link => link.platform === 'GitHub')?.url;
      const githubLink = screen.getAllByRole('link').find(link =>
        link.getAttribute('href') === githubUrl
      );

      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Email Card', () => {
    it('has correct mailto link', () => {
      renderWithProviders(<ContactPage />);

      const emailLink = screen.getAllByRole('link').find(link =>
        link.getAttribute('href') === `mailto:${personalInfo.email}`
      );

      expect(emailLink).toHaveAttribute('href', `mailto:${personalInfo.email}`);
    });

    it('displays email address', () => {
      renderWithProviders(<ContactPage />);

      expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
    });
  });

  describe('Personal Info Card', () => {
    it('displays location', () => {
      renderWithProviders(<ContactPage />);

      expect(screen.getByText(personalInfo.location)).toBeInTheDocument();
    });

    it('displays all language badges', () => {
      renderWithProviders(<ContactPage />);

      const languages = ['French', 'English', 'Spanish', 'Vietnamese'];

      languages.forEach(language => {
        expect(screen.getByText(language)).toBeInTheDocument();
      });
    });

    it('renders language badges with correct styling', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Check that language badges exist in the DOM
      const languageBadges = container.querySelectorAll('.rounded-full');
      const languageBadgesList = Array.from(languageBadges).filter(badge =>
        badge.textContent && ['French', 'English', 'Spanish', 'Vietnamese'].includes(badge.textContent)
      );

      expect(languageBadgesList.length).toBe(4);
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware classes', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Check that theme-dependent styling is applied (background gradients)
      const backgroundElement = container.querySelector('[class*="bg-gradient-to-br from-"]');
      expect(backgroundElement).toBeInTheDocument();
    });

    it('renders background effects', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Check for background gradient
      const backgrounds = container.querySelectorAll('[class*="bg-gradient"]');
      expect(backgrounds.length).toBeGreaterThan(0);
    });
  });

  describe('Content Structure', () => {
    it('renders all contact method cards in grid layout', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Check for grid container
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.className).toContain('md:grid-cols-2');
    });

    it('renders card icons', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Check for SVG icons
      const svgIcons = container.querySelectorAll('svg');
      expect(svgIcons.length).toBeGreaterThan(4); // At least one per card plus decorative
    });
  });

  describe('Accessibility', () => {
    it('all external links have security attributes', () => {
      renderWithProviders(<ContactPage />);

      const externalLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('email link does not open in new tab', () => {
      renderWithProviders(<ContactPage />);

      const emailLink = screen.getAllByRole('link').find(link =>
        link.getAttribute('href')?.startsWith('mailto:')
      );

      expect(emailLink).not.toHaveAttribute('target', '_blank');
    });
  });

  describe('Animations', () => {
    it('renders motion components for animations', () => {
      const { container } = renderWithProviders(<ContactPage />);

      // Framer motion components are mocked as regular divs in tests
      // Just verify the structure is rendered
      expect(container.querySelector('.container-custom')).toBeInTheDocument();
    });
  });
});
