"use client";

import { SkillCategory } from '@/lib/types';
import { SmartContractsSection, DeFiSection, Layer2Section } from './skills';
import SecurityDefenseSystem from './SecurityDefenseSystem';

interface PremiumSkillSectionsProps {
  categories: SkillCategory[];
}

export default function PremiumSkillSections({ categories }: PremiumSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
    'security': SecurityDefenseSystem,
  };

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const Component = categoryComponents[category.id as keyof typeof categoryComponents];
        return Component ? (
          <Component key={category.id} category={category} />
        ) : null;
      })}
    </div>
  );
}