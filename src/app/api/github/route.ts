import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/services/github';

export async function GET(request: NextRequest) {
  try {
    console.log('[API] Fetching GitHub stats');
    
    // Fetch data from GitHub API (server-side, with authentication if available)
    const stats = await fetchGitHubStats();

    if (!stats) {
      console.log('[API] No GitHub stats found, returning error');
      return NextResponse.json(
        { error: 'No GitHub data found' },
        { status: 404 }
      );
    }

    console.log(`[API] Successfully fetched GitHub stats - User: ${stats.user?.login || 'N/A'}, Repos: ${stats.repositories?.length || 0}`);

    return NextResponse.json({
      stats,
      fetchedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
    console.error('[API] Error fetching GitHub data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Add caching headers to reduce API calls
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200', // 10 min cache, 20 min stale
    },
  });
}