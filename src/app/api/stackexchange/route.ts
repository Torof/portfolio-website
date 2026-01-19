import { NextRequest, NextResponse } from 'next/server';
import { fetchCompleteStackExchangeData } from '@/lib/services/stackexchange';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '52251';

    const { profile, answers } = await fetchCompleteStackExchangeData(userId);

    if (!profile && (!answers || answers.length === 0)) {
      return NextResponse.json(
        { error: 'No Stack Exchange data found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      profile,
      answers,
      fetchedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
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