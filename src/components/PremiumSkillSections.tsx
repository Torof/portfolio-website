"use client";

import { SkillCategory } from '@/lib/types';
import { SmartContractsSection, SecuritySection, DeFiSection, Layer2Section } from './skills';

interface PremiumSkillSectionsProps {
  categories: SkillCategory[];
}

export default function PremiumSkillSections({ categories }: PremiumSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'security': SecuritySection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
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