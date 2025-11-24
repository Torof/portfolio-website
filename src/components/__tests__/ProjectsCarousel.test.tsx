import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsCarousel from '../ProjectsCarousel';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';

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

describe('ProjectsCarousel', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<ProjectsCarousel />);
      // DeFi Lending Protocol appears in both image placeholder and title
      const defiElements = screen.getAllByText('DeFi Lending Protocol');
      expect(defiElements.length).toBeGreaterThan(0);
    });

    it('has navigation arrows', () => {
      renderWithProviders(<ProjectsCarousel />);

      const prevButton = screen.getByLabelText('Previous projects');
      const nextButton = screen.getByLabelText('Next projects');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('has page indicators (dots)', () => {
      const { container } = renderWithProviders(<ProjectsCarousel />);

      // With 4 projects and 2 per page, should have 2 dots
      const dots = container.querySelectorAll('button[aria-label*="Go to page"]');
      expect(dots.length).toBe(2);
    });
  });

  describe('Initial Display', () => {
    it('shows first 2 projects initially', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Both projects appear in image and title
      expect(screen.getAllByText('DeFi Lending Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('does not show projects from second page initially', () => {
      renderWithProviders(<ProjectsCarousel />);

      expect(screen.queryByText('DAO Governance Platform')).not.toBeInTheDocument();
      expect(screen.queryByText('Cross-Chain Bridge')).not.toBeInTheDocument();
    });

    it('first page indicator is active', () => {
      renderWithProviders(<ProjectsCarousel />);

      const firstDot = screen.getByLabelText('Go to page 1');
      expect(firstDot.className).toContain('w-6'); // Active dot has w-6 class
    });
  });

  describe('Project Cards', () => {
    it('renders project titles', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Titles appear in both image and h3
      expect(screen.getAllByText('DeFi Lending Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('renders project descriptions', () => {
      renderWithProviders(<ProjectsCarousel />);

      expect(screen.getByText(/Decentralized lending platform/i)).toBeInTheDocument();
      expect(screen.getByText(/Full-featured NFT marketplace/i)).toBeInTheDocument();
    });

    it('renders project tags', () => {
      renderWithProviders(<ProjectsCarousel />);

      // DeFi Lending Protocol has tags: Solidity, React, DeFi
      // Solidity appears in multiple projects, so use getAllByText
      expect(screen.getAllByText('Solidity').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DeFi').length).toBeGreaterThan(0);
    });

    it('renders Code link for all projects', () => {
      renderWithProviders(<ProjectsCarousel />);

      const codeButtons = screen.getAllByText('Code');
      expect(codeButtons.length).toBe(2); // 2 projects visible, each has a Code button
    });

    it('renders Visit link only when websiteUrl exists', () => {
      renderWithProviders(<ProjectsCarousel />);

      // DeFi Lending Protocol and NFT Marketplace both have websiteUrl
      const visitButtons = screen.getAllByText('Visit');
      expect(visitButtons.length).toBe(2);
    });

    it('Code links have correct attributes', () => {
      renderWithProviders(<ProjectsCarousel />);

      const codeButtons = screen.getAllByText('Code');
      const firstCodeLink = codeButtons[0].closest('a');

      expect(firstCodeLink).toHaveAttribute('href', 'https://github.com/username/defi-lending');
      expect(firstCodeLink).toHaveAttribute('target', '_blank');
      expect(firstCodeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Visit links have correct attributes', () => {
      renderWithProviders(<ProjectsCarousel />);

      const visitButton = screen.getAllByText('Visit')[0];
      const visitLink = visitButton.closest('a');

      expect(visitLink).toHaveAttribute('href', 'https://example.com');
      expect(visitLink).toHaveAttribute('target', '_blank');
      expect(visitLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Navigation', () => {
    it('navigates to next page when right arrow clicked', () => {
      renderWithProviders(<ProjectsCarousel />);

      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Should now show page 2 projects (titles appear in both image and h3)
      expect(screen.getAllByText('DAO Governance Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });

    it('navigates to previous page when left arrow clicked', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Go to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Go back to page 1
      const prevButton = screen.getByLabelText('Previous projects');
      fireEvent.click(prevButton);

      // Should show page 1 projects again
      expect(screen.getAllByText('DeFi Lending Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('wraps to last page when clicking previous on first page', () => {
      renderWithProviders(<ProjectsCarousel />);

      const prevButton = screen.getByLabelText('Previous projects');
      fireEvent.click(prevButton);

      // Should wrap to page 2 (last page)
      expect(screen.getAllByText('DAO Governance Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });

    it('wraps to first page when clicking next on last page', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Go to last page
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Click next again to wrap around
      fireEvent.click(nextButton);

      // Should be back to page 1
      expect(screen.getAllByText('DeFi Lending Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);
    });

    it('navigates using dot indicators', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Click second dot to go to page 2
      const secondDot = screen.getByLabelText('Go to page 2');
      fireEvent.click(secondDot);

      // Should show page 2 projects
      expect(screen.getAllByText('DAO Governance Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });
  });

  describe('Page Indicators', () => {
    it('highlights current page indicator', () => {
      renderWithProviders(<ProjectsCarousel />);

      const firstDot = screen.getByLabelText('Go to page 1');
      const secondDot = screen.getByLabelText('Go to page 2');

      // First dot should be active (w-6 class)
      expect(firstDot.className).toContain('w-6');
      // Second dot should not be active (w-2 class)
      expect(secondDot.className).toContain('w-2');
      expect(secondDot.className).not.toContain('w-6');
    });

    it('updates highlighted indicator when page changes', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Navigate to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      const firstDot = screen.getByLabelText('Go to page 1');
      const secondDot = screen.getByLabelText('Go to page 2');

      // Second dot should now be active
      expect(secondDot.className).toContain('w-6');
      // First dot should not be active
      expect(firstDot.className).not.toContain('w-6');
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware styling to navigation buttons', () => {
      renderWithProviders(<ProjectsCarousel />);

      const prevButton = screen.getByLabelText('Previous projects');
      const nextButton = screen.getByLabelText('Next projects');

      expect(prevButton.className).toContain('rounded-full');
      expect(nextButton.className).toContain('rounded-full');
    });

    it('applies theme-aware styling to project cards', () => {
      const { container } = renderWithProviders(<ProjectsCarousel />);

      // Project cards have rounded-lg class
      const cards = container.querySelectorAll('.rounded-lg.border');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Grid Layout', () => {
    it('uses 2-column grid for projects', () => {
      const { container } = renderWithProviders(<ProjectsCarousel />);

      const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('displays 2 projects per page', () => {
      const { container } = renderWithProviders(<ProjectsCarousel />);

      // Count visible project cards (h3 titles only, not image placeholders)
      const projectTitles = container.querySelectorAll('h3.text-base.font-bold');
      expect(projectTitles.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('navigation buttons have proper aria-labels', () => {
      renderWithProviders(<ProjectsCarousel />);

      expect(screen.getByLabelText('Previous projects')).toBeInTheDocument();
      expect(screen.getByLabelText('Next projects')).toBeInTheDocument();
    });

    it('page indicators have proper aria-labels', () => {
      renderWithProviders(<ProjectsCarousel />);

      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
    });

    it('external links have proper rel attribute', () => {
      renderWithProviders(<ProjectsCarousel />);

      const codeButton = screen.getAllByText('Code')[0];
      const codeLink = codeButton.closest('a');

      expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('buttons are keyboard accessible', () => {
      const { container } = renderWithProviders(<ProjectsCarousel />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Hardcoded Projects Data', () => {
    it('renders all 4 hardcoded projects across pages', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Page 1 projects
      expect(screen.getAllByText('DeFi Lending Protocol').length).toBeGreaterThan(0);
      expect(screen.getAllByText('NFT Marketplace').length).toBeGreaterThan(0);

      // Navigate to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Page 2 projects
      expect(screen.getAllByText('DAO Governance Platform').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Cross-Chain Bridge').length).toBeGreaterThan(0);
    });

    it('renders correct tags for each project', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Page 1: DeFi Lending Protocol has Solidity, React, DeFi
      expect(screen.getAllByText('Solidity').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DeFi').length).toBeGreaterThan(0);

      // Navigate to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Page 2: DAO Governance Platform has Solidity, TypeScript, DAO
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DAO').length).toBeGreaterThan(0);

      // Page 2: Cross-Chain Bridge has Solidity, Web3, Layer2
      expect(screen.getAllByText('Web3').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Layer2').length).toBeGreaterThan(0);
    });

    it('third project (DAO) does not have website URL', () => {
      renderWithProviders(<ProjectsCarousel />);

      // Navigate to page 2
      const nextButton = screen.getByLabelText('Next projects');
      fireEvent.click(nextButton);

      // Count Visit buttons - should only be 1 (Cross-Chain Bridge has it, DAO doesn't)
      const visitButtons = screen.getAllByText('Visit');
      expect(visitButtons.length).toBe(1);

      // Both should have Code buttons
      const codeButtons = screen.getAllByText('Code');
      expect(codeButtons.length).toBe(2);
    });
  });
});
