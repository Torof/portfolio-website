import { fetchProjectsFromGitHub, getFeaturedProjects } from '../projects';
import { fetchGitHubRepositories, fetchRepositoryLanguages, GitHubRepository } from '../github';
import { fallbackProjects } from '../../data/fallbackProjects';

// Mock the GitHub service
jest.mock('../github');
const mockFetchGitHubRepositories = fetchGitHubRepositories as jest.MockedFunction<typeof fetchGitHubRepositories>;
const mockFetchRepositoryLanguages = fetchRepositoryLanguages as jest.MockedFunction<typeof fetchRepositoryLanguages>;

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  jest.clearAllMocks();
  console.error = jest.fn();
  console.log = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
});

describe('Projects Service', () => {
  const mockRepository: GitHubRepository = {
    id: 123,
    name: 'test-project',
    full_name: 'testuser/test-project',
    description: 'A test project',
    html_url: 'https://github.com/testuser/test-project',
    homepage: 'https://test-project.com',
    stargazers_count: 10,
    forks_count: 5,
    language: 'TypeScript',
    topics: ['react', 'nextjs', 'blockchain'],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-12-01T00:00:00Z',
    pushed_at: '2023-12-01T00:00:00Z',
    archived: false,
    fork: false,
    private: false,
  };

  describe('fetchProjectsFromGitHub', () => {
    it('should transform GitHub repositories to projects', async () => {
      mockFetchGitHubRepositories.mockResolvedValue([mockRepository]);
      mockFetchRepositoryLanguages.mockResolvedValue({
        TypeScript: 50000,
        JavaScript: 25000,
      });

      const result = await fetchProjectsFromGitHub();

      expect(result).toHaveLength(1);
      const project = result[0];
      
      expect(project.id).toBe('github-123');
      expect(project.title).toBe('Test Project'); // Transformed from kebab-case
      expect(project.description).toBe('A test project');
      expect(project.githubUrl).toBe('https://github.com/testuser/test-project');
      expect(project.liveUrl).toBe('https://test-project.com');
      expect(project.technologies).toContain('TypeScript');
      expect(project.technologies).toContain('React');
      expect(project.technologies).toContain('Next.js');
    });

    it('should generate correct thumbnails based on language', async () => {
      const solidityRepo = {
        ...mockRepository,
        language: 'Solidity',
        topics: ['smart-contract'],
      };

      mockFetchGitHubRepositories.mockResolvedValue([solidityRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({ Solidity: 100000 });

      const result = await fetchProjectsFromGitHub();

      expect(result[0].thumbnail).toBe('/screenshots/solidity-default.svg');
    });

    it('should generate enhanced descriptions for featured repositories', async () => {
      const nftMarketplaceRepo = {
        ...mockRepository,
        name: 'NFT-Marketplace',
        description: 'Basic NFT marketplace',
      };

      mockFetchGitHubRepositories.mockResolvedValue([nftMarketplaceRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await fetchProjectsFromGitHub('en');

      expect(result[0].description).toBe('Full-stack NFT marketplace with custodial model');
      expect(result[0].longDescription).toContain('complete NFT marketplace implementation');
      expect(result[0].featured).toBe(true);
    });

    it('should support French language descriptions', async () => {
      const nftMarketplaceRepo = {
        ...mockRepository,
        name: 'NFT-Marketplace',
      };

      mockFetchGitHubRepositories.mockResolvedValue([nftMarketplaceRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await fetchProjectsFromGitHub('fr');

      expect(result[0].description).toBe('Marketplace NFT complet avec modèle de garde');
      expect(result[0].longDescription).toContain('implémentation complète de marketplace NFT');
    });

    it('should handle repositories without descriptions', async () => {
      const repoWithoutDesc = {
        ...mockRepository,
        description: null,
      };

      mockFetchGitHubRepositories.mockResolvedValue([repoWithoutDesc]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const resultEn = await fetchProjectsFromGitHub('en');
      const resultFr = await fetchProjectsFromGitHub('fr');

      expect(resultEn[0].description).toBe('No description available');
      expect(resultFr[0].description).toBe('Aucune description disponible');
    });

    it('should extract technologies from topics and languages', async () => {
      const repoWithTopics = {
        ...mockRepository,
        language: 'Solidity',
        topics: ['defi', 'nft', 'erc721', 'hardhat', 'ethereum'],
      };

      mockFetchGitHubRepositories.mockResolvedValue([repoWithTopics]);
      mockFetchRepositoryLanguages.mockResolvedValue({
        Solidity: 80000,
        JavaScript: 20000,
      });

      const result = await fetchProjectsFromGitHub();

      expect(result[0].technologies).toContain('Solidity');
      expect(result[0].technologies).toContain('DeFi');
      expect(result[0].technologies).toContain('NFT');
      expect(result[0].technologies).toContain('ERC721');
      expect(result[0].technologies).toContain('Hardhat');
      expect(result[0].technologies).toContain('Ethereum');
      expect(result[0].technologies).toContain('JavaScript');
    });

    it('should limit technologies to 8 items', async () => {
      const repoWithManyTopics = {
        ...mockRepository,
        topics: ['react', 'nextjs', 'tailwind', 'solidity', 'ethereum', 'defi', 'nft', 'erc721', 'hardhat', 'foundry'],
      };

      mockFetchGitHubRepositories.mockResolvedValue([repoWithManyTopics]);
      mockFetchRepositoryLanguages.mockResolvedValue({
        TypeScript: 50000,
        JavaScript: 25000,
        Solidity: 20000,
      });

      const result = await fetchProjectsFromGitHub();

      expect(result[0].technologies.length).toBeLessThanOrEqual(8);
    });

    it('should handle language fetch failures gracefully', async () => {
      mockFetchGitHubRepositories.mockResolvedValue([mockRepository]);
      mockFetchRepositoryLanguages.mockRejectedValue(new Error('Network error'));

      const result = await fetchProjectsFromGitHub();

      expect(result).toHaveLength(1);
      expect(result[0].technologies).toContain('TypeScript'); // From primary language
      expect(console.warn).toHaveBeenCalledWith(
        'Could not fetch languages for test-project:',
        expect.any(Error)
      );
    });

    it('should return fallback projects when no repositories found', async () => {
      mockFetchGitHubRepositories.mockResolvedValue([]);

      const result = await fetchProjectsFromGitHub();

      expect(result).toEqual(fallbackProjects);
      expect(console.warn).toHaveBeenCalledWith('No repositories found, using fallback data');
    });

    it('should return fallback projects when GitHub fetch fails', async () => {
      mockFetchGitHubRepositories.mockRejectedValue(new Error('GitHub API error'));

      const result = await fetchProjectsFromGitHub();

      expect(result).toEqual(fallbackProjects);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching projects from GitHub:',
        expect.any(Error)
      );
      expect(console.log).toHaveBeenCalledWith('Using fallback projects');
    });

    it('should sort featured projects first', async () => {
      const regularRepo = { ...mockRepository, name: 'regular-project' };
      const featuredRepo = { ...mockRepository, id: 456, name: 'NFT-Marketplace' };

      mockFetchGitHubRepositories.mockResolvedValue([regularRepo, featuredRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await fetchProjectsFromGitHub();

      expect(result[0].featured).toBe(true);
      expect(result[0].title).toBe('NFT Marketplace');
      expect(result[1].featured).toBe(false);
      expect(result[1].title).toBe('Regular Project');
    });

    it('should use custom URL mapping when available', async () => {
      const uniswapRepo = {
        ...mockRepository,
        name: 'uniswap-v2-rebuild',
        html_url: 'https://github.com/testuser/uniswap-v2-rebuild',
      };

      mockFetchGitHubRepositories.mockResolvedValue([uniswapRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await fetchProjectsFromGitHub();

      expect(result[0].githubUrl).toBe('https://github.com/Torof/Uniswap_V2_rebuild');
    });

    it('should handle repository with specific screenshot mapping', async () => {
      const nftMarketplaceRepo = {
        ...mockRepository,
        name: 'NFT-Marketplace',
      };

      mockFetchGitHubRepositories.mockResolvedValue([nftMarketplaceRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await fetchProjectsFromGitHub();

      expect(result[0].thumbnail).toBe('/screenshots/nft-marketplace.png');
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return the same result as fetchProjectsFromGitHub', async () => {
      mockFetchGitHubRepositories.mockResolvedValue([mockRepository]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const regularProjects = await fetchProjectsFromGitHub();
      const featuredProjects = await getFeaturedProjects();

      expect(featuredProjects).toEqual(regularProjects);
    });

    it('should support language parameter', async () => {
      const nftMarketplaceRepo = {
        ...mockRepository,
        name: 'NFT-Marketplace',
      };

      mockFetchGitHubRepositories.mockResolvedValue([nftMarketplaceRepo]);
      mockFetchRepositoryLanguages.mockResolvedValue({});

      const result = await getFeaturedProjects('fr');

      expect(result[0].description).toBe('Marketplace NFT complet avec modèle de garde');
    });
  });
});