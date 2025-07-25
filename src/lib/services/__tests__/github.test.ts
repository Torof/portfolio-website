import {
  fetchGitHubRepositories,
  fetchGitHubUser,
  fetchRepositoryLanguages,
  fetchGitHubStats,
  GitHubRepository,
  GitHubUser,
} from '../github';

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  mockFetch.mockClear();
  console.error = jest.fn();
  console.log = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
});

describe('GitHub Service', () => {
  describe('fetchGitHubRepositories', () => {
    const mockRepositories: GitHubRepository[] = [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'Torof/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/Torof/test-repo',
        homepage: null,
        stargazers_count: 5,
        forks_count: 2,
        language: 'TypeScript',
        topics: ['test', 'typescript'],
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        pushed_at: '2023-12-01T00:00:00Z',
        archived: false,
        fork: false,
        private: false,
      },
      {
        id: 2,
        name: 'forked-repo',
        full_name: 'Torof/forked-repo',
        description: 'A forked repository',
        html_url: 'https://github.com/Torof/forked-repo',
        homepage: null,
        stargazers_count: 0,
        forks_count: 0,
        language: 'JavaScript',
        topics: [],
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        pushed_at: '2023-12-01T00:00:00Z',
        archived: false,
        fork: true, // This should be filtered out
        private: false,
      },
    ];

    it('should fetch and filter repositories successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepositories,
      } as Response);

      const result = await fetchGitHubRepositories();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/Torof/repos?sort=updated&per_page=100',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/vnd.github.v3+json',
          }),
        })
      );

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('test-repo');
      expect(result[0].fork).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const result = await fetchGitHubRepositories();

      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching GitHub repositories:',
        expect.any(Error)
      );
    });

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchGitHubRepositories();

      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching GitHub repositories:',
        expect.any(Error)
      );
    });

    it('should filter out repos without descriptions', async () => {
      const reposWithoutDesc = [
        { ...mockRepositories[0], description: null },
        { ...mockRepositories[0], description: '' },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => reposWithoutDesc,
      } as Response);

      const result = await fetchGitHubRepositories();

      expect(result).toEqual([]);
    });
  });

  describe('fetchGitHubUser', () => {
    const mockUser: GitHubUser = {
      login: 'Torof',
      name: 'Test User',
      bio: 'A test user',
      location: 'Test Location',
      blog: 'https://testblog.com',
      public_repos: 10,
      followers: 5,
      following: 3,
      created_at: '2020-01-01T00:00:00Z',
      avatar_url: 'https://github.com/avatar.jpg',
    };

    it('should fetch user successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const result = await fetchGitHubUser();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/Torof',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/vnd.github.v3+json',
          }),
        })
      );

      expect(result).toEqual(mockUser);
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const result = await fetchGitHubUser();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching GitHub user:',
        expect.any(Error)
      );
    });
  });

  describe('fetchRepositoryLanguages', () => {
    const mockLanguages = {
      TypeScript: 50000,
      JavaScript: 25000,
      CSS: 15000,
    };

    it('should fetch repository languages successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLanguages,
      } as Response);

      const result = await fetchRepositoryLanguages('test-repo');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/Torof/test-repo/languages',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/vnd.github.v3+json',
          }),
        })
      );

      expect(result).toEqual(mockLanguages);
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const result = await fetchRepositoryLanguages('test-repo');

      expect(result).toEqual({});
    });

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchRepositoryLanguages('test-repo');

      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching languages for test-repo:',
        expect.any(Error)
      );
    });
  });

  describe('fetchGitHubStats', () => {
    const mockUser: GitHubUser = {
      login: 'Torof',
      name: 'Test User',
      bio: 'A test user',
      location: 'Test Location',
      blog: 'https://testblog.com',
      public_repos: 2,
      followers: 5,
      following: 3,
      created_at: '2020-01-01T00:00:00Z',
      avatar_url: 'https://github.com/avatar.jpg',
    };

    const mockRepositories: GitHubRepository[] = [
      {
        id: 1,
        name: 'repo1',
        full_name: 'Torof/repo1',
        description: 'Test repo 1',
        html_url: 'https://github.com/Torof/repo1',
        homepage: null,
        stargazers_count: 10,
        forks_count: 3,
        language: 'TypeScript',
        topics: [],
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        pushed_at: '2023-12-01T00:00:00Z',
        archived: false,
        fork: false,
        private: false,
      },
    ];

    it('should calculate GitHub stats successfully', async () => {
      // Mock the individual function calls
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRepositories,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ TypeScript: 50000, JavaScript: 25000 }),
        } as Response);

      const result = await fetchGitHubStats();

      expect(result).not.toBeNull();
      expect(result?.totalRepos).toBe(2);
      expect(result?.totalStars).toBe(10);
      expect(result?.totalForks).toBe(3);
      expect(result?.user).toEqual(mockUser);
      expect(result?.topLanguages).toBeDefined();
      expect(result?.topLanguages.length).toBeGreaterThan(0);
    });

    it('should handle missing user data', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRepositories,
        } as Response);

      const result = await fetchGitHubStats();

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith('Could not fetch user or repository data');
    });

    it('should handle empty repositories', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [],
        } as Response);

      const result = await fetchGitHubStats();

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith('Could not fetch user or repository data');
    });
  });
});