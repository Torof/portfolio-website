'use client';

import React, { useEffect, useState } from 'react';

interface ContributionGraphProps {
  yearlyContributions: number;
  className?: string;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  yearlyContributions, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
    const colors = [
      'rgba(255, 255, 255, 0.05)', // No contributions
      'rgba(99, 126, 234, 0.3)',   // Low (Ethereum blue)
      'rgba(99, 126, 234, 0.5)',   // Medium-low
      'rgba(99, 126, 234, 0.7)',   // Medium-high
      'rgba(99, 126, 234, 0.9)'    // High
    ];
    return colors[level];
  };

  const contributionData = generateContributionData(yearlyContributions);
  const totalSquares = 52 * 7;

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-xl mr-2">📊</span>
          Contribution Activity
        </h3>
        
        {/* Contribution Graph */}
        <div 
          className={`
            transition-all duration-1000 
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            bg-gradient-to-br from-[rgba(15,23,42,0.6)] to-[rgba(30,41,59,0.6)]
            rounded-lg p-4 border border-[rgba(255,255,255,0.1)]
            backdrop-blur-sm overflow-x-auto
          `}
        >
          <div className="flex gap-1 min-w-max">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((contributions, dayIndex) => {
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
                        border: level > 0 ? '1px solid rgba(99, 126, 234, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      title={`${contributions} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-[var(--dark-300)]">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
          
          <div className="flex items-center justify-end mt-2 gap-2">
            <span className="text-xs text-[var(--dark-300)]">Less</span>
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className="w-2.5 h-2.5 rounded-sm border border-[rgba(255,255,255,0.1)]"
                style={{ backgroundColor: getContributionColor(level) }}
              />
            ))}
            <span className="text-xs text-[var(--dark-300)]">More</span>
          </div>
        </div>

        {/* Contribution Summary */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[var(--dark-200)]">
            <span className="font-semibold text-[var(--primary-400)]">
              {yearlyContributions.toLocaleString()}
            </span>{' '}
            contributions in the last year
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;