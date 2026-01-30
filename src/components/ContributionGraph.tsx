'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/lib/context/ThemeContext';
import { fetchGitHubContributions, transformContributionsForGraph } from '@/lib/services/githubContributions';

interface ContributionGraphProps {
  yearlyContributions: number;
  className?: string;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  yearlyContributions, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contributionData, setContributionData] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualContributions, setActualContributions] = useState(yearlyContributions);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setIsLoading(true);
        const username = 'Torof'; // Use hardcoded username since env var isn't available on client
        const data = await fetchGitHubContributions(username);
        
        if (data) {
          const graphData = transformContributionsForGraph(data);
          setContributionData(graphData);
          setActualContributions(data.total);
        } else {
          // Fallback to mock data if API fails
          const mockData = generateContributionData(yearlyContributions);
          setContributionData(mockData);
        }
      } catch (error) {
        console.error('Error loading contributions:', error);
        // Fallback to mock data
        const mockData = generateContributionData(yearlyContributions);
        setContributionData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    loadContributions();
  }, [yearlyContributions]);

  // Generate mock contribution data for visualization
  // In a real implementation, this would come from GitHub's GraphQL API
  const generateContributionData = (totalContributions: number) => {
    const weeks = 52;
    const daysPerWeek = 7;
    const data: number[][] = [];
    
    // Distribute contributions across the year with some randomness
    const avgContributionsPerDay = totalContributions / (weeks * daysPerWeek);
    
    for (let week = 0; week < weeks; week++) {
      const weekData: number[] = [];
      for (let day = 0; day < daysPerWeek; day++) {
        // Add some variance and patterns
        const variance = Math.random() * 2;
        const weekdayMultiplier = day >= 1 && day <= 5 ? 1.5 : 0.3; // More activity on weekdays
        const contributions = Math.floor(avgContributionsPerDay * variance * weekdayMultiplier);
        weekData.push(Math.max(0, contributions));
      }
      data.push(weekData);
    }
    
    return data;
  };

  const getContributionLevel = (contributions: number) => {
    if (contributions === 0) return 0;
    if (contributions <= 2) return 1;
    if (contributions <= 5) return 2;
    if (contributions <= 10) return 3;
    return 4;
  };

  const getContributionColor = (level: number) => {
    const colors = theme === 'theme-light'
      ? [
          'rgba(0, 0, 0, 0.05)',     // No contributions
          'rgba(34, 197, 94, 0.4)',  // Low (green)
          'rgba(34, 197, 94, 0.6)',  // Medium-low
          'rgba(34, 197, 94, 0.8)',  // Medium-high
          'rgba(34, 197, 94, 1.0)'   // High
        ]
      : [
          'rgba(255, 255, 255, 0.05)', // No contributions
          'rgba(34, 197, 94, 0.3)',    // Low (green)
          'rgba(34, 197, 94, 0.5)',    // Medium-low
          'rgba(34, 197, 94, 0.7)',    // Medium-high
          'rgba(34, 197, 94, 0.9)'     // High
        ];
    return colors[level];
  };

  // contributionData is now set via useEffect

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        {/* Contribution Graph */}
        <div 
          className={`
            transition-all duration-1000 
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            ${theme === 'theme-light' 
              ? 'bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(248,250,252,0.8)] border-[rgba(0,0,0,0.1)]'
              : 'bg-gradient-to-br from-[rgba(15,23,42,0.6)] to-[rgba(30,41,59,0.6)] border-[rgba(255,255,255,0.1)]'
            }
            rounded-lg p-4 border 
            backdrop-blur-sm overflow-x-auto
            relative min-h-[200px]
          `}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-sm ${theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-300)]'}`}>
                Loading contributions...
              </div>
            </div>
          ) : (
          <div className="flex gap-1 min-w-max">
            {contributionData && contributionData.length > 0 ? contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.isArray(week) ? week.map((contributions, dayIndex) => {
                  const level = getContributionLevel(contributions);
                  const delay = (weekIndex * 7 + dayIndex) * 2;
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`
                        w-2.5 h-2.5 rounded-sm transition-all duration-300 cursor-pointer
                        hover:scale-125 hover:brightness-125
                        ${isVisible ? 'scale-100' : 'scale-0'}
                      `}
                      style={{
                        backgroundColor: getContributionColor(level),
                        transitionDelay: `${delay}ms`,
                        border: level > 0 ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      title={`${contributions} contributions`}
                    />
                  );
                }) : null}
              </div>
            )) : (
              <div className="text-center text-sm text-gray-500">
                No contribution data available
              </div>
            )}
          </div>
          )}
          
          {/* Legend - Shows months for the last 52 weeks */}
          <div className={`flex items-center justify-between mt-4 text-xs ${
            theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-300)]'
          }`}>
            {(() => {
              const today = new Date();
              const startDate = new Date(today);
              startDate.setDate(startDate.getDate() - (52 * 7)); // 52 weeks ago

              // Get month labels at roughly equal intervals across 52 weeks
              const labels = [];
              for (let i = 0; i < 6; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + Math.floor(i * (52 * 7) / 5));
                labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
              }

              return labels.map((month, idx) => (
                <span key={idx}>{month}</span>
              ));
            })()}
          </div>
          
          <div className="flex items-center justify-end mt-2 gap-2">
            <span className={`text-xs ${theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-300)]'}`}>Less</span>
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm border ${
                  theme === 'theme-light' ? 'border-[rgba(0,0,0,0.1)]' : 'border-[rgba(255,255,255,0.1)]'
                }`}
                style={{ backgroundColor: getContributionColor(level) }}
              />
            ))}
            <span className={`text-xs ${theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-300)]'}`}>More</span>
          </div>
        </div>

        {/* Contribution Summary */}
        <div className="mt-4 text-center">
          <p className={`text-sm ${theme === 'theme-light' ? 'text-gray-700' : 'text-[var(--dark-200)]'}`}>
            <span className="font-semibold text-[var(--primary-400)]">
              {actualContributions.toLocaleString()}
            </span>{' '}
            contributions in the last year
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;