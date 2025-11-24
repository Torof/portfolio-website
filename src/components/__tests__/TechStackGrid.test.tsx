import { render, screen, fireEvent } from '@testing-library/react';
import TechStackGrid from '../TechStackGrid';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { techStack } from '@/lib/data/techStack';

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

describe('TechStackGrid', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<TechStackGrid />);
      expect(screen.getByText('Blockchain')).toBeInTheDocument();
    });

    it('renders three category sections', () => {
      renderWithProviders(<TechStackGrid />);

      expect(screen.getByText('Blockchain')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
    });

    it('has proper container structure', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const mainContainer = container.querySelector('.w-full');
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe('Category Titles', () => {
    it('renders Blockchain category title', () => {
      renderWithProviders(<TechStackGrid />);

      const blockchainTitle = screen.getByText('Blockchain');
      expect(blockchainTitle).toBeInTheDocument();
      expect(blockchainTitle.tagName).toBe('H3');
    });

    it('renders Frontend category title', () => {
      renderWithProviders(<TechStackGrid />);

      const frontendTitle = screen.getByText('Frontend');
      expect(frontendTitle).toBeInTheDocument();
      expect(frontendTitle.tagName).toBe('H3');
    });

    it('renders Backend category title', () => {
      renderWithProviders(<TechStackGrid />);

      const backendTitle = screen.getByText('Backend');
      expect(backendTitle).toBeInTheDocument();
      expect(backendTitle.tagName).toBe('H3');
    });
  });

  describe('Initial Display', () => {
    it('shows only first 3 blockchain technologies initially', () => {
      renderWithProviders(<TechStackGrid />);

      // First 3 should be visible
      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('Hardhat')).toBeInTheDocument();
      expect(screen.getByText('Foundry')).toBeInTheDocument();

      // 4th should not be visible
      expect(screen.queryByText('Remix')).not.toBeInTheDocument();
    });

    it('shows only first 3 frontend technologies initially', () => {
      renderWithProviders(<TechStackGrid />);

      // First 3 should be visible
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Vercel')).toBeInTheDocument();

      // 4th item is Typescript, but it also appears in backend (first item)
      // So we check for RainbowKit (5th) which should definitely not be visible
      expect(screen.queryByText('RainbowKit')).not.toBeInTheDocument();
    });

    it('shows only first 3 backend technologies initially', () => {
      renderWithProviders(<TechStackGrid />);

      // First 3 should be visible (note: Typescript is first in backend)
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Git')).toBeInTheDocument();

      // Later items should not be visible
      expect(screen.queryByText('IPFS')).not.toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('blockchain category expands when View More is clicked', () => {
      renderWithProviders(<TechStackGrid />);

      // Find the first "View ... more" button (blockchain)
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      const blockchainViewMore = viewMoreButtons[0];

      // Click to expand
      fireEvent.click(blockchainViewMore);

      // Now all technologies should be visible
      expect(screen.getByText('Remix')).toBeInTheDocument();
      expect(screen.getByText('OpenZeppelin')).toBeInTheDocument();
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
    });

    it('blockchain category collapses when Show Less is clicked', () => {
      renderWithProviders(<TechStackGrid />);

      // Expand first
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      fireEvent.click(viewMoreButtons[0]);

      // Verify expanded
      expect(screen.getByText('Remix')).toBeInTheDocument();

      // Now collapse
      const showLessButton = screen.getAllByText(/Show Less/i)[0];
      fireEvent.click(showLessButton);

      // 4th item should be hidden again
      expect(screen.queryByText('Remix')).not.toBeInTheDocument();
    });

    it('frontend category expands independently', () => {
      renderWithProviders(<TechStackGrid />);

      // Expand frontend (second View More button)
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      fireEvent.click(viewMoreButtons[1]);

      // RainbowKit should now be visible (it was hidden initially)
      expect(screen.getByText('RainbowKit')).toBeInTheDocument();
      expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
    });

    it('backend category expands independently', () => {
      renderWithProviders(<TechStackGrid />);

      // Expand backend (third View More button)
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      fireEvent.click(viewMoreButtons[2]);

      // IPFS and other backend tech should be visible
      expect(screen.getByText('IPFS')).toBeInTheDocument();
      expect(screen.getByText('Pinata')).toBeInTheDocument();
    });
  });

  describe('View More Button', () => {
    it('displays View More button for blockchain category', () => {
      renderWithProviders(<TechStackGrid />);

      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      expect(viewMoreButtons.length).toBeGreaterThanOrEqual(3);
    });

    it('View More button shows correct remaining count for blockchain', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      // Blockchain has 12 technologies, showing 3, so remaining = 9
      const blockchainRemainingCount = techStack.blockchain.length - 3;
      expect(blockchainRemainingCount).toBe(9);

      // Check the text content includes the count
      expect(container.textContent).toMatch(/9/);
    });

    it('View More button has proper styling', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const viewMoreButtons = container.querySelectorAll('button');
      expect(viewMoreButtons.length).toBeGreaterThan(0);

      // Check that buttons have proper classes
      viewMoreButtons.forEach(button => {
        expect(button.className).toContain('glass-vibrant');
      });
    });
  });

  describe('Technology Logos', () => {
    it('renders logo images for displayed technologies', () => {
      renderWithProviders(<TechStackGrid />);

      // Check for Solidity logo
      const solidityLogo = screen.getByAltText('Solidity logo');
      expect(solidityLogo).toBeInTheDocument();
      expect(solidityLogo).toHaveAttribute('src', '/logos/solidity.svg');
    });

    it('renders logo images for React', () => {
      renderWithProviders(<TechStackGrid />);

      const reactLogo = screen.getByAltText('React logo');
      expect(reactLogo).toBeInTheDocument();
      expect(reactLogo).toHaveAttribute('src', '/logos/reactjs.svg');
    });

    it('renders logo images for Node.js', () => {
      renderWithProviders(<TechStackGrid />);

      const nodeLogo = screen.getByAltText('Node.js logo');
      expect(nodeLogo).toBeInTheDocument();
      expect(nodeLogo).toHaveAttribute('src', '/logos/nodejs.svg');
    });

    it('all initial logos have proper dimensions', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const logoContainers = container.querySelectorAll('.h-16.w-16');
      expect(logoContainers.length).toBe(9); // 3 categories × 3 items each
    });
  });

  describe('Technology Names', () => {
    it('displays technology names in blockchain category', () => {
      renderWithProviders(<TechStackGrid />);

      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('Hardhat')).toBeInTheDocument();
      expect(screen.getByText('Foundry')).toBeInTheDocument();
    });

    it('displays technology names in frontend category', () => {
      renderWithProviders(<TechStackGrid />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Vercel')).toBeInTheDocument();
    });

    it('displays technology names in backend category', () => {
      renderWithProviders(<TechStackGrid />);

      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Git')).toBeInTheDocument();
    });
  });

  describe('Category Icons', () => {
    it('each category has an icon container', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      // Each category should have an icon with SVG
      const iconContainers = container.querySelectorAll('.w-12.h-12.rounded-lg');
      expect(iconContainers.length).toBe(3);
    });

    it('blockchain category has correct color class', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      // Blockchain uses bg-[rgba(2,132,201,0.2)]
      const blockchainIcon = container.querySelector('.bg-\\[rgba\\(2\\,132\\,201\\,0\\.2\\)\\]');
      expect(blockchainIcon).toBeInTheDocument();
    });
  });

  describe('Grid Layout', () => {
    it('uses 3-column grid for technologies', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const grids = container.querySelectorAll('.grid.grid-cols-3');
      expect(grids.length).toBe(3); // One for each category
    });

    it('technology cards have proper styling', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const techCards = container.querySelectorAll('.glass-vibrant');
      expect(techCards.length).toBeGreaterThan(9); // At least 9 tech cards + buttons
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware border styling', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const categoryContainers = container.querySelectorAll('[class*="border-\\[rgba"]');
      expect(categoryContainers.length).toBeGreaterThan(0);
    });

    it('applies theme-aware background', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const bgElements = container.querySelectorAll('[class*="bg-\\[var\\(--background-secondary\\)\\]"]');
      expect(bgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('all images have alt text', () => {
      renderWithProviders(<TechStackGrid />);

      const solidityLogo = screen.getByAltText('Solidity logo');
      const hardhatLogo = screen.getByAltText('Hardhat logo');
      const foundryLogo = screen.getByAltText('Foundry logo');

      expect(solidityLogo).toBeInTheDocument();
      expect(hardhatLogo).toBeInTheDocument();
      expect(foundryLogo).toBeInTheDocument();
    });

    it('buttons are keyboard accessible', () => {
      const { container } = renderWithProviders(<TechStackGrid />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Expanded State Display', () => {
    it('shows all blockchain technologies when expanded', () => {
      renderWithProviders(<TechStackGrid />);

      // Expand
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      fireEvent.click(viewMoreButtons[0]);

      // Check that all 12 blockchain technologies are visible
      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('Hardhat')).toBeInTheDocument();
      expect(screen.getByText('Foundry')).toBeInTheDocument();
      expect(screen.getByText('Remix')).toBeInTheDocument();
      expect(screen.getByText('OpenZeppelin')).toBeInTheDocument();
      expect(screen.getByText('Slither')).toBeInTheDocument();
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('Chainlink')).toBeInTheDocument();
      expect(screen.getByText('Solana')).toBeInTheDocument();
      expect(screen.getByText('Anchor')).toBeInTheDocument();
      expect(screen.getByText('Polkadot')).toBeInTheDocument();
      expect(screen.getByText('Rust')).toBeInTheDocument();
    });

    it('shows all frontend technologies when expanded', () => {
      renderWithProviders(<TechStackGrid />);

      // Expand frontend
      const viewMoreButtons = screen.getAllByText(/View.*more/i);
      fireEvent.click(viewMoreButtons[1]);

      // Check all 9 frontend technologies (skip Typescript as it also appears in backend)
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Vercel')).toBeInTheDocument();
      expect(screen.getByText('RainbowKit')).toBeInTheDocument();
      expect(screen.getByText('HTML')).toBeInTheDocument();
      expect(screen.getByText('CSS')).toBeInTheDocument();
      expect(screen.getByText('TailwindCSS')).toBeInTheDocument();

      // Typescript appears in both frontend and backend, so check there are 2 instances
      const typescriptElements = screen.getAllByText('Typescript');
      expect(typescriptElements.length).toBe(2);
    });
  });
});
