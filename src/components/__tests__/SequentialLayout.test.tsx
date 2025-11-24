import { render, screen } from '@testing-library/react';
import SequentialLayout from '../SequentialLayout';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';

// Mock the ProjectsCarousel component
jest.mock('../ProjectsCarousel', () => ({
  __esModule: true,
  default: ({ projects }: { projects: any[] }) => (
    <div data-testid="projects-carousel">
      <div data-testid="carousel-projects-count">{projects.length}</div>
    </div>
  ),
}));

// Mock the InteractiveTechStack component
jest.mock('../InteractiveTechStack', () => ({
  __esModule: true,
  default: () => <div data-testid="interactive-tech-stack" />,
}));

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

describe('SequentialLayout', () => {
  describe('Tech Stack Section', () => {
    it('renders the tech stack section', () => {
      renderWithProviders(<SequentialLayout />);

      expect(screen.getByTestId('interactive-tech-stack')).toBeInTheDocument();
    });

    it('renders tech stack title', () => {
      renderWithProviders(<SequentialLayout />);

      // The title uses translation key 'techStack.title'
      const title = screen.getByText(/Tech Stack/i);
      expect(title).toBeInTheDocument();
    });
  });

  describe('Projects Section', () => {
    it('renders the projects section', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Projects section should exist
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('has ethereum logo columns background', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Check for ethereum logos (SVG elements)
      const svgs = container.querySelectorAll('svg.ethereum-logo');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('has top and bottom borders', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Find the projects section (has both border-t and border-b)
      const projectsSections = Array.from(container.querySelectorAll('section')).filter(
        section => section.className.includes('border-t') && section.className.includes('border-b')
      );

      expect(projectsSections.length).toBeGreaterThan(0);
    });
  });

  describe('Featured Projects Carousel', () => {
    it('renders the carousel component', () => {
      renderWithProviders(<SequentialLayout />);

      expect(screen.getByTestId('projects-carousel')).toBeInTheDocument();
    });

    it('passes featured projects to carousel', () => {
      renderWithProviders(<SequentialLayout />);

      const projectsCount = screen.getByTestId('carousel-projects-count');
      // featuredProjects has 4 projects
      expect(projectsCount.textContent).toBe('4');
    });

    it('renders Featured Projects title', () => {
      renderWithProviders(<SequentialLayout />);

      // The title uses translation key 'featuredProjects.title'
      const title = screen.getByText(/Featured Projects/i);
      expect(title).toBeInTheDocument();
    });

    it('title is an h2 heading', () => {
      renderWithProviders(<SequentialLayout />);

      const heading = screen.getByRole('heading', { level: 2, name: /Featured Projects/i });
      expect(heading).toBeInTheDocument();
    });

    it('title has underline', () => {
      renderWithProviders(<SequentialLayout />);

      const heading = screen.getByRole('heading', { level: 2, name: /Featured Projects/i });
      expect(heading.className).toContain('underline');
    });

    it('title uses Caveat font', () => {
      renderWithProviders(<SequentialLayout />);

      const heading = screen.getByRole('heading', { level: 2, name: /Featured Projects/i });
      expect(heading.style.fontFamily).toContain('Caveat');
    });

    it('title is centered', () => {
      renderWithProviders(<SequentialLayout />);

      const heading = screen.getByRole('heading', { level: 2, name: /Featured Projects/i });
      expect(heading.className).toContain('text-center');
    });

    it('has card wrapper around carousel', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Look for the card wrapper with rounded-2xl and backdrop-blur
      const cardWrappers = container.querySelectorAll('.rounded-2xl.border');
      const carouselCard = Array.from(cardWrappers).find(
        card => card.className.includes('backdrop-blur')
      );

      expect(carouselCard).toBeTruthy();
    });

    it('card wrapper has proper styling', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      const cardWrappers = container.querySelectorAll('.rounded-2xl.border');
      const carouselCard = Array.from(cardWrappers).find(
        card => card.className.includes('backdrop-blur')
      );

      if (carouselCard) {
        expect(carouselCard.className).toContain('shadow-lg');
        expect(carouselCard.className).toContain('p-8');
      }
    });
  });

  describe('Layout Structure', () => {
    it('renders multiple sections', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      const sections = container.querySelectorAll('section');
      // Should have at least 2 sections (tech stack and projects)
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    it('applies scroll animations', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Check for animation classes
      const animatedElements = container.querySelectorAll('[class*="fadeInUp"], [class*="scaleIn"]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware background colors', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      // Projects section should have theme-aware background
      const sections = container.querySelectorAll('section');
      const projectsSection = Array.from(sections).find(
        section => section.className.includes('bg-gradient-to-br')
      );

      expect(projectsSection).toBeTruthy();
    });

    it('card wrapper has theme-aware styling', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      const cardWrappers = container.querySelectorAll('.rounded-2xl.border');
      expect(cardWrappers.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithProviders(<SequentialLayout />);

      // Should have h2 headings for sections
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
    });

    it('sections have semantic structure', () => {
      const { container } = renderWithProviders(<SequentialLayout />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });
});
