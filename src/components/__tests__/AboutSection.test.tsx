import { render, screen } from '@testing-library/react';
import AboutSection from '../AboutSection';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';

// Mock AnimatedTitle
jest.mock('../AnimatedTitle', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h2 className={className}>{children}</h2>
  },
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

describe('AboutSection', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<AboutSection />);
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    it('renders the section title', () => {
      renderWithProviders(<AboutSection />);

      const title = screen.getByText('About Me');
      expect(title).toBeInTheDocument();
    });

    it('renders "What I Do" section title', () => {
      renderWithProviders(<AboutSection />);

      const whatIDo = screen.getByText('What I Do');
      expect(whatIDo).toBeInTheDocument();
    });
  });

  describe('Content Cards', () => {
    it('renders card 1 with blockchain experience', () => {
      renderWithProviders(<AboutSection />);

      // Check for text about blockchain experience
      const card1Text = screen.getByText(/passionate blockchain developer/i);
      expect(card1Text).toBeInTheDocument();
    });

    it('renders card 2 about building dApps', () => {
      renderWithProviders(<AboutSection />);

      const card2Text = screen.getByText(/build fullstack Decentralized Applications/i);
      expect(card2Text).toBeInTheDocument();
    });

    it('renders card 3 about expanding expertise', () => {
      renderWithProviders(<AboutSection />);

      const card3Text = screen.getByText(/expanding my expertise/i);
      expect(card3Text).toBeInTheDocument();
    });
  });

  describe('What I Do Items', () => {
    it('renders item 1: smart contract development', () => {
      renderWithProviders(<AboutSection />);

      const item1 = screen.getByText(/Design and develop secure, efficient smart contracts/i);
      expect(item1).toBeInTheDocument();
    });

    it('renders item 2: dApps with frontend', () => {
      renderWithProviders(<AboutSection />);

      const item2 = screen.getByText(/Build full-stack dApps with modern frontend/i);
      expect(item2).toBeInTheDocument();
    });

    it('renders item 3: auditing', () => {
      renderWithProviders(<AboutSection />);

      const item3 = screen.getByText(/Audit and optimize existing blockchain projects/i);
      expect(item3).toBeInTheDocument();
    });

    it('renders item 4: token economies', () => {
      renderWithProviders(<AboutSection />);

      const item4 = screen.getByText(/Create and implement token economies/i);
      expect(item4).toBeInTheDocument();
    });

    it('renders item 5: full web applications (NEW)', () => {
      renderWithProviders(<AboutSection />);

      const item5 = screen.getByText(/Build complete web applications and websites from front-end to back-end/i);
      expect(item5).toBeInTheDocument();
    });
  });

  describe('Removed Vibe Coding', () => {
    it('does NOT render vibe coding text', () => {
      renderWithProviders(<AboutSection />);

      // Should not find vibe coding text
      const vibeText = screen.queryByText(/vibe coding/i);
      expect(vibeText).not.toBeInTheDocument();
    });

    it('does NOT render link to vibe-coding page', () => {
      const { container } = renderWithProviders(<AboutSection />);

      // Should not find any link to /vibe-coding
      const vibeLink = container.querySelector('a[href="/vibe-coding"]');
      expect(vibeLink).not.toBeInTheDocument();
    });

    it('does NOT render "Vibe Coding" button', () => {
      renderWithProviders(<AboutSection />);

      const vibeButton = screen.queryByText('Vibe Coding');
      expect(vibeButton).not.toBeInTheDocument();
    });
  });

  describe('Emojis', () => {
    it('renders correct emoji for item 5 (web globe)', () => {
      const { container } = renderWithProviders(<AboutSection />);

      // Check that the globe emoji (🌐) is present
      const content = container.textContent;
      expect(content).toContain('🌐');
    });

    it('does NOT render laptop emoji (old vibe coding)', () => {
      const { container } = renderWithProviders(<AboutSection />);

      // The laptop emoji 💻 should not be in the "What I Do" section anymore
      // Note: It might still appear elsewhere, but not as the last item
      const allItems = container.querySelectorAll('.flex.items-start.p-3');
      const lastItem = allItems[allItems.length - 1];

      if (lastItem) {
        expect(lastItem.textContent).not.toContain('💻');
        expect(lastItem.textContent).toContain('🌐');
      }
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware classes', () => {
      const { container } = renderWithProviders(<AboutSection />);

      // Check for theme-dependent classes
      const cards = container.querySelectorAll('[class*="bg-gradient"]');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Animation Classes', () => {
    it('includes animation classes', () => {
      const { container } = renderWithProviders(<AboutSection />);

      // Check for animation classes
      const animatedElements = container.querySelectorAll('[class*="animate"]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });
});
