import { NextRequest, NextResponse } from 'next/server';
import { fetchProjectsFromGitHub } from '@/lib/services/projects';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language') || 'en';

    const projects = await fetchProjectsFromGitHub(language);

    if (!projects || projects.length === 0) {
      return NextResponse.json(
        { error: 'No projects found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      projects,
      fetchedAt: new Date().toISOString(),
      source: 'live-api'
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
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
