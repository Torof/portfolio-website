/**
 * @jest-environment node
 */

import { GET, HEAD } from '../route';
import { fetchGitHubStats } from '../../../../lib/services/github';

// Mock the GitHub service
jest.mock('../../../../lib/services/github');

const mockFetchGitHubStats = fetchGitHubStats as jest.MockedFunction<typeof fetchGitHubStats>;

describe('GitHub API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console logs in tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('returns GitHub stats successfully', async () => {
      const mockStats = {
        user: {
          login: 'testuser',
          name: 'Test User',
          bio: 'Test bio',
          public_repos: 50,
          followers: 100,
        },
        totalRepos: 50,
        totalStars: 150,
        totalForks: 25,
      };

      mockFetchGitHubStats.mockResolvedValue(mockStats);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.stats).toEqual(mockStats);
      expect(data.source).toBe('live-api');
      expect(data.fetchedAt).toBeDefined();
      expect(mockFetchGitHubStats).toHaveBeenCalledTimes(1);
    });

    it('returns 404 when no stats are found', async () => {
      mockFetchGitHubStats.mockResolvedValue(null);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('No GitHub data found');
    });

    it('returns 500 when service throws an error', async () => {
      mockFetchGitHubStats.mockRejectedValue(new Error('API rate limit exceeded'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch GitHub data');
      expect(data.details).toBe('API rate limit exceeded');
    });

    it('handles unknown errors', async () => {
      mockFetchGitHubStats.mockRejectedValue('Unknown error string');

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch GitHub data');
      expect(data.details).toBe('Unknown error');
    });

    it('includes timestamp in response', async () => {
      const mockStats = {
        user: { login: 'testuser' },
        totalRepos: 10,
        totalStars: 50,
        totalForks: 5,
      };

      mockFetchGitHubStats.mockResolvedValue(mockStats);

      const beforeTime = new Date().toISOString();
      const response = await GET();
      const afterTime = new Date().toISOString();
      const data = await response.json();

      expect(data.fetchedAt).toBeDefined();
      expect(data.fetchedAt >= beforeTime).toBe(true);
      expect(data.fetchedAt <= afterTime).toBe(true);
    });
  });

  describe('HEAD', () => {
    it('returns 200 with cache headers', async () => {
      const response = await HEAD();

      expect(response.status).toBe(200);

      const cacheControl = response.headers.get('Cache-Control');
      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=600');
      expect(cacheControl).toContain('stale-while-revalidate=1200');
    });

    it('returns empty body', async () => {
      const response = await HEAD();
      const text = await response.text();

      expect(text).toBe('');
    });
  });

  describe('Logging', () => {
    it('logs successful fetch', async () => {
      const mockStats = {
        user: { login: 'testuser' },
        totalRepos: 10,
        totalStars: 50,
        totalForks: 5,
      };

      mockFetchGitHubStats.mockResolvedValue(mockStats);

      await GET();

      expect(console.log).toHaveBeenCalledWith('[API] Fetching GitHub stats');
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Successfully fetched GitHub stats')
      );
    });

    it('logs errors', async () => {
      const error = new Error('Test error');
      mockFetchGitHubStats.mockRejectedValue(error);

      await GET();

      expect(console.error).toHaveBeenCalledWith(
        '[API] Error fetching GitHub data:',
        error
      );
    });
  });
});
