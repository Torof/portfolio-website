export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languages: Record<string, number>;
  topLanguages: Array<{
    name: string;
    percentage: number;
    bytes: number;
    color: string;
  }>;
  yearlyContributions: number;
  longestStreak: number;
  currentStreak: number;
  user: GitHubUser | null;
}

const GITHUB_USERNAME = 'Torof';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

/**
 * Fetch contribution data from GitHub GraphQL API
 */
interface ContributionData {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number;
      date: string;
    }>;
  }>;
}

interface GraphQLContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
        contributionCalendar: ContributionData;
      };
    };
  };
}

async function fetchContributionData(): Promise<{
  totalContributions: number;
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
} | null> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set, contribution data will not be available');
    return null;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME }
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.status}`);
    }

    const result: GraphQLContributionResponse = await response.json();
    const calendar = result.data.user.contributionsCollection.contributionCalendar;
    const totalCommits = result.data.user.contributionsCollection.totalCommitContributions +
                         result.data.user.contributionsCollection.restrictedContributionsCount;

    // Calculate streaks from contribution calendar
    const allDays = calendar.weeks.flatMap(week => week.contributionDays);

    // Current streak (count backwards from today)
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const sortedDays = [...allDays].sort((a, b) => b.date.localeCompare(a.date));

    for (const day of sortedDays) {
      // Skip future dates
      if (day.date > today) continue;

      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        // Allow one day gap (today might not have contributions yet)
        if (day.date === today) continue;
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    const chronologicalDays = [...allDays].sort((a, b) => a.date.localeCompare(b.date));

    for (const day of chronologicalDays) {
      if (day.contributionCount > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return {
      totalContributions: calendar.totalContributions,
      totalCommits,
      currentStreak,
      longestStreak
    };
  } catch (error) {
    console.error('Error fetching contribution data:', error);
    return null;
  }
}

/**
 * Fetch user repositories from GitHub API
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repositories: GitHubRepository[] = await response.json();

    return repositories.filter(repo =>
      !repo.fork &&
      !repo.archived &&
      !repo.private &&
      repo.description
    );
  } catch {
    return [];
  }
}

/**
 * Fetch user profile from GitHub API
 */
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          })
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Get languages used in a repository
 */
export async function fetchRepositoryLanguages(repoName: string): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          })
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Get comprehensive GitHub statistics
 */
export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const [user, repositories, contributionData] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepositories(),
      fetchContributionData()
    ]);

    if (!user || repositories.length === 0) {
      return null;
    }

    // Calculate basic stats from repositories
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Aggregate languages across all repositories
    const allLanguages: Record<string, number> = {};

    for (const repo of repositories.slice(0, 10)) {
      try {
        const languages = await fetchRepositoryLanguages(repo.name);
        for (const [lang, bytes] of Object.entries(languages)) {
          allLanguages[lang] = (allLanguages[lang] || 0) + bytes;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch {
        // Continue with other repos
      }
    }

    // Calculate language percentages and assign colors
    const languageColors: Record<string, string> = {
      'Solidity': '#627EEA',
      'TypeScript': '#3178C6',
      'JavaScript': '#F7DF1E',
      'Rust': '#CE422B',
      'Python': '#3776AB',
      'Go': '#00ADD8',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'Shell': '#89E051',
      'Dockerfile': '#2496ED'
    };

    const totalBytes = Object.values(allLanguages).reduce((sum, bytes) => sum + bytes, 0);
    const topLanguages = Object.entries(allLanguages)
      .filter(([name]) => name !== 'CSS') // Filter out CSS
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
        color: languageColors[name] || '#6b7280'
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6); // Top 6 languages

    const stats: GitHubStats = {
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      totalCommits: contributionData?.totalCommits ?? 0,
      languages: allLanguages,
      topLanguages,
      yearlyContributions: contributionData?.totalContributions ?? 0,
      longestStreak: contributionData?.longestStreak ?? 0,
      currentStreak: contributionData?.currentStreak ?? 0,
      user
    };

    return stats;

  } catch {
    return null;
  }
}