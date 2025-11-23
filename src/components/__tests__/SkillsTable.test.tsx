import { render, screen } from '@testing-library/react';
import SkillsTable from '../SkillsTable';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';

// Mock AnimatedTitle using relative path
jest.mock('../../components/AnimatedTitle', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h2 className={className}>{children}</h2>
  },
}));

// Mock MatrixRain using relative path
jest.mock('../../components/MatrixRain', () => ({
  __esModule: true,
  default: () => <div data-testid="matrix-rain" />,
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

describe('SkillsTable', () => {
  describe('Structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<SkillsTable />);
      expect(screen.getByText(/Skills Matrix/i)).toBeInTheDocument();
    });

    it('renders as a section element', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('includes MatrixRain background', () => {
      renderWithProviders(<SkillsTable />);

      const matrixRain = screen.getByTestId('matrix-rain');
      expect(matrixRain).toBeInTheDocument();
    });

    it('has three columns for skill categories', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for grid with 3 columns
      const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Column Titles', () => {
    it('renders Hard Skills column title', () => {
      renderWithProviders(<SkillsTable />);

      const hardSkillsTitle = screen.getByText(/HARD_SKILLS/i);
      expect(hardSkillsTitle).toBeInTheDocument();
    });

    it('renders Soft Skills column title', () => {
      renderWithProviders(<SkillsTable />);

      const softSkillsTitle = screen.getByText(/SOFT/i);
      expect(softSkillsTitle).toBeInTheDocument();
    });

    it('renders Mad Skills column title', () => {
      renderWithProviders(<SkillsTable />);

      const madSkillsTitle = screen.getByText(/MAD/i);
      expect(madSkillsTitle).toBeInTheDocument();
    });
  });

  describe('Hard Skills', () => {
    it('renders Solidity skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Solidity/i)).toBeInTheDocument();
    });

    it('renders React skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/React.*Next\.js/i)).toBeInTheDocument();
    });

    it('renders TypeScript skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('TypeScript & JavaScript')).toBeInTheDocument();
    });

    it('renders Node.js skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('Node.js & Express')).toBeInTheDocument();
    });

    it('renders Hardhat skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('Hardhat & Foundry')).toBeInTheDocument();
    });

    it('renders Git skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('Git & Version Control')).toBeInTheDocument();
    });

    it('has correct emoji for hard skills column', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Hard skills column should have 💪 emoji
      expect(container.textContent).toContain('💪');
    });
  });

  describe('Soft Skills', () => {
    it('renders Active listening skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Active listening/i)).toBeInTheDocument();
    });

    it('renders Problem-solving skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Problem.*solving/i)).toBeInTheDocument();
    });

    it('renders Team collaboration skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Team collaboration/i)).toBeInTheDocument();
    });

    it('renders Clear communication skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Communication/i)).toBeInTheDocument();
    });

    it('renders Adaptability skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Adaptability/i)).toBeInTheDocument();
    });

    it('renders Critical thinking skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Critical thinking/i)).toBeInTheDocument();
    });

    it('has correct emoji for soft skills column', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Soft skills column should have 🌟 emoji
      expect(container.textContent).toContain('🌟');
    });
  });

  describe('Mad Skills', () => {
    it('renders Canyoning skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('Canyoning')).toBeInTheDocument();
    });

    it('renders Rock climbing skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/Rock.*climbing/i)).toBeInTheDocument();
    });

    it('renders Paragliding skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText('Paragliding')).toBeInTheDocument();
    });

    it('renders Mountain hiking skill', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check if text contains hiking
      expect(container.textContent).toMatch(/hiking/i);
    });

    it('renders Hackathons skill', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check if text contains hackathon
      expect(container.textContent).toMatch(/hackathon/i);
    });

    it('renders Auditing skill', () => {
      renderWithProviders(<SkillsTable />);

      expect(screen.getByText(/auditing/i)).toBeInTheDocument();
    });

    it('has correct emoji for mad skills column', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Mad skills column should have 🎯 emoji
      expect(container.textContent).toContain('🎯');
    });
  });

  describe('Skill Icons', () => {
    it('displays skill icons for hard skills', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for some hard skill icons
      expect(container.textContent).toContain('⚡'); // Solidity
      expect(container.textContent).toContain('⚛️'); // React
      expect(container.textContent).toContain('📘'); // TypeScript
    });

    it('displays skill icons for soft skills', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for some soft skill icons
      expect(container.textContent).toContain('👂'); // Listening
      expect(container.textContent).toContain('🧩'); // Problem solving
      expect(container.textContent).toContain('🤝'); // Collaboration
    });

    it('displays skill icons for mad skills', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for some mad skill icons
      expect(container.textContent).toContain('🏔️'); // Canyoning
      expect(container.textContent).toContain('🧗'); // Climbing
      expect(container.textContent).toContain('🪂'); // Paragliding
    });
  });

  describe('Theme Integration', () => {
    it('applies theme-aware background gradient', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for gradient backgrounds
      const gradients = container.querySelectorAll('[class*="bg-gradient"]');
      expect(gradients.length).toBeGreaterThan(0);
    });

    it('applies theme-aware styling to skill columns', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for backdrop blur and border styling
      const columns = container.querySelectorAll('[class*="backdrop-blur"]');
      expect(columns.length).toBeGreaterThan(0);
    });
  });

  describe('Layout', () => {
    it('uses responsive grid layout', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for responsive grid classes
      const grid = container.querySelector('[class*="md:grid-cols-3"]');
      expect(grid).toBeInTheDocument();
    });

    it('has proper spacing between columns', () => {
      const { container } = renderWithProviders(<SkillsTable />);

      // Check for gap classes
      const grid = container.querySelector('[class*="gap-8"]');
      expect(grid).toBeInTheDocument();
    });
  });
});
