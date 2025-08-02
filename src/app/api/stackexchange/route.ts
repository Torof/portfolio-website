import { NextRequest, NextResponse } from 'next/server';
import { fetchCompleteStackExchangeData } from '@/lib/services/stackexchange';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '52251';

    console.log(`[API] Fetching Stack Exchange data for user ${userId}`);
    
    // Fetch data from Stack Exchange API (server-side, bypasses CORS)
    const { profile, answers } = await fetchCompleteStackExchangeData(userId);

    if (!profile && (!answers || answers.length === 0)) {
      console.log('[API] No Stack Exchange data found, returning error');
      return NextResponse.json(
        { error: 'No Stack Exchange data found' },
        { status: 404 }
      );
    }

    console.log(`[API] Successfully fetched Stack Exchange data - Profile: ${!!profile}, Answers: ${answers?.length || 0}`);

    return NextResponse.json({
      profile,
      answers,
      fetchedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
    console.error('[API] Error fetching Stack Exchange data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch Stack Exchange data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add caching headers to reduce API calls
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
    },
  });
}