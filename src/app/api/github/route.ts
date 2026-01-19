import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/services/github';

export async function GET() {
  try {
    const stats = await fetchGitHubStats();

    if (!stats) {
      return NextResponse.json(
        { error: 'No GitHub data found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      stats,
      fetchedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
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