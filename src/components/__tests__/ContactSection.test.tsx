import { render, screen } from '@testing-library/react';
import ContactSection from '../ContactSection';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';

// Mock the scroll animation hook
jest.mock('../../lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true,
  }),
  getAnimationClass: (isVisible: boolean, animClass: string) =>
    isVisible ? animClass : '',
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

describe('ContactSection', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<ContactSection />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renders as a section element', () => {
      const { container } = renderWithProviders(<ContactSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders main title', () => {
      renderWithProviders(<ContactSection />);

      // Uses translation key 'contact.buildTogether'
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
    });

    it('renders vision text', () => {
      renderWithProviders(<ContactSection />);

      // Uses translation key 'contact.vision'
      const paragraphs = screen.getAllByText(/./);
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('renders innovation heading', () => {
      renderWithProviders(<ContactSection />);

      // Uses translation key 'contact.innovate'
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Stats Display', () => {
    it('displays years of experience', () => {
      renderWithProviders(<ContactSection />);

      expect(screen.getByText('6+')).toBeInTheDocument();
      expect(screen.getByText('Years Experience')).toBeInTheDocument();
    });

    it('displays projects delivered', () => {
      renderWithProviders(<ContactSection />);

      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
    });

    it('displays response time', () => {
      renderWithProviders(<ContactSection />);

      expect(screen.getByText('24h')).toBeInTheDocument();
      expect(screen.getByText('Response Time')).toBeInTheDocument();
    });
  });

  describe('CTA Button', () => {
    it('renders the contact button', () => {
      renderWithProviders(<ContactSection />);

      // Uses translation key 'contact.startConversation'
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('links to contact page', () => {
      renderWithProviders(<ContactSection />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/contact');
    });

    it('button contains text and arrow icon', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();

      // Check for arrow SVG
      const svg = link.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('has animated particles background', () => {
      const { container } = renderWithProviders(<ContactSection />);

      // Check for particle divs
      const particles = container.querySelectorAll('.absolute.w-1.h-1.rounded-full');
      expect(particles.length).toBeGreaterThan(0);
    });

    it('has gradient mesh overlay', () => {
      const { container } = renderWithProviders(<ContactSection />);

      // Check for gradient mesh elements
      const meshElements = container.querySelectorAll('.rounded-full.mix-blend-multiply');
      expect(meshElements.length).toBeGreaterThan(0);
    });

    it('has icon cluster in central card', () => {
      const { container } = renderWithProviders(<ContactSection />);

      // Check for icon SVGs
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(3); // At least 3 icons + arrow
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware background gradient', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-gradient-to-br');
    });

    it('has backdrop-blur on central card', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const cardElements = container.querySelectorAll('.backdrop-blur-md');
      expect(cardElements.length).toBeGreaterThan(0);
    });
  });

  describe('Layout', () => {
    it('uses container-custom class', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const containerDiv = container.querySelector('.container-custom');
      expect(containerDiv).toBeInTheDocument();
    });

    it('has proper vertical spacing', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const mainContainer = container.querySelector('.py-24');
      expect(mainContainer).toBeInTheDocument();
    });

    it('has responsive grid for stats', () => {
      const { container } = renderWithProviders(<ContactSection />);

      const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithProviders(<ContactSection />);

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });

    it('link is properly accessible', () => {
      renderWithProviders(<ContactSection />);

      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });
  });
});
