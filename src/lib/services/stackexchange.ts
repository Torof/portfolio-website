import { StackOverflowProfile, StackOverflowAnswer } from '../types';

const STACK_EXCHANGE_API_BASE = 'https://api.stackexchange.com/2.3';
const ETHEREUM_SITE = 'ethereum';
const API_KEY = process.env.STACK_EXCHANGE_API_KEY;

// Helper function to build API URLs with optional API key
function buildApiUrl(endpoint: string, params: Record<string, string> = {}): string {
  const url = new URL(`${STACK_EXCHANGE_API_BASE}${endpoint}`);
  
  // Add site parameter
  url.searchParams.set('site', ETHEREUM_SITE);
  
  // Add API key if available (increases rate limits from 300 to 10,000 per day)
  if (API_KEY) {
    url.searchParams.set('key', API_KEY);
  }
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

// Helper function to handle API responses with rate limit awareness
async function handleApiResponse(response: Response, context: string): Promise<any> {
  if (!response.ok) {
    if (response.status === 400) {
      console.error(`Stack Exchange API Bad Request (${context}):`, response.status);
      return null;
    }
    if (response.status === 429) {
      console.error(`Stack Exchange API Rate Limited (${context}):`, response.status);
      return null;
    }
    if (response.status === 502 || response.status === 503) {
      console.error(`Stack Exchange API Server Error (${context}):`, response.status);
      return null;
    }
    console.error(`Stack Exchange API Error (${context}):`, response.status);
    return null;
  }

  const data = await response.json();
  
  // Check for API quota exceeded
  if (data.quota_remaining !== undefined && data.quota_remaining < 10) {
    console.warn(`Stack Exchange API quota low: ${data.quota_remaining} requests remaining`);
  }
  
  // Handle backoff if present
  if (data.backoff) {
    console.warn(`Stack Exchange API backoff requested: ${data.backoff} seconds`);
  }
  
  return data;
}

export interface StackExchangeUser {
  user_id: number;
  display_name: string;
  profile_image: string;
  reputation: number;
  badge_counts: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

export interface StackExchangeAnswer {
  answer_id: number;
  question_id: number;
  score: number;
  is_accepted: boolean;
  title: string;
  tags: string[];
  body: string; // HTML format from Stack Exchange API
  link: string;
  creation_date: number;
}

export interface StackExchangeQuestion {
  question_id: number;
  title: string;
  link: string;
  tags: string[];
}

/**
 * Fetch user profile data from Stack Exchange API
 */
export async function fetchStackExchangeProfile(userId: string): Promise<StackOverflowProfile | null> {
  try {
    const apiUrl = buildApiUrl(`/users/${userId}`, {
      filter: 'default'
    });
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0 (torof-portfolio)',
      },
    });

    const data = await handleApiResponse(response, 'profile');
    if (!data || !data.items || data.items.length === 0) {
      console.error('No user data found');
      return null;
    }

    const user: StackExchangeUser = data.items[0];

    // Fetch top tags for the user
    const tagsApiUrl = buildApiUrl(`/users/${userId}/top-tags`, {
      pagesize: '5'
    });
    
    const tagsResponse = await fetch(tagsApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0 (torof-portfolio)',
      },
    });

    let topTags: string[] = ['solidity', 'evm', 'nft', 'ethereum', 'smart-contracts']; // fallback
    const tagsData = await handleApiResponse(tagsResponse, 'tags');
    if (tagsData && tagsData.items && tagsData.items.length > 0) {
      topTags = tagsData.items.map((tag: any) => tag.tag_name);
    }

    const profile: StackOverflowProfile = {
      userId: user.user_id.toString(),
      displayName: user.display_name,
      profileImage: '/logos/ethereum_stackexchange_profile_pic.png', // Use local image
      reputation: user.reputation,
      badges: {
        gold: user.badge_counts.gold,
        silver: user.badge_counts.silver,
        bronze: user.badge_counts.bronze,
      },
      topTags,
      profileUrl: `https://ethereum.stackexchange.com/users/${userId}/torof`
    };

    return profile;
  } catch (error) {
    console.error('Error fetching Stack Exchange profile:', error);
    return null;
  }
}

/**
 * Fetch user's top answers from Stack Exchange API
 */
export async function fetchStackExchangeAnswers(userId: string, limit: number = 10): Promise<StackOverflowAnswer[]> {
  try {
    // First, get the user's answers
    const answersApiUrl = buildApiUrl(`/users/${userId}/answers`, {
      order: 'desc',
      sort: 'votes',
      pagesize: limit.toString(),
      filter: 'withbody'
    });
    
    const answersResponse = await fetch(answersApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0 (torof-portfolio)',
      },
    });

    const answersData = await handleApiResponse(answersResponse, 'answers');
    if (!answersData || !answersData.items || answersData.items.length === 0) {
      return [];
    }
    

    // Get question IDs to fetch question details
    const questionIds = answersData.items.map((answer: any) => answer.question_id);
    
    // Fetch question details
    const questionsApiUrl = buildApiUrl(`/questions/${questionIds.join(';')}`, {
      filter: 'default'
    });
    
    const questionsResponse = await fetch(questionsApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0 (torof-portfolio)',
      },
    });

    let questionsMap: { [key: number]: StackExchangeQuestion } = {};
    const questionsData = await handleApiResponse(questionsResponse, 'questions');
    if (questionsData && questionsData.items) {
      questionsMap = questionsData.items.reduce((map: any, question: any) => {
        map[question.question_id] = {
          question_id: question.question_id,
          title: question.title,
          link: question.link,
          tags: question.tags,
        };
        return map;
      }, {});
    }

    // Combine answers with question data
    const featuredAnswers: StackOverflowAnswer[] = answersData.items.map((answer: any, index: number) => {
      const question = questionsMap[answer.question_id] || {
        title: 'Question not found',
        link: '',
        tags: []
      };

      // Create excerpt from body field (HTML format, needs cleaning)
      let excerpt = '';
      if (answer.body) {
        excerpt = answer.body
          // Remove HTML tags
          .replace(/<[^>]*>/g, '')
          // Replace HTML entities
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          // Clean up whitespace
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 180) + (answer.body.length > 180 ? '...' : '');
      }

      return {
        id: `answer-${answer.answer_id}`,
        questionTitle: question.title,
        questionUrl: question.link,
        answerUrl: `${question.link}#${answer.answer_id}`,
        score: answer.score,
        isAccepted: answer.is_accepted || false,
        excerpt,
        tags: question.tags || []
      };
    });

    return featuredAnswers;
  } catch (error) {
    console.error('Error fetching Stack Exchange answers:', error);
    return [];
  }
}

/**
 * Fetch both profile and answers data
 */
export async function fetchCompleteStackExchangeData(userId: string): Promise<{
  profile: StackOverflowProfile | null;
  answers: StackOverflowAnswer[];
}> {
  const [profile, answers] = await Promise.all([
    fetchStackExchangeProfile(userId),
    fetchStackExchangeAnswers(userId, 6) // Get top 6 answers
  ]);

  return { profile, answers };
}