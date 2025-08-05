import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Fallback in-memory storage when KV is not available (development)
const fallbackViewCounts: Record<string, number> = {};
const fallbackUniqueVisitors: Record<string, Set<string>> = {};

// KV keys
const VIEWS_KEY = 'page_views';
const VISITORS_KEY = 'unique_visitors';

// Helper to generate a simple visitor ID from request headers
function getVisitorId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Simple hash of IP + User Agent for basic visitor identification
  return Buffer.from(ip + userAgent).toString('base64').slice(0, 16);
}

// Helper functions for KV operations with fallbacks
async function getViewCounts(): Promise<Record<string, number>> {
  try {
    const counts = await kv.hgetall(VIEWS_KEY);
    return counts as Record<string, number> || {};
  } catch (error) {
    console.warn('KV not available, using fallback storage:', error);
    return fallbackViewCounts;
  }
}

async function setViewCount(pageId: string, count: number): Promise<void> {
  try {
    await kv.hset(VIEWS_KEY, { [pageId]: count });
  } catch (error) {
    console.warn('KV not available, using fallback storage:', error);
    fallbackViewCounts[pageId] = count;
  }
}

async function getUniqueVisitors(): Promise<Record<string, string[]>> {
  try {
    const visitors = await kv.hgetall(VISITORS_KEY);
    // Convert arrays back to Sets for processing
    const result: Record<string, string[]> = {};
    for (const [pageId, visitorArray] of Object.entries(visitors || {})) {
      result[pageId] = Array.isArray(visitorArray) ? visitorArray : [];
    }
    return result;
  } catch (error) {
    console.warn('KV not available, using fallback storage:', error);
    const result: Record<string, string[]> = {};
    for (const [pageId, visitorSet] of Object.entries(fallbackUniqueVisitors)) {
      result[pageId] = Array.from(visitorSet);
    }
    return result;
  }
}

async function addUniqueVisitor(pageId: string, visitorId: string): Promise<void> {
  try {
    // Get current visitors for this page
    const currentVisitors = await kv.hget(VISITORS_KEY, pageId) as string[] || [];
    if (!currentVisitors.includes(visitorId)) {
      currentVisitors.push(visitorId);
      await kv.hset(VISITORS_KEY, { [pageId]: currentVisitors });
    }
  } catch (error) {
    console.warn('KV not available, using fallback storage:', error);
    if (!fallbackUniqueVisitors[pageId]) {
      fallbackUniqueVisitors[pageId] = new Set();
    }
    fallbackUniqueVisitors[pageId].add(visitorId);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('page');

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const viewCounts = await getViewCounts();
    const uniqueVisitorsData = await getUniqueVisitors();

    const views = viewCounts[pageId] || 0;
    const uniqueViews = uniqueVisitorsData[pageId]?.length || 0;

    return NextResponse.json({ 
      views,
      uniqueViews,
      pageId 
    });
  } catch (error) {
    console.error('Error getting views:', error);
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId } = body;

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const visitorId = getVisitorId(request);

    // Get current counts
    const viewCounts = await getViewCounts();
    const uniqueVisitorsData = await getUniqueVisitors();

    // Initialize if doesn't exist
    const currentViews = viewCounts[pageId] || 0;
    const currentUniqueVisitors = uniqueVisitorsData[pageId] || [];

    // Always increment total views
    const newViews = currentViews + 1;
    await setViewCount(pageId, newViews);

    // Check if this is a new unique visitor
    const isNewVisitor = !currentUniqueVisitors.includes(visitorId);
    
    // Track unique visitor
    await addUniqueVisitor(pageId, visitorId);

    // Get updated unique count
    const updatedUniqueVisitorsData = await getUniqueVisitors();
    const uniqueViews = updatedUniqueVisitorsData[pageId]?.length || 0;

    return NextResponse.json({ 
      success: true,
      views: newViews,
      uniqueViews,
      pageId,
      isNewVisitor
    });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}

// Optional: Reset views endpoint for testing
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('page');

    if (pageId) {
      // Reset specific page
      try {
        await kv.hdel(VIEWS_KEY, pageId);
        await kv.hdel(VISITORS_KEY, pageId);
      } catch (error) {
        console.warn('KV not available, using fallback storage:', error);
        delete fallbackViewCounts[pageId];
        delete fallbackUniqueVisitors[pageId];
      }
      return NextResponse.json({ success: true, message: `Views reset for ${pageId}` });
    } else {
      // Reset all views
      try {
        await kv.del(VIEWS_KEY);
        await kv.del(VISITORS_KEY);
      } catch (error) {
        console.warn('KV not available, using fallback storage:', error);
        Object.keys(fallbackViewCounts).forEach(key => delete fallbackViewCounts[key]);
        Object.keys(fallbackUniqueVisitors).forEach(key => delete fallbackUniqueVisitors[key]);
      }
      return NextResponse.json({ success: true, message: 'All views reset' });
    }
  } catch (error) {
    console.error('Error resetting views:', error);
    return NextResponse.json({ error: 'Failed to reset views' }, { status: 500 });
  }
}