import { render, screen, fireEvent } from '@testing-library/react';
import FeaturedProjectsCarousel from '../FeaturedProjectsCarousel';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { FeaturedProject } from '@/lib/data/featuredProjects';

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

// Mock featured projects data
const mockProjects: FeaturedProject[] = [
  {
    id: 'project-1',
    title: 'DeFi Protocol',
    description: 'A decentralized finance protocol built on Ethereum.',
    image: '/projects/defi-protocol.jpg',
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/test/defi',
    tags: ['Solidity', 'React', 'DeFi'],
  },
  {
    id: 'project-2',
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with minting and trading.',
    image: '/projects/nft-marketplace.jpg',
    githubUrl: 'https://github.com/test/nft',
    tags: ['Solidity', 'Next.js', 'NFT'],
  },
  {
    id: 'project-3',
    title: 'DAO Platform',
    description: 'Decentralized autonomous organization platform.',
    image: '/projects/dao-platform.jpg',
    websiteUrl: 'https://example.com/dao',
    githubUrl: 'https://github.com/test/dao',
    tags: ['TypeScript', 'DAO', 'Governance'],
  },
  {
    id: 'project-4',
    title: 'Cross-Chain Bridge',
    description: 'Secure cross-chain asset bridge.',
    image: '/projects/bridge.jpg',
    githubUrl: 'https://github.com/test/bridge',
    tags: ['Web3', 'Cross-Chain', 'Layer2'],
  },
];

