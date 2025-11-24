/**
 * @jest-environment node
 */

import { GET, HEAD } from '../route';
import { fetchCompleteStackExchangeData } from '../../../../lib/services/stackexchange';
import { NextRequest } from 'next/server';

// Mock the Stack Exchange service
jest.mock('../../../../lib/services/stackexchange');

const mockFetchCompleteStackExchangeData = fetchCompleteStackExchangeData as jest.MockedFunction<
  typeof fetchCompleteStackExchangeData
>;

// Helper to create mock NextRequest
function createMockRequest(userId?: string): NextRequest {
  const url = userId
    ? `http://localhost:3000/api/stackexchange?userId=${userId}`
    : 'http://localhost:3000/api/stackexchange';

  return new NextRequest(url);
}

describe('Stack Exchange API Route', () => {
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
    it('returns Stack Exchange data successfully with default userId', async () => {
      const mockData = {
        profile: {
          user_id: 52251,
          display_name: 'Test User',
          reputation: 1000,
          badge_counts: { bronze: 10, silver: 5, gold: 1 },
        },
        answers: [
          {
            answer_id: 1,
            question_id: 1,
            score: 5,
            is_accepted: true,
            tags: ['javascript', 'react'],
          },
        ],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile).toEqual(mockData.profile);
      expect(data.answers).toEqual(mockData.answers);
      expect(data.source).toBe('live-api');
      expect(data.fetchedAt).toBeDefined();
      expect(mockFetchCompleteStackExchangeData).toHaveBeenCalledWith('52251');
    });

    it('uses custom userId from query params', async () => {
      const mockData = {
        profile: {
          user_id: 12345,
          display_name: 'Custom User',
          reputation: 500,
        },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest('12345');
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockFetchCompleteStackExchangeData).toHaveBeenCalledWith('12345');
    });

    it('returns 404 when no profile and no answers found', async () => {
      mockFetchCompleteStackExchangeData.mockResolvedValue({
        profile: null,
        answers: [],
      });

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('No Stack Exchange data found');
    });

    it('returns data when profile is null but answers exist', async () => {
      const mockData = {
        profile: null,
        answers: [
          {
            answer_id: 1,
            question_id: 1,
            score: 5,
            is_accepted: true,
            tags: ['javascript'],
          },
        ],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile).toBeNull();
      expect(data.answers).toHaveLength(1);
    });

    it('returns data when answers is null but profile exists', async () => {
      const mockData = {
        profile: {
          user_id: 52251,
          display_name: 'Test User',
          reputation: 1000,
        },
        answers: null,
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile).toEqual(mockData.profile);
      expect(data.answers).toBeNull();
    });

    it('returns 500 when service throws an error', async () => {
      mockFetchCompleteStackExchangeData.mockRejectedValue(
        new Error('API rate limit exceeded')
      );

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch Stack Exchange data');
      expect(data.details).toBe('API rate limit exceeded');
    });

    it('handles unknown errors', async () => {
      mockFetchCompleteStackExchangeData.mockRejectedValue('Unknown error string');

      const request = createMockRequest();
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch Stack Exchange data');
      expect(data.details).toBe('Unknown error');
    });

    it('includes timestamp in response', async () => {
      const mockData = {
        profile: { user_id: 52251, display_name: 'Test' },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest();
      const beforeTime = new Date().toISOString();
      const response = await GET(request);
      const afterTime = new Date().toISOString();
      const data = await response.json();

      expect(data.fetchedAt).toBeDefined();
      expect(data.fetchedAt >= beforeTime).toBe(true);
      expect(data.fetchedAt <= afterTime).toBe(true);
    });

    it('handles empty userId gracefully (uses default)', async () => {
      const mockData = {
        profile: { user_id: 52251 },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest('');
      const response = await GET(request);

      expect(response.status).toBe(200);
      // Empty string should fallback to default '52251'
      expect(mockFetchCompleteStackExchangeData).toHaveBeenCalledWith('52251');
    });
  });

  describe('HEAD', () => {
    it('returns 200 with cache headers', async () => {
      const response = await HEAD();

      expect(response.status).toBe(200);

      const cacheControl = response.headers.get('Cache-Control');
      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=300');
      expect(cacheControl).toContain('stale-while-revalidate=600');
    });

    it('returns empty body', async () => {
      const response = await HEAD();
      const text = await response.text();

      expect(text).toBe('');
    });
  });

  describe('Logging', () => {
    it('logs successful fetch with userId', async () => {
      const mockData = {
        profile: { user_id: 12345 },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest('12345');
      await GET(request);

      expect(console.log).toHaveBeenCalledWith(
        '[API] Fetching Stack Exchange data for user 12345'
      );
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Successfully fetched Stack Exchange data')
      );
    });

    it('logs errors', async () => {
      const error = new Error('Test error');
      mockFetchCompleteStackExchangeData.mockRejectedValue(error);

      const request = createMockRequest();
      await GET(request);

      expect(console.error).toHaveBeenCalledWith(
        '[API] Error fetching Stack Exchange data:',
        error
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles special characters in userId', async () => {
      const mockData = {
        profile: { user_id: 52251 },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      // Test with special characters - should still call service
      const request = createMockRequest('abc123');
      const response = await GET(request);

      expect(mockFetchCompleteStackExchangeData).toHaveBeenCalledWith('abc123');
      expect(response.status).toBe(200);
    });

    it('handles very large userId', async () => {
      const mockData = {
        profile: { user_id: 999999999 },
        answers: [],
      };

      mockFetchCompleteStackExchangeData.mockResolvedValue(mockData);

      const request = createMockRequest('999999999');
      const response = await GET(request);

      expect(mockFetchCompleteStackExchangeData).toHaveBeenCalledWith('999999999');
      expect(response.status).toBe(200);
    });
  });
});
