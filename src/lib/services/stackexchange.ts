import { StackOverflowProfile, StackOverflowAnswer } from '../types';

const STACK_EXCHANGE_API_BASE = 'https://api.stackexchange.com/2.3';
const ETHEREUM_SITE = 'ethereum';

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
  body_markdown: string;
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
    const response = await fetch(
      `${STACK_EXCHANGE_API_BASE}/users/${userId}?site=${ETHEREUM_SITE}&filter=default`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch Stack Exchange profile:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No user data found');
      return null;
    }

    const user: StackExchangeUser = data.items[0];

    // Fetch top tags for the user
    const tagsResponse = await fetch(
      `${STACK_EXCHANGE_API_BASE}/users/${userId}/top-tags?site=${ETHEREUM_SITE}&pagesize=5`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    let topTags: string[] = ['solidity', 'ethereum', 'smart-contracts', 'web3']; // fallback
    if (tagsResponse.ok) {
      const tagsData = await tagsResponse.json();
      if (tagsData.items && tagsData.items.length > 0) {
        topTags = tagsData.items.map((tag: any) => tag.tag_name);
      }
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
    const answersResponse = await fetch(
      `${STACK_EXCHANGE_API_BASE}/users/${userId}/answers?site=${ETHEREUM_SITE}&order=desc&sort=votes&pagesize=${limit}&filter=withbody`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!answersResponse.ok) {
      console.error('Failed to fetch Stack Exchange answers:', answersResponse.status);
      return [];
    }

    const answersData = await answersResponse.json();
    
    if (!answersData.items || answersData.items.length === 0) {
      return [];
    }

    // Get question IDs to fetch question details
    const questionIds = answersData.items.map((answer: any) => answer.question_id);
    
    // Fetch question details
    const questionsResponse = await fetch(
      `${STACK_EXCHANGE_API_BASE}/questions/${questionIds.join(';')}?site=${ETHEREUM_SITE}&filter=default`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    let questionsMap: { [key: number]: StackExchangeQuestion } = {};
    if (questionsResponse.ok) {
      const questionsData = await questionsResponse.json();
      if (questionsData.items) {
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
    }

    // Combine answers with question data
    const featuredAnswers: StackOverflowAnswer[] = answersData.items.map((answer: any, index: number) => {
      const question = questionsMap[answer.question_id] || {
        title: 'Question not found',
        link: '',
        tags: []
      };

      // Create excerpt from body_markdown (first 150 characters)
      let excerpt = '';
      if (answer.body_markdown) {
        excerpt = answer.body_markdown
          .replace(/```[\s\S]*?```/g, '[code]') // Replace code blocks
          .replace(/`[^`]*`/g, '[code]') // Replace inline code
          .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace markdown links
          .replace(/[#*_]/g, '') // Remove markdown formatting
          .slice(0, 150) + '...';
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