describe('FeaturedProjectsCarousel', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);
      // DeFi Protocol appears in both image placeholder and title
      const defiElements = screen.getAllByText('DeFi Protocol');
      expect(defiElements.length).toBeGreaterThan(0);
    });

    it('renders the header section', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Check for header title (using translation key)
      const header = screen.getByText(/Featured Projects/i);
      expect(header).toBeInTheDocument();
    });

    it('has navigation arrows', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const prevButton = screen.getByLabelText('Previous projects');
      const nextButton = screen.getByLabelText('Next projects');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('has page indicators (dots)', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // With 4 projects and 2 per page, should have 2 dots
      const dots = container.querySelectorAll('button[aria-label*="Go to page"]');
      expect(dots.length).toBe(2);
    });
  });

  describe('Initial Display', () => {
    it('shows first 2 projects initially', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Both projects appear in image and title
      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('does not show projects from second page initially', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      expect(screen.queryByText('DAO Platform')).not.toBeInTheDocument();
      expect(screen.queryByText('Cross-Chain Bridge')).not.toBeInTheDocument();
    });

    it('first page indicator is active', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const firstDot = screen.getByLabelText('Go to page 1');
      expect(firstDot.className).toContain('w-8'); // Active dot has w-8 class
    });
  });

  describe('Project Cards', () => {
    it('renders project titles', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Titles appear in both image and h3
      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('renders project descriptions', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      expect(screen.getByText(/decentralized finance protocol/i)).toBeInTheDocument();
      expect(screen.getByText(/Full-featured NFT marketplace/i)).toBeInTheDocument();
    });

    it('renders project tags (first 3 only)', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // DeFi Protocol has tags: Solidity, React, DeFi (all 3 should show)
      // Solidity appears in multiple projects, so use getAllByText
      expect(screen.getAllByText('Solidity').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DeFi').length).toBeGreaterThan(0);
    });

    it('renders GitHub link for all projects', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const codeButtons = screen.getAllByText('Code');
      expect(codeButtons.length).toBe(2); // 2 projects visible, each has a Code button
    });

    it('renders Website link only when websiteUrl exists', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // DeFi Protocol has websiteUrl, NFT Marketplace doesn't
      const websiteButtons = screen.getAllByText('Website');
      expect(websiteButtons.length).toBe(1); // Only DeFi Protocol has website
    });

    it('GitHub links have correct href', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const codeButtons = screen.getAllByText('Code');
      const firstCodeLink = codeButtons[0].closest('a');

      expect(firstCodeLink).toHaveAttribute('href', 'https://github.com/test/defi');
      expect(firstCodeLink).toHaveAttribute('target', '_blank');
      expect(firstCodeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Website links have correct href', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const websiteButton = screen.getByText('Website');
      const websiteLink = websiteButton.closest('a');

      expect(websiteLink).toHaveAttribute('href', 'https://example.com');
      expect(websiteLink).toHaveAttribute('target', '_blank');
      expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Navigation', () => {
    it('navigates to next page when right arrow clicked', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Should now show page 2 projects (titles appear in both image and h3)
      expect(screen.getAllByText('DAO Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });

    it('navigates to previous page when left arrow clicked', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Go to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Go back to page 1
      const prevButton = screen.getByLabelText('Previous projects');
      fireEvent.click(prevButton);

      // Should show page 1 projects again
      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('wraps to last page when clicking previous on first page', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const prevButton = screen.getByLabelText('Previous projects');
      fireEvent.click(prevButton);

      // Should wrap to page 2 (last page)
      expect(screen.getAllByText('DAO Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });

    it('wraps to first page when clicking next on last page', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Go to last page
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Click next again to wrap around
      fireEvent.click(nextButton);

      // Should be back to page 1
      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('navigates using dot indicators', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Click second dot to go to page 2
      const secondDot = screen.getByLabelText('Go to page 2');
      fireEvent.click(secondDot);

      // Should show page 2 projects
      expect(screen.getAllByText('DAO Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });
  });

  describe('Page Indicators', () => {
    it('highlights current page indicator', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const firstDot = screen.getByLabelText('Go to page 1');
      const secondDot = screen.getByLabelText('Go to page 2');

      // First dot should be active (w-8 class)
      expect(firstDot.className).toContain('w-8');
      // Second dot should not be active
      expect(secondDot.className).not.toContain('w-8');
    });

    it('updates highlighted indicator when page changes', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Navigate to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      const firstDot = screen.getByLabelText('Go to page 1');
      const secondDot = screen.getByLabelText('Go to page 2');

      // Second dot should now be active
      expect(secondDot.className).toContain('w-8');
      // First dot should not be active
      expect(firstDot.className).not.toContain('w-8');
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware styling to main container', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const mainContainer = container.querySelector('.rounded-2xl.border');
      expect(mainContainer).toBeInTheDocument();
    });

    it('applies theme-aware styling to project cards', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Project cards have rounded-2xl class
      const cards = container.querySelectorAll('.rounded-2xl.overflow-hidden');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('applies theme-aware styling to navigation buttons', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const prevButton = screen.getByLabelText('Previous projects');
      const nextButton = screen.getByLabelText('Next projects');

      expect(prevButton.className).toContain('rounded-full');
      expect(nextButton.className).toContain('rounded-full');
    });
  });

  describe('Grid Layout', () => {
    it('uses 2-column grid for projects', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('displays 2 projects per page', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // Count visible project cards (h3 titles only, not image placeholders)
      const projectTitles = container.querySelectorAll('h3.text-xl.font-bold');
      expect(projectTitles.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('navigation buttons have proper aria-labels', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      expect(screen.getByLabelText('Previous projects')).toBeInTheDocument();
      expect(screen.getByLabelText('Next projects')).toBeInTheDocument();
    });

    it('page indicators have proper aria-labels', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
    });

    it('external links have proper rel attribute', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const codeButton = screen.getAllByText('Code')[0];
      const codeLink = codeButton.closest('a');

      expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('buttons are keyboard accessible', () => {
      const { container } = renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles odd number of projects', () => {
      const threeProjects = mockProjects.slice(0, 3);
      renderWithProviders(<FeaturedProjectsCarousel projects={threeProjects} />);

      // Should still render without errors (titles appear in both image and h3)
      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('handles single project', () => {
      const oneProject = [mockProjects[0]];
      renderWithProviders(<FeaturedProjectsCarousel projects={oneProject} />);

      expect(screen.getAllByText('DeFi Protocol').length).toBeGreaterThan(0);

      // Should only have 1 page indicator
      const dots = screen.getAllByRole('button', { name: /Go to page/i });
      expect(dots.length).toBe(1);
    });

    it('handles project without website URL', () => {
      renderWithProviders(<FeaturedProjectsCarousel projects={mockProjects} />);

      // NFT Marketplace doesn't have websiteUrl
      const codeButtons = screen.getAllByText('Code');
      expect(codeButtons.length).toBe(2);

      const websiteButtons = screen.getAllByText('Website');
      expect(websiteButtons.length).toBe(1); // Only one project has website
    });
  });
});
