import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

// Fallback in-memory storage when Redis is not available (development)
const fallbackViewCounts: Record<string, number> = {};
const fallbackUniqueVisitors: Record<string, Set<string>> = {};

// Redis keys
const VIEWS_KEY = 'page_views';
const VISITORS_KEY = 'unique_visitors';

// Redis client singleton
let redis: ReturnType<typeof createClient> | null = null;

// Initialize Redis client
async function getRedisClient() {
  if (!redis) {
    try {
      redis = createClient({
        url: process.env.REDIS_URL,
      });
      await redis.connect();
    } catch (error) {
      console.warn('Redis not available, using fallback storage:', error);
      return null;
    }
  }
  return redis;
}

// Helper to generate a simple visitor ID from request headers
function getVisitorId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Simple hash of IP + User Agent for basic visitor identification
  return Buffer.from(ip + userAgent).toString('base64').slice(0, 16);
}

// Helper functions for Redis operations with fallbacks
async function getViewCounts(): Promise<Record<string, number>> {
  const client = await getRedisClient();
  if (!client) {
    return fallbackViewCounts;
  }
  
  try {
    const counts = await client.hGetAll(VIEWS_KEY);
    // Convert string values to numbers
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(counts || {})) {
      result[key] = parseInt(value as string, 10) || 0;
    }
    return result;
  } catch (error) {
    console.warn('Redis operation failed, using fallback storage:', error);
    return fallbackViewCounts;
  }
}

async function setViewCount(pageId: string, count: number): Promise<void> {
  const client = await getRedisClient();
  if (!client) {
    fallbackViewCounts[pageId] = count;
    return;
  }
  
  try {
    await client.hSet(VIEWS_KEY, pageId, count.toString());
  } catch (error) {
    console.warn('Redis operation failed, using fallback storage:', error);
    fallbackViewCounts[pageId] = count;
  }
}

async function getUniqueVisitors(): Promise<Record<string, string[]>> {
  const client = await getRedisClient();
  if (!client) {
    const result: Record<string, string[]> = {};
    for (const [pageId, visitorSet] of Object.entries(fallbackUniqueVisitors)) {
      result[pageId] = Array.from(visitorSet);
    }
    return result;
  }
  
  try {
    const visitors = await client.hGetAll(VISITORS_KEY);
    const result: Record<string, string[]> = {};
    for (const [pageId, visitorString] of Object.entries(visitors || {})) {
      // Parse JSON string back to array
      try {
        result[pageId] = JSON.parse(visitorString as string) || [];
      } catch {
        result[pageId] = [];
      }
    }
    return result;
  } catch (error) {
    console.warn('Redis operation failed, using fallback storage:', error);
    const result: Record<string, string[]> = {};
    for (const [pageId, visitorSet] of Object.entries(fallbackUniqueVisitors)) {
      result[pageId] = Array.from(visitorSet);
    }
    return result;
  }
}

async function addUniqueVisitor(pageId: string, visitorId: string): Promise<void> {
  const client = await getRedisClient();
  if (!client) {
    if (!fallbackUniqueVisitors[pageId]) {
      fallbackUniqueVisitors[pageId] = new Set();
    }
    fallbackUniqueVisitors[pageId].add(visitorId);
    return;
  }
  
  try {
    // Get current visitors for this page
    const currentVisitorsString = await client.hGet(VISITORS_KEY, pageId);
    let currentVisitors: string[] = [];
    
    if (currentVisitorsString) {
      try {
        currentVisitors = JSON.parse(currentVisitorsString) || [];
      } catch {
        currentVisitors = [];
      }
    }
    
    if (!currentVisitors.includes(visitorId)) {
      currentVisitors.push(visitorId);
      await client.hSet(VISITORS_KEY, pageId, JSON.stringify(currentVisitors));
    }
  } catch (error) {
    console.warn('Redis operation failed, using fallback storage:', error);
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
    const client = await getRedisClient();

    if (pageId) {
      // Reset specific page
      if (client) {
        try {
          await client.hDel(VIEWS_KEY, pageId);
          await client.hDel(VISITORS_KEY, pageId);
        } catch (error) {
          console.warn('Redis operation failed, using fallback storage:', error);
          delete fallbackViewCounts[pageId];
          delete fallbackUniqueVisitors[pageId];
        }
      } else {
        delete fallbackViewCounts[pageId];
        delete fallbackUniqueVisitors[pageId];
      }
      return NextResponse.json({ success: true, message: `Views reset for ${pageId}` });
    } else {
      // Reset all views
      if (client) {
        try {
          await client.del(VIEWS_KEY);
          await client.del(VISITORS_KEY);
        } catch (error) {
          console.warn('Redis operation failed, using fallback storage:', error);
          Object.keys(fallbackViewCounts).forEach(key => delete fallbackViewCounts[key]);
          Object.keys(fallbackUniqueVisitors).forEach(key => delete fallbackUniqueVisitors[key]);
        }
      } else {
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