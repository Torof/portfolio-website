import { fetchGitHubContributions, transformContributionsForGraph } from '../githubContributions';

// Mock fetch globally
global.fetch = jest.fn();

describe('githubContributions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset console.log and console.error mocks
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('fetchGitHubContributions', () => {
    it('should fetch and transform GitHub contributions successfully', async () => {
      const mockApiResponse = {
        contributions: [
          [
            { date: '2024-01-01', contributionCount: 5 },
            { date: '2024-01-02', contributionCount: 3 },
            { date: '2024-01-03', contributionCount: 0 },
            { date: '2024-01-04', contributionCount: 8 }
          ]
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await fetchGitHubContributions('testuser');

      expect(fetch).toHaveBeenCalledWith(
        'https://github-contributions-api.deno.dev/testuser.json',
        {
          next: { revalidate: 3600 }
        }
      );

      expect(result).toEqual({
        total: 16, // 5 + 3 + 0 + 8
        days: [
          { date: '2024-01-01', count: 5, level: 2 }, // 5 contributions = level 2
          { date: '2024-01-02', count: 3, level: 2 }, // 3 contributions = level 2
          { date: '2024-01-03', count: 0, level: 0 }, // 0 contributions = level 0
          { date: '2024-01-04', count: 8, level: 3 }  // 8 contributions = level 3
        ]
      });
    });

    it('should handle API errors and return fallback data', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const result = await fetchGitHubContributions('testuser');

      expect(result).not.toBeNull();
      expect(result?.total).toBeGreaterThan(0);
      expect(result?.days).toBeDefined();
      expect(result?.days.length).toBeGreaterThan(0);
    });

    it('should handle HTTP error responses', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await fetchGitHubContributions('nonexistentuser');

      expect(result).not.toBeNull();
      expect(result?.total).toBeGreaterThan(0);
      expect(result?.days).toBeDefined();
    });

    it('should use default username when none provided', async () => {
      const mockApiResponse = { contributions: [] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      await fetchGitHubContributions();

      expect(fetch).toHaveBeenCalledWith(
        'https://github-contributions-api.deno.dev/Torof.json',
        {
          next: { revalidate: 3600 }
        }
      );
    });
  });

  describe('transformContributionsForGraph', () => {
    it('should transform contribution data to weekly grid format', () => {
      const mockData = {
        total: 10,
        days: [
          { date: '2024-01-01', count: 5, level: 2 }, // Monday
          { date: '2024-01-02', count: 3, level: 2 }, // Tuesday
          { date: '2024-01-03', count: 0, level: 0 }, // Wednesday
          { date: '2024-01-04', count: 2, level: 1 }  // Thursday
        ]
      };

      const result = transformContributionsForGraph(mockData);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(52); // 52 weeks
      expect(result[0]).toBeDefined();
      expect(result[0].length).toBe(7); // 7 days per week
    });

    it('should handle empty contribution data', () => {
      const mockData = {
        total: 0,
        days: []
      };

      const result = transformContributionsForGraph(mockData);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(52);
    });
  });

  describe('contribution levels', () => {
    it('should assign correct contribution levels', async () => {
      const mockApiResponse = {
        contributions: [
          [
            { date: '2024-01-01', contributionCount: 0 },  // level 0
            { date: '2024-01-02', contributionCount: 1 },  // level 1
            { date: '2024-01-03', contributionCount: 3 },  // level 2
            { date: '2024-01-04', contributionCount: 7 },  // level 3
            { date: '2024-01-05', contributionCount: 15 } // level 4
          ]
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await fetchGitHubContributions('testuser');

      expect(result?.days).toEqual([
        { date: '2024-01-01', count: 0, level: 0 },
        { date: '2024-01-02', count: 1, level: 1 },
        { date: '2024-01-03', count: 3, level: 2 },
        { date: '2024-01-04', count: 7, level: 3 },
        { date: '2024-01-05', count: 15, level: 4 }
      ]);
    });
  });

  describe('fallback data generation', () => {
    it('should generate realistic patterns in fallback data', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchGitHubContributions('testuser');

      expect(result).not.toBeNull();
      
      if (result) {
        expect(result.total).toBeGreaterThan(0);
        expect(result.days.length).toBeGreaterThan(300); // At least 300 days of data
        expect(result.days.length).toBeLessThan(400); // But not more than ~365
        
        // Check that dates are properly formatted
        result.days.forEach(day => {
          expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(day.count).toBeGreaterThanOrEqual(0);
          expect(day.level).toBeGreaterThanOrEqual(0);
          expect(day.level).toBeLessThanOrEqual(4);
        });
      }
    });
  });
